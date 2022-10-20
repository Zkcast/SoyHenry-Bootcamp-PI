const { Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Activity model', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

    beforeEach(() => Activity.sync({ force: true }));
    describe('Validators:', () => {

      it('should throw an error if name is null', (done) => {
        Activity.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('it should work if name is a string', (done) => {
        Activity.create({
          name: 'Trekking',
          difficulty: 5
        })
          .then(() => done())
          .catch((error) => done(new Error('It requires a string')));
      });

      it('it should throw error if name is a number', (done) => {
        Activity.create({
          name: 34,
          difficulty: 2
        })
          .then(() => done(new Error('It requires a string')))
          .catch(() => done());
      });

      it('It should throw error when required fields are missing. (name, difficulty)', (done) => {
        Activity.create({
          name: 'Test',
        })
          .then(() => done(new Error('Required fields are missing.')))
          .catch(() => done())
      })
      

      it('It should work when required fields are fully filled. (name, difficulty)', (done) => {
        Activity.create({
          name: 'Test',
          difficulty: 1
        })
          .then(() => done())
          .catch(() => done(new Error('Required fields are missing.')))
      })

    });
});
