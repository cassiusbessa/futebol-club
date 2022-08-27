import { NextFunction, Request, Response } from 'express';
import { ITokenPayload } from '../database/models/entitites/IUser';
import ITokenService from '../interfaces/ITokenService';
import { httpStatusCodes, ErrorHandler } from '../utils';

export default class TokenValidation {
  constructor(private _tokenService: ITokenService) {}

  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(httpStatusCodes.unauthorized).json({ message: 'No token provided' });
    }
    try {
      const user = this._tokenService.verifyToken(authorization);
      req.body.user = user as ITokenPayload;
      next();
    } catch (e) {
      console.log(e);
      const error = new ErrorHandler('Token must be a valid token', httpStatusCodes.unauthorized);
      return res.status(error.statusCode).json({ message: error.message });
    }
  };
}
