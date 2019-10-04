const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

console.log(__dirname);
//Define path to express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine  and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Jason'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    text: 'Lorem ipsum',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provided address'
    })
  }
  
  res.send({
    forecast: 'It`s showing',
    location: 'Philadelphia',
    address: req.query.address
  });

});

app.get('/products', (req,res) => {
  console.log(req.query)
  if (!req.query.search) {
    return res.send({
      error: 'Your must search provided'
    })
  }
  res.send({
    products: []
  })
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(3030, () => {
  console.log('Server up! on port 3030')
});