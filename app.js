const express = require('express');
const sass = require('node-sass-middleware')
var pug = require('pug');

const app = express();

//app.set('view engine', 'pug');
app.set('views', __dirname + '/base/public/views');

app.use(express.static(__dirname + '/base/public'))

/* app.get('/', function(req, res) {
  res.render('index', {title: 'Hey', message: 'Terve pappa' });
}) */

app.use('/', express.static('base/public/index.html'));
app.get('/', function(req, res) {
  res.sendFile('public/views/index.html', { root: __dirname + '/base' })
})


app.listen(8888, function() {
  console.log('Server running on port 8888!');
})

app.use(
  sass({
    src: __dirname + '/dev/sass',
    dest: __dirname + '/public/css',
    debug: true
  })
)
