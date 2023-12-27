+++
title = "48. Autowire"
date = 2023-12-17

+++

One thing I realised recently, to be a top 1% software developer you must know every single word that is there in your code. I have been coding for a while, and at times, especially when I am changing some existing piece of code, I skip things that I don't know. The annotation @Autowire is one of those things. I have a high level idea of what it does (maybe I just guessed it?), now let's get a better understanding of it!!

Why is it called autowire? The logic is we are supposed to wire components together. Autowire is automatic-wiring, or just that the framework will now take care of the wiring. In simpler terms, autowiring allows the framework to automatically connect different parts of your code without you having to manually define those connections. This can streamline the development process, making it more efficient and less error-prone by reducing the need for explicit configuration of dependencies.