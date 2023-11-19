+++
title = "3. NGINX"
date = 2023-11-02
+++

Hi all, today I spent time learning about NGINX!


NGINX is a web-server. It "serves" content over the internet. When you are sending a request to a URL through your browser, let's say netflix, the request is not going directly to netflix's server*. What is happening instead is that the request is going to NGINX and then to Netflix.

Browser --> NGINX --> Netflix Server

BUT WHY DO WE NEED THIS????
The same reasons we have security "Bouncers" at clubs
If the club is full, the bouncer won't allow new entrants (requests) and will guide them to another club (another netflix web server). Bouncers also prevent malicious people (requests) from coming in!

Fun fact, NGINX was conceived as a solution to the famous C10k problem.

What made NGINX unique was it's implementation of Event-Driven Architecture (EDA) that made it very good for concurrency.

Read [this](https://www.nginx.com/blog/inside-nginx-how-we-designed-for-performance-scale/)

Watch [this](https://www.youtube.com/watch?v=7VAI73roXaY)

Through these two resources I have got a high level idea of what NGINX is. I may want to look deeper into the concept of "Reverse Proxy".


I am also thinking about Apache and CDNs. Apache is a web-server like NGINX, an alternative. However, how does the concept of CDN like Cloudfare fit in here? Let's find that out in next blogs!


*server is the place where the resources are stored. Think about HTML files, Images, etc.