import { Request, Response } from 'express';
import { controllerWrapper } from '../utils';
import User from '../database/models/users';
import { IUserService } from '../services/IPersistenceService';

export default class UserController {
  constructor(private _persistanceService: IUserService<User>) {}

  login = controllerWrapper(async (req: Request, res: Response) => {
    const token = await this._persistanceService.login(req.body);
    return res.status(200).json({ token });
  });

  getRole = controllerWrapper(async (req: Request, res: Response) => {
    const role = await this._persistanceService.getRole(req.body.user);
    return res.status(200).json({ role });
  });
}
