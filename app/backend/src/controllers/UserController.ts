import { Request, Response } from 'express';
// import { ITokenPayload } from '../database/models/entitites/IUser';
// import { ITokenHeader } from './ITokenHeader';

import { ErrorHandler } from '../utils';
import User from '../database/models/users';
import { IUserService } from '../services/IPersistenceService';

export default class UserController {
  _persistanceService: IUserService<User>;

  constructor(persistanceService: IUserService<User>) {
    this._persistanceService = persistanceService;
  }

  login = async (req: Request, res: Response) => {
    try {
      const token = await this._persistanceService.login(req.body);
      console.log('token', token);
      return res.status(200).json({ token });
    } catch (e) {
      const error = e as ErrorHandler;
      return res.status(error.statusCode).json({ message: error.message });
    }
  };

  getRole = async (req: Request, res: Response) => {
    const { user } = req.body;
    const role = await this._persistanceService.getRole(user);
    return res.status(200).json({ role });
  };
}
