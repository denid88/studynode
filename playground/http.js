const https = require('https')

const url = `https://api.darksky.net/forecast/01b4ab396d0a98e8d815ffc40d3e8248/40,-75?units=uk2`


const options = {
  hostname: 'api.darksky.net',
  port: 443,
  path: '/forecast/01b4ab396d0a98e8d815ffc40d3e8248/40,-75?units=uk2',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();