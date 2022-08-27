import { LeaderBoardController } from '../controllers';
import { LeaderBoard } from '../services';
import { MatcheRepository, TeamRepository } from '../database/models/repository';

class LeaderBoardFactory {
  public static create() {
    const service = new LeaderBoard(new TeamRepository(), new MatcheRepository());
    const controller = new LeaderBoardController(service);
    return controller;
  }
}

export default LeaderBoardFactory.create();
