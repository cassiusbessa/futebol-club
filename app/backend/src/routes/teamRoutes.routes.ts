import { Router } from 'express';
import { teamController } from '../factories';

const teamRouter = Router();
teamRouter.get('/', teamController.getAll);
teamRouter.get('/:id', teamController.getById);

export default teamRouter;
