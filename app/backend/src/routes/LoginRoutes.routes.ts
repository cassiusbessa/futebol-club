import { Router } from 'express';
import UserServiceFactory from '../factories/UserFactory';
import TokenValidation from '../middleware';
import { Jwt } from '../utils';

const userController = UserServiceFactory.create();
const tokenValidationMid = new TokenValidation(new Jwt());

const loginRouter = Router();
loginRouter.post('/', userController.login);
loginRouter.get('/validate', tokenValidationMid.validateToken, userController.getRole);

export default loginRouter;
