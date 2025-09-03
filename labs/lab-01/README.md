# Lab 1

> 💡 **Note**: For AWS Academy setup and general course guidelines, see [Course Instructions](../../COURSE_INSTRUCTIONS.md).

## Overview

In this lab we will do the initial setup of our back-end microservice project and repo. This project and repo will be your focus for the next 14 weeks, so it's worth spending time setting everything up properly now. Our goals are:

1. Set up of your development environment
2. Set up of your git and GitHub repos
3. Set up initial development tooling
4. Begin writing the API server
5. Set up structured logging
6. Practice using various HTTP testing tools
7. Set up npm scripts
8. Set up and learn to use VSCode debugging for future work

If you have any questions or get stuck, please use the **GitHub Discussions** to ask/answer questions.

## GitHub Account

You will need a GitHub account to complete this and all subsequent labs. If you don't have one already, [sign up for one now](https://github.com/signup). If you already have an account, you can use that.

If you haven't done so before, you should also [generate an SSH key and add it to GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). You will need to show your Public SSH Keys later, so don't skip this step.

## Software to Install

If you are using Windows, please [install WSL2](https://www.windowscentral.com/how-install-wsl2-windows-10) and the [Windows Terminal](https://www.microsoft.com/en-ca/p/windows-terminal/9n0dx20hk701#activetab=pivot:overviewtab) so you can run various Unix tools locally. **You will be expected to have access to many Unix cli tools during the labs and assignments**. Windows (with WSL2), Linux, and macOS will all work. Be aware that using WSL2 means that you have 2 systems running at once: Windows and Linux. You have to install and use tools/files in each system differently (e.g., `npm install` in WSL2 will create a `node_modules/` that does NOT work in Windows, and vice versa).

All of the following software needs to be installed and working properly on your development machine:

- [Node.js](https://nodejs.org/en). You should install, or upgrade to, the active Long Term Stable (LTS) version. Don't use an old version of node.
- [VSCode](https://code.visualstudio.com/). You should also install various extensions:
  - ESLint
  - Prettier - Code Formatter
  - Code Spell Checker
- [git](https://git-scm.com/downloads) cli
- [curl](https://curl.se/). **NOTE**: in Power Shell on Windows, there is a [`curl` alias for `invoke-webrequest`, which will cause issues](https://knowledge-junction.com/2021/12/07/curl-resolving-error-curl-the-remote-name-could-not-be-resolved-help/). In Power Shell, please [type `curl.exe` vs. `curl`](https://daniel.haxx.se/blog/2016/08/19/removing-the-powershell-curl-alias/) which includes more features.

> [!NOTE]
> If you have any of these already installed, take the time to confirm the version and see if they need to be updated.

> [!NOTE]
> Students sometimes ask if they are allowed to use JavaScript runtimes other than Node.js (e.g., [Bun](https://bun.com/), [Deno](https://deno.com/)), or to use a different programming language (e.g., TypeScript, Python, Go). The answer is 'yes'; however, if you choose to deviate from Node.js and JavaScript, you will be responsible for doing your own research and debugging, since all the course notes will target Node.js and JavaScript only. If you don't mind the extra work, and want to push yourself to learn something new, go ahead and talk to your professor about your plans so that they are aware of your intentions.

## API Server Setup

We are going to create a node.js based REST API using [Express](https://expressjs.com/). We will use node and Express mainly because you already have experience using them in previous courses, and you can build on that experience with cloud computing vs. starting from scratch with a new language or framework. If you really want to use something other than node/Express/JavaScript, please talk to your professor to see if it's possible; however, the majority of people should stick with node/Express/JavaScript, and I'll provide lots of help for this stack.

Follow these steps to initialize your project and repo:

1. Create a [**Private** GitHub repo](https://docs.github.com/en/get-started/quickstart/create-a-repo) named `fragments`. Give the repo a **Description**, make it **Private**, add a **README** and a `.gitignore` file for `node` (make sure you include this, so you don't accidentally commit things like `node_modules`). Only you and your professor will have access to this repo (you add your professor as a collaborator later in this lab).

2. [Clone your `fragments` repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to your local machine.

3. Open a terminal and `cd` into your cloned repo:

```sh
cd fragments
```

## npm Setup

4. Initialize the folder as an `npm` project, using [`npm init -y`](https://docs.npmjs.com/cli/v8/commands/npm-init), which will create a `package.json` file (NOTE: the `-y` flag answers 'yes' to all questions, but we'll modify some things below):

```sh
npm init -y
```

5. Open your project folder in VSCode (NOTE: `.` is the current directory, and we always want to open the entire `fragments` repo folder vs. individual files):

```sh
code .
```

6. Modify the generated `package.json` file to update the `version` to `0.0.1`, make the module `private` (i.e., we won't publish this package to the npm registry), set the `license` to `UNLICENSED` (this will be closed- vs. open-sourced code), update `author` to your name, `description`, the `repository`'s `url`, and remove unneeded keys. Your `package.json` will look something like this:

```json
{
  "name": "fragments",
  "private": true,
  "version": "0.0.1",
  "description": "Fragments back-end API",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/REPLACE-THIS-WITH-YOUR-GITHUB-USERNAME/fragments.git"
  },
  "author": "REPLACE WITH YOUR NAME",
  "license": "UNLICENSED"
}
```

> [!IMPORTANT]
> Make sure you don't copy/paste code without reading or understanding it. For example, in the above, you need to update the repo url and author name to use your info.

7. In your terminal, run `npm install` to validate your `package.json` file, and fix any errors that it generates. This will also create [a `package-lock.json` file](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json).

8. In your terminal, commit the `package.json` and `package-lock.json` files to git. NOTE: it's a good practice to commit small changes to git frequently whenever we get something working, which I'll demonstrate below as we work through this lab:

```sh
git add package.json package-lock.json
git commit -m "Initial npm setup"
```

You could also have used `git add package*` to add multiple files with a glob pattern.

> [!IMPORTANT]
> Avoid the use of `git add .` and specify the files/folders to add manually or with glob patterns. Using `git add .` is inadvisable since it will add files and folders you don't expect. This is especially important in cloud computing, where we will work with many secrets that must not be included in git. Be explicit with git about what you want to do, or suffer the consequences of it deciding things for you.

## Prettier Setup

9. Install and configure [Prettier](https://prettier.io/) to automatically format our source code when we save files. Begin by installing Prettier as a **Development Dependency** (NOTE: prettier needs to be installed with an **exact version** vs. using an approximate `~` or `^` version):

```sh
npm install --save-dev --save-exact prettier
```

Create a `.prettierrc` file, and use the following configuration (you can [modify this](https://prettier.io/docs/en/options.html) if you want something different):

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "endOfLine": "lf",
  "insertPragma": false,
  "proseWrap": "preserve",
  "requirePragma": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "printWidth": 100
}
```

Create a `.prettierignore` file, which tells Prettier which files and folders to ignore when formatting. In our case, we don't want to format code in `node_modules/` or alter the `package.json` or `package-lock.json` files:

```txt
node_modules/
package.json
package-lock.json
```

Install the [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VSCode Extension.

Create a folder named `.vscode/` in the root of your project, and add a `settings.json` file to it (i.e., `.vscode/settings.json`). These settings will override how VSCode works when you are working on this project, but not affect other projects:

```json
{
  "editor.insertSpaces": true,
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "always"
  },
  "files.eol": "\n",
  "files.insertFinalNewline": true
}
```

Now, whenever you modify a file and save it, Prettier should automatically format it for you. This saves a lot of time and makes our code more readable.

When you have it working, `add` and `commit` all your modified files to git:

```sh
git add package.json package-lock.json .prettierignore .prettierrc .vscode/settings.json
git commit -m "Add prettier"
```

## ESLint Setup

1. In your terminal, [setup ESLint](https://eslint.org/docs/user-guide/getting-started) to lint our code:

```sh
npm init @eslint/config@latest
Need to install the following packages:
@eslint/create-config@1.10.0

✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · commonjs
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · javascript
✔ Where does your code run? · node

eslint, globals, @eslint/js
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
☕️Installing...

added 8 packages, removed 11 packages, changed 12 packages, and audited 224 packages in 2s

34 packages are looking for funding
  run `npm fund` for details

2 vulnerabilities (1 moderate, 1 high)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
Successfully created /Users/humphd/Documents/Seneca/CCP555 DPS955/fragments/eslint.config.mjs file.
```

> [!TIP]
> If you have vulnerabilities, try running `npm audit fix` to get newer dependencies:

```sh
npm audit fix

added 8 packages, removed 1 package, changed 11 packages, and audited 231 packages in 2s

39 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

This setup process will have created an ESLint config file, `eslint.config.mjs`, which will look something like this:

```js
import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];
```

> [!NOTE]
> The `.mjs` extension vs `.js` indicates to node.js that this is an ES6 Module.

It is configured for node.js using CommonJS modules, and uses good defaults for linting JavaScript projects. You can [read more about how to configure eslint](https://eslint.org/docs/latest/use/configure/) if you're interested, or want to override defaults.

Finally, install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) VSCode Extension, so you get visual indicators when you have issues in your code.

1. Add a `lint` script to your `package.json` file to run ESLint from the command line. You can [read more about the ESLint cli options](https://eslint.org/docs/user-guide/command-line-interface) if you are interested or have questions. NOTE: we don't have a `src/` folder yet, but we will add it below:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "lint": "eslint \"./src/**/*.js\""
},
```

12. Use `git status` to see which files have changed, then `add` and `commit` these files to git. NOTE: avoid using `git add .` and prefer to specify the files you want to add/commit manually. This helps avoid situations where you add files or folders that you don't mean to. With git, being explicit is better than being implicit:

```sh
$ git status

On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
 eslint.config.mjs
 package-lock.json
 package.json

nothing added to commit but untracked files present (use "git add" to track)

$ git add eslint.config.mjs package-lock.json package.json
$ git commit -m "Add eslint"
```

## Structured Logging and Pino Setup

13. Create a `src/` folder to contain all of your source code. We use our project's root directory for configuration files, and put source code in `src/`:

```sh
mkdir src
```

14. Instead of `console.log()`, we need to be able to use proper [Structured Logging](https://developer.ibm.com/blogs/nodejs-reference-architectire-pino-for-logging/) in cloud environments, with JSON formatted strings. We'll use [Pino](https://getpino.io/#/) to do it. Install all the necessary dependencies (NOTE: use `--save` to have the dependencies added to `package.json` automatically):

```sh
npm install --save pino pino-pretty pino-http
```

15. Create and configure a [Pino `Logger` instance](https://getpino.io/#/docs/api?id=logger) in `src/logger.js` that we can use throughout our code to log various types of information:

```js
// src/logger.js

// Use `info` as our standard log level if not specified
const options = { level: process.env.LOG_LEVEL || 'info' };

// If we're doing `debug` logging, make the logs easier to read
if (options.level === 'debug') {
  // https://github.com/pinojs/pino-pretty
  options.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

// Create and export a Pino Logger instance:
// https://getpino.io/#/docs/api?id=logger
module.exports = require('pino')(options);
```

16. Use `git status` to determine all the files that have changed, and `add` and `commit` them to git:

```sh
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
 new file:   eslint.config.mjs
 new file:   package-lock.json
 new file:   package.json

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
 modified:   eslint.config.mjs
 modified:   package-lock.json
 modified:   package.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
 src/

$ git add eslint.config.mjs package-lock.json package.json src/
$ git commit -m "Add pino logger"
```

## Express App Setup

17. Install the packages necessary for our [Express app](https://expressjs.com/), along with some commonly used middleware (NOTE: if you've not used any of these packages before, go read about them on <https://www.npmjs.com/>. Don't install and use code you don't understand!):

```sh
npm install --save express cors helmet compression
```

> [!TIP]
> The major version of Express has recently changed to 5 from 4, and with it, [some of the APIs have been updated](https://expressjs.com/en/guide/migrating-5.html). You can continue to use version 4 if you like (e.g., `npm install express@4`) or move to 5. If you want to explore using other web server frameworks, for example, the popular [Hono](https://hono.dev/) web application framework, you can do that as well; but all of the course notes will focus on Express and you will be responsible for debugging and researching the differences.

18. Create a `src/app.js` file to define our [Express app](https://expressjs.com/). The file will a) create an `app` instance; b) attach various [middleware](https://expressjs.com/en/guide/using-middleware.html) functions for all routes; c) define our HTTP route(s); d) add middleware for dealing with 404s; and e) add [error-handling middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling). Our initial server will only have a single route, a [Health Check](https://www.ibm.com/garage/method/practices/manage/health-check-apis/) to determine if the server is accepting requests. NOTE: please don't copy/paste code that you don't understand, in the labs, or in general. If you read something and aren't sure what it does, do some research, ask questions, and understand it _before_ you put it in production. While it's OK if you don't understand everything, it's not OK for you to stay that way. Learn as you go.

```js
// src/app.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

// author and version from our package.json file
// TODO: make sure you have updated your name in the `author` section
const { author, version } = require('../package.json');

const logger = require('./logger');
const pino = require('pino-http')({
  // Use our default logger instance, which is already configured
  logger,
});

// Create an express app instance we can use to attach middleware and HTTP routes
const app = express();

// Use pino logging middleware
app.use(pino);

// Use helmetjs security middleware
app.use(helmet());

// Use CORS middleware so we can make requests across origins
app.use(cors());

// Use gzip/deflate compression middleware
app.use(compression());

// Define a simple health check route. If the server is running
// we'll respond with a 200 OK.  If not, the server isn't healthy.
app.get('/', (req, res) => {
  // Clients shouldn't cache this response (always request it fresh)
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#controlling_caching
  res.setHeader('Cache-Control', 'no-cache');

  // Send a 200 'OK' response with info about our repo
  res.status(200).json({
    status: 'ok',
    author,
    // TODO: change this to use your GitHub username!
    githubUrl: 'https://github.com/REPLACE_WITH_YOUR_GITHUB_USERNAME/fragments',
    version,
  });
});

// Add 404 middleware to handle any requests for resources that can't be found
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: {
      message: 'not found',
      code: 404,
    },
  });
});

// Add error-handling middleware to deal with anything else
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // We may already have an error response we can use, but if not,
  // use a generic `500` server error and message.
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  // If this is a server error, log something so we can see what's going on.
  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }

  res.status(status).json({
    status: 'error',
    error: {
      message,
      code: status,
    },
  });
});

// Export our `app` so we can access it in server.js
module.exports = app;
```

## Express Server Setup

19. Install the [stoppable](https://www.npmjs.com/package/stoppable) package to allow our server to exit gracefully (i.e., wait until current connections are finished before shutting down):

```sh
npm install --save stoppable
```

20. Create a `src/server.js` file to start our server:

```js
// src/server.js

// We want to gracefully shutdown our server
const stoppable = require('stoppable');

// Get our logger instance
const logger = require('./logger');

// Get our express app instance
const app = require('./app');

// Get the desired port from the process' environment. Default to `8080`
const port = parseInt(process.env.PORT || '8080', 10);

// Start a server listening on this port
const server = stoppable(
  app.listen(port, () => {
    // Log a message that the server has started, and which port it's using.
    logger.info(`Server started on port ${port}`);
  })
);

// Export our server instance so other parts of our code can access it if necessary.
module.exports = server;
```

21. Run `eslint` and make sure there are no errors that need to be fixed:

```sh
npm run lint
```

22. Test that the server can be started manually:

```sh
node src/server.js
```

Try browsing to <http://localhost:8080> in your browser. You should see your JSON health check response. If you don't, figure out why and fix.

Next, try running `curl http://localhost:8080` in another terminal (tip: use `curl.exe` vs. `curl` in Power Shell):

```sh
 curl localhost:8080
{"status":"ok","author":"David Humphrey","githubUrl":"https://github.com/humphd/fragments","version":"0.0.1"}
```

Confirm that you have the correct `author` name and `githubUrl` for your account. If you don't, fix it now (marks will be deducted if you forget to do this).

Next, install [jq](https://stedolan.github.io/jq/) and pipe the CURL output to it, which will pretty-print the JSON (NOTE: the `-s` option [silences](https://everything.curl.dev/usingcurl/verbose#silence) the usual output to CURL, only sending the response from the server to `jq`):

```sh
curl -s localhost:8080 | jq
{
  "status": "ok",
  "author": "David Humphrey",
  "githubUrl": "https://github.com/humphd/fragments",
  "version": "0.0.1"
}
```

> [!IMPORTANT]
> If you're using PowerShell on Windows, use `curl.exe` vs. `curl`

The `jq` utility is a powerful way to format, query, and transform JSON data. See the [jq tutorial](https://jqlang.github.io/jq/tutorial/) for more info about how to use it.

Finally, confirm that your server is sending the right HTTP headers. In the browser, open the [Dev Tools and Network tab](https://developer.chrome.com/docs/devtools/network/reference/#headers), then look for the `Cache-Control` and `Access-Control-Allow-Origin` (i.e., CORS) headers. Do the same thing with CURL using the [`-I` flag](https://curl.se/docs/manpage.html#-I) or [-i flag](https://curl.se/docs/manpage.html#-i):

```sh
$ curl -i localhost:8080

HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
X-DNS-Prefetch-Control: off
Expect-CT: max-age=0
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
Origin-Agent-Cluster: ?1
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: no-referrer
X-XSS-Protection: 0
Access-Control-Allow-Origin: *
Cache-Control: no-cache
Content-Type: application/json; charset=utf-8
Content-Length: 109
ETag: W/"6d-g+B09TdcIOsoB3J9/MySW7RqB5w"
Vary: Accept-Encoding
Date: Wed, 05 Jan 2022 21:41:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"ok","author":"David Humphrey","githubUrl":"https://github.com/humphd/fragments","version":"0.0.1"}
```

Once you are satisfied that your code is working, stop the server (`CTRL + c`) and `add` and `commit` the files you've updated:

```sh
$ git status
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
 modified:   package-lock.json
 modified:   package.json
 modified:   src/app.js
 modified:   src/server.js

no changes added to commit (use "git add" and/or "git commit -a")

$ git add package-lock.json package.json src/app.js src/server.js
$ git commit -m "Initial work on express app and server"
```

## Server Startup Scripts

1. We'd like to automatically restart our server when the code changes during development. This can be done a number of ways, for example using the [nodemon](https://nodemon.io/) package. However, Node.js also includes a `--watch` flag which does the same thing without requiring an additional dependency. We'll use `--watch` below.

2. Create a `debug.env` file in your project root to store environment variables for development. We'll talk more about Environment Files in subsequent weeks, but for now, this file defines variables we want to set at runtime but not include in our source code:

```ini
# debug.env
LOG_LEVEL=debug
```

3. Add npm scripts to `package.json` using Node's built-in `--watch` and `--env-file` flags, in order to automatically start our server. The `start` script runs our server normally; `dev` runs it in "watch" mode; `debug` is the same as `dev` but also starts the [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) on port `9229`, so that you can attach a debugger (e.g., VSCode):

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "lint": "eslint \"./src/**/*.js\"",
  "start": "node src/server.js",
  "dev": "node --env-file=debug.env --watch ./src/server.js",
  "debug": "node --env-file=debug.env --inspect=0.0.0.0:9229 --watch ./src/server.js"
},
```

> [!IMPORTANT]
> Node 24+ eliminates many cross-platform compatibility issues. The built-in `--env-file` flag works consistently across Windows, macOS, and Linux, eliminating the need for the cross-env package. Environment variables are loaded from the `debug.env` file automatically, making your development setup more portable and reducing dependencies.
> [!NOTE]
> Why `debug.env` vs. `.env`? Using a specific filename like `debug.env` instead of the generic `.env` makes it clear this file contains debug/development-specific configuration. This is especially helpful when you have multiple environment files for different purposes (e.g., `production.env`, `test.env`).

Try starting your server using all three methods, and use `CTRL + c` to stop each:

```sh
npm start
npm run dev
npm run debug
```

The `debug` script allows you to connect a debugger (e.g., VSCode) to your running process. In order to set this up, add a new file to your `.vscode/` folder named `launch.json`, with the following contents:

```js
// .vscode/launch.json

{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    // Start the app and attach the debugger
    {
      "name": "Debug via npm run debug",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run-script", "debug"],
      "skipFiles": ["<node_internals>/**"],
      "type": "node"
    }
  ]
}
```

For detailed instructions on how to use the VSCode debugger, including setting breakpoints, and inspecting variables see:

- <https://code.visualstudio.com/docs/editor/debugging>
- <https://code.visualstudio.com/docs/nodejs/nodejs-debugging>

Try setting a breakpoint in your Health Check route (`src/app.js`) (i.e., on the line `res.status(200).json({`) and start the server via VSCode's debugger. Use `curl`/`curl.exe` or your browser to load <http://localhost:8080> and watch your breakpoint get hit.

Once you are satisfied that all of the scripts work, `add` and `commit` the files you've changed to git:

```sh
$ git status
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
 modified:   package-lock.json
 modified:   package.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
 .vscode/

no changes added to commit (use "git add" and/or "git commit -a")

$ git add package-lock.json package.json .vscode/
$ git commit -m "Add startup scripts, nodemon, and VSCode debug launch config"
```

## Documentation

25. Update the `README.md` file to include instructions on how to run the various scripts you just created (i.e., `lint`, `start`, `dev`, `debug`). Include everything you think you might forget. You're going to spend a lot of time working in this code, so it's a good idea to document everything you can. Good docs are better than faulty memories! Marks will be deducted if your README is incomplete.

When you're done, `add` and `commit` your doc changes:

```sh
git add README.md
git commit -m "Update README with details on running the server"
```

## Submission

26. Once everything above is complete, `push` your local commits to your GitHub `origin` repo, so that everything is in sync:

```sh
git push origin main
```

1. [Invite your professor as a collaborator](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository) to your private repo. NOTE: only you and your professor should have access to this code. Do not share it with other students. You can use the GitHub Discussions to talk about your code, but not share it directly.

2. Submit all of the following on Blackboard for Lab 1 in a **single document report** (Word or PDF):

- Link to your GitHub repo with all of the steps above completed. Make sure you have invited your professor as a collaborator on your private repo before you do this.
- Screenshot of using `curl`/`curl.exe` to access your Public SSH Key(s) on GitHub at `https://github.com/<your-username>.keys`
- Separate screenshots of your server and dev setup:
  - running the `lint` script, which should show no errors (i.e., fix any first)
  - using a browser to access your running server at <http://localhost:8080>
  - using `curl`/`curl.exe` (executable vs. Power Shell alias) and `jq` in the terminal to access your server at <http://localhost:8080>
  - using VSCode to set breakpoint in your code, and using the npm `debug` script to hit it. Your screenshot must show the breakpoint being hit at runtime in the debugger vs you simply setting it.
  - when running with `LOG_LEVEL=debug`, modify the code so it prints all of the process' environment variables (e.g., `process.env`) so you can easily debug what has/hasn't been set. Make sure you don't do this unless the server is run with `LOG_LEVEL=debug`, since the environment variables can/will include secrets. Take a screenshot of this code change and your server printing the contents of the environment.
