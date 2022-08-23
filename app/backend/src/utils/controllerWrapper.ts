import { NextFunction, Request, Response } from 'express';

export default (callback: (req: Request, res: Response) => Promise<Response>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res);
    } catch (e) {
      next(e);
    }
  };
