import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserRepository from '../database/models/repository/UserRepository';
import UserService from '../services/userService/UserService';
import UserServiceValidation from '../services/userService/UserServiceValidation';
import Jwt from '../utils/jwt';

const usersRouter = Router();
const userRepository = new UserRepository();
const userServiceValidation = new UserServiceValidation();
const jwtService = new Jwt();
const userService = new UserService(userRepository, userServiceValidation, jwtService);
const controller = new UserController('bugadooooo');
console.log('log de service e controller', userService, controller);

usersRouter.post('/login', controller.loginController.bind(controller));
// usersRouter.post('/login', (req, res) => res.status(200).json({ message: 'login' }));

export default usersRouter;
