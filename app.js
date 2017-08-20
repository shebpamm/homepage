const express = require('express');
const sass = require('node-sass-middleware')
var pug = require('pug');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/base/dev/views');

app.get('/', function(req, res) {
  res.render('index', {title: 'Hey', message: 'Terve pappa1
  ' });
})

app.listen(8888, function() {
  console.log('Server running on port 8888!');
})

app.use(
  sass({
    src: __dirname + '/sass',
    dest: __dirname + '/css',
    debug: true
  })
)
