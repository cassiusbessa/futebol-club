import { Request, Response } from 'express';
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

  validateToken = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    try {
      const role = await this._persistanceService.validateToken(authorization as string);
      return res.status(200).json({ role });
    } catch (e) {
      const error = e as ErrorHandler;
      console.log('error', error);
      return res.status(error.statusCode).json({ message: error.message });
    }
  };
}
