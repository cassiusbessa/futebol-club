import UserService from './UserService';
import UserServiceValidation from './UserServiceValidation';
import UserRepository from '../../database/models/repository/UserRepository';
import Jwt from '../../utils/jwt';

export default class UserServiceFactory {
  public static create() {
    const userRepository = new UserRepository();
    const userServiceValidation = new UserServiceValidation();
    const jwtService = new Jwt();
    const userService = new UserService(userRepository, userServiceValidation, jwtService);
    return userService;
  }
}

export { UserService, UserServiceValidation };
