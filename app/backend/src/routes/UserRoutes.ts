import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserServiceFactory from '../services/userService';

const loginRouter = Router();
const userService = UserServiceFactory.create();
const controller = new UserController(userService);

loginRouter.post('/', controller.login);
loginRouter.get('/validate', controller.validateToken);

export default loginRouter;
