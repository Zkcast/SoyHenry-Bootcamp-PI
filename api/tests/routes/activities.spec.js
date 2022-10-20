/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Activity, conn } = require('../../src/db.js');

const agent = session(app);
const activity = {
  name: 'Testisg',
  difficulty: 1,
  duration: "02:03:05",
  season: 'summer',
};

describe('Activities routes', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Activity.sync({ force: true })

  .then(() => Activity.create(activity)));

  describe('GET /activities', () => {
    it('should get 200', () =>
      agent.get('/activities').expect(200)
    );
  });

  describe('GET /whatever', () => {
    it('should get 404', () =>
      agent.get('/whatever').expect(404)
    );
  });
  
  describe('GET /activities/TEST', () => {
    it('should get 400 when ID is a string', () =>
      agent.get('/activities/TEST').expect(400)
    );
  });

  describe('GET /activities/1', () => {
    it('should get 200 if its a valid ID', () =>
      agent.get('/activities/1').expect(200)
    );
  });

});
