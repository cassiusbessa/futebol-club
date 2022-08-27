import TokenValidation from '../middleware';
import { Jwt } from '../utils';

class TokenValidationFactory {
  public static create(): TokenValidation {
    return new TokenValidation(new Jwt());
  }
}

export default TokenValidationFactory.create();
