+++
title = "52. Making my own Teeny Tiny Compiler - Emitter"
date = 2023-12-21

+++

I am following this article: [Let's make a Teeny Tiny compiler, part 3](https://austinhenley.com/blog/teenytinycompiler3.html) by the very amazing Austin Henley. This blog is placeholder for my notes that I am making while I go follow Austin's article.

A compiler basically has the following flow:
source code --> lexer (gives tokens) --> parser (gives program tree) --> emitter (gives compiled code)

We finished with the parser some time ago, so now we are going forward with the code emitter.

What we are doing is:
source code --> lexer (gives tokens) --> parser (gives program tree) --> emitter (gives compiled code) --> C code --> gcc compiler --> executable binary --> output

So how does this emitter work??? In each function of the parser, we will call the emitter to produce the appropriate C code. The emitter is effectively just appending a bunch of strings together while following along the parse tree. For each grammar rule of Teeny Tiny, we will figure out how it should map to C code. Basically emitter is a map of TeenyTiny parsed tokens --> C code.
Like PRINT --> printf("")

With this the compiler is complete!!
