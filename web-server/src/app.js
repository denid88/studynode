const path = require('path');
const express = require('express');

const app = express();

console.log(__dirname);

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

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