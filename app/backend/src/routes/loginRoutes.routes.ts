import { Router } from 'express';
import { UserFactory } from '../factories';
import TokenValidation from '../middleware';
import { Jwt } from '../utils';

const userController = UserFactory.create();
const tokenValidationMid = new TokenValidation(new Jwt());

const loginRouter = Router();
loginRouter.post('/', userController.login);
loginRouter.get('/validate', tokenValidationMid.validateToken, userController.getRole);

export default loginRouter;
