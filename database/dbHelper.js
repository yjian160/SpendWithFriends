const config = require('../config/dbConfig');
const knex = require('knex')({
  client: 'pg',
  connection: config,
});

var createOrGetCircle = function(circleName) {
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

var createOrGetPerson = function(username) {
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
  .then(data => {
    return knex('person_transaction').insert(participants);
  });
}

var getTransactionsByCircleName = function(circleName) {
  return knex('transaction')
    .innerJoin('circle', 'transaction.circle_id', 'circle.id')
    .innerJoin('person_transaction', 'transaction.id', 'person_transaction.transaction_id')
    .innerJoin('person', 'person.id', 'person_tranaction.person_id')
    .innerJoin('person as payer', 'transaction.payer_id', 'person.id')
    .select().where('circle.name', circleName);
};

var getParticipantsByTransactionId = function(transactionId) {
  return knex('transaction')
    .innerJoin('person_transaction', 'transaction.id', 'person_transaction.transaction_id')
    .innerJoin('person', 'person.id', 'person_tranaction.person_id')
    .select().where('transaction.id', transactionId);
}

module.exports = {
  createOrGetCircle,
  createOrGetPerson,
  createTransaction,
  addPersonToCircle,
  getPersonsByCircle,
  getTransactionsByCircleName,
  getParticipantsByTransactionId,
}