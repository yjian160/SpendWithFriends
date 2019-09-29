const config = require('../config/dbConfig');
const knex = require('knex')({
  client: 'pg',
  connection: config,
});

var joinCircle = function(circleName) {
  return knex('circle').select().where('name', circleName)
    .then((circles) => {
      if (circles.length===0) {
        // no matching records found
        return knex('circle').insert({'name': circleName})
          .then(() => {
            return knex('circle').select().where('name', circleName);
          })
      } else {
          return circles;
      }
    })
}

var createOrAddPerson = function(username) {
  return knex('person').select('id').where('username', username)
    .then((persons) => {
      if (persons.length > 0) {
        return persons[0];
      } else {
        return knex('person').returning('id').insert({username})
          .then(data => {
            return {id: data[0]};
          })
      }
    })
}

var addPersonToCircle = function(username, circleName) {
  return knex('person').select('id').where('username', username)
    .then(persons => {
      var personId = persons[0].id;

      return knex('circle').select('id').where('name', circleName)
        .then(circles => {
          var circleId = circles[0].id;

          return knex('person_circle').insert({person_id: personId, circle_id: circleId});
        })
    })
}

var getPersonsByCircle = function(circleName) {
  return knex('person').innerJoin('person_circle', 'person.id', 'person_circle.person_id')
    .innerJoin('circle', 'circle.id', 'person_circle.circle_id').select().where('circle.name', circleName)
}

var createTransaction = function(transaction, participants) {
  return knex('transaction').insert(transaction)
    .returning('id');
}

var getTransactionsByCircleId = function(circleId) {
  knex()
};

module.exports = {
  joinCircle,
  createOrAddPerson,
  addPersonToCircle,
  getPersonsByCircle,
}