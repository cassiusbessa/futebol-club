export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin {
  id: number;
  username: string;
  role: string;
}

export interface ITokenPayload {
  id: number;
  username: string;
  role: string;
  email: string;
  // omit quando chamar a classe
}
