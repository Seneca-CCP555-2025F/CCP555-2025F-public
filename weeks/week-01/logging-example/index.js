const express = require('express');
const logger = require('./logger');
const pino = require('pino-http')({ logger });

const app = express();

// Add the Pino HTTP Logging Middleware to our Express app
app.use(pino);

app.get('/:name', (req, res) => {
  const name = req.params.name;
  logger.debug({ name }, 'Got name');
  res.status(200).json('ok');
});

app.get('/error', (req, res, next) => {
  // Simulate an error, passing it on to the "next" middleware (will end-up in the error-handling middleware)
  next(new Error('Simulated error'));
});

// Add 404 middleware to handle any requests for resources that can't be found can't be found
app.use((req, res) => {
  res.status(404).json('not found');
});

// Add error-handling middleware to deal with anything else
app.use((err, req, res, next) => {
  // NOTE: the `err` is the first argument, message is second
  logger.error({ err }, `Error processing request`);
  res.status(500).json('error');
});

app.listen(8080, () => {
  logger.info('Server started on :8080');
});
