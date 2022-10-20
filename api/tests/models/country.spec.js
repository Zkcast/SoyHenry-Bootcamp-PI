const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

    beforeEach(() => Country.sync({ force: true }));
    describe('Validators:', () => {

      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });

      it('should work when CAPITAL is a string', (done) => {
        Country.create({
          id: 1,
          name: 'Test',
          nameSpanish: 'Test',
          capital: 'Test'
        })
          .then(() => done())
          .catch(() => done(new Error('Capital should be a string.')))
      })

      it('It should throw error when required fields are missing. (id, name, nameSpanish)', (done) => {
        Country.create({
          name: 'Test',
          nameSpanish: 'Test',
        })
          .then(() => done(new Error('Required fields are missing.')))
          .catch(() => done())
      })
      

      it('It should work when all required values are filled (id, name, nameSpanish)', (done) => {
        Country.create({
          id: 30,
          name: 'Test',
          nameSpanish: 'Test',
        })
          .then(() => done())
          .catch(() => done(new Error('Values id, name and nameSpanish are required.')))
      })

    })
})
