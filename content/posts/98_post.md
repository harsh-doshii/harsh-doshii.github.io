+++
title = "98. What is an AWS EBS volume?"
date = 2024-07-01

+++

AWS EBS stands for Amazon Elastic Block Store, a block-level storage service that's used with Amazon EC2 to store persistent data. EBS volumes can be attached to EC2 instances, and even if the instance stops or is terminated, the data on the EBS volume remains. EBS is one of two block-storage options offered by AWS, the other being the EC2 Instance Store.
It is like a hard disk (SSD) attached to a computer.

Use cases:
1. You can use EBS volumes as primary storage for data that requires frequent updates, such as the system drive for an instance or storage for a database application. 
2. You can also use them for throughput-intensive applications that perform continuous disk scans. 

Snapshot of EBS: Amazon EBS provides the ability to create snapshots (backups) of any EBS volume and write a copy of the data in the volume to Amazon S3, where it is stored redundantly in multiple Availability Zones. The volume does not need to be attached to a running instance in order to take a snapshot. As you continue to write data to a volume, you can periodically create a snapshot of the volume to use as a baseline for new volumes