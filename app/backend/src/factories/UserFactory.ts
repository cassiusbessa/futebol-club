import { UserController } from '../controllers';
import { UserService } from '../services';
import UserServiceValidation from '../services/userService/UserServiceValidation';
import { UserRepository } from '../database/models/repository';
import Jwt from '../utils/jwt';

class UserFactory {
  public static create() {
    const service = new UserService(new UserRepository(), new UserServiceValidation(), new Jwt());
    const controller = new UserController(service);
    return controller;
  }
}

export default UserFactory.create();
