import IToken from '../../utils/IToken';
import { IUserService } from '../IPersistenceService';
import UserRepository from '../../database/models/repository/UserRepository';
import UserServiceValidation from './UserServiceValidation';
import { ILogin, ITokenPayload, IUser } from '../../database/models/entitites/IUser';

export default class UserService implements IUserService<IUser> {
  private _userRepository: UserRepository;
  private _userValidation: UserServiceValidation;
  private _tokenService: IToken;

  constructor(
    userRepository: UserRepository,
    userValidation: UserServiceValidation,
    tokenService: IToken,
  ) {
    this._userRepository = userRepository;
    this._userValidation = userValidation;
    this._tokenService = tokenService;
  }

  public async login(login: ILogin): Promise<string> {
    this._userValidation.loginValidationField(login);
    const user = await this._userRepository.getByEmail(login.email);
    const payload = await this._userValidation.loginValidationUser(login, user);
    const tokenPayload: ITokenPayload = { id: payload.id,
      username: payload.username,
      role: payload.role,
      email: payload.email,
    };
    const token = this._tokenService.generate(tokenPayload);
    return token;
  }

  public getRole = async (user: ITokenPayload): Promise<string> => user.role;
}
