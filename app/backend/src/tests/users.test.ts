import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import { ILogin, IUser } from '../interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock: ILogin = {
  email: 'any-email',
  password: 'any-hash',
};

const tokenMock: string = 'any-token';

class SequelizeErrorMock extends Error {
  name = 'SequelizeConnectionRefusedError'
};

describe('Testa a entidade Users', () => {
 
  it('Testa se ao realizar um login bem sucedido, retorna um token', () => {
    expect(false).to.be.eq(true);
  });
});
