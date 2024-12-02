+++
title = "112. Inner loops are not always perfect"
date = 2024-11-27
 
+++

I know you hate it when there are changes that can't be functionality-tested on local setup and must be done in a dev environment. I know it kills some part of you everytime when you have to repeat the entire development cycle (code --> build --> deploy --> test --> repeat) just to realise you missed a small things and now have to do it all over again. I call this the "Inner loop" hell.

I have faced such problems at work and there are two ways I have seen that have helped me: 
1. Using aws localstack: Most of the time when my local test flow won't work as is, it is generally the case that I need to work with some AWS services like S3, SQS, SNS etc. To use the same functioanlity in local, aws localstack is a blessing. You can mock almost all AWS services and get it up and working! The only change you have to make in your code is config changes of endpoints and s3 regions. It is easy peesy. 

2. Smart deployment strategies:

Our initial dev-testing loop had to be done like this:
   a. When I wanted to test a Pull Request, the general idea is that the PR goes through CI pipeline which after an hour or so generates an artifact that is ready to be deployed. 
   
   b. Now this artifact must be deployed to the environment. Which brings down the initial pod and spins up a new one. This process of building an image through CI pipeline and then doing an entire deployment used to take an hour of two. 

We managed to improvise this a lot by:

a. Instead of using a full fledged CI pipeline to generate an artifact, we simply started building the docker image locally.
b. Then we would tag this docker image, run a script to make some temporary changes in the dev environment and then just apply this image in the k8s pod. In other words, we would swap out the original container with the test container, keeping the pod same.

This reduced our dev-testing time by a lot!!