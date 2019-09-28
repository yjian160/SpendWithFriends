const express = require('express');
const app = express();
const port = 3000;
const db = require('../database/dbHelper')

app.use(express.json());

app.post('/joinCircle', (req, res) => {
  var newCircle = req.body;
  db.joinCircle(newCircle.name)
    .then(data => {
      console.log("CreateCircle", data);
      res.send(data);
    });
})

app.post('/addUser', (req, res) => {
  var username = req.body.username;
  var circleName = req.body.circleName
  db.createOrAddPerson(username)
    .then(data => {
      return db.addPersonToCircle(username, circleName)
        .catch(res.send(data));
    });
})

app.listen(port, () => {
  console.log(`listening on ${port}`);
})