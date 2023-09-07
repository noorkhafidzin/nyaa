const express = require('express');

const app = express();
const port = process.env.PORT || 3000; // Define the port to listen on

// Define your API key
const apiKey = 'trapi-ezVbG9ekC0rEdzFONyiuYXOr';

// Define the target API URL
const apiUrl = 'https://api.trakteer.id/v1/public/supports?limit=5&page=1';

// Middleware to handle incoming requests
app.use(express.json());

// Route for forwarding requests to the target API
app.all('/api', async (req, res) => {
  try {
    const requestOptions = {
      method: req.method,
      headers: {
        'key': apiKey,
        'Content-Type': 'application/json', // Adjust headers as needed
        // Add other headers here if necessary
      },
    };

    // Conditionally include the request body for non-GET and non-HEAD requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      requestOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});