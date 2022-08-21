import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserServiceFactory from '../services/userService';
import TokenValidation from '../middleware';
import { Jwt } from '../utils';

const userService = UserServiceFactory.create();
const userController = new UserController(userService);
const tokenValidation = new TokenValidation(new Jwt());

const loginRouter = Router();
loginRouter.post('/', userController.login);
loginRouter.get('/validate', tokenValidation.validateToken, userController.getRole);

export default loginRouter;
