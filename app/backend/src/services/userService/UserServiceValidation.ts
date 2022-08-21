import { ILogin } from '../../database/models/entitites/IUser';
import Users from '../../database/models/users';
import { encryptPassword, ErrorHandler, httpStatusCodes } from '../../utils';

export default class UserServiceValidation {
  public loginValidationField = (login: ILogin): void => {
    if (!login.email || !login.password) {
      throw new ErrorHandler('All fields must be filled', httpStatusCodes.badRequest);
    }
  };

  public loginValidationUser = async (login: ILogin, user: Users | null): Promise<Users> => {
    if (!user) {
      throw new ErrorHandler('Incorrect email or password', httpStatusCodes.unauthorized);
    }
    const isPasswordValid = await encryptPassword.comparePassword(login.password, user.password);
    if (!isPasswordValid) {
      throw new ErrorHandler('Incorrect email or password', httpStatusCodes.unauthorized);
    }
    return user;
  };
}
