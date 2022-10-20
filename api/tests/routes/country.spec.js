/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Testing',
  nameSpanish: 'Testing',
  flag: "The server has not found a flag for this country",
  id: "TEST",
  continent: 'Test Land',
  capital: "Capital not found",
  subregion: "Subregion not found",
  area: 0,
  population: 0,
  maps: '',
};

describe('Country routes', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Country.sync({ force: true })

  .then(() => Country.create(country)));

  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });

  describe('GET /whatever', () => {
    it('should get 404', () =>
      agent.get('/whatever').expect(404)
    );
  });
  
  describe('GET /countries/TEST', () => {
    it('should get 200', () =>
      agent.get('/countries/TEST').expect(200)
    );
  });

  describe('GET /countries/NoExistingCountry', () => {
    it('should get 404', () =>
      agent.get('/countries/NoExistingCountry').expect(404)
    );
  });

});
