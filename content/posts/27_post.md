+++
title = "27. Stateful vs Stateless Architecture"
date = 2023-11-26

+++

Let's start with taking the example of accessing an ecommerce website.

When the user types in the URL, it goes to DNS and then the Web Tier (web servers) and then to the Comapny's Database for resources.

User --> Web Tier --> DB Tier

Let's say there are multiple users trying to access the website. All these users will not necessarily hit the same server right? The servers are distributed. Let's take this case:

User A --> Server A ----> DB

User B --> Server B ----> DB

User C --> Server C ----> DB

(DB is the same in all cases)

Now in the case of a stateful architecture: User data is stored in the server. This user data (state) maybe things like profile data, session data, etc. State of the user is stored in the server and not the DB.

Now let's say ther Server A goes down. Now User A will have to connect to Server B or C, which can be easily done, but all the progress will be lost! User A will have to login again, add products to cart again and so on. This is a fundamental problem with stateful architecture. 
So there is availibilty issue and scalability is a concern.
We can't scale horizontally, because even if we add more physical servers, the state will still be in just one server, so it is no point. 

Now in Stateless architecture, we don't mantain the state of a user in any server, we save it in a shared storage like cache or database. 

User A, B, C --> Load Balancer --> Web Servers --> Cache/DB

The state of users is stored in Cache/DB. 

It's important to know that Microservices (which are mostly containerised) are always stateless in nature. You can't containerize stateful applications. Statelessness is about a self-contained state and reference instead of depending on an external frame of reference. In recent times Stateless architecture has become so good that it closely mirrors stateful architecture.

Stateful applications are typically databases;

Knowledge credits: [Cloud Advocate](https://www.youtube.com/watch?v=P8D6P-6KVNM)