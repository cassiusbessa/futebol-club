import ITeamsResults from '../../interfaces/ITeamsResults';

const baseResult: ITeamsResults = {
  name: '',
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  totalPoints: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0',
};

export default baseResult;
