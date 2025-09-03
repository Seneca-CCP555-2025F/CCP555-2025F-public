# Cloud Computing for Programmers - Lecture 1: Course Introduction

## Lecture Video

<https://www.youtube.com/watch?v=i9_PFhnvxWg>

## Course Overview

Welcome to Cloud Computing for Programmers. This course is designed to teach you how to be a programmer in the age of AWS, focusing on leveraging cloud infrastructure to automate, deploy at scale, and create highly available applications.

### Course Philosophy

The course was designed with an industry-focused approach based on extensive consultation with professionals from various sectors including:

- Large companies (Airbnb, Netflix, Mozilla)
- Startups
- Government organizations
- Banking and energy sectors

## Key Industry Insights

### Universal Cloud Adoption

Everyone uses the cloud regardless of company size or sector. Cloud computing has become essential infrastructure, particularly highlighted during the pandemic when it enabled remote work and education. For perspective, Netflix spends more than $27 million per month on their AWS bill.

### Learning Challenges

The cloud is massive and can feel overwhelming. This is a steep learning curve that differs from traditional programming language acquisition. It requires a mix of skills and significant time investment, but with proper guidance and focus, it is achievable.

### Linux Dominance

The cloud is predominantly Linux-based due to economic factors. Linux is the primary operating system for cloud infrastructure deployment. While you don't need to use Linux as your desktop environment, comfort with Linux systems is essential.

### Language Agnostic Approach

The specific programming language matters less than understanding cloud deployment principles. AWS is technology agnostic, supporting Java, Python, Node.js, Rust, Go, and others. This course will use JavaScript/Node.js to build on existing web development skills rather than introducing additional language complexity.

### Version Control Requirements

Everything must be in Git. Industry professionals unanimously emphasized that all code should be version controlled, with production and staging systems feeding directly from Git repositories. GitHub will be used for all course activities.

### CI/CD Importance

Continuous Integration and Continuous Delivery are critical skills for junior developers. The course emphasizes automation over manual processes, using CI/CD pipelines to deploy and test applications automatically.

### Production-Ready Code

Code isn't valuable unless it runs in production. The transition from academic assignments to production-ready applications involves considerations of scale, error handling, logging, and security.

## Cloud Computing Fundamentals

### Infrastructure Philosophy

The cloud represents a shift from physical infrastructure to programmable infrastructure. Key concepts include:

- **Cattle vs. Pets**: Cloud resources are disposable and numerous (cattle) rather than individually maintained (pets)
- **Failure as Normal**: Everything fails constantly in the cloud; systems must be designed for resilience
- **Container-Based Deployment**: Most workloads run in containers using technologies like Docker

### Service Models

Cloud computing offers different levels of responsibility:

#### Infrastructure as a Service (IaaS)

- You manage: Operating system, runtime, data, applications
- Provider manages: Hardware, networking, storage, virtualization

#### Platform as a Service (PaaS)

- You manage: Data and applications
- Provider manages: Everything else including runtime and OS

#### Software as a Service (SaaS)

- You manage: Only your data and application configuration
- Provider manages: Entire stack

### Key Characteristics

1. **On-Demand Computing**: Pay-per-use model with elastic scaling
2. **Global Reach**: Applications are immediately accessible worldwide
3. **Security Focus**: Critical consideration for data protection and compliance
4. **Cost Variability**: Can be very cheap or very expensive depending on architecture

## Amazon Web Services (AWS)

### Market Position

AWS holds approximately 33% of the cloud market share, making it the largest cloud provider globally. While not necessarily the best, it is the most popular and widely adopted platform.

### Historical Context

AWS emerged from Jeff Bezos's 2002 mandate requiring all Amazon teams to:

- Communicate only through service interfaces
- Use network-based APIs exclusively
- Design all interfaces to be externally accessible
- Eliminate direct database access between teams

This philosophy transformed Amazon into an API-driven company, leading to over 200 AWS services today.

## Course Structure and Project

### Learning Approach

The course follows a "real world over tutorials" philosophy, emphasizing hands-on experience with actual cloud deployment rather than theoretical exercises. Students will build and maintain a single microservice throughout the entire semester.

### Project: Manufacturing Data Collection Microservice

Students will develop a microservice for a fictional Canadian manufacturing company that:

- Collects text and image data from various sources
- Provides REST API endpoints for data management
- Implements proper authentication and authorization
- Handles file storage and database operations
- Scales to handle multiple concurrent users

### Microservices Architecture

The project uses microservices architecture principles:

- **Loose Coupling**: Services communicate only through network APIs
- **Independent Deployment**: Each service can be deployed separately
- **Technology Independence**: Services can use different technology stacks
- **Scalability**: Individual services can scale based on demand

### Assessment Structure

- **10 Weekly Labs**: Hands-on exercises building course concepts
- **3 Major Assignments**: Comprehensive evaluations at months 1, 2, and 3
- **Continuous Development**: Single project developed and maintained throughout the semester

### Collaboration Guidelines

- Use private GitHub repositories with instructor access
- Participate in GitHub Discussions for questions and support
- Individual work required - no code sharing between students
- Focus on understanding rather than copying code, using AI
- Emphasis on production-ready, maintainable code

## Expectations and Support

The course will be challenging but supportive. Students are expected to:

- Embrace failure as part of the learning process
- Ask questions when stuck
- Maintain code throughout the semester
- Focus on understanding rather than just completion

Students will be supported to develop real-world cloud computing skills that are immediately applicable in industry settings.
