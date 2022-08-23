import { ITeams } from '../entitites/ITeams';
import Teams from '../teams';

export default class TeamRepository {
  private _teams = Teams;
  public async getAll(): Promise<ITeams[] | []> {
    return this._teams.findAll();
  }

  public getById(id: number): Promise<ITeams | null> {
    return this._teams.findByPk(id);
  }
}
