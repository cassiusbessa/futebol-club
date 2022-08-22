import { IUser, ILogin, ITokenPayload } from '../../database/models/entitites/IUser';
import Users from '../../database/models/users';


const incompletedLoginMock = {
	password: 'any-password',
}


const wrongFieldsLoginMock = {
	email: 'wrong-email',
	password: 'wrong-hash',
}

const correctLoginMock = {
  email: 'any-email',
  password: 'any-hash',
}

const userMock = {
  id: 1,
  email: 'any-email',
  password: 'any-hash',
  username: 'any-username',
  role: 'any-role',
}

const tokenPayload: ITokenPayload = {
  id: 1,
  email: 'any-email',
  username: 'any-username',
  role: 'any-role',
}


export { incompletedLoginMock, wrongFieldsLoginMock, correctLoginMock, tokenPayload, userMock }
