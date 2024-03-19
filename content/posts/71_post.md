+++
title = "71. I broke something"
date = 2024-03-18

+++

We have a service called Kraken which we have deployed in two types of clouds - commercial and govCloud. I was assigned with the task of doing an EKS upgrade from X to version X+1. We have upgrade, provision and patching pipelines in place that can do this upgrade, at least that is what I understood.
The ideal practice is to run the upgrade pipeline first and then change the parameters in patching and provisioning. Patching and provisioning pipelines are triggered automatically on some specific days. The EKS version value here must be same as the EKS cluster version (after or before upgrade) otherwise there will be inconsistencies.
I was done upgrading for Dev, Stage and PROD in Commercial evironment. All things went smooth and there were no issues. For govCloud I upgraded Dev because Stage and Prod are not in my control, these pipelines are with a specific team. Because I couldnt run the pipelines, I did the good job of changing the cluster versions in both Stage and Prod for all three pipelines, thinking that _any pipeline they run, EKS will automatically get upgraded._
At least this is what I imagined.
So now, the cluster version in Stage is X and they run the Patching pipeline on our request, which has the version as X+1; This causes a major outage as apparently _Patching only upgrades the worker nodes and not the control plane of the cluster._  We were indeed supposed to run the upgrade pipeline first or the provision pipeline.
Also, just a week before this, Stage in govCloud was upgraded to a higher SEV. So when the patching pipeline created issues, a fellow engineer had to sit with 12 engineers from the govCloud team to fix this issue. It is quite embarassing on my part honestly.
