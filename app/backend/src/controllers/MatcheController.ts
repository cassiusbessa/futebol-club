import { Request, Response } from 'express';
import { controllerWrapper } from '../utils';
import { IMatcheService } from '../services/IPersistenceService';
import { IMatches } from '../database/models/entitites/IMatches';

export default class MatcheController {
  constructor(private _persistanceService: IMatcheService<IMatches>) {}

  getAll = controllerWrapper(async (_req: Request, res: Response) => {
    const allMatches = await this._persistanceService.getAll();
    return res.status(200).json(allMatches);
  });

  create = controllerWrapper(async (req: Request, res: Response) => {
    const match = await this._persistanceService.create(req.body);
    return res.status(201).json(match);
  });

  getById = controllerWrapper(async (req: Request, res: Response) => {
    const match = await this._persistanceService.getById(Number(req.params.id));
    return res.status(200).json(match);
  });

  update = controllerWrapper(async (req: Request, res: Response) => {
    console.log(req.body);
    const match = await this._persistanceService.update(Number(req.params.id), req.body);
    return res.status(200).json(match);
  });

  finished = controllerWrapper(async (req: Request, res: Response) => {
    await this._persistanceService.update(Number(req.params.id), { inProgress: false });
    return res.status(200).json({ message: 'Finished' });
  });
}
