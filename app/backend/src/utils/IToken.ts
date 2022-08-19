import { ITokenPayload } from '../database/models/entitites/IUser';

export default interface IToken {
  generate(tokenPayload: ITokenPayload): string;
  verify?(token: string): ITokenPayload;
}
