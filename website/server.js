// File: website/server.js

const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = 7070;

// Create a Registry to register the metrics
const register = new promClient.Registry()

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Serve your static website files
app.use(express.static('public'));

// Expose the metrics at '/metrics' endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
