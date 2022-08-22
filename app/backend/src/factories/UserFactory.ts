import { UserController } from '../controllers';
import UserService from '../services/userService/UserService';
import UserServiceValidation from '../services/userService/UserServiceValidation';
import UserRepository from '../database/models/repository/UserRepository';
import Jwt from '../utils/jwt';

export default class UserFactory {
  public static create() {
    const service = new UserService(new UserRepository(), new UserServiceValidation(), new Jwt());
    const controller = new UserController(service);
    return controller;
  }
}
