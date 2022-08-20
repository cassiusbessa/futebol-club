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
    const user = await this._userRepository.getByEmail(login.email);
    const payLoad = await this._userValidation.loginValidation(login, user);
    const tokenPayLoad: ITokenPayload = { id: payLoad.id,
      username: payLoad.username,
      role: payLoad.role,
      email: payLoad.email,
    };
    const token = this._tokenService.generate(tokenPayLoad);
    return token;
  }

  public async validateToken(token: string): Promise<string> {
    const user = this._tokenService.verify(token);
    return user.role;
  }
}
