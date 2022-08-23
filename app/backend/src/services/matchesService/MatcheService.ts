import { IMatches, IShowMatches } from '../../database/models/entitites/IMatches';
import { MatcheRepository } from '../../database/models/repository';
import { IMatcheService } from '../IPersistenceService';

export default class MatcheService implements IMatcheService<IMatches> {
  constructor(
    private _matchRepository: MatcheRepository,
  ) {}

  public async getAll(): Promise<IShowMatches[] | []> {
    return this._matchRepository.getAll();
  }

  public async create(match: IMatches): Promise<IMatches> {
    return this._matchRepository.create(match);
  }
}
