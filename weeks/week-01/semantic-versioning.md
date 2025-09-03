# Supply Chain Security and Semantic Versioning

## Lecture Video

<https://www.youtube.com/watch?v=FzEX-xttHBk>

## Introduction

Supply chain security and semantic versioning (SemVer) are two critical concepts for modern software development. As we build microservices and work with cloud development, we will be using numerous dependencies and constantly deploying software. Understanding how to manage versions, dependencies, and security considerations is essential for maintaining robust, secure applications.

## Understanding Semantic Versioning

### What is Semantic Versioning?

Semantic versioning is a standardized approach to version numbering used by many package management systems. Understanding how these numbers work makes it easier to comprehend what you're doing when managing dependencies.

### Version Number Structure

A semantic version number consists of three parts: **MAJOR.MINOR.PATCH**

For example, in version `2.1.3`:

- **Major version**: 2
- **Minor version**: 1
- **Patch version**: 3

### Version Types and Their Meanings

#### Major Version Changes

- Represents a **breaking change** or **API change**
- Examples include:
  - Removing REST API routes
  - Changing how existing routes work
  - Requiring new arguments that weren't needed before
- When bumping major version, reset minor and patch to zero
- Example: `2.5.6` → `3.0.0`

#### Minor Version Changes

- Represents **backwards compatible changes**
- Typically involves adding new features
- Existing code should continue to work
- When bumping minor version, reset patch to zero
- Example: `2.5.6` → `2.6.0`

#### Patch Version Changes

- Represents **backwards compatible bug fixes**
- No new features added or removed
- No API breaking changes
- Examples include:
  - Documentation updates
  - Dependency updates
  - Bug fixes in existing functions
- Example: `2.5.6` → `2.5.7`

### Version Immutability

Once you publish a version, you **never change it**. If you discover a bug in version `1.0.0`, you must fix it and release `1.0.1`. This principle ensures consistency and reliability in the software supply chain.

## NPM Version Specifications

### Version Pinning Options

When specifying dependencies in `package.json`, you have several options:

#### Exact Version

```json
"express": "4.18.1"
```

Only accepts exactly that version.

#### Tilde (~) - Patch Updates

```json
"express": "~4.18.1"
```

Accepts any **patch** level changes (4.18.2, 4.18.5, etc.).

#### Caret (^) - Minor and Patch Updates

```json
"express": "^4.18.1"
```

Accepts any **minor** or **patch** version changes (4.20.0, 4.185.31, etc.), but not major version changes.

## Package Lock Files

### The Importance of Lock Files

The `package-lock.json` file serves as the **source of truth** for dependency versions. When you run `npm install` for the first time, NPM:

1. Parses the `package.json` file
2. Determines which versions to install based on your specifications
3. Downloads dependencies to `node_modules`
4. Creates `package-lock.json` with exact versions installed

### Production Deployments

For production deployments, use `npm ci` instead of `npm install`:

- **npm ci** is designed for automated environments
- Uses the lock file _exclusively_, ignoring `package.json` version ranges
- Significantly faster than `npm install`
- Ensures consistent installations across environments

### Version Control Best Practices

Always commit both files to version control:

- `package.json` - Defines your dependency requirements
- `package-lock.json` - Locks specific versions for reproducible builds

## Supply Chain Security Considerations

### The Software Supply Chain

Just as physical supply chains can be disrupted, software supply chains face similar vulnerabilities. We depend on frameworks, modules, libraries, tools, and platforms created by others, making security a shared responsibility.

### Common Security Threats

#### Outdated Dependencies

- **Example**: Log4j vulnerability in Java logging library
- **Risk**: Missing critical security patches
- **Mitigation**: Regular dependency updates

#### Malicious Code Injection

- **Example**: Ransomware in NPM packages
- **Risk**: Code that compromises systems after installation
- **Mitigation**: Careful dependency vetting

#### Developer Sabotage

- **Example**: LeftPad deletion incident
- **Risk**: Developers removing or sabotaging their own code
- **Impact**: Widespread application failures

#### Malware Distribution

- **Examples**: Bitcoin miners, wallet theft attempts
- **Risk**: Unauthorized resource usage or data theft
- **Mitigation**: Dependency auditing and monitoring

### Evaluating Dependencies

#### Healthy Project Indicators

- Regular updates and releases
- Active issue tracking and pull requests
- High download numbers
- Recent commit activity
- Clear maintenance status

#### Warning Signs

- Deprecation notices
- No recent updates
- Security warnings during installation
- Abandoned maintenance

#### Tools for Evaluation

- **NPM Trends**: Compare package popularity and maintenance
- **GitHub Releases**: Review changelogs and commit history
- **Package pages**: Check download statistics and update frequency

## Best Practices for Dependency Management

### Version Management Strategy

1. **Understand SemVer**: Know what each version change means
2. **Start conservatively**: Begin with version `0.0.1`, not `1.0.0`
3. **Review changelogs**: Read what changed between versions
4. **Test thoroughly**: Use automated testing to verify compatibility

### Security Practices

1. **Regular audits**: Review dependencies periodically
2. **Avoid deprecated packages**: Replace deprecated dependencies promptly
3. **Monitor security advisories**: Stay informed about vulnerabilities
4. **Implement automated testing**: Ensure changes don't break functionality

### Update Strategy

- **New isn't always better**: Evaluate the need for updates carefully
- **Stable is valuable**: Don't update working software unnecessarily
- **Security updates are critical**: Prioritize security-related updates
- **Test before deploying**: Verify updates in development environments

## Conclusion

Supply chain security and semantic versioning are fundamental aspects of modern software development. By understanding these concepts, you can make informed decisions about dependencies, maintain secure applications, and communicate changes effectively through proper versioning. As we progress through cloud development, these principles will become increasingly important for maintaining robust, secure, and maintainable applications.

Remember: every dependency you add becomes part of your responsibility to maintain and secure. Choose wisely, update carefully, and always test thoroughly.
