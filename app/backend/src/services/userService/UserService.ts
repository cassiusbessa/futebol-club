import IToken from '../../utils/IToken';
import { IPersistanceService } from '../IPersistenceService';
import UserRepository from '../../database/models/repository/UserRepository';
import UserServiceValidation from './UserServiceValidation';
import { ILogin, ITokenPayload, IUser } from '../../database/models/entitites/IUser';

export default class UserService implements IPersistanceService<IUser> {
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
    console.log('service login');
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
}
