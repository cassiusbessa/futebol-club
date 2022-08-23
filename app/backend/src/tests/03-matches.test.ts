import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { httpStatusCodes } from '../utils'
import  IMatches  from '../database/models/entitites/IMatches';
import matchesMock from './mocks/matchesMock';
import {MatcheRepository} from '../database/models/repository/';

// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

describe('02- /Matches', () => {  
  describe('If is successful', () => {
    beforeEach(() => {
      sinon.stub(MatcheRepository.prototype, "getAll").resolves(matchesMock as IMatches[]);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches');  
      expect(response.status).to.equal(httpStatusCodes.ok);
      expect(response.body).to.deep.equal(matchesMock);
    });
  });
});

// describe('02- /Teams/:ID', () => {  
//   describe('If no team is found', () => {
//     beforeEach(() => {
//       sinon.stub(TeamRepository.prototype, "getById").resolves(null);
//     });
//     afterEach(() => {
//       sinon.restore();
//     });
//     it('should return status 404', async () => {
//       const response = await chai.request(app)
//         .get('/teams/notfoundId');  
//       expect(response.status).to.equal(httpStatusCodes.notFound);
//       expect(response.body.message).to.equal('Team not found');
//     });
//   });

//   describe('If is successful', () => {
//     beforeEach(() => {
//       sinon.stub(TeamRepository.prototype, "getById").resolves(teamsMock[0] as Teams);;
//     });
//     afterEach(() => {
//       sinon.restore();
//     });
//     it('should return status 200', async () => {
//       const response = await chai.request(app)
//         .get('/teams/7');  
//       expect(response.status).to.equal(httpStatusCodes.ok);
//       expect(response.body).to.deep.equal(teamsMock[0]);
//     });
//   });
// });



