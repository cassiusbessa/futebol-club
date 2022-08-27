import { IMatches, IShowMatches, IEditMatch } from '../../database/models/entitites/IMatches';
import { MatcheRepository } from '../../database/models/repository';
import { IMatcheService } from '../IPersistenceService';
import MatcheServiceValidation from './MatcheServiceValidation';

export default class MatcheService implements IMatcheService<IMatches> {
  constructor(
    private _matchRepository: MatcheRepository,
    private _matchValidation: MatcheServiceValidation,
  ) {}

  public async getAll(): Promise<IShowMatches[] | []> {
    return this._matchRepository.getAll();
  }

  public async create(match: IMatches): Promise<IMatches> {
    this._matchValidation.differentTeams(match);
    await this._matchValidation.checkTeams(match);
    return this._matchRepository.create(match);
  }

  public async getById(id: number): Promise<IMatches | null> {
    return this._matchRepository.getById(id);
  }

  public update = async (id: number, modified: IEditMatch): Promise<IMatches> =>
    this._matchRepository.update(id, modified);

  public filterByLocalMatch = (
    local: 'homeTeam' | 'awayTeam',
    team: number,
    matches: IShowMatches[],
  ): IShowMatches[] => matches.filter((m) => m[local] === team);
}
