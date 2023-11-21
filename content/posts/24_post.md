+++
title = "24. What is a Webhook?"
date = 2023-11-23

+++
Webhooks are everywhere! But most common example that comes to mind is of the Payments. Suppose you run an online shopping store and someone has paid you money through Stripe. Now Stripe's servers will ping/notify your shop's server that a payment has been made. There is a Webhook event in Stripe's server that is configured to send our server the notification, when triggered. 

Now how will our server make sure that the notification/request coming in is actually from Stripe and not an attacker?
Well, when our server establishes a webhook on Stripe's server, we share with that server a secret key. Now whenever messages are sent, they are encrypted with this key and sent. Upon receiving the secret message, our server will decode it using the same secret key. This way security is ensured! (Also, the protocol is HTTPS which is the first layer of security). We can also configure the Firewall in such a way that only requests from Stripe are allowed. 

Difference bw API and Webhook:
1. API is like Client --> Server and then Server --> Client (data is requested and sent).
2. Webhook is like Server --> Client, that is data is NOT requested, it is automatically sent when an event is triggered in the server. This removes constant polling of Client --> Server for data.


Knowledge credits: [codedamn](https://www.youtube.com/watch?v=mrkQ5iLb4DM).
