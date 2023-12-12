+++
title = "36. Working with Localstack"
date = 2023-12-05

+++

Today I had a chance to setup and work with LocalStack and boy oh boy, it is such an awesome service! Almost all modern development is cloud-oriented. The deployments at my work place usually happen through AWS. Localstack is a service that let's you create your own AWS resources locally, so that even your local environment mimics the cloud correctly. This makes developement so much easier.

To use localstack:

1. Install the localstack cli fusing brew. You need to set up the localstack server, a simple `localstack start` will do that.
2. We basically have an aws server at localhost:4566. Now you can easily create resources using the apt commands from the docs.
3. You can run all awscli commands just like one does with the cloud, just add the endpoint flag to it.
Instead of `aws s3 ls s3://bucket-name --recursive`
Use `aws --endpoint-url=http://localhost:4566 s3 ls s3://bucket-name --recursive`

That's it. You can freely use the AWS resources now! The only thing is that with the free tier of Localstack, we don't have the option to persist the resources, i.e. once the server is closed, the resources are killed. My suggestion for a better practice is to create a script with all the resources that you want to prevent over-repetition of writing AWS commands.
