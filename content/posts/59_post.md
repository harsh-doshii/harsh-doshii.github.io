+++
title = "59. API Proxies"
date = 2023-12-28

+++

Recently a cURL request that I was making had a --proxy flag attached to it, and it made me curious to get into the details of it. An API proxy acts like an intermediate between the server and client. For example, you set url A as a proxy then the flow is like this:
Client --> A --> Backend and then Backend --> A --> Client.

An API proxy provides a layer of abstraction between a client and a backend service, allowing the client to access the API without needing to know the details of where the backend is hosted.

A proxy is generally in the form of : URL:port number.

However you can't just add any proxy to your API call and expect it to work. API proxies more often than not require some kind of authentication to it. For, eg. I recently found out that the API (with a proxy) I was calling from my local was not working, but the same API request was working when I did it from a very specific docker container.
