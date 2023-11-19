+++
title = "19. Containers on AWS: ECS+EC2"
date = 2023-11-18

+++

Let's say you have a Microservice architecture based application and all your services are containerized. These containers need to be deployed and managed. In the realm of AWS, one can deploy the containers on EC2 instances, which are basically virtual compute power.

Now once they are deployed, next question is how will you manage these containers? We need some sort of container orchestration that takes care of things like: resource management, scheduling, provisioning and so on. ECS or Elastic Container Services does this exact same thing, it is very much the equivalent of Kubernetes. ECS is a container orchestration service! It manages the container lifecycle.

How does ECS Work?

1. Control Plane: First we create a ECS cluster, it contains all services that are necessary to manage containers. It is basically a control plane for virtual machines (EC2 instances) that are running your containers. 
2. Container deployment: These containers are hosted on EC2 instances. These EC2 instances are connected to ECS control plane. An EC2 instance will thus have: A Docker Agent (the container deployment) and an ECS Agent (the control plane deployment).

So basically when we are using ECS+EC2,
1. What we have to take care of: EC2 instances*. We need to create and provision them. The advantage is that we have full control of the infrastructure that we want to use.
2. What we dont have to take care of: ECS. Container management is done by ECS, we don't have to do anything here. 

*In case we want the the infrastructure to also be taken care of by AWS, we have to use the AWS service called as Fargate. I will learn about it later. 