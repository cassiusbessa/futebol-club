// import Matches from '../matches';

export interface IMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IShowMatches extends IMatches{
  teamHome: {
    teamName: string;
  }
  teamAway: {
    teamName: string;
  }
}
