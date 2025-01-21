+++
title = "114. Idempotency in APIs"
date = 2025-01-05
 
+++

Idempotency comes from: Idem (Latin for same) + potency (power). Basically idempotency means an operation that can be performed without any change to the result.

E.g.: Looking at cake is an idempotent operation. As many times as you see the cake, it is not going to change. However, eating the cake is not an idempotent operation as everytime you eat some cake, the "cake" changes.

A simple example in maths: Addition by 0 is idempotent as x + 0 is still x.

Now let's talk about idempotency in APIs!

Let's say you want to transfer some money, $10. You hit the pay button, internally APIs are called, because of some network lag/delay the transaction doesn't go through immediately. You panic and press the pay button again. Now you have two API requests lined up internally, if both the requests go through completely you will end up transferring $20, 100% more than you intended!! This is the that problem comes up if use non-idempotent APIs.

Using idempotent APIs means that duplicate requests will not cause multiple changes. This becomes a valuable feature to keep business logic of systems intact. Through idempotent APIs we want to achieve "Exactly Once Semantics".

How do we identify if the incoming requests are same? The way to do it is through idempotency keys. 
Basically if n API requests have the same idempotency keys, they are the same API request! The server will only process them 1 out of n times that it is received.

How this works:
1. Client first talks to the server and generates a random ID (Idempotent key).
2. Client passes this ID along with the payload to the actual processing.
3. Server checks the ID and validates if it has already been handled:
   a. If handled: we ignore/return the computed result/throw error.
   b. If not handled: we handle it now.
4. In case of an error, the client sends the API request with the same idempotent key.
5. In case that the server handles the request, the server stores in the database in a map like thing: {idm key --> response}. Now if the api request with the same idm key comes in, we can directly give the response (or we can choose to ignore/throw error as well, depends on the business logic).

Now how do we pass this key in the API? The most common ways are through:
1. Request headers
2. Query parameters


