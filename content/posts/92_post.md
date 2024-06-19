+++
title = "92. Path Variables vs Request Parameters"
date = 2024-06-18

+++

Path Variables and Request Parameters are both used to pass data to an API endpoint, but they serve different purposes and are used in different contexts.

Path Variables:

1. Path Variables (also known as path parameters) are used to capture values from the URL path. They are part of the URL itself.

E.g.:

```java
@GetMapping(value = "get/{message}")
public String getMessage(@PathVariable String message){
   return message;
}
```

to call this you can simply do a `curl address/get/helloworld`.

2. Request Parameters (also known as query parameters) are used to send data to the server in the form of key-value pairs appended to the URL.

```java
@GetMapping(value = "/message")
public String getMessage(@RequestParam String message){
   return message;
}
```

to call this you have to do `curl "address/message?message=helloworld"`
