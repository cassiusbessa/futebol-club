import { Router } from 'express';
import { leaderBoardController } from '../factories';

const leadBoardRouter = Router();
leadBoardRouter.get('/', leaderBoardController.getBothTable);
leadBoardRouter.get('/home', leaderBoardController.getHomeTable);
leadBoardRouter.get('/away', leaderBoardController.getAwayTable);

export default leadBoardRouter;
