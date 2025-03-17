+++
title = "109. Supply Chain Attacks - Polyfill"
date = 2024-09-27
 
+++

Pollyfill - How a single `<script>` tag managed to infect over 100,000 websites (CVE-2024-38526).

![image](/Users/hdoshi/Desktop/secondblog/static/images/image2.png)

### What is a Supply Chain attack?

A supply chain attack uses third-party tools or services — collectively referred to as a ‘supply chain’ — to infiltrate a target’s system or network.

## [Polyfill.io](http://polyfill.io/)

### How was Polyfill compromised?

The Open Source maintainer of polyfill was getting a lot of issues raised on the repo by some devs. He eventually got sick of it and sold the project to a company called Funnull, and they started to mess with the returned files.

![image](/Users/hdoshi/Desktop/secondblog/static/images/polyfill.png)

More than 100k+ websites are said to be affected. One particular malware (see below) redirected mobile users to a sports betting site.

The code has specific protection against reverse engineering, and only activates on specific mobile devices at specific hours. It also does not activate when it detects an admin user. It also delays execution when a web analytics service is found, presumably to not end up in the stats.

![image](/Users/hdoshi/Desktop/secondblog/static/images/carbon.png)

#### What can we learn from Polyfill attack?

1. While developing for the web, one should use dependency managers like npm and avoid using dynamic vendors like CDN as there is no version control or content integrity. The code served today might be different from the code being served tomorrow. With npm, one can use package-locks and run audits as well.
2. Identify the need for each 3PP, keep your apps as lightweight as possible.
