# Assignment 1

> 📋 **Important**: Please read the [Course Instructions](../../COURSE_INSTRUCTIONS.md) for AWS Academy setup and submission guidelines before starting.

Read through everything and give yourself enough time to complete this assignment. Students in previous semesters have often said that they needed more time than they initially thought. This will take much longer than the weekly labs. Schedule your time accordingly.

Please make sure that all of the following items have been successfully completed, based on the [Fragments Microservice Specification](../README.md) and your labs.

## API Server Checklist

- fragments git repo set up correctly (e.g., README, .gitignore, etc)
- npm, eslint, prettier, scripts, and other dev environment settings set up correctly
- properly formatted source code, with extraneous comments removed (e.g., `// TODO`)
- structured logging with Pino, uses proper log levels throughout code (i.e., make sure you have used info, debug, warn, error logs everywhere). No `console.log()`.
- API with express, middleware, routes, error handling set up correctly
- environment variables properly managed via `dotenv`, `.env` files
- no secrets or generated files included in git repos (i.e., only source code and config files)
- unit testing using `jest` and `supertest` set up correctly
- proper testing vs. development environment setup (configs, env, scripts)
- test coverage reporting/scripts configured properly
- GitHub Actions CI Workflow for eslint and unit tests set up correctly
- all API routes use proper `/v1` version
- all routes are secured using Passport.js based auth, configurable using either Cognito or Basic Auth
- fragment data model working with In-Memory DB, with unit tests
- success and error responses use correct JSON format, with unit tests. See 3.1, 3.2.
- `GET /` returns a non-cacheable health check, with unit tests. See 4.1.
- `POST /fragments` creates a fragment (only plain text support required at this point), with unit tests. See 4.3.
- `GET /fragments` returns a list of the authenticated user's existing fragment IDs, if any. See 4.4.
- `GET /fragments/:id` returns an existing fragment (only plain text support required at this point), with unit tests. See 4.5.
- server deployed manually, and successfully running on AWS EC2 instance, configured via `.env` to use Amazon Cognito for user authorization

## Front-End Web Testing UI Checklist

- fragments-ui git repo set up correctly (e.g., README, .gitignore, etc)
- npm, eslint, prettier, scripts and other dev environment settings set up correctly
- Proper setup and use of a bundler (e.g., Parcel or framework like React, etc.)
- basic web app working for manually testing API server
- AWS Cognito Hosted Auth set up correctly
- web app uses Cognito OAuth2 for user authentication/authorization
- web app can be configured to use different back-end API servers (e.g., dev on localhost vs. prod on EC2 instance)
- users are able to create a simple text fragment and have it get stored in the fragments server
- web app running on localhost is able to use Amazon Cognito and the EC2 hosted backend server

## Hints, Code, Tests

Make sure you have implemented all of the hints, code, and tests below.

- Implement an initial `fragments` data model in `src/model/*` with **unit tests**:
  - Use an In-Memory Database backend to start (we will switch to AWS backend data stores later). See the provided implementation [src/model/data/memory/memory-db.js](src/model/data/memory/memory-db.js) and unit tests [tests/unit/memory-db.test.js](tests/unit/memory-db.test.js). Get these both integrated into your microservice and passing CI.
  - Implement fragment database related calls using the In-Memory Database backend. See the provided implementation [src/model/data/memory/index.js](src/model/data/memory/index.js) and **write your own tests** for it in `test/unit/memory.test.js`. Make sure you cover all of the following `async` functions (i.e., they all return a `Promise`) and pass CI:
    - `readFragment`
    - `writeFragment`
    - `readFragmentData`,
    - `writeFragmentData`
  - Add code to pick the appropriate back-end data strategy (we currently only have 1, our `memory` strategy, but we'll add ones for AWS later). Create `src/model/data/index.js` and have it re-export the `memory` module: `module.exports = require('./memory');`
  - Implement a `Fragment` class to use your Data Model and In-Memory database. See implementation outline in [src/model/fragment.js](src/model/fragment.js) and complete tests in [tests/unit/fragment.test.js](tests/unit/fragment.test.js). Write the code implementation necessary to get all these tests passing in CI. This is an example of **Test Driven Development (TDD)**.
- Write a `POST /fragments` route with **unit tests** using your `Fragment` class:

  - Parse the `Content-Type` header using the [content-type](https://www.npmjs.com/package/content-type) module, and error/log on unknown types.
  - Use the built-in [Express' `raw` body parser](http://expressjs.com/en/api.html#express.raw) to get a `Buffer` (i.e., raw binary data). We won't use `body-parser` or `express.json()`). Here's a hint:

    ```js
    // Support sending various Content-Types on the body up to 5M in size
    const rawBody = () =>
      express.raw({
        inflate: true,
        limit: '5mb',
        type: (req) => {
          // See if we can parse this content type. If we can, `req.body` will be
          // a Buffer (e.g., `Buffer.isBuffer(req.body) === true`). If not, `req.body`
          // will be equal to an empty Object `{}` and `Buffer.isBuffer(req.body) === false`
          const { type } = contentType.parse(req);
          return Fragment.isSupportedType(type);
        },
      });

    // Use a raw body parser for POST, which will give a `Buffer` Object or `{}` at `req.body`
    // You can use Buffer.isBuffer(req.body) to test if it was parsed by the raw body parser.
    router.post('/fragments', rawBody(), require('./post'));
    ```

  - Add an **environment variable**, `API_URL`, to allow you to configure your fragment microservice's URL when setting the `Location` header URL (i.e., when running locally it would be `http://localhost:8080`, but it will be different on AWS). TIP: you can use [`req.headers.host`](https://stackoverflow.com/questions/6503331/how-to-check-the-host-using-expressjs) to get the current host name and use that to create a new `URL()` for setting the `Location` header when `API_URL` is missing from the environment.
  - Make sure you support `text/plain` fragments
  - Your unit tests should include test cases for everything in the spec. Some examples to consider:
    - authenticated vs unauthenticated requests (use HTTP Basic Auth, don't worry about Cognito in tests)
    - authenticated users can create a plain text fragment
    - responses include all necessary and expected properties (`id`, `created`, `type`, etc), and these values match what you expect for a given request (e.g., `size`, `type`, `ownerId`)
    - POST response includes a `Location` header with a full URL to `GET` the created fragment
    - trying to create a fragment with an unsupported type errors/logs as expected

- Add appropriate **logging** to all of the code above. Make sure you include all of the following logs: `debug` logs (places where you need to get info about what's going on in order to debug a problem), `info` (places where regular operations are happening that you need to know about), `warn` (places where errors occur that you are handling), and `error` (places where an error is happening that you don't expect) logs.

- Work with a hashed email vs. plain text version for data privacy (i.e., what if our database gets compromised? We can store the user data without exposing their email):

  - Add [src/hash.js](src/hash.js) and [tests/unit/hash.test.js](tests/unit/hash.test.js) to your project
  - Use custom middleware to **hash** the user's email address on `req`:

    - Add [src/auth/auth-middleware.js](src/auth/auth-middleware.js) to your project
    - Update `src/auth/cognito.js` to use the custom authorize middleware:

      ```js
      // modifications to src/auth/cognito.js

      ...
      // We'll use our authorize middle module
      const authorize = require('./auth-middleware');
      ...
      // Previously we defined `authenticate()` like this:
      // module.exports.authenticate = () => passport.authenticate('bearer', { session: false });
      //
      // Now we'll delegate the authorization to our authorize middleware
      module.exports.authenticate = () => authorize('bearer');
      ```

    - Update `src/auth/basic-auth.js` to use the custom authorize middleware:

      ```js
      // modifications to src/auth/basic-auth.js

      ...
      // We'll use our authorize middle module
      const authorize = require('./auth-middleware');
      ...
      // Previously we defined `authenticate()` like this:
      // module.exports.authenticate = () => passport.authenticate('http', { session: false });
      //
      // Now we'll delegate the authorization to our authorize middleware
      module.exports.authenticate = () => authorize('http');
      ```

- When everything is finished in both your `fragments` and `fragments-ui` projects for Assignment 1, you'll need to run it on an **Amazon EC2 instance** before you can submit. Doing so will require a few configuration changes:
  - Start an existing EC2 instance, or create a new one. Get the correct **IPv4 DNS** for the instance. It will look something like `ec2-3-16-456-301.compute-1.amazonaws.com`, and the URL for your `fragments` web app running on this instance would be something like <http://ec2-3-16-456-301.compute-1.amazonaws.com:8080>. NOTE: this domain will change every time you stop/start the lab environment, so make sure you complete these steps in a single session; or use an [Elastic IP Address](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html) with your EC2 instance to fix the IP and domain name between sessions (costs $0.20 per day).
  - Configure your `fragments-ui` web app's `API_URL` environment variable to use the URL for your server running on EC2, for example: `API_URL=http://ec2-3-16-456-301.compute-1.amazonaws.com:8080`. TIP: you can also consider using `req.headers.host` to dynamically set the `API_URL` at runtime to the hostname being used.
  - Your `fragments-ui` web app should now be able to connect to your Amazon Cognito User Pool and `fragments` server running on Amazon EC2.

## Submission

Create a proper Technical Report document (e.g., Word or PDF) and submit it to Blackboard. Your Technical Report must include:

- a title page
- proper headings, sections, and page numbers
- figures with labels (e.g., screenshots must include explanatory text)

Your Technical Report document will discuss and demonstrate your progress to date on implementing the `fragments` service. In your report, include all of the following sections and items:

1. An introductory paragraph that describes the system you are building
2. Links to both Private GitHub Repos. Your professor must be a collaborator in order to see them.
3. Link to successful GitHub Actions CI workflow runs with eslint and all unit tests passing.
4. Screenshots of the `fragments` API server running on an EC2 instance. Include a health check JSON response as well as the AWS EC2 URL in the browser
5. Screenshots of the `fragments-ui` web app running on `localhost` authenticating with Amazon Cognito's Hosted UI
6. Screenshots of the `fragments-ui` web app running on `localhost` successfully creating a text fragment via an HTTP `POST` to the `fragments` API server running on EC2. Show the network response in the Dev Tools and make sure the `Location` header and JSON metadata for the resulting fragment are clearly visible and labelled.
7. Screenshot of running `npm run coverage` to show that you've been able to properly cover the majority of your files and lines of code. Make sure your coverage rate is high enough to reflect proper testing for all units of code (above 85% for all files), and that all expected source files are included.
8. A concluding paragraph, including notes about any bugs or issues that you still need to address in subsequent releases.

Your submission is worth 15% of your final grade, and should reflect that level of work.
