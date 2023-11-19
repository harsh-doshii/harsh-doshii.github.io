+++
title = "6. Blue Green Deployment"
date = 2023-11-05

+++

Today we are learning about BG deployment!

Blue Green deployment is a deployment technique which allows you to upgrade your apps peacefully, without incurring downtimes.

"Blue" and "Green" are two Identical production environments. Let's say the current version of out service is 1.0 and 1.1 is the new, updated version.

Let's say that 1.0 is currently deployed and live on Blue production environment. We then deploy 1.1 on the Green production environment, ensure it is fully tested and functional. 

After the testing is completed on Green environment, we route the traffic from Blue to Green production environment. Green is now live and Blue is ideal. This technique can eliminate downtime due to app deployment. In addition, blue-green deployment reduces risk: if something unexpected happens with your new version on Green, you can immediately roll back to the last version by switching back to Blue.