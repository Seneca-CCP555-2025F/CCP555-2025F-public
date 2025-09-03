# Course Design and Introduction

This course was created through extensive consultation with many industry people working in cloud technology, including former Seneca students, people working at Canadian companies of all sizes (e.g., startups to Shopify, Scotiabank, and Telus), as well as global companies (e.g., Netflix, Airbnb, Apple, Twitter, Mozilla). Together their suggestions and advice formed a useful picture of the cloud computing skills developers need as they begin to understand this vast ecosystem.

## Major Topics

These are the high-level topics we'll explore during the course (see the [Course Schedule](../../README.md#course-schedule) for a more complete picture):

1. Introducing Cloud Computing and AWS
2. Developing, debugging, testing, and deploying REST APIs and Microservices
3. Unit and Integration Testing, Cloud Service Mocking
4. git, GitHub, and CI/CD Pipelines
5. Working with Cloud Compute VMs (EC2) and Linux
6. Working with Docker Containers and Container Registries
7. Containerizing node.js Apps
8. Deploying Containers to the Cloud
9. Managing environments and secrets across dev, test, CI, and production
10. Provisioning and Integrating Managed Services (S3, DynamoDB, Cognito, etc)

This also list _excludes_ many topics, due to time and resource constraints. Some important topics that you should know about, but we won't examine directly in this course include:

1. **[Kubernetes](https://kubernetes.io/) (aka k8s)** and container orchestration. Everyone I spoke with said, "Kubernetes is taking over the world," and also, "Do NOT try to teach it in 14 weeks! It's too hard, even for industry." After you've learned docker and containers in general, advancing to Kubernetes might be a next logical step.
2. **Operations, Ops, or DevOps**. While some people focus on cloud provisioning, scaling, and operations, we will be focused on how developers can prepare their code to work in cloud environments. Our developer focus will mean that many administrative cloud topics aren't within scope, for example, networking, scaling, and other infrastructure design and implementation. If you're interested in this topic, [Google has some excellent, free books on the subject](https://sre.google/books/).
3. **Cloud Cost Optimization**. We are going to be protected, and limited, by the AWS Learner Lab sandbox environment. Students won't have to give a credit card, and therefore can't make a mistake that costs them thousands (or hundreds of thousands) of dollars. However, this protected environments limits our ability to explore certain services or scenarios. It's a trade-off that likely works in our advantage, but means we won't be as cost-focused as we could be.
4. **Serverless** (i.e., [Lambda Functions](https://aws.amazon.com/lambda/)). We will be using many "serverless" AWS services; but the AWS Learner Lab doesn't support HTTP serverless functions. Most of the people I spoke with said that serverless is an emerging/interesting approach, but less important than understanding containers. If you want to experiment with AWS Serverless Functions, I would recommend creating some free apps using <https://workers.cloudflare.com/>.

## Cloud Computing: What Should We Teach?

The following is a list of the types of topics, skills, and ideas that were mentioned by many of the industry experts.

- Everyone uses the cloud:
  - Shopify uses Google Cloud Platform for global infrastructure
  - Netflix uses AWS. They are the largest AWS customer, and [estimate they will spend ~$27 Million USD per month in the next two years](https://www.cloudzero.com/blog/netflix-aws)!
  - Airbnb uses AWS (~$16 Million USD per month)
  - Slack uses AWS (~$6.25 Million USD per month)
  - BMO just signed a [major deal with AWS](https://www.bloomberg.com/news/articles/2021-06-10/bmo-signs-deal-with-amazon-web-services-to-help-digital-shift)
  - People use all different clouds, but most people I spoke with said, "focus on a single cloud," which is why we're doing AWS.
- Because everyone uses the cloud, having cloud experience as a student is key to getting good jobs after graduation.
- The cloud is enormous. Learning the cloud as a whole is impossible, in this class, or any. You will feel overwhelmed by it, and should know that everyone else does too.
- The cloud is primarily Linux (due to cost), and knowing how to use Linux well is crucial
- Similarly, comfort with the command line is important too. The cloud is glued together and automated with command-line scripts.
- The programming language you use isn't as important as the ideas and cloud underneath it. Using node.js, Python, etc. are all fine (Netflix, Telus, and others). Everything works in the cloud. Your best bet is to focus on a language you already know, and add cloud to that vs. starting from scratch.
- Knowing how to use version control (git, GitHub) is critical
  - Mozilla, Airbnb, Shopify and others all stressed the importance of having students become comfortable with git and GitHub workflows, which is how they all build software.
  - "Everything in source control. Period. Always." (Netflix)
  - "Force every student to submit their work via a running cloud instance deployed via git/GitHub/CI/CD. This is very real-world." (Netflix)
  - Airbnb stressed the importance of understanding how software changes are proposed, built, tested, and deployed using git. The entire lifecycle of a software feature or fix is contained within git.
  - "The cloud is cattle, not pets." You can't log into a cloud instance and "tweak" things. You have to do it all via code and deployment scripts, then re-deploy (Netflix)
- Connected with this is the idea of using Continuous Integration (CI) and Continuous Deployment (CD) pipelines
  - "CI/CD is critical for a junior dev to understand"
  - pipelines let us automate and test our systems, so we know when things break, and can identify when updates to part of a system affect another
  - cloud-based deployments are all based on CI/CD pipelines
  - "'It works on my computer' isn't useful" (Netflix)
  - "Your code isn't useful if it isn't running in production" (Mozilla)
  - You need to learn about what happens _after_ you write your code (Scotiabank)
  - A big part of modern CI/CD pipelines involves using and understanding containers
- Containers
  - Managing servers by hand is becoming less and less common. Automation via code drives everything in the cloud.
  - Need for "immutable environments" and "isolation" (in development, in testing, in production)
  - Containers have taken over as a way to develop, test, and deploy applications, and most cloud workloads are executed in containers (Mozilla, Airbnb)
  - Being able to use docker is a key skill
- Managed Cloud Services
  - Knowing about Raw Infrastructure vs. Managed Services. We'll use both.
  - You need to work with cloud instance VMs, Containers, and Managed Services (Netflix)
  - The cloud's "secret sauce" are managed services built on top of raw compute/storage offerings. "They are like lego bricks that you combine to build a larger whole." (Airbnb)
- Security becomes a central concern with the cloud because we rely on so much community supported open source hosted on public registries.
  - We need to use tools to scan for security risks. Static Analysis tooling to help us stay on top of a changing ecosystem. as all of your services run on other machines across the internet
  - Supply Chain Security affects dependencies, tools, OS, and apps
    - Google has a great tool for viewing these: <https://deps.dev/>
  - Example: <https://therecord.media/malware-found-in-coa-and-rc-two-npm-packages-with-23m-weekly-downloads/>
  - Example: <https://blog.sonatype.com/newly-found-npm-malware-mines-cryptocurrency-on-windows-linux-macos-devices>
  - Example: <https://arstechnica.com/information-technology/2021/12/the-critical-log4shell-zero-day-affects-a-whos-who-of-big-cloud-services/>
- We need to understand how to manage and use secrets in cloud deployments
- Logging and observability are important, especially as apps scale
  - Logs have to be searchable, readable by tools
  - Structured JSON Logs help with this
  - No one can/will read all the logs, only search for things within them after the fact (e.g., errors), or have alerts set up to contact you.
  - You have to add appropriate logging so that you can debug a problem after it has happened
- Privacy and data matter more in the cloud, because your data is **literally** in the cloud now:
  - Importance of asking yourself whether you can avoid asking for/storing data (what if there's a breach and it gets exposed?)
  - How logging is another kind of data storage, and how to be careful about storing and exposing users' Personally Identifiable Information (PII)
- The cloud demands that we build software differently:
  - Decoupling vs. Monolithic
  - Small, independent units that scale: elasticity, load balancing
  - "everything is failing constantly" - design for failure. "First rule of the cloud: everything is failing constantly." (Mozilla)
  - everything needs to be configurable for different environments
  - structured logging to observe and debug running systems
- Cost
  - You are charged for everything you do in the cloud, and you have to understand how to avoid getting massive bills by being careless.
  - You need to be mindful of how much you're spending, and constantly optimize/reduce your bill.
  - The cloud makes it easy to throw money at a problem (scaling) vs. solving things by fixing how you do it.
  - Cost things out to figure out what's cheapest (run your own service or use a managed one, either could be cheaper depending on your needs)
  - Hybrid approaches are common (on-premises, self-hosted in the cloud, managed services) due to cost.
