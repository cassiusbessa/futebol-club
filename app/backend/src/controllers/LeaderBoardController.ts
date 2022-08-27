import { Request, Response } from 'express';
import { LeaderBoard } from '../services';
import { controllerWrapper } from '../utils';

export default class LeaderBoardController {
  constructor(private _leaderBoardService: LeaderBoard) {}

  getBothTable = controllerWrapper(async (_req: Request, res: Response) => {
    const allTeams = await this._leaderBoardService.getLeaderBoard('both');
    console.log(this._leaderBoardService._leaderBoard[2]);
    return res.status(200).json(allTeams);
  });

  getHomeTable = controllerWrapper(async (_req: Request, res: Response) => {
    const allTeams = await this._leaderBoardService.getLeaderBoard('home');
    return res.status(200).json(allTeams);
  });

  getAwayTable = controllerWrapper(async (_req: Request, res: Response) => {
    const allTeams = await this._leaderBoardService.getLeaderBoard('away');
    return res.status(200).json(allTeams);
  });
}
