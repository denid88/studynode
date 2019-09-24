const request = require('request')
const url = "https://api.darksky.net/forecast/01b4ab396d0a98e8d815ffc40d3e8248/37.8267,-122.4233"

request({url: url}, (err, res) => {
  const data = JSON.parse(res.body)
  console.log(data.currently)
})