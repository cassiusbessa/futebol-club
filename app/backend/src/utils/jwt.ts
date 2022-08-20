import { sign, SignOptions, verify } from 'jsonwebtoken';
import { ITokenPayload } from '../database/models/entitites/IUser';
import IToken from './IToken';

const SECRET = process.env.JWT_SECRET || 'akldhkjladadhjksvdhj';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
class Jwt implements IToken {
  private _jwtConfig: SignOptions;
  constructor(jwtConfig?: SignOptions) {
    this._jwtConfig = jwtConfig || jwtDefaultConfig;
  }

  public generate(payload: ITokenPayload) {
    return sign(payload, SECRET, this._jwtConfig);
  }

  public verify(token: string) {
    console.log(this);
    const user = verify(token, SECRET);
    return user as ITokenPayload;
  }
}

export default Jwt;
