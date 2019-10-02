const path = require('path');
const express = require('express');

const app = express();

console.log(__dirname);
//Define path to express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

//Setup handlebars engine  and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath)

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
  res.send('Weather page!');
})

app.listen(3030, () => {
  console.log('Server up! on port 3030')
});