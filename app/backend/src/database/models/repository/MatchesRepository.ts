import Matches from '../matches';
import Teams from '../teams';
import { IMatches, IShowMatches } from '../entitites/IMatches';

export default class MatchesRepository {
  private _Matches = Matches;
  public async getAll(): Promise<IShowMatches[] | []> {
    const allMatches = await this._Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },

      ],
    });
    return allMatches as IShowMatches[] | [];
  }

  public async create(match: IMatches): Promise<IMatches> {
    const newMatch = this._Matches.build(match);
    newMatch.inProgress = true;
    await newMatch.save();
    return newMatch;
  }
}
