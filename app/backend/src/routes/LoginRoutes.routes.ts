import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserServiceFactory from '../services/userService';
import TokenValidation from '../middleware';
import { Jwt } from '../utils';

const loginRouter = Router();
const userService = UserServiceFactory.create();
const userController = new UserController(userService);
const tokenValidation = new TokenValidation(new Jwt());

loginRouter.post('/', userController.login);
loginRouter.get('/validate', tokenValidation.validateToken, userController.getRole);

export default loginRouter;
