# Structured Logging for Cloud Applications

## Lecture Video

<https://www.youtube.com/watch?v=OzATfSfR3ls>

## Introduction to Structured Logging

When developing applications for cloud deployment, we need to build in the ability to observe, debug, and gather information about system behavior. This requires thinking about how to instrument code for development, testing, and production environments.

The foundation of our approach is **structured logging** - a practice where applications stream logs to standard output as lines of JSON. This structured format allows us to easily ingest and query logs across many languages and platforms, enabling us to search for specific information within our logs after deployment.

## Why Structured Logging Matters

In cloud deployments, you won't be running and watching code 24/7 on your local machine. Instead, you'll deploy to the cloud and need to collect evidence of what went wrong when something fails. Structured logging provides the foundation for this post-incident analysis.

## Using Pino for Node.js Applications

We'll use [Pino](https://github.com/pinojs/pino), a popular and fast library for structured logging in Node applications. Other programming languages have equivalent structured logging tools.

### Log Levels

Pino provides several log levels, from most to least severe:

- **fatal** - Critical errors that cause application termination
- **error** - Actual errors that shouldn't have happened
- **warn** - Non-fatal errors that the program can recover from
- **info** - Regular application actions you want to be aware of
- **debug** - Detailed information useful only during debugging
- **trace** - Very detailed tracing information
- **silent** - No logging output (useful for tests)

Most production environments run at the **info** level, while development often uses **debug** for more detailed output.

## Setting Up Pino

### Basic Configuration

```javascript
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.LOG_LEVEL === 'debug'
      ? {
          target: 'pino-pretty',
          options: { colorize: true },
        }
      : undefined,
});
```

This configuration:

- Defaults to 'info' level unless overridden by environment variable
- Uses pretty printing with colors in debug mode for better readability
- Outputs raw JSON in production for structured processing

### HTTP Logging with Express

```javascript
const express = require('express');
const pinoHttp = require('pino-http');

const app = express();
app.use(pinoHttp({ logger }));
```

This middleware automatically logs all HTTP requests with detailed information including headers, status codes, response times, and URLs.

## Logging Best Practices

### 1. Use Appropriate Log Levels

```javascript
// Debug information (only visible in debug mode)
logger.debug({ username, id }, 'Looking up record');

// Regular application events
logger.info('Server started on port 8080');

// Non-fatal errors
logger.warn({ error: err.message }, 'Retrying failed operation');

// Actual errors
logger.error({ err, username, id }, 'Unable to get record for user');
```

### 2. Include Contextual Data

Always include relevant data that will help with debugging as the **first** argument to the logging call, with an optional message second:

```javascript
logger.error(
  {
    err,
    username,
    id,
    requestId,
  },
  'Error processing request'
);
```

### 3. Error Handling in Express

Use Express error-handling middleware instead of throwing errors:

```javascript
// Route handler
app.get('/user/:username/:id', async (req, res, next) => {
  try {
    const { username, id } = req.params;
    logger.debug({ username, id }, 'Looking up record');

    const record = await find(username, id);

    if (!record) {
      logger.debug({ username, id }, 'No record found for user');
      return res.status(404).json({ error: 'User not found' });
    }

    logger.debug({ username, id }, 'Found record for user');
    res.json(record);
  } catch (error) {
    logger.error({ err: error, username, id }, 'Error processing /user/:username/:id request');
    next(error); // Pass to error handler
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error({ err }, 'Error processing request');
  res.status(500).json({ error: 'There was an error' });
});
```

### 4. Don't Log at Every Call Stack Level

Avoid redundant logging across multiple layers of your application. Choose the appropriate level in your call stack to handle and log errors, typically at the highest level where you have sufficient context.

### 5. Security Considerations

**Never log sensitive information** such as:

- Credit card numbers
- Social security numbers
- Passwords
- Personal identifiable information (PII)

Instead, redact sensitive data:

```javascript
// Bad
logger.info({ creditCard: '4111-1111-1111-1111' }, 'Processing payment');

// Good
logger.info({ creditCard: '4111-****-****-1111' }, 'Processing payment');
```

## Development vs Production

### Development Setup

```json
{
  "scripts": {
    "dev": "LOG_LEVEL=debug node app.js | pino-pretty",
    "start": "node app.js"
  }
}
```

In development, use debug level with pretty printing for easier reading. In production, use info level with raw JSON for structured processing.

## Log Aggregation and Storage

Logs are typically:

- Aggregated in services like AWS CloudWatch
- Stored for 7-30 days or longer
- Queried for debugging and monitoring
- Used to set up alerts and automated responses

Remember that log storage creates another database that could be compromised in a data breach, making security considerations even more critical.

## Key Takeaways

1. **Invest in logging early** - It's an investment in future debugging capabilities
2. **Use structured JSON format** for easy querying and processing
3. **Include sufficient context** in log messages for effective debugging
4. **Handle errors gracefully** without crashing the server
5. **Protect sensitive information** through redaction or exclusion
6. **Choose appropriate log levels** for different environments
7. **Aggregate logs centrally** for production monitoring and debugging

When something fails in production, the first question will always be: "What do you see in your logs?" Proper structured logging ensures you'll have the information needed to answer that question effectively.
