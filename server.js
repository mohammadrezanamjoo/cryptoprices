const express = require('express');
const request = require('request');
const app = express();

// Set the API endpoint URL and API key
const apiUrl = 'https://api.coingecko.com/api/v3/simple';
const apiKey = 'YOUR_API_KEY_HERE';

// Define a route for handling GET requests to the /crypto endpoint
app.get('/crypto', (req, res) => {
  // Set the cryptocurrency and currency
  const cryptocurrency = req.query.crypto || 'bitcoin';
  const currency = req.query.currency || 'usd';

  // Make a GET request to the API endpoint with the API key included in the headers
  const options = {
    url: `${apiUrl}/price?ids=${cryptocurrency}&vs_currencies=${currency}`,
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (response.statusCode !== 200) {
      console.error(`Status code: ${response.statusCode}`);
      res.status(response.statusCode).json({ error: 'API error' });
    } else {
      // Parse the JSON response body
      const data = JSON.parse(body);

      // Extract the cryptocurrency price from the response data
      const price = data[cryptocurrency][currency];

      res.json({ price });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
