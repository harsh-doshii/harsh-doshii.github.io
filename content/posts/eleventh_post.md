+++
title = "11. Helm Charts"
date = 2023-11-15

+++

I have experience with Docker and Kubernetes. Docker containers are managed using .YAML files. For complex deployments with frequent updates, it can be difficult to keep track of all the different versions for these files. Helm is a handy tool that maintains a single deployment YAML file with version information. Helm is the "package-manager" for Kubernetes. 

Helm-chart is basically a Chart.yaml file. Helm allows you to define variables and use functions inside your template files. This includes YAML configuration files for deployments, services, secrets, and config maps that define the desired state of your application. The Helm application takes care of deployment of these resources to various kubernetes environments.