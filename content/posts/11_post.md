+++
title = "11. Helm Charts"
date = 2023-11-10

+++

I have experience with Docker and Kubernetes. Docker containers are managed using .YAML files. For complex deployments with frequent updates, it can be difficult to keep track of all the different versions for these files. Helm is a handy tool that maintains a single deployment YAML file with version information. Helm is the "package-manager" for Kubernetes. 

Helm-chart is basically a Chart.yaml file. Helm allows you to define variables and use functions inside your template files. This includes YAML configuration files for deployments, services, secrets, and config maps that define the desired state of your application. The Helm application takes care of deployment of these resources to various kubernetes environments.

So Helm manages Kubernetes and Kubernetes manages Docker containers?
That’s a good way to put it! Helm streamlines the management and deployment of applications on Kubernetes by using charts, which contain pre-configured Kubernetes resources. Kubernetes, on the other hand, manages the orchestration of these containers, regardless of the container runtime (such as Docker) used within them. So, Helm helps manage the applications within Kubernetes, while Kubernetes manages the containerized workloads, which may include Docker containers among others.