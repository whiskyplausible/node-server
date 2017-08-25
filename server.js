

const express=require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs')


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n');
  next();
})

// app.use((req, res, next) => {
//  res.render('maintenance.hbs');
//  })
// delmeasdfsdafsadffsd
app.use(express.static(__dirname+"/public"));
hbs.registerHelper('getCurrentYear', () => {

  return new Date().getFullYear();
  //return 'test';
})

hbs.registerHelper('screamIt', (text) => {

  return text.toUpperCase();
})

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home pagezzzzz',
    welcomeMessage: 'welcome message here!!!!!!!!!11!!',

  });
})

app.get('/about', (req,res) => {

  res.render('about.hbs', {
    pageTitle: 'About pagezzzzz',

  });
})

app.get('/projects', (req,res) => {

  res.render('projects.hbs', {
    pageTitle: 'Projects page!',

  });
})

app.get('/bad', (req,res) => {

  res.send({
    error: "unable to fulfil request",
    errorno: 23

  });
})

app.listen(port, () => {

  console.log("server is up on port ",port)
});
