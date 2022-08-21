import { Request, Response } from 'express';
// import { ITokenPayload } from '../database/models/entitites/IUser';
// import { ITokenHeader } from './ITokenHeader';

import { controllerWrapper } from '../utils';
import User from '../database/models/users';
import { IUserService } from '../services/IPersistenceService';

export default class UserController {
  _persistanceService: IUserService<User>;

  constructor(persistanceService: IUserService<User>) {
    this._persistanceService = persistanceService;
  }

  login = controllerWrapper(async (req: Request, res: Response) => {
    const token = await this._persistanceService.login(req.body);
    res.status(200).json({ token });
  });

  getRole = controllerWrapper(async (req: Request, res: Response) => {
    const role = await this._persistanceService.getRole(req.body.user);
    res.status(200).json({ role });
  });
}
