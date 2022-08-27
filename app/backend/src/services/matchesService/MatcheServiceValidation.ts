import { TeamRepository } from '../../database/models/repository';
import { IMatches } from '../../database/models/entitites/IMatches';
import { ErrorHandler, httpStatusCodes } from '../../utils';
import TeamService from '../teamService';

export default class MatcheServiceValidation {
  public differentTeams = (createField: IMatches): void => {
    if (createField.homeTeam === createField.awayTeam) {
      throw new ErrorHandler(
        'It is not possible to create a match with two equal teams',
        httpStatusCodes.unauthorized,
      );
    }
  };

  public checkTeams = async (createField: IMatches): Promise<void> => {
    const helperTeamService = new TeamService(new TeamRepository());
    const allTeams = await helperTeamService.getAll();
    const homeTeam = allTeams.find((team) => team.id === createField.homeTeam);
    const awayTeam = allTeams.find((team) => team.id === createField.awayTeam);
    if (!homeTeam || !awayTeam) {
      throw new ErrorHandler(
        'There is no team with such id!',
        httpStatusCodes.notFound,
      );
    }
  };
}
