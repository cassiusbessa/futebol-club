import { NextFunction, Request, Response } from 'express';
import { ITokenPayload } from '../database/models/entitites/IUser';
import { IToken, httpStatusCodes, ErrorHandler } from '../utils';

export default class TokenValidation {
  private _tokenService: IToken;
  constructor(tokenService: IToken) {
    this._tokenService = tokenService;
  }

  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(httpStatusCodes.unauthorized).json({ message: 'No token provided' });
    }
    try {
      const user = this._tokenService.verify(authorization);
      req.body.user = user as ITokenPayload;
      next();
    } catch (e) {
      const error = new ErrorHandler('Invalid or Expired token', httpStatusCodes.unauthorized);
      return res.status(error.statusCode).json({ message: error.message });
    }
  };
}
