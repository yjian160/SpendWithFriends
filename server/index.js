const express = require('express');
const app = express();
const port = 3000;
const db = require('../database/dbHelper')

app.use(express.bodyParser());

app.post('/createCircle', (req, res) => {
  var newCircle = req.body;
  db.joinCircle(newCircle.name)
    .then(data => {
      console.log("CreateCircle", data);
      res.send(data);
    });
})

app.listen(port, () => {
  console.log(`listening on ${port}`);
})