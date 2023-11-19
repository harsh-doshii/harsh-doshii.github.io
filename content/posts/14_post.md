+++
title = "14. Istio - A service mesh implementation"
date = 2023-11-13

+++

As we learnt about Service Mesh, the goal is to have a Sidecar Proxy that extracts and handles the networking logic. We don't need to add this sidecar individually to all Pods because Service Mesh has a control plane that can distribute (inject) the proxy in every pod in the system. The Microservices can now talk to each other through Proxies.

Thus, Proxies + Control Plane == Service Mesh

Service mesh is an architecture pattern or paradigm. Istio is one of its implementation.

In Istio architecture:
1. The Proxies are Envoy Proxies. Envoy is an open-source project. Group of all the proxies is called Data Plane.
2. The control plane is Istiod. This helps in configuring the proxies. 

Istio helps in separation of logic (networking and business logic). Istio is configured with the help of K8s YAML file. So there is no new language that you need to know!
Request go to cluster through Istio Ingress Gateway and then it routes the traffic to proxies of microservices. 