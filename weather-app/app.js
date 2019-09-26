const request = require('request')
const url = "https://api.darksky.net/forecast/01b4ab396d0a98e8d815ffc40d3e8248/37.8267,-122.4233?units=uk2"

request({url: url, json: true}, (err, res) => {
  console.log(`It is currently ${res.body.currently.temperature}C degress out. There is a ${res.body.currently.precipProbability}% chance of rain.`)
})

const getcodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGVuaWQiLCJhIjoiY2swejdqZjVnMG1vZjNtcW1kNWdiY2J5NSJ9.N8DH_geYvXRl-GYW2pc8Ng'

request({url: getcodeUrl, json: true}, (err, res) => {
  if (err !== null) {
    console.log(err)
    return 
  }
  const latitude = res.body.features[0].center[1]
  const longitude = res.body.features[0].center[0]
  console.log(latitude, longitude)
})