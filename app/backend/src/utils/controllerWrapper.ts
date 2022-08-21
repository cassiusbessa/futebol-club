import { NextFunction, Request, Response } from 'express';

export default (callBack: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await callBack(req, res, next);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
