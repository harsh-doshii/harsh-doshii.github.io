+++
title = "22. Microservices Communication - Synchronous"
date = 2023-11-21

+++

When designing a MS architecture, one of the primary questions is how will you make the services talk to each other? There are two communication patterns for this - Sync and Async.

Synchronous Communication is basically an API call. You ask server and wait for response. 

Request made from one service to another is Blocking in nature. What does that mean?
Let's say your MS journey is:
API 1 --> API 2 --> API 3 --> Database
Here, API 1 is blocked till all the endpoints are hit and responses have been given.
Blocking call guarantees completeness. 

Most Sync Communication paradignms are based on HTTP like REST, GraphQL and gRPC. 
(REST, GraphQL and gRPC are built on top of HTTP and HTTP is built on top of TCP)

Advantages of Sync Communication:
1. Happens in real-time, it can't be deferred, the call has to be completed (either success or failure).

Disadvantages of Sync Communication:
1. The caller is blocked until repsonse is received. This blocking time keeps adding up.
2. The servers need to be proactively provisioned for peaks. What if we are shooting requests but there are not enough servers? In the case, the latency will skyrocket.
3. Danger of cascading failures. Because there is a chain of components that are talking synchronously, if one service fails, it might cause all to fail. To stop this, we need circuit-breakers in the path. 
4. Creates a very strong coupling between MS. Things like change in versions, contract and all we have to ensure backward compatibility. MS should ideally be loosely coupled. 

When should you ideally use Sync Communication?
1. When you absolutely need a response before proceeding ahead.
2. When you want real time response like chats, payments.
3. When it takes relatively less time to get API response.

Knowledge credits: [Asli Engineering by Arpit Bhayani](https://www.youtube.com/watch?v=ewUw0sUxHI4).
