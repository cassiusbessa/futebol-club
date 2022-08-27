import { TeamsController } from '../controllers';
import { TeamService } from '../services';
import { TeamRepository } from '../database/models/repository';

class TeamFactory {
  public static create() {
    const service = new TeamService(new TeamRepository());
    const controller = new TeamsController(service);
    return controller;
  }
}

export default TeamFactory.create();
