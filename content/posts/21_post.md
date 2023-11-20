+++
title = "21. HTTP Codes"
date = 2023-11-20

+++

HTTP response codes are concise responses that are super helpful while working with APIs. These are mainly demarcated as follows:
1. 1XX - Informational
2. 2XX - Success
3. 3XX - Redirection
4. 4XX - Client Error
5. 5XX - Server Error

Some famous ones:
1. 200 OK: Basically server giving a hi-fi. All went good.
2. 201 Created: It means the data you wanted to put up on the server was sucessfully put. 
3. 204 No Content: Let's say you want to delete some data. The request was succesful but the server doesn't have any content to send back to the client. In that case we have 204. 
4. 400 Bad Request: Server doesn't understand the request sent by the client.
5. 401 Unauthorized: Means we are missing right credentials, no authentication.
6. 403 Forbidden: We have the authentication but no autherization. 
7. 404 Not Found: We requested a file that doesnt exist.
8. 429 Too Many Requests
9. 500 Internal Server Error
10. 502 Bad Gateway: It is a issue between servers, for eg between proxies and application servers. It is a communication error.
11. 503 Service Unavailable: Server is down basically. 
12. 301 Moved Permanently: It forwards the request to a permanent new address.
13. 302 Found: It forwards the request to a temporary new address.

BONUS: Check out what HTTP Code 418 stands for!

Knowledge credits: [ByteByteGo](https://www.youtube.com/watch?v=qmpUfWN7hh4).
