import { Request, Response } from 'express';
import { ITeams } from '../database/models/entitites/ITeams';
import { controllerWrapper } from '../utils';
import { IPersistanceService } from '../services/IPersistenceService';

export default class TeamsController {
  constructor(private _persistanceService: IPersistanceService<ITeams>) {}

  getAll = controllerWrapper(async (_req: Request, res: Response) => {
    const allTeams = await this._persistanceService.getAll();
    return res.status(200).json(allTeams);
  });

  getById = controllerWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const allTeams = await this._persistanceService.getById(Number(id));
    return res.status(200).json(allTeams);
  });
}
