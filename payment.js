const https = require('https');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let {
        query:{id:checkoutId}
      } = req;

  const response=  await request(checkoutId);
  res.send(response);
});

const request = async (checkoutId) => {
    var path=`/v1/checkouts/${checkoutId}/payment`;
	path += '?entityId=8a8294175d602369015d73bf009f1808';
	const options = {
		port: 443,
		host: 'test.oppwa.com',
		path: path,
		method: 'GET',
		headers: {
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
		postRequest.end();
	});
};


module.exports = router;