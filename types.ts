
export enum AppState {
  SETUP = 'SETUP',
  VOTING = 'VOTING',
  VOTED = 'VOTED',
  RESULTS = 'RESULTS'
}

export interface Candidate {
  id: string;
  name: string;
  color: string;
  votes: number;
}

export interface ElectionData {
  candidates: Candidate[];
  blankVotes: number;
  totalVotes: number;
}
