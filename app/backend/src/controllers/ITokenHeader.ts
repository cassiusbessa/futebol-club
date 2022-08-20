import { Request } from 'express';

export interface ITokenHeader extends Request {
  token: string;
}
