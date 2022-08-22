import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import { Jwt, httpStatusCodes, encryptPassword } from '../utils/'
import Users from '../database/models/users';
import { incompletedLoginMock, wrongFieldsLoginMock, correctLoginMock, tokenPayload, userMock } from './mocks/userMocks';
import UserRepository from '../database/models/repository/UserRepository';

// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const jwtTest = new Jwt();

class SequelizeErrorMock extends Error {
  name = 'SequelizeConnectionRefusedError'
}





// const createUserBodyMock = { 
//   email: 'any-email', 
//   password: 'any-password', 
//   name: 'any-name', 
//   phone: 'any-phone'
// }

describe('Login', () => {
  describe('If the password or email has not been provided at login', () => {
    it('should return status 400', async () => {
      const response = await chai.request(app)
        .post('/login').send(incompletedLoginMock);

      expect(response.status).to.equal(httpStatusCodes.badRequest);
      expect(response.body.message).to.equal('All fields must be filled');
    });
  })
  describe('If there is no registered user with the email provided', () => {
    beforeEach(() => {
      sinon.stub(UserRepository.prototype, "getByEmail").resolves(null);
    });

    afterEach(() => {
      sinon.restore();
    });
    it('should return status 401', async () => {
      const response = await chai.request(app)
        .post('/login').send(wrongFieldsLoginMock);

      expect(response.status).to.equal(httpStatusCodes.unauthorized);
      expect(response.body.message).to.equal('Incorrect email or password');
    });
  });

  describe('If the password is incorrect', () => {
    beforeEach(() => {
      sinon.stub(UserRepository.prototype, "getByEmail").resolves(userMock as Users);
      sinon.stub(encryptPassword, "comparePassword").resolves(false);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return status 401', async () => {
      const response = await chai.request(app)
        .post('/login').send(wrongFieldsLoginMock);
        
      expect(response.status).to.equal(httpStatusCodes.unauthorized);
      expect(response.body.message).to.equal('Incorrect email or password');
    });
  });

  describe('If the password an email is correct', () => {
    beforeEach(() => {
      sinon.stub(UserRepository.prototype, "getByEmail").resolves(userMock as Users);
      sinon.stub(encryptPassword, "comparePassword").resolves(true);
      sinon.stub(Jwt.prototype, "generate").resolves('any-token');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return status 200', async () => {
      const response = await chai.request(app)
        .post('/login').send(correctLoginMock);
        
      expect(response.status).to.equal(httpStatusCodes.ok);
      expect(response.body.token).to.equal('any-token');
    });
  });
});

describe('Login Validate', () => {
  describe('If the token is invalid', () => {
    // beforeEach(() => {
    //   sinon.stub(Jwt.prototype, "verify").resolves('Invalid token');
    // });

    afterEach(sinon.restore);

    it('return status 401', async () => {
      const defaultToken = jwtTest.generate(tokenPayload)
      const response = await chai.request(app)
        .get('/login/validate').set('Authorization', 'wrong-token');

      expect(response.status).to.equal(httpStatusCodes.unauthorized);
      expect(response.body.message).to.equal('Invalid or Expired token');
    });
  })

  describe('If the token is valid', () => {
    // beforeEach(() => {
    //   sinon.stub(Jwt.prototype, "verify").resolves('Invalid token');
    // });

    afterEach(sinon.restore);

    it('return status 200', async () => {
      const defaultToken = jwtTest.generate(tokenPayload)
      const response = await chai.request(app)
        .get('/login/validate').set('Authorization', defaultToken);

      expect(response.status).to.equal(httpStatusCodes.ok);
      expect(response.body.role).to.equal(tokenPayload.role);
    });
  })
});


