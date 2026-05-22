+++
title = "135. RPC vs REST calls"
date = 2026-05-18
+++

RPC VS REST:

Let's rewind bit, the superset is API calls. API calls can be of two types:
1. Local API calls: something like making a call to a library from your code
2. Networked API calls: API calls that are over a network, think of client/severs

We will just focus on networked APIs now.

RPC are Remote Procedure Calls and REST stands for Representational State Transfer. I used to think RPCs and APls are the same thing and REST/gRPC are types of API/Protocols of API.
Truth is that RPCs are also a type of API. API is an umbrella term.

## RPC (Remote Procedure Call):

Concept: RPC focuses on invoking procedures or functions on a remote server as if they were local. The API is defined by a set of callable functions.

Examples: open-source gRPC is a prime example of the RPC framework. They often use Protocol Buffers for defining service interfaces and message serialization.

Interaction: A client makes a call to a specific function name (e.g., getUser, createOrder), passing parameters.


## REST (Representational State Transfer):
Concept: REST is an architectural style centered around resources. The API exposes resources that can be manipulated using a uniform interface, typically leveraging HTTP methods.

Principles: Key REST principles include:
1. Statelessness: Each request from client to server must contain all the information needed to understand the request.
2. Resource-Based: Information is exposed as resources with unique identifiers (URLS).
3. Uniform Interface: Standard HTTP methods (GET, POST, PUT, PATCH, DELETE are used to perform actions on resources.)
4. Interaction: Instead of calling a function getUser(123), a RESTful API would use GET /users/123. To delete, you'd use DELETE /users/123, not a deleteUser function call. This "is in contrast to RPC-based APls, in which every service method is a unique verb."