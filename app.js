const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.listen(8888, function() {
  console.log('Server running on port 8888!')
})
