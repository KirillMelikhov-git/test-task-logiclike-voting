import { VotesInfo } from '../types';

interface VotesCounterProps {
  votesInfo: VotesInfo;
}

function VotesCounter({ votesInfo }: VotesCounterProps) {
  const percentage = (votesInfo.used / votesInfo.total) * 100;

  return (
    <div className="votes-info">
      <h2>Ваши голоса</h2>
      <div className="votes-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${percentage}%` }}
          >
            {votesInfo.used > 0 && `${votesInfo.used} / ${votesInfo.total}`}
          </div>
        </div>
        <div className="votes-text">
          {votesInfo.remaining > 0 
            ? `Осталось: ${votesInfo.remaining}` 
            : 'Голоса исчерпаны'}
        </div>
      </div>
    </div>
  );
}

export default VotesCounter;
