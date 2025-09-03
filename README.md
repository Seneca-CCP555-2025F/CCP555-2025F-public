# Cloud Computing for Programmers

## Course Description

This course builds on knowledge gained in previous courses and provides an overview of important software development, testing, and deployment practices in the cloud. The popularity of cloud computing platforms like Amazon Web Services (AWS), Microsoft Azure, and others has changed the way that software developers write, test, and deploy their applications. Many new technologies, architectural patterns, tools, and best practices have evolved along with the capabilities of the cloud. Through hands-on labs and real-world projects, students will explore modern approaches to building distributed, reliable, and scalable applications in the cloud.

## Course Schedule

| Week                                    | Topics                                                                                                                                                                                                                               | Assessment and Weight                                                                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| [Week&nbsp;01](weeks/week-01/README.md)<br>Sept 1-7, 2025 | <ul><li>Course Intro<li>What is Cloud Computing?<li>Amazon Web Services (AWS)<li>Microservice Project</ul>                                                                                                                           | [Lab 1](labs/lab-01/README.md) (4%)<br><br>[Assignment 1](assignments/assignment-01/README.md) Released (15%)                           |
| [Week&nbsp;02](weeks/week-02/README.md)<br>Sept 8-14, 2025 | <ul><li>AWS Academy Learner Lab<li>The AWS Management Console<li>Example: Amazon Cognito User Pool for secure user auth<li>Defining and Using Environment Variables to Configure Apps</ul>                                           | [Lab 2](labs/lab-02/README.md) (4%)                                                                                                     |
| [Week&nbsp;03](weeks/week-03/README.md)<br>Sept 15-21, 2025 | <ul><li>Git and GitHub Fundamentals<li>Git Workflow Review<li>Continuous Integration (CI) and Unit Testing<li>Set up CI Workflow with GitHub Actions</ul>                                                                            | [Lab 3](labs/lab-03/README.md) (4%)                                                                                                     |
| [Week&nbsp;04](weeks/week-04/README.md)<br>Sept 22-28, 2025 | <ul><li>Introduction to Amazon Elastic Compute Cloud (EC2)<li>Common commands and tools for working with EC2 and Amazon Linux (2023) securely<li>Running a node.js server on EC2</ul>                                                | [Lab 4](labs/lab-04/README.md) (4%)                                                                                                     |
| [Week&nbsp;05](weeks/week-05/README.md)<br>Sept 29 - Oct 5, 2025 | <ul><li>Introduction to Docker and Containers<li>Container Registries<li>Pulling, Running and Managing Images and Containers with Docker</ul>                                                                                        | [Assignment 1](assignments/assignment-01/README.md) Due (15%)<br><br>[Assignment 2](assignments/assignment-02/README.md) Released (15%) |
| [Week&nbsp;06](weeks/week-06/README.md)<br>Oct 6-12, 2025 | <ul><li>Authoring Dockerfiles<li>Containerizing a node.js app<li>Building a Docker Image</ul>                                                                                                                                        | [Lab 5](labs/lab-05/README.md) (4%)                                                                                                     |
| [Week&nbsp;07](weeks/week-07/README.md)<br>Oct 13-19, 2025 | <ul><li>Containers Continued<li>Docker Best Practices<li>Advanced Dockerfile concepts<li>Optimizing Containers<li>Pushing to Container Registries<li>Running Containers on EC2</ul>                                                  | [Lab 6](labs/lab-06/README.md) (4%)                                                                                                     |
| Study Week<br>Oct 20-26, 2025                                         | Study Week                                                                                                                                                                                                                           |                                                                                                                                         |
| [Week&nbsp;08](weeks/week-08/README.md)<br>Oct 27 - Nov 2, 2025 | <ul><li>Continuous Delivery (CD) with Containers<li>Working with Secrets in GitHub<li>CD Pipeline to automatically Build, Tag, and Push an Image to a Container Registry on every git push<ul>                                       | [Lab 7](labs/lab-07/README.md) (4%)                                                                                                     |
| [Week&nbsp;09](weeks/week-09/README.md)<br>Nov 3-9, 2025 | <ul><li>Introducing AWS Managed Services: Elastic Container Service, S3, DynamoDB<li>Set up Elastic Container Service Clusters<li>CD Pipeline to automatically Deploy a Container to Elastic Container Service on every git tag</ul> | [Assignment 2](assignments/assignment-02/README.md) Due (15%)<br><br>[Assignment 3](assignments/assignment-03/README.md) Released (30%) |
| [Week&nbsp;10](weeks/week-10/README.md)<br>Nov 10-16, 2025 | <ul><li>Using `docker compose` to create an integrated environment from multiple containers<li>Integration Testing<li>`docker compose` for local development<li>Simulating AWS (S3, DynamoDB) offline in development</ul>            | [Lab 8](labs/lab-08/README.md) (4%)                                                                                                     |
| [Week&nbsp;11](weeks/week-11/README.md)<br>Nov 17-23, 2025 | <ul><li>AWS Managed Services Continued<li>Using the AWS CLI and SDKs to interact with AWS services<li>Amazon Simple Storage Service (S3)<li>Simulating S3 locally with `docker compose`</ul>                                         | [Lab 9](labs/lab-09/README.md) (4%)                                                                                                     |
| [Week&nbsp;12](weeks/week-12/README.md)<br>Nov 24-30, 2025 | <ul><li>AWS Managed Services Continued<li>Amazon DynamoDB<li>Simulating DynamoDB locally and in CI with `docker compose`</ul>                                                                                                        | [Lab 10](labs/lab-10/README.md) (4%)                                                                                                    |
| [Week&nbsp;13](weeks/week-13/README.md)<br>Dec 1-7, 2025 | <ul><li>AWS Managed Services Continued<li>Infrastructure as Code (IaC) and Cloud Formation</ul>                                                                                                                                      |                                                                                                                                         |
| Week&nbsp;14<br>Dec 8-14, 2025                            | <ul><li>Course Conclusion</li></ul>                                                                                                                                                                                                  | [Assignment 3](assignments/assignment-03/README.md) Due (30%)                                                                           |

## Learning Outcomes

1. Compare the major cloud service architectures (IaaS, PaaS, SaaS, Serverless) and select the best option for a particular client need
2. Explain the role of revision control and repositories in the cloud development lifecycle
3. Containerize applications in order to simplify, standardize, and secure deployments across development, test, and production environments
4. Employ continuous integration (CI) and continuous deployment (CD) as a software development methodology to ensure software quality and enable automation
5. Manage project security across various environments to secure applications and data
6. Build applications suitable for scaling in the cloud to meet the needs of customers
7. Implement a production-ready microservice to demonstrate service-oriented architectures as a cloud design pattern

## Essential Employability Skills

- Use a variety of thinking skills to anticipate and solve problems
- Version source code using git and GitHub
- Analyze, evaluate, and apply relevant information from a variety of sources, in particular: official technical documentation
- Authenticate and Authorize users securely
- Develop, debug, and deploy apps in cloud environments
- Understand how to develop, debug, and run software locally, in GitHub Actions, and in the cloud using containers
- Work with container registries and repositories
- Apply best practices for creating secure, optimized containers
- Manage the use of time and other resources to complete projects as a series of milestones
- Script installations and automation using common Linux commands
- Implement data storage using managed cloud services
- Combine a mix of server-based and serverless architectures
- Develop software using cloud APIs and SDKs
- Develop automatic integration and deployment workflows
- Take responsibility for one's own actions, decisions, and consequence

## AWS Academy Learner Lab Instructions

### Lab Environment Overview

- Students will use the AWS Academy Learner Lab to complete assignments involving provisioning virtual machines (EC2 instances).
- All EC2 instances are **automatically stopped and reset every 4 hours**. However, data is preserved between sessions.
- To resume work, students must:
  1. Re-authenticate on the AWS Academy portal.
  2. Refresh their AWS session.
  3. Restart their EC2 instance.

🔍 **For detailed steps, please refer to the README provided in the Learner Lab environment.**

---

## Assignment Submission Guidelines

### Submission Format

- Submit a **PDF document** for each assignment.

### Documentation Requirements

Your PDF must include:

- All relevant **screenshots**.
- **Explanations** of your process and decisions.
- Any **diagrams or illustrations** that help explain your work.

### Detail & Clarity

- Ensure your documentation is **thorough and detailed** so the process and results are easy to follow and understand.

### GitHub Instructions

You do **not** need to:

- Add the professor as a collaborator on GitHub.
- Submit your source code separately.
# Contributors Update
