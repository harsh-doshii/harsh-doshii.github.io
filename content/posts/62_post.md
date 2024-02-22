+++
title = "62.  Learning Kuberenetes Day 2"
date = 2023-12-31

+++

How to build a docker image?

- Manual approach: creating an image from the cont changes.
Note: Changes in a container are always temporary!
To persist the changes to docker container, we need:
`docker commit -m "any msg" container-name image-name:image-tag`

- What is a better method? What if you want to start from scratch? How do we automate it?
We will use Dockerfile.
There are keywords like FROM/RUN/COPY etc..
All dockerfile instructions are single words and are in capital letters.
everyline in Dockerfile must start with Dockerfile keyword.
Base image is always mandatory.

FROM - Used to pull a base image
ADD - Used to install a pkg or something. it goes like ADD src dest. ADD extracts the tar in memory and copies the extracted content into the cont path.
RUN - run allows us to execute any regular linux commanf inside container during the build process.
ENV - Allows to set environment variables that can be used in container OS environment.
COPY - source (file on vm) dest (path-inside-cont)
CMD - is used to set a default command to image, so that it used to start a process when you run docker 

How to execute it?
docker build --file Dockerfile -tag myapp:v2 context (path-on-your-server)

# Container orchestration: Kubernetes

What is the purpose of it?

- We can run multiple containers from one image. But it is still a Single POF, as the VM can fail. That is the server can fail. So when we want to deploy a container to multiple servers we use Kubernetes
- Helps you to deploy the cont across the server/VMs
- helps to maintain the dynamic nature of containers
- Can scale up/down horizontally.

To implement container orchestration we need minimum two vms:

1. One must act as a master / control-plane (can be multiple)
    Acts as a single point of administration. We will use this to deploy the containers.
2. One must be acting as a worker (can be multiple)
    Takes the instruction from master/control-plane and executes on worker.

Kubernetes:
-- is just a container orchestration/mgmt tool
-- can k8s build & run containers on its own? ans: No
-- k8s always depends on one of the container runtime tool like docker/crio/etc.

kubeadm init - which ever vm we run "kubeadm init" in will make that vm act as a master/control-plane. It will initiate a k8s master process (like apiserver/etcd/scheduler) on the vm

kubeadm join - this makes the vm/server start reporting to master/control-plane vm. basically this will make it a worker node. it will initialise a k8 agent process called kubelet.

k8s master & worker nodes together are called a k8s cluster. A cluster can have multiple masters as well.

kubectl is installed on the master node (it is not required on worker node). it works same way as docker. like docker run can be kubectl run.

We give instructions to k8s, the k8s need to talk to docker. CRI-Docker is an interface between them, it is a transalator. This is how k8s can talk to docker.

k8s is a client-server architecture. kubectl is the client and apiserver is the server. Both are on the master node.

How do different nodes talk? They talk through networking drivers. In this demo we installed calico networking driver.

How do we deploy a container on k8s? Through a pod.
A container is a package that consists of application code + dependencies. In k8 a container is not managed directly, a container is managed through an abstraction layer over it called as a POD. POD is an abstraction layer around one or many containers.
single pod == single instance of an application.
pod can create and manage a single / group of containers inside it.
pod gets an ipaddr and is shared by all containers inside it.

container is a process. A pod is a host. In a single host, can we have two processes listening on the same port no.? Ans now!
Let's say we have two tomcat containers, there will be a port clase for 8080. Thus we will have to change the port number for the second port. Thus if we want to make an app highly available, we must replicate the POD.

command to create a pod: kubectl run `pod-name` --image=nginx:latest
^this command is executed on the master pod. but the pods are not created on the master node. these pods are created on the worker nodes. the master just delegates.

How to go inside a container in the pod? kubectl exec -t `pod-name` -c `container-name` -- /bin/bash

We can curl containers using kubectl curl pod-ip:port-of-the-container we want to curl.

k8s Namespace: provides isolation to the resources we create in a cluster. what is a resource? anything we create in k8s is called a resource liks a pod.
every pod MUST have a namespace. if we dont provide it it goes to default namespace. Inside a cluster, you cant have two namespace with the same name.
