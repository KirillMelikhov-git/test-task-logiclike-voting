import { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  onVote: (ideaId: number) => void;
  isVoting: boolean;
  canVote: boolean;
}

function IdeaCard({ idea, onVote, isVoting, canVote }: IdeaCardProps) {
  const getButtonText = () => {
    if (isVoting) return 'Голосуем...';
    if (idea.hasVoted) return '✓ Вы проголосовали';
    return 'Проголосовать';
  };

  const getButtonClass = () => {
    if (isVoting) return 'vote-button voting';
    if (idea.hasVoted) return 'vote-button has-voted';
    return 'vote-button can-vote';
  };

  const handleClick = () => {
    if (!idea.hasVoted && !isVoting && canVote) {
      onVote(idea.id);
    }
  };

  return (
    <div className="idea-card">
      <div className="idea-header">
        <h3 className="idea-title">{idea.title}</h3>
        <div className="votes-badge">
          ❤️ {idea.votesCount}
        </div>
      </div>
      <p className="idea-description">{idea.description}</p>
      <button
        className={getButtonClass()}
        onClick={handleClick}
        disabled={idea.hasVoted || isVoting || !canVote}
      >
        {getButtonText()}
      </button>
    </div>
  );
}

export default IdeaCard;
