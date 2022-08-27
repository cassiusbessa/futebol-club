import { NextFunction, Request, Response } from 'express';
import { ErrorHandler, httpStatusCodes } from '../utils';

export default (e: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  console.log(e);
  res.status(e.statusCode || httpStatusCodes.internalServer)
    .json({ message: e.message || 'Internal server error' });
};
