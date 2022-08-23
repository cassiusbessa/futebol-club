import { Router } from 'express';
import { MatcheFactory } from '../factories';

const MatcheController = MatcheFactory.create();

const matcheRouter = Router();
matcheRouter.get('/', MatcheController.getAll);

export default matcheRouter;
