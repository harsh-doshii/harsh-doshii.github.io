+++
title = "20. Containers on AWS: EKS"
date = 2023-11-19

+++

We looked at ECS yesterday. But let's say we don't want to use ECS as our container orchestration tool and want to stick with Kubernetes. Is it possible to use Kubernetes with AWS infrastructure? The answer is yes! and the answer is EKS.

EKS or Elastic Kubernetes Service is a service that lets you manage a Kubernetes cluster on AWS infrastructure. 
EKS basically uses the same k8s API, while ECS is specific to AWS. Hence if you want to migrate a ECS cluster to another cloud provider, it becomes much difficult. 

How does EKS Work?
1. Control Plane: With EKS, you create a cluster or a service which represents the control plane. In the kubernetes world these are called master nodes. 
So when you create a EKS cluster, AWS provisions, deploys and manages Kubernetes Master Nodes, which have k8s Master Services installed on them. These master nodes are automatically replicated for the regions and availibilty zones that you have paid for. These are fully managed by AWS.

2. Container Deployment: Now we need infrastructure that actually runs our containers. These are known as worker nodes in Kubernetes. This is provided by EC2 instances (same as what we did for ECS). We will connect these EC2 instances to EKS cluster (control plane). An EC2 instance will thus have: A Docker Agent (the container deployment) and an k8s process (the control plane deployment, through which master-worker communication happens).

Knowledge credits: [TechWorld with Nana](https://www.youtube.com/watch?v=AYAh6YDXuho&t=1358s).
