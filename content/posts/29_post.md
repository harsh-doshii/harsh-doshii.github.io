+++
title = "28. Web Sockets"
date = 2023-11-27

+++

Web Sockets is a protocol that was designed for bi-directional, real time communication between the client and the server, over a TCP connection.

Over a typical HTTP request, we send a request and wait for a response.

In case of polling, we repeatedly send requests and expect a response (empty or otherwise).

Long-polling is a variation of polling, in which the server holds the request for some time and is not expected to respond immediately. This technique is also called as hanging-get. Each long poll request has a timeout associated with it. This is resource intensive. 

Web Sockets on the other hand can keep a unique connection open for long. Web Socket protocol is capable of sending and receiving data continously over a single TCP connection. 
It is established in 3 steps:
1. Client establishes an appropriate web sockets connection using a web socket handshake. 
2. If the server accepts the protocol, it sends back a header accepting the handshake.
3. A TCP connection replaces the handshake and both parties can start sending data.

A small web-server keeps the TCP connection open in the server end.

Web Sockets are heavily used in real-time applications like stock market apps, chat applications, gaming, etc. 
Web Sockets are overkill if you want it for data that is only needed once or data that is not needed very frequently.

Knowledge credits: [ByteMonk](https://www.youtube.com/watch?v=pnj3Jbho5Ck&t=4s)