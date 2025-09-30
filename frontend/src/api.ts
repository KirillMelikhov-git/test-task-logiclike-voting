import { Idea, VotesInfo } from './types';

const API_BASE_URL = '/api';

export async function fetchIdeas(): Promise<Idea[]> {
  const response = await fetch(`${API_BASE_URL}/ideas`);
  if (!response.ok) {
    throw new Error('Не удалось загрузить идеи');
  }
  return response.json();
}

export async function voteForIdea(ideaId: number): Promise<Idea> {
  const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Ошибка при голосовании');
  }
  
  return data;
}

export async function fetchVotesInfo(): Promise<VotesInfo> {
  const response = await fetch(`${API_BASE_URL}/ideas/votes/remaining`);
  if (!response.ok) {
    throw new Error('Не удалось загрузить информацию о голосах');
  }
  return response.json();
}
