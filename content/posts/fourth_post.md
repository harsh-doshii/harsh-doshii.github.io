+++
title = "4. Reverse Proxy"
date = 2023-11-08

+++

Today I am learning about "Reverse Proxy".

Proxy in terms of the web and internet can be thought of as middlemen! When sending requests from client till the origin webserver, we keep a Proxy server in between. Such middlemen/proxy servers have multiple reasons to be kept in place, like for security, load-balancing, caching and so on.

Between the Client and the Origin webserver, the position of this proxy in the flow determines if it is a "forward proxy" or a "reverse proxy"

A forward proxy is something like this:
Client --> Forward Proxy --> Internet --> Origin Webserver

Whereas, a reverse proxy is:
Client --> Internet --> Reverse Proxy --> Origin Webserver

Adding on to this, there can be multiple reverse proxies in the journey of a request from client to origin server.

For example:
Client --> Cloudfare (CDN) --> NGINX --> Origin Server

Here both Cloudfare and NGINX act as reverse proxies.

This journey allows for various optimizations, security checks, and content delivery enhancements at different stages of the request-response cycle. Cloudflare's global network helps reduce latency and improve security, while NGINX can manage the load, SSL termination, and additional processing at the origin server. The origin server, in turn, processes the dynamic content and data needed for the client's reques