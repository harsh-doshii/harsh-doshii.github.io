+++
title = "104. Why not to rely on AWS console to manage your resources."
date = 2024-07-15

+++

With each AWS resource (think S3, RDS, SQS etc.) that your project is using there are like a gazillion customisations/configurations involved.
One easy, direct way that you can manage these resources is through the AWS console, however this is not the best practice. The better way to do it is through a IaC (Infrastructure as Code) tool like terraform, for the following reasons:

1. Through terraform all changes are centralized through one place. You will be able to locate where changes happen through code. Doing a change through console will always keep you guessing on what the state is, to find it you will always have to go to the console. Referring to the code is way easier than referring to the console.
2. We can enable versioning, so we can revert if a change is wrong.
3. Envs can be mirrored (dev, stage, prod) and be identical. You can have a particular config in dev, then promote the _exact same_ thing to stage and prod easily.
4. Other engineers can review your changes. If an engineer does it through the console, it is happening in-silo.

The workflow that could work the best:
1. Make a change in the terraform code. Raise a PR.
2. That PR goes through the CI/CD workflow and generates a deployable image.
3. Deploy this new image in the dev environment. Test the changes. Ensure that the changes are reflecting on the aws console.
4. Once tested, merge this PR with the master.
5. Deploy the master branch's latest image on stage and prod. Keep testing at all stages.

Think of it this way, your AWS console is your house, then your terraform code is the design plan for it. Now,
1. Whatever is in the design will eventually be reflected in the house.
2. The best way to make a change in the structure of the house is to make changes to the plan first and get it reviewed by the architect before directly making change to the house. This way the design plan and the actual house design are always in sync.
3. Now if you want to share how your house looks like, you can just share the design, you don't need to go to the troubles of calling that person to your house!
