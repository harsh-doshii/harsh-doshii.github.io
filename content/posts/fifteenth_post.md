+++
title = "15. What happens when you type in a URL in your web browser?"
date = 2023-11-19

+++

Today I am revisting journey of a URL. This is a summary of the video uploaded by ByteByteGo which you can watch [here](https://www.youtube.com/watch?v=AlkDbnbv7dk).

First off, a URL stands for Universal Resource Locator. A URL generally has for parts. 

Let's take the example of http://example.com/product/electronic/phone. Here,
1. http: is called the Scheme. This defines the protocol that the browser needs to connect to a server. Other common scheme is https which is basically encrypted http.
2. example.com: is called the Domain.
3. product/electronic: is called Path
4. phone: is called Resource.

Difference between Path and Resource is not very clear. You can imagine it as Directory and File respectively.


1. Now when the URL is punched in, the Browser looks for Domain in the DNS (Domain Name Server) or (more frequently) in the DNS Cache. You can imagine DNS to be a phonebook, which maps:
Domain name (google.com) --> IP Address (8.8.8.8)

2. Now when we have the IP address of the Web Server, the Browser establishes a TCP connection with the Web Server. TCP has a handshake mechanism involved. It takes time, to keep it faster, browsers use "keep-alive connection" to reuse an existing handshake.

3. Now Browsers sends a HTTP request to the server through the established TCP connection. 

4. The server recieves the request and sends back the response. 

5. The browser recieves the response and renders the HTML content. There are additional resources to load such as JS files and Images. 