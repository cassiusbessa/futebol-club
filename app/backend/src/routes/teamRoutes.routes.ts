import { Router } from 'express';
import { TeamFactory } from '../factories';

const teamController = TeamFactory.create();

const teamRouter = Router();
teamRouter.get('/', teamController.getAll);
teamRouter.get('/:id', teamController.getById);

export default teamRouter;
