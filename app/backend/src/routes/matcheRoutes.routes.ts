import { Router } from 'express';
import { matcheController, tokenMiddleware } from '../factories';

const matcheRouter = Router();
matcheRouter.get('/', matcheController.getAll);
matcheRouter.post('/', tokenMiddleware.validateToken, matcheController.create);
matcheRouter.get('/:id', matcheController.getById);
matcheRouter.patch('/:id', matcheController.update);
matcheRouter.patch('/:id/finish', matcheController.finished);

export default matcheRouter;
