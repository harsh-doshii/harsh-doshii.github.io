+++
title = "14. Istio"
date = 2023-11-18

+++

Service mesh is a dedicated infrastructure-layer built in an app that allows different parts of the app to communicate with each other. It basically controls service-to-service communications over a network. 

Why need a service mesh?
An application structured in a microservices architecture might comprise dozens or hundreds of services, all with their own instances that operate in a live environment. It's a big challenge for developers to keep track of which components must interact, monitor their health and performance and make changes to a service or component if something goes wrong.
A service mesh enables developers to separate and manage service-to-service communications in a dedicated infrastructure layer. As the number of microservices involved with an application increases, so do the benefits of using a service mesh to manage and monitor them.

A service mesh is actually not bringing anything new to the table, microservices in their own merit have the rules defined on how to send requests from point A to point B. What service mesh does is that it takes the logic that governs service-to-service communication and abstracts it unto a layer of infrastructure. 

In a service mesh, requests are routed using proxies. 
So it is not: Container A --> Container B
It is more like: Container A --> Proxy A --> Proxy B --> Container B

These individual Proxies are actually Sidecars that run WITH the services and not WITHIN the services.  Taken together, these "sidecar" proxies—decoupled from each service—form a mesh network.

Advantage of service-mesh:
Every new service added to an app, or new instance of an existing service running in a container, complicates the communication environment and introduces new points of possible failure. Within a complex microservices architecture, it can become nearly impossible to locate where problems have occurred without a service mesh.
Service mesh also captures every aspect of service-to-service communication as performance metrics.