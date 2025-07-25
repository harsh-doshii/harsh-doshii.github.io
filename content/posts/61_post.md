+++
title = "61. Learning Kubernetes Day 1"
date = 2023-12-30

+++

Server - A simple computer, where we run a software/applications.
Application - A set of instructions/piece of code.

Types of software:

- Stand alone application: Desktop application lie Paint/VLC/Calculator.
- Web application: Something that is accessed over a network.

Can I use my laptop to host a service which can be accessed over the internet?
Yes, ideally. We should be able to do this. To host a website, we use a webserver. Eg. of webservers: tomcat, nginx, apache
Every application that is hosted in a server needs a port.

browser accesses the webapp through the address: <http://ipaddr:port>
A domain like <www.fb.com> redirects to  <http://ipaddr:port> through the DNS.

Types of machines / servers: physical machines/virtual machines.
physical machines have high maintainence and are difficult to scale. It can also lead to resource wastage.
virtual machine pulls the hardware resources in an isolated environment. VMs are created using hypervisors. It solves a lot of problems invloved with physical infra.

Environment: eg. dev/stage/PROD. Environment is a set of servers where we run our application. Why do we need a set of servers? So that there is High Availability (no single point of failure).

What is a challenge with this deployment strategy? There is a possibility of misconfig in servers. Like working in Dev but not in PROD lol. Change in config is a problem.

Now what is a container? Containerization means packaging a software with its dependencies to deploy it on a server.

How to build and run container packages?

- We need a containerization tool / container runtime tool. eg. Docker/ContainerD/Crio. Docker was the first to introduce container technology. It was in 2013.
- Docker image is basically a container package. Container is the runtime instance of an application/Container Package. Image RUNS and becomes a container. Runtime instance is a running process. A process that consumes CPU, memory, etc. Hence: Docker container is just a process that is running on your server.
- single container === single instance of application.
- from a single image, we can start multiple containers.

Docker runs as a daemon process.

how to run a container from a given image?

- docker run or docker container run
- docker container can be run in two modes:

1. interactive/foreground: this is the default mode. something like which prompts you to proivde an input or something. we can't run more than one instance. the terminal is blocked till the process is closed.
2. detached/background: runs in background easily.

Every container is a Process, so it has it's own unique PID.
Every container has its own IP address.

How can you access the container from the outside world?
Let's say there are two nginx containers running on port 80 and two tomcat containers on port 8080. Every container get an ip address of its own, called ContainerIP. Container ip is a dynamic ip generated by the container runtime (docker). IP doesnt change if the container restarts.
We can use cont-ip:cont-port to access the app only INSIDE VM. We can't use it from outside.
Container Port is a value given by tool/software we use inside the container. E.g. A tomcat software has the default port of 8080. We can customize it though only while building the image.

So the question still is How can you access the container from the outside world?

- When we send a request a terminal, we are first sending it to VM and then to the container on the VM.
- That is called an entrypoint. We can map/port-foward . browser puts something like: vm-ip:vm-port. Let's say we have done a port mapping at 1234 for one of the nginx container. So let's we ping vm-ip:1234 then we are actually hitting the nginx conatiner.
- example command:  docker run -d -p 1234:80 nginx:latest is basically creating an nginx container that maps 1234 of the VM to 80 of the container.

- Every docker image if needed will also include os packages/libraries as a part of image build process. 99% of images that we find in docker hub have oslib for sure. 

What is the diff between oslib inside a cont pkg vs full os inside vm?

- oslib is like an incomplete os. it is a very basic os. Like oslib doesnt contain kernel, gui, ssh, cron, mkdir etc.
- because there is no ssh, what we have is a docker exec command. docker exec -it containerID /bin/bash. bin/bash is a path actually. It means bash executable inside the bin folder. -it means interactive terminal.
