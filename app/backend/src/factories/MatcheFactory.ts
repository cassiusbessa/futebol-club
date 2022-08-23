import { MatcheController } from '../controllers';
import { MatcheService } from '../services';
import { MatcheRepository } from '../database/models/repository';

export default class MatcheFactory {
  public static create() {
    const service = new MatcheService(new MatcheRepository());
    const controller = new MatcheController(service);
    return controller;
  }
}
