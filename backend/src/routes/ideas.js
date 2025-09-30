const express = require('express');
const router = express.Router();
const { Idea, Vote, sequelize } = require('../../db/models');
const { getClientIp } = require('../utils/getClientIp');
const { Op } = require('sequelize');

const MAX_VOTES_PER_IP = 10;

/**
 * GET /api/ideas
 * Получить список всех идей, отсортированных по количеству голосов
 */
router.get('/', async (req, res) => {
  try {
    const clientIp = getClientIp(req);

    // Получаем все идеи
    const ideas = await Idea.findAll({
      order: [['votesCount', 'DESC'], ['createdAt', 'DESC']],
    });

    // Получаем список идей, за которые проголосовал данный IP
    const votedIdeas = await Vote.findAll({
      where: { ipAddress: clientIp },
      attributes: ['ideaId'],
    });

    const votedIdeaIds = votedIdeas.map(vote => vote.ideaId);

    // Добавляем информацию о том, голосовал ли пользователь за каждую идею
    const ideasWithVoteStatus = ideas.map(idea => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      votesCount: idea.votesCount,
      hasVoted: votedIdeaIds.includes(idea.id),
      createdAt: idea.createdAt,
    }));

    res.json(ideasWithVoteStatus);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    res.status(500).json({ error: 'Ошибка при получении списка идей' });
  }
});

/**
 * POST /api/ideas/:id/vote
 * Проголосовать за идею
 */
router.post('/:id/vote', async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const ideaId = parseInt(req.params.id);
    const clientIp = getClientIp(req);

    // Проверяем, существует ли идея
    const idea = await Idea.findByPk(ideaId);
    if (!idea) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Идея не найдена' });
    }

    // Проверяем, не голосовал ли пользователь уже за эту идею
    const existingVote = await Vote.findOne({
      where: {
        ideaId,
        ipAddress: clientIp,
      },
    });

    if (existingVote) {
      await transaction.rollback();
      return res.status(409).json({ error: 'Вы уже проголосовали за эту идею' });
    }

    // Проверяем, не превысил ли пользователь лимит голосов
    const votesCount = await Vote.count({
      where: { ipAddress: clientIp },
    });

    if (votesCount >= MAX_VOTES_PER_IP) {
      await transaction.rollback();
      return res.status(409).json({ 
        error: `Вы исчерпали лимит голосов (максимум ${MAX_VOTES_PER_IP} голосов)` 
      });
    }

    // Создаем голос
    await Vote.create(
      {
        ideaId,
        ipAddress: clientIp,
      },
      { transaction }
    );

    // Увеличиваем счетчик голосов у идеи
    await idea.increment('votesCount', { transaction });

    await transaction.commit();

    // Получаем обновленную идею
    await idea.reload();

    res.json({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      votesCount: idea.votesCount,
      hasVoted: true,
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error voting for idea:', error);
    res.status(500).json({ error: 'Ошибка при голосовании' });
  }
});

/**
 * GET /api/ideas/votes/remaining
 * Получить количество оставшихся голосов для данного IP
 */
router.get('/votes/remaining', async (req, res) => {
  try {
    const clientIp = getClientIp(req);
    
    const votesCount = await Vote.count({
      where: { ipAddress: clientIp },
    });

    const remaining = Math.max(0, MAX_VOTES_PER_IP - votesCount);

    res.json({
      used: votesCount,
      remaining,
      total: MAX_VOTES_PER_IP,
    });
  } catch (error) {
    console.error('Error getting remaining votes:', error);
    res.status(500).json({ error: 'Ошибка при получении информации о голосах' });
  }
});

module.exports = router;
