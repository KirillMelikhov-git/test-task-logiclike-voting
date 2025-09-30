import { useState, useEffect } from 'react';
import { Idea, VotesInfo } from './types';
import { fetchIdeas, voteForIdea, fetchVotesInfo } from './api';
import IdeaCard from './components/IdeaCard';
import VotesCounter from './components/VotesCounter';

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [votesInfo, setVotesInfo] = useState<VotesInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votingIds, setVotingIds] = useState<Set<number>>(new Set());

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [ideasData, votesData] = await Promise.all([
        fetchIdeas(),
        fetchVotesInfo(),
      ]);
      setIdeas(ideasData);
      setVotesInfo(votesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVote = async (ideaId: number) => {
    setVotingIds(prev => new Set(prev).add(ideaId));

    try {
      const updatedIdea = await voteForIdea(ideaId);
      
      // Обновляем идею в списке
      setIdeas(prevIdeas =>
        prevIdeas
          .map(idea => (idea.id === ideaId ? updatedIdea : idea))
          .sort((a, b) => b.votesCount - a.votesCount)
      );

      // Обновляем информацию о голосах
      setVotesInfo(prev => {
        if (!prev) return null;
        return {
          ...prev,
          used: prev.used + 1,
          remaining: prev.remaining - 1,
        };
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при голосовании';
      alert(errorMessage);
      
      // Перезагружаем данные для синхронизации
      await loadData();
    } finally {
      setVotingIds(prev => {
        const next = new Set(prev);
        next.delete(ideaId);
        return next;
      });
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>LogicLike - Голосование за идеи</h1>
          <p>Выберите идеи, которые хотите увидеть в нашем продукте</p>
        </div>
        <div className="loading">
          <div className="spinner"></div>
          <p>Загрузка идей...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="header">
          <h1>LogicLike - Голосование за идеи</h1>
          <p>Выберите идеи, которые хотите увидеть в нашем продукте</p>
        </div>
        <div className="error">
          <p>❌ {error}</p>
          <button 
            onClick={loadData}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
            }}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>LogicLike - Голосование за идеи</h1>
        <p>Выберите идеи, которые хотите увидеть в нашем продукте</p>
      </div>

      {votesInfo && <VotesCounter votesInfo={votesInfo} />}

      <div className="ideas-grid">
        {ideas.map(idea => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onVote={handleVote}
            isVoting={votingIds.has(idea.id)}
            canVote={votesInfo ? votesInfo.remaining > 0 : false}
          />
        ))}
      </div>

      {ideas.length === 0 && (
        <div className="loading">
          <p>Нет доступных идей для голосования</p>
        </div>
      )}
    </div>
  );
}

export default App;
