require('./config/config');

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const _ = ('lodash');
const bodyParser = require('body-parser');
const {
  ObjectID
} = require('mongodb');

var {
  mongoose
} = require('./db/mongoose');
var {
  Scrum
} = require('./models/scrum');


var app = express();
var port = process.env.PORT || 4444;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(bodyParser.json());

app.post('/', (req, res) => {
  var scrum = new Scrum({
    teamName: req.body.teamName,
    sprintNumber: req.body.sprintNumber
    // sp[0]: req.body.achived,
    // sp[1]: req.body.estimated
  })
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Scrum reviews'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('')

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
