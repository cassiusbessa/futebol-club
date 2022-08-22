import { sign, SignOptions, verify } from 'jsonwebtoken';
import { ITokenPayload } from '../database/models/entitites/IUser';
import ITokenService from '../interfaces/ITokenService';

const SECRET = process.env.JWT_SECRET || 'akldhkjladadhjksvdhj';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
class Jwt implements ITokenService {
  private _jwtConfig: SignOptions;
  constructor(jwtConfig?: SignOptions) {
    this._jwtConfig = jwtConfig || jwtDefaultConfig;
  }

  public generate(payload: ITokenPayload) {
    console.log('>>>>>', payload);
    return sign(payload, SECRET, this._jwtConfig);
  }

  public verifyToken = (token: string) => {
    const user = verify(token, SECRET);
    return user as ITokenPayload;
  };
}

export default Jwt;
