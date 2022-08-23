import { Request, Response } from 'express';
import { controllerWrapper } from '../utils';
import Matches from '../database/models/matches';
import { IMatcheService } from '../services/IPersistenceService';

export default class MatcheController {
  constructor(private _persistanceService: IMatcheService<Matches>) {}

  getAll = controllerWrapper(async (_req: Request, res: Response) => {
    const allMatches = await this._persistanceService.getAll();
    return res.status(200).json(allMatches);
  });
}
