import { ErrorHandler, httpStatusCodes } from '../../utils';
import { TeamRepository } from '../../database/models/repository';
import { IPersistanceService } from '../IPersistenceService';
import { ITeams } from '../../database/models/entitites/ITeams';
// import Teams from '../../database/models/teams';

export default class TeamService implements IPersistanceService<ITeams> {
  constructor(
    private _teamRepository: TeamRepository,
  ) {}

  public async getAll(): Promise<ITeams[] | []> {
    return this._teamRepository.getAll();
  }

  public async getById(id: number): Promise<ITeams | null> {
    const team = await this._teamRepository.getById(id);
    if (!team) throw new ErrorHandler('Team not found', httpStatusCodes.notFound);
    return team;
  }
}
