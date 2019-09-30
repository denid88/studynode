const express = require('express');

const app = express();

app.get('', (req, res) => {
  res.send('<h1>Weather</h1>');
})

app.get('/help', (req, res) => {
  res.send({
    name: 'Andrew',
    age: 18
  });
})

app.get('/about', (req, res) => {
  res.send('About page!');
})

app.get('/weather', (req, res) => {
  res.send('Weather page!');
})

app.listen(3030, () => {
  console.log('Server up! on port 3030')
});