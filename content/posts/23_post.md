+++
title = "23. Microservices Communication - Asynchronous"
date = 2023-11-22

+++

Async Communication goes like this:

Service A --> message buffer/broker --> Service B

Because of the presence of a buffer, there are no cascading failures. This communication is non blocking! Few examples of brokers are Kafka, SQS, RabbitMQ, pub/sub, etc. 

Advantages:
1. Services need not wait for the response! Service A has the job of putting the message in the buffer and done - nothing more to do. While in Case of Sync Communication, Service A would've to wait for a response from Service B. Hence, Service can handle spikes in traffic better.
2. No need of pro-active scaling. We can scale whenever we see the buffer is getting full. We get a strong decoupling between communicatinfg microservices.
3. No need of load-balancers or extra components. So less network hops hence less latency.
4. We have better control over failures.

Disadvantages:
1. Eventual Consitency: Because of a broker, there is no "real-time" consumption of messages.
2. Broker becomes a single point of failure.
3. Sometimes it becomes difficult to track the flow of communication.

When should you ideally use Sync Communication?
1. When delaying response is okay, we don't need real time.
2. When the job at hand is long-running e.g. we are provisioning an EC2 server. let's say which take 10 mins. You won't wait for 10 mins in case of API waiting. Hence here Async is better.
3. When multiple servers 'react' to same event. E.g. You can put the messages in three different message queues for them to carry on.
4. When it is okay to allow failures and retry.

Knowledge credits: [Asli Engineering by Arpit Bhayani](https://www.youtube.com/watch?v=ewUw0sUxHI4).
