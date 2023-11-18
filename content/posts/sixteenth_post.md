+++
title = "16. All about HTTPS"
date = 2023-11-20

+++

Today I am revisting HTTPS. This is a summary of the video uploaded by ByteByteGo which you can watch [here](https://www.youtube.com/watch?v=j9QmMEWmcfo&t=67s).

When the protocol is HTTP, the communication between browser and server is in plain text. That is if you type password: "abcd" the server can actually see that the password is abcd. HTTPS, an extension of HTTP solves this problem. It makes the data unreadable for everyone except the sender and the reciever. 

This encryption is done by TLS. TLS stands for Transport Layer Security. This is how HTTPS works:

1. Just like HTTP, the browser establishes a TCP handshake with the server. 
2. Certificate Check: TLS Handshake is done. Client Hello - Server Hello. Server then sends the client a Certificate (Asymmetric Encryption), post this the Handshake is completed. TLS is a handshake process between the client and server with asymmetric encryption to exchange a session key used for Data Transmission with symmetric encryption.
3. Key Exchange: There is a transfer of keys from client to server. There is an encrypted session key and a session key. This is Symmetric Encryption.
4. Data Transmission: The encrypted data is sent with the session key.