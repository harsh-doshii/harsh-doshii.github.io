+++
title = "8. k8s Pods vs Nodes vs Clusters"
date = 2023-11-12

+++

Pods, Nodes and Clusters are commonly occuring terminology in the world of K8s and container management. 

A Pod is the smallest deployable unit that can be deployed and managed by Kubernetes. However, a pod can contain more than one containers.
Fun fact: A group of whales is called a Pod! Whale as you know, is the logo of Docker. Thus it signifies the fact that a group of containers is called a Pod.

Now let's talk about Nodes. A Kubernetes node is a powerhouse, it is a warm, cozy home for Pods. It is a physical or a virtual machine that gives compute power and resources to the pods that it hosts.

Cluster is yet another extraction on top of Nodes. A cluster is basically a group of Nodes. Clusters orchestrate and manage the entire ensemble, ensuring seamless execution, scalability, and resilience. 

Hence, the heirarchy is as follows (smallest to biggest unit)

Container (Imagine Docker) --> Pod (Smallest Kubernetes Unit) --> Node --> Cluster

