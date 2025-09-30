'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ideas', [
      {
        title: 'Темная тема для приложения',
        description: 'Добавить темную тему оформления для комфортной работы в вечернее время и снижения нагрузки на глаза.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Мобильное приложение',
        description: 'Разработать нативное мобильное приложение для iOS и Android с полным функционалом платформы.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Геймификация обучения',
        description: 'Внедрить систему достижений, уровней и наград для повышения мотивации учеников.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Родительский контроль',
        description: 'Добавить расширенную панель для родителей с детальной статистикой успеваемости ребенка.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Интерактивные видеоуроки',
        description: 'Создать библиотеку видеоуроков с интерактивными элементами и заданиями прямо в видео.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Система рейтингов и соревнований',
        description: 'Организовать еженедельные турниры и соревнования между учениками с таблицей лидеров.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Персональный ИИ-помощник',
        description: 'Внедрить AI-помощника, который будет давать подсказки и адаптировать сложность заданий.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Социальные функции',
        description: 'Добавить возможность добавлять друзей, делиться достижениями и решать задачи вместе.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Офлайн-режим',
        description: 'Реализовать возможность скачивать уроки и задания для работы без подключения к интернету.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Расширенная аналитика',
        description: 'Создать подробные отчеты о прогрессе с визуализацией сильных и слабых сторон ученика.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Многоязычная поддержка',
        description: 'Перевести платформу на другие языки для расширения международной аудитории.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Интеграция с школами',
        description: 'Разработать специальный функционал для учителей и интеграцию с школьными программами.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Виртуальная реальность',
        description: 'Создать VR-режим для более immersive обучения сложным концепциям.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Адаптивная сложность',
        description: 'Внедрить алгоритм, автоматически подбирающий оптимальный уровень сложности для каждого ученика.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Система наставничества',
        description: 'Позволить опытным ученикам становиться наставниками для новичков.',
        votesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ideas', null, {});
  }
};
