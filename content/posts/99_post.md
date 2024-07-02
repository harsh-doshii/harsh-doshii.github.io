+++
title = "99. But what is Terraform?"
date = 2024-07-02

+++

You probably know that Terraform is Infrastructure as Code (IaC) tool. It allows us define the cloud resources in human-readable files (.tf). Terraform can manage low-level components like compute, storage, and networking resources, as well as high-level components like DNS entries and SaaS features.
It is basically provisioning resources for your environment through declarative language.

Terraform with the help of "Terraform Providers" can work with virtually any platform or service (like AWS, GCP, etc) with an accessible API.

*Right from the docs:*

The core Terraform workflow consists of three stages:
1. Write: You define resources, which may be across multiple cloud providers and services. It is a declarative language. 
2. Plan: Terraform creates an execution plan describing the infrastructure it will create, update, or destroy based on the existing infrastructure and your configuration. 
3. Apply: On approval, Terraform performs the proposed operations in the correct order, respecting any resource dependencies.