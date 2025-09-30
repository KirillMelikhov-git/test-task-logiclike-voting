export interface Idea {
  id: number;
  title: string;
  description: string;
  votesCount: number;
  hasVoted: boolean;
  createdAt: string;
}

export interface VotesInfo {
  used: number;
  remaining: number;
  total: number;
}
