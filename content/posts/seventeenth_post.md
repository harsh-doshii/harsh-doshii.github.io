+++
title = "17. Idempotency in APIs"
date = 2023-11-21

+++

When I was working at Flipkart, I was told to make the API I was working on "Idempotent". I was baffled at that point, not knowing what it is supposed to mean I just said Okay and started on my path to learn about this concept. Today I am revisiting that.

We went our APIs to be resilient, by supporting multiple automatic retries. That is if one API fails, we want to send the request again. The pre-requisite for retry is that the API should be idempotent.
i.e. To build Resilient APIs --> we need to support Client Retries --> This is possible only through Idempotent API operations.

An Idempotent Operation is when a request can be retransmitted or retried with no additional side effects. 

Example, let's say we send a request from a Client to "Create a Bank Account", but the Server doesn't send us back a response due to some issue, so we don't know if the bank account has been created or not. Now, if we fire "Create a Bank Account" again (retry) it could potentially create 2 bank accounts in the databse, from both the tries. WE DONT WANT THIS!

Recipies for Idempotency:
Method 1. Pass the API input arguments to a Hash Function and get a Request Token and store it in the database. Now, if the same input arguments come in for the second time, the resource server will identify it and we can directly return back the Request Token that we had generated. So we don't actually process the thing again.
Problem: What if we actually want 2 accounts? This method won't work!

Method 2, the better way. Instead of making the resource server do the job of identifying if the incoming request is same as before, we put the onus on the client. We say, as a part of API contract, in order to call the API, you need to add a unique UUID (token) to make it work.
In case of retries, we use the same token. So API = input args + token
The resource server saves {token: response} in a StateStore. In case of a retry, the resource server directly sends back the response that it has saved in the StateStore.

One last thing, in the case of retries with the same token, we have to return syntactically identical responses as if it was a success.