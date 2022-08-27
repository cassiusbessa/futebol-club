import { Router } from 'express';
import { userController, tokenMiddleware } from '../factories';

const loginRouter = Router();
loginRouter.post('/', userController.login);
loginRouter.get('/validate', tokenMiddleware.validateToken, userController.getRole);

export default loginRouter;
