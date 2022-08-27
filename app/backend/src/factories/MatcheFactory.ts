import { MatcheController } from '../controllers';
import { MatcheService } from '../services';
import { MatcheRepository } from '../database/models/repository';
import { MatcheServiceValidation } from '../services/matchesService';

class MatcheFactory {
  public static create() {
    const service = new MatcheService(new MatcheRepository(), new MatcheServiceValidation());
    const controller = new MatcheController(service);
    return controller;
  }
}

export default MatcheFactory.create();
