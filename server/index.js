const express = require('express');
const app = express();
const port = 3000;

app.post('/createGroup', (req, res) => {
  console.log('test');
})

app.listen(port, () => {
  console.log(`listening on ${port}`);
})