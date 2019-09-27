const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGVuaWQiLCJhIjoiY2swejdqZjVnMG1vZjNtcW1kNWdiY2J5NSJ9.N8DH_geYvXRl-GYW2pc8Ng&limit=1`
  
  request({url: url, json: true}, (err, res) => {
    if (err) {
      callback('Unable to connect to location', undefined)
    } else if (res.body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        latitude: res.body.features[0].center[1],
        longitude: res.body.features[0].center[0],
        location: res.body.features[0].place_name
      })
    }
    //const latitude = res.body.features[0].center[1]
    //const longitude = res.body.features[0].center[0]
    //console.log(latitude, longitude)
  })
}

module.exports = geocode