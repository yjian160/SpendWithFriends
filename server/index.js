const express = require('express');
const app = express();
const port = 3000;
const db = require('../database/dbHelper')

app.use(express.json());

app.post('/joinCircle', (req, res) => {
  var newCircle = req.body;
  db.createOrGetCircle(newCircle.name)
    .then(data => {
      console.log("CreateCircle", data);
      res.send(data);
    });
})

app.get('/getPersonsByCircle', (req, res) => {
  var circleName = req.query.circleName;
  db.getPersonsByCircle(circleName)
    .then(data => {
      console.log(data);
      res.send(data);
    });
})

app.get('/getTransactionsByCircleName', (req, res) => {
  var circleName = req.query.circleName;
  db.getTransactionsByCircleName(circleName)
    .then(data => {
      console.log(data);
      res.send(data);
    });
})

app.get('/getParticipantsByTransactionId', (req, res) => {
  var transactionId = req.query.transactionId;
  db.getParticipantsByTransactionId(transactionId)
    .then(data => {
      console.log(data);
      res.send(data);
    });
})

app.post('/addUser', (req, res) => {
  var username = req.body.username;
  var circleName = req.body.circleName
  db.createOrGetPerson(username)
    .then(data => {
      return db.addPersonToCircle(username, circleName)
        .catch(res.send(data));
    });
})

app.post('/addTransaction', (req, res) => {
  var transaction = req.body.transaction;
  var participants = req.body.participants;
  db.createTransaction(transaction, participants)
    .then(data => {
      res.send(data);
    });
});


app.listen(port, () => {
  console.log(`listening on ${port}`);
})