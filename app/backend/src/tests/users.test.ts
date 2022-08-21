import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import { app } from '../../src/app';
import modelsUser from '../database/models/users';
import { IUser, ILogin, ITokenPayload } from '../database/models/entitites/IUser';
import { Jwt, encryptPassword, httpStatusCodes, IToken, ErrorHandler } from '../utils/'

chai.use(chaiHttp)

class SequelizeErrorMock extends Error {
  name = 'SequelizeConnectionRefusedError'
}

const userMock: IUser = {
  id: 1,
  email: 'any-email',
  password: 'any-hash',
  username: 'any-username',
  role: 'any-role',
}


const loginMock: ILogin = {
  email: 'any-email',
  password: 'any-hash',
}

// const createUserBodyMock = { 
//   email: 'any-email', 
//   password: 'any-password', 
//   name: 'any-name', 
//   phone: 'any-phone'
// }

describe('Login', () => {
  describe('If the password or email has not been provided at login', () => {
    beforeEach(() => {
      Sinon.stub(modelsUser, "findOne").resolves(null);
    })

    afterEach(() => {
      Sinon.restore();
    })

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .post('/login')

      expect(response.status).to.equal(200);
    })

    it('should return users', async () => {
      const response = await chai.request(app)
        .get('/users')
      
      const [user] = response.body as IUser[];

      expect(user.name).to.equal(userMock.name)
      expect(user.email).to.equal(userMock.email)
      expect(user.passwordHash).to.equal(userMock.passwordHash)
      expect(user.id).to.equal(userMock.id)
      expect(user.phone).to.equal(userMock.phone)
      expect(user.createdAt).to.equal(userMock.createdAt.toISOString())
      expect(user.updatedAt).to.equal(userMock.updatedAt.toISOString())
    })
  })

  describe('Create', () => { 
    beforeEach(() => {
      Sinon.stub(JwtService, "sign").returns(createUserResponseMock.token)
      // Caso o metodo sign não fosse estático
      // Sinon.stub(JwtService.prototype, "sign").returns(createUserResponseMock.token)
      Sinon.stub(User, "create").resolves(userMock as User)
      Sinon.stub(passwordService, "encryptPassword").returns("any-hash");
    })

    afterEach(() => {
      Sinon.restore();
    })

    it('should return status 201', async  () => {
      const response = await chai.request(app)
        .post('/users')
        .send(createUserBodyMock)
      
      expect(response.status).to.equal(201);
    })

    it('should return created user', async  () => {
      const response = await chai.request(app)
        .post('/users')
        .send(createUserBodyMock)
      
      const user: CreateUserResponse = response.body;

      expect(user.name).to.equal(createUserResponseMock.name)
      expect(user.email).to.equal(createUserResponseMock.email)
      expect(user.id).to.equal(createUserResponseMock.id)
      expect(user.token).to.equal(createUserResponseMock.token)
    })

    it('should call encrypt password with request body password', async () => {
      await chai.request(app)
        .post('/users')
        .send(createUserBodyMock)
      
      const stub = passwordService.encryptPassword as Sinon.SinonStub

      expect(stub.calledWith(createUserBodyMock.password)).to.be.true;
    })
  })

  describe('Given model throws Error', () => {
    it('should return 503', async () => {
      Sinon.stub(User, "create").callsFake(() => {
        throw new SequelizeErrorMock();
      })

      const response = await chai.request(app)
        .post('/users')
        .send(createUserBodyMock)
      
      expect(response.status).to.equal(503)
      Sinon.restore()
    })
  })

  describe('Given model throws Error', () => {
    it('should return 500', async () => {
      Sinon.stub(User, "create").callsFake(() => {
        throw new Error();
      })

      const response = await chai.request(app)
        .post('/users')
        .send(createUserBodyMock)
      
      expect(response.status).to.equal(500)
      Sinon.restore();
    })
  })
})