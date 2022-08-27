import { MatcheRepository, TeamRepository } from '../../database/models/repository';
import { IShowMatches } from '../../database/models/entitites/IMatches';
import ITeamsResults from '../../interfaces/ITeamsResults';
import baseResult from './baseResult';

type golsLocal = 'homeTeamGoals' | 'awayTeamGoals';
type local = 'teamHome' | 'teamAway';

export default class LeaderBoard {
  public _leaderBoard: ITeamsResults[] = [];

  constructor(
    private _teamsRepository: TeamRepository,
    private _matchesRepository: MatcheRepository,

  ) {}

  private _baseStatistics = async (): Promise<void> => {
    const teams = await this._teamsRepository.getAll();
    const base = teams.map((t) => ({ ...baseResult, name: t.teamName }));
    this._leaderBoard = base;
  };

  public playMatch = (match: IShowMatches, local: local, golsLocal: golsLocal): void => {
    const rival = golsLocal === 'homeTeamGoals' ? 'awayTeamGoals' : 'homeTeamGoals';
    const team = this._leaderBoard.find((t) => t.name === match[local].teamName) as ITeamsResults;
    team.totalGames += 1;
    team.totalVictories = this._result(match, golsLocal) === 'winner'
      ? team.totalVictories += 1 : team.totalVictories;
    team.totalDraws = this._result(match, golsLocal) === 'draw'
      ? team.totalDraws += 1 : team.totalDraws;
    team.totalLosses = this._result(match, golsLocal) === 'loser'
      ? team.totalLosses += 1 : team.totalLosses;
    team.goalsFavor += match[golsLocal];
    team.goalsOwn += match[rival];
    team.totalPoints = team.totalVictories * 3 + team.totalDraws;
    team.goalsBalance = team.goalsFavor - team.goalsOwn;
    team.efficiency = this._calculateEfficiency(team.totalPoints, team.totalGames);
  };

  private _result = (match: IShowMatches, golsLocal: golsLocal) => {
    const rival = golsLocal === 'homeTeamGoals' ? 'awayTeamGoals' : 'homeTeamGoals';
    const result = match[golsLocal] - match[rival];
    if (result === 0) return 'draw';
    if (result > 0) return 'winner';
    return 'loser';
  };

  private _calculateEfficiency = (p: number, g: number): string => ((p / (g * 3)) * 100).toFixed(2);

  private _leaderLocalType = (local: 'home' | 'away' | 'both', match: IShowMatches) => {
    if (local === 'home') this.playMatch(match, 'teamHome', 'homeTeamGoals');
    if (local === 'away') this.playMatch(match, 'teamAway', 'awayTeamGoals');
    if (local === 'both') {
      this.playMatch(match, 'teamHome', 'homeTeamGoals');
      this.playMatch(match, 'teamAway', 'awayTeamGoals');
    }
  };

  public getLeaderBoard = async (local: 'home' | 'away' | 'both'): Promise<ITeamsResults[]> => {
    await this._baseStatistics();
    const matches = await this._matchesRepository.getAll({ inProgress: false });
    matches.forEach((match) => {
      this._leaderLocalType(local, match);
    });
    const table = this._sortLeaderBoard(this._leaderBoard);
    this._leaderBoard = [];
    return table;
  };

  private _sortLeaderBoard = (leaderBoard:ITeamsResults[]): ITeamsResults[] => leaderBoard
    .sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      return 0;
    });
}
