const request = require('request')

const forecast = (latitude, longitude, callback) => {
  
  const url = `https://api.darksky.net/forecast/01b4ab396d0a98e8d815ffc40d3e8248/${latitude},${longitude}?units=uk2`

  request({url: url, json: true}, (err, res) => {
    if (err) {
      callback('Unable to connect to weather service', undefined)
    } else if (res.body.error) {
      callback('Unable to find to location', undefined)
    } else {
      callback(undefined, `It is currently ${res.body.currently.temperature}C degress out. There is a ${res.body.currently.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast