import { ILogin } from '../../database/models/entitites/IUser';
import Users from '../../database/models/users';
import encryptPassword from '../../utils/encryptPassword';

export default class UserServiceValidation {
  public async loginValidation(login: ILogin, user: Users | null): Promise<Users> {
    console.log('UserServiceValidation-loginvalidation', this);
    if (!login.email || !login.password) {
      throw new Error('Email and password are required');
    }
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await encryptPassword.comparePassword(login.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Password is not valid');
    }
    return user;
  }
}
