const https = require('https');
const querystring = require('querystring');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

  const {id}=  await request();
  res.send({checkoutId:id});
});


  
const request = async () => {
  const path='/v1/checkouts';
  const data = querystring.stringify({
    'entityId':'8a8294175d602369015d73bf009f1808',
    'amount':'11.97',
    'currency':'EUR',
    'paymentType':'DB'
  });
  const options = {
    port: 443,
    host: 'test.oppwa.com',
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
      'Authorization':'Bearer OGE4Mjk0MTc1ZDYwMjM2OTAxNWQ3M2JmMDBlNTE4MGN8ZE1xNU1hVEQ1cg=='
    }
  };
  return new Promise((resolve, reject) => {
    const postRequest = https.request(options, function(res) {
      const buf = [];
      res.on('data', chunk => {
        buf.push(Buffer.from(chunk));
      });
      res.on('end', () => {
        const jsonString = Buffer.concat(buf).toString('utf8');
        try {
          resolve(JSON.parse(jsonString));
        } catch (error) {
          reject(error);
        }
      });
    });
    postRequest.on('error', reject);
    postRequest.write(data);
    postRequest.end();
  });
};


module.exports = router;