import { Router } from 'express';
import errorMiddleware from '../middleware/errorMiddleware';
import loginRouter from './loginRoutes.routes';
import teamRouter from './teamRoutes.routes';
import leaderBoardRouter from './leaderBoardRoutes.routes';
import matcheRouter from './matcheRoutes.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matcheRouter);
router.use('/leaderboard', leaderBoardRouter);
router.use(errorMiddleware);

export default router;
