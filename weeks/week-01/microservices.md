# What is a Microservice?

As we learn about cloud computing in this course, we're also going to be talking a lot about microservices. A [Microservice is an architectural pattern](https://microservices.io/patterns/microservices.html) that has [emerged in the past decade of cloud computing](https://trends.google.com/trends/explore?date=all&q=%2Fm%2F011spz0k). Companies like Amazon, Google, and Netflix build and run thousands of Microservices to create their services. Microservices formalize many of the ideas that came out of service-oriented architectures that companies like Amazon made popular (see [Jeff Bezos infamous "memo"](https://chrislaing.net/blog/the-memo/)).

Microservices are a reaction to [Monolithic systems](https://microservices.io/patterns/monolithic.html), which are the more traditional type of system. A monolith combines all aspects of an application (front-ends, back-end, database, authentication, APIs) into a single application. A microservice splits this single application into a series of smaller pieces, and has them communicate with each other over the network (e.g., HTTP). Cloud-based systems make extensive use of distributed, networked applications like this in order to scale and provide high availability.

Both approaches have benefits and disadvantages, and one isn't "correct" and the other "incorrect." Different teams and problems will demand different approaches. Having said that, we aim to explore microservices in this course as a way of learning cloud development. As a result, let's examine some of the down-sides of the monolith:

## Downsides of Monoliths

- Monolithic applications are large. Becoming productive in the code requires a significant investment of time, and modifications can be hard to make. For example, it can be difficult to reason about the different parts of the system that will be affected by a change.
- As the monolithic app and code grows, the tooling required to work on it gets stressed. Your IDE is slower, your builds take longer, tests run forever, startup is slow.
- The monolith makes it harder to deploy small changes: everything has to get re-deployed (it's all or none).
- Scaling the monolith means scaling everything, even if only one part requires it. Our only option for growth is to scale horizontally (i.e., run multiple copies of the entire app).
- It's difficult to experiment with, or mix different technologies. What if part of the app could best be written in language A and another that is performance critical in language B? It's hard to do this in a single app.

## Benefits of a Microservice

- Microservices are as small as possible (which isn't the same as saying that they are "small"). We often decompose (break-down) a larger monolithic system into smaller microservices.
- They are easier to understand and modify, so adding developers is less painful. (NOTE: the complexity of the entire app doesn't disappear, it's just spread across various microservices. We can't get rid of complexity completely)
- Microservices hide their implementation details behind a public API (e.g., REST), which is the way that the rest of the app interacts with the service (i.e., microservices are **Loosely Coupled** from the rest of the system, where Monoliths are **Tightly Coupled**).
- Because the API hides the inner workings of the service implementation, each service/team can use the most appropriate technology for the job (microservices can be assembled from pieces written in different languages, using different frameworks, etc). Also, as long as you don't break the API, the rest of the system isn't really affected by the internals of the service.
- Microservices can be tested, deployed, and scaled in isolation from the rest of the system (note: testing the interaction of the entire system is still required, we haven't eliminated all complexity, just moved it).

## Conclusion

In summary, microservice can be easier to understand, maintain, test, deploy, and scale for a small team. In this course you'll have a chance to develop, test, and deploy a microservice in various environments.

Microservices can be written in almost any language and framework, and we'll use node.js to build ours, just as [many other big companies do](https://trio.dev/blog/companies-use-node-js).
