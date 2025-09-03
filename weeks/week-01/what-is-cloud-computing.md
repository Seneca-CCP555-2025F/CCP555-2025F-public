# What is Cloud Computing?

Cloud computing allows everyone, from single-person startups to the largest companies in the world, to develop and deploy software that meets the evolving, real-world needs of their customers, all without having to purchase and maintain their own hardware (and software).

Cloud computing is about rethinking the way we conceptualize computing resources. Instead of interacting directly with physical servers, storage, network and other devices, we work with computing and application resources as managed services over the internet. Where hardware used to be _physical_, the cloud makes everything (compute, storage, networks) _programmable_.

It's often said that the cloud is "someone else's computer," and this is true! The cloud lets us provision, deploy, and work with machines in remote data centres from anywhere in the world. The backbone of cloud computing is the network. Understanding how TCP, HTTP, the web, and various other networking protocols work is critical to understanding the cloud.

In the early 1980s, John Gage from Sun Microsystems said that ["The network is the computer."](https://blog.cloudflare.com/john-gage/) Today, with cloud computing, this is more true than ever before.

## On-Premises (on-prem) vs. Cloud

It used to be that companies had to purchase, set up, and maintain their own racks of servers. Many companies still do this, and we refer to such setups as "on-premises" (or "on-prem"). There are a pros and cons to this approach. Obviously, a major pro is that you own and control everything. Ironically, this also turns out to be a major con. Consider:

- it's hard to scale accurately. You have to buy and provision what you _might_ need for peek demand vs. what you _actually_ need day-to-day. This up-front cost means resources aren't efficiently deployed, and will likely sit idle (or will turn out to be too little for real demand). Cloud computing replaces capital expenses with variable expenses: you pay for what you use as you need it.

- physical hardware has physical needs. It has to be housed, powered, cooled, and maintained constantly. It also has to be replaced, since it depreciates and fails.

- hardware needs software. Once you have the physical hardware installed, the software that powers it has to be installed, configured, tuned, and constantly updated.

As a result, "on-prem" means extra capital costs in the form of labour and up-front/on-going maintenance. Cloud computing allows businesses to outsource their IT infrastructure and focus on their applications and data. Where it used to be that IT was a niche business, cloud computing has transformed our economy, and today every company is a software company.

Cloud computing changes how we think about the cost of running services. Instead of buying everything outright, cloud resources are available via a self-serve, on-demand model. They can be rapidly provisioned and scaled, require little to no management, and are priced based on usage; think about how we consume electricity as a useful analogy.

## Who are the Major Cloud Vendors?

The top cloud providers are [Amazon (AWS)](https://aws.amazon.com/), [Microsoft (Azure)](https://azure.microsoft.com/en-ca/), and [Google (GCP)](https://cloud.google.com/). It's helpful to compare how these different vendors define "cloud computing" in their own words.

Take a few minutes to read through the high-level overviews of cloud computing by the each of the major vendors, and compare and contrast their approaches:

- Amazon Web Services (AWS)
  - [What is Cloud Computing](https://aws.amazon.com/what-is-cloud-computing)
  - [Types of Cloud Computing](https://aws.amazon.com/types-of-cloud-computing/)
- Microsoft Azure
  - [What is Cloud Computing](https://azure.microsoft.com/en-ca/overview/what-is-cloud-computing/)
  - [Examples of Cloud Computing](https://azure.microsoft.com/en-us/overview/examples-of-cloud-computing/)
  - Types of Cloud Computing
    - [Infrastructure As A Service (IaaS)](https://azure.microsoft.com/en-us/overview/what-is-iaas)
  - [Platform As A Service (PaaS)](https://azure.microsoft.com/en-us/overview/what-is-paas/)
  - [Software As A Service (SaaS)](https://azure.microsoft.com/en-us/overview/what-is-saas/)
- Google Cloud Platform (GCP)
  - [What is Cloud Computing](https://cloud.google.com/learn/what-is-cloud-computing)
  - Types of Cloud Deployment
    - [Infrastructure As A Service (IaaS)](https://cloud.google.com/learn/what-is-iaas)
    - [Virtual Machines (VM)](https://cloud.google.com/learn/what-is-a-virtual-machine)
    - [Containers](https://cloud.google.com/learn/what-are-containers)
  - [Microservices](https://cloud.google.com/learn/what-is-microservices-architecture)

Based on the readings above, how would you define the following terms? Try to come up with a few sentences to describe each (e.g., imagine you're in an interview or speaking with a colleague who wants to know more):

- Cloud Computing
- IaaS
- PaaS
- SaaS
- VM
- Container
- Microservice

It will be interesting to see your definitions change over the coming months, as you go deeper into all of these topics.

> [!NOTE]
> In this course, we will be focusing on the largest and most popular cloud provider, Amazon Web Services (AWS). However, it's useful to know about all of the options available, since so much of the knowledge of how to use one will carry over to another. Whenever possible, we will be using development techniques that work across all cloud vendor offerings.

## Cloud Benefits

As cloud computing has matured, and the needs of customers expanded, the cloud offerings available have grown to meet demand. As we have just learned above, there are many different ways to use cloud computing:

1. Infrastructure as a Service (IaaS) - on-demand use of virtual computing infrastructure (servers, networks, storage). IaaS provides the most control and flexibility over cloud computing resources. Need to use lots of CPU cycles to calculate something? Need massive amounts of RAM to process a dataset? Need to parallelize an algorithm across hundreds of machines with fast networking? No problem, you can rent as much or as little as you need, billed by the second.

2. Platform as a Service (PaaS) - on-demand use of pre-configured platforms (operating systems or other application/server software). Need to deploy an application on-top of a pre-configured environment, and don't want to worry about the underlying hardware, operating system, or server configuration and security? No problem, you can deploy on all manner of platforms without worrying about anything underneath your application. A good example of what PaaS looks like that you've all used before is Heroku.

3. Software as a Service (SaaS) - on-demand use of a particular software application, without worrying about hardware, operating system, configuration, etc. Need to use a database, but don't want to set-up, scale, secure, and maintain it? No problem, you can use as much or as little as you need, and get billed by the amount of data you store. Consider another example you're already familiar with: Office365, on-demand access to Word, Excel, etc.

Cloud computing offers incredible flexibility and scale:

- eliminate procurement, maintenance, capacity planning: use and pay for what you need when you need it.

- ability to try things and innovate faster: You can leverage existing services in order to build new systems, without having to create everything from scratch. The cloud and cloud services are a lot like Lego bricks that you can snap together to make new creations.

- faster time to deploy: It takes seconds to provision new resources, and existing resources can be shut-down or terminated just as quickly.

- elasticity: you don't need to plan perfectly up front for your system's demand, and can scale it up or down at any time, and to it immediately.

- global access: deploying around the world in different regions simultaneously

## Cloud Risks

Cloud computing also comes with some new or expanded risks:

- security: moving all of your code, applications, and data to someone else's systems means new exposure that has to be understood and managed. The cloud means always running your business on "someone else's computer."

- cost: there is a tremendous difference between the cost of owning and managing your own equipment vs. renting cloud resources on-demand. Cloud infrastructure can be cheaper, but costs can also skyrocket with poor architectural choices leading to unintended usage. Cloud computing requires companies to pay close attention to what they are spending, and continually look for ways to save.

- vendor lock-in: all clouds are proprietary, and choosing one means adapting your workflows, tooling, and knowledge to use their services. Moving between clouds, or using multiple clouds at once is possible, but complicated. Being careful about which aspects of the cloud you choose can help mitigate this.
