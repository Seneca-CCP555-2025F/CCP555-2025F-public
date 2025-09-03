# Topic Demos and Discussions

## Structured Logging

See the [logging-example](./logging-example/index.js) code.

- We prefer single-line JSON strings formatted and streamed to `stdout`

  ```json
  {"level":30,"time":1573664685466,"pid":78742,"hostname":"x","line":1,"msg":"hello"}
  {"level":30,"time":1573664685469,"pid":78742,"hostname":"x","line":2,"msg":"world"}
  ```

- A great node.js logging module is [Pino](https://getpino.io/)

  - `logger.info('hello world')`
  - `logger.error({ err, data: 123 }, 'message...')`
  - Log Level: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, or `silent`
  - We set the log level dynamically via an environment variable, so the logging output can be increased (development) or decreased (production) as required.
    - `debug` should be used to dump detailed info that will help with understanding how code is running, and fixing bugs. Use it everywhere you'd add `console.log()` to print things.
    - `info` should be used for details about regular operations. Don't overuse it
    - `warn` should be used for error situations that we can handle (i.e. non-fatal errors)
    - `error` should be used for real errors vs. things that you expect might happen

- Some tips for logging:
  - Don't repeatedly log at every level of the call stack (e.g., in every `try/catch`). Log at the level where you would need to look for debugging later on
  - Log messages should include all the data you need to debug a problem later (i.e., logs are for _after_ something happens)
  - You can't possibly read all the logs you produce, so you need to aggregate, collect, and create provide search/monitoring. Later we'll look at how to use [AWS CloudWatch](https://aws.amazon.com/cloudwatch/) to aggregate and manage streaming logs, and store them for a short period (e.g., 7 days).
  - In development, we often format/reduce the logs so they are human readable, see [pino-pretty](https://github.com/pinojs/pino-pretty), [pino-colada](https://github.com/lrlna/pino-colada), etc.
  - Logs end-up being another kind of data we collect and store. We need to consider how to log info without exposing [Personally Identifiable Information (PII)](https://en.wikipedia.org/wiki/Personal_data), what to include, what to redact. For example, you shouldn't log anything that can **identify a person**: username + password, address, phone number, email addresses, IP addresses, passport number, credit card number, etc. Different governments around the world define this differently, and globally deployed software services need to be aware of the differences in order to be compliant. Use redacted versions (e.g., `a****h@gmail.com`, `1..........92`), hashed values, or leave out completely.

### Example

Add error handling and logging to the following code. Think about what can fail, where it will fail, and what you should log.

```js
class Record {
  constructor(username, id, payload) {
    this.username = username;
    this.id = id;
    this.payload = payload;
  }

  // ...
}

async function find(username, id) {
  const data = await db.find(id);
  if (!data) {
    return null;
  }

  return new Record(username, id, data);
}

router.get('/:username/:id', async (req, res, next) => {
  const { id, username } = req.params;
  const record = await find(username, id);

  if (!record) {
    res.status(404).json({ message: `Record not found for id=${id}` });
  } else {
    res.json(record);
  }
});
```

## Semver and Supply Chain Security

- [Semantic Versioning (semver)](https://semver.org/)
  - `MAJOR.MINOR.PATCH` for example: `2.1.3`
  - `MAJOR` = breaking API changes. Update the MINOR and PATCH versions to 0 when updating. For example: `2.5.6 -> 3.0.0`
  - `MINOR` = backwards-compatible, adding new feature(s). Update the PATCH version to 0 when updating. For example: `2.5.6 -> 2.6.0`
  - `PATCH` = backwards-compatible, fixing bug(s). For example: `2.5.6 -> 2.5.7`
- Once a version exists, changes require a new, incremental version to be created. We **never** change an old version, even if it's broken.
- package.json defines how we include versions:
  - `version` - exact match for `version`: `2.5.6`
  - `~version` - approximately this version (`PATCH` level changes are OK): `~2.5.6` means `2.5.6` or `2.5.7` or `2.5.8`
  - `^version` - compatible with this version (`MINOR`+`PATCH` level changes are OK): `^2.5.6` means `2.5.6` or `2.6.3` or `2.9.9` are OK
  - `1.2.x` - any `1.2.*` version
- Understanding how we install and define dependencies
  - `package.json` defines our dependencies and versions
  - `package-lock.json` defines pinned (i.e., exact) versions we installed
  - For example, consider a dependency with version `^2.5.6` in `package.json`. When it get installed we might actually install `2.6.1` (which is compatible), and this version will get recorded in `package-lock.json`
- Supply Chain Security and Issues
  - We want to rely on other people to understand semver, use it correctly, and not try to hack us. We can't do this.
    - [Exploitable bugs](https://security.googleblog.com/2021/12/understanding-impact-of-apache-log4j.html)
    - [Ransomware](https://arstechnica.com/gadgets/2021/06/ransomware-striking-the-worlds-biggest-meat-producer-threatens-shortages/)
    - Developers sabotaging their own projects: [leftpad](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/), [colors and faker](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)
    - [Malware](https://therecord.media/malware-found-in-coa-and-rc-two-npm-packages-with-23m-weekly-downloads/) installed in unrelated packages
  - We need to verify and test and be vigilant
    - Automated Tests, Continuous Integration (coming in a few weeks)
    - Tools to analyze our dependencies, for example <https://deps.dev/>
- Be careful what you take on as a dependency
- Keep your tools and dependencies up to date
- Don't assume "new" versions are always better. Test!
