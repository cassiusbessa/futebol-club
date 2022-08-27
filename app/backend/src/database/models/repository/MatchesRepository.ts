import Matches from '../matches';
import Teams from '../teams';
import { IMatches, IShowMatches, IEditMatch } from '../entitites/IMatches';

export default class MatchesRepository {
  private _Matches = Matches;
  public async getAll(where?: object): Promise<IShowMatches[]> {
    const allMatches = await this._Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { ...where },
    });
    return allMatches as IShowMatches[] | [];
  }

  public async create(matche: IMatches): Promise<IMatches> {
    const newMatch = this._Matches.build(matche);
    newMatch.inProgress = true;
    await newMatch.save();
    return newMatch as IMatches;
  }

  public async getById(id: number): Promise<IMatches | null> {
    return this._Matches.findByPk(id);
  }

  public update = async (id: number, modified: IEditMatch): Promise<IMatches> => {
    const matche = await this._Matches.findByPk(id);
    await matche?.update(modified);
    return matche as IMatches;
  };
}
