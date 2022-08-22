import { ITokenPayload } from '../database/models/entitites/IUser';

export default interface ITokenService {
  generate(tokenPayload: ITokenPayload): string;
  verifyToken(token: string): ITokenPayload;
}
