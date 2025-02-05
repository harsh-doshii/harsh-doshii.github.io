+++
title = "119. Typing: Static vs Dynamic, Weak vs Strong"
date = 2025-02-05
 
+++

Type is a classification of information - for e.g. int, boolean, string, function and so on.

In some languages, we also have a type "undefined". Like in JS, `const a;`
here the variable `a` is not initialized, hence its type is undefined.

First, let's talk about Dynamic typing vs Static typing. 

When we run a program, first the computer converts our code into machine code that it can understand, this is called compilation and the time taken is called compile time. After that the program is executed and this execution time is called runtime. 

Some languages check for Types and Type errors (like int a = "hello") at compile time, these are said to have static typing. Some check for these at runtime, these are said to have Dynamic Typing. 

Statically typed languages common examples are: C, C++, Java, Go

Dynamically typed languages common examples are: Javascript*, PHP, Ruby

Now let's talk about Weak vs Strong typing. Look at this JS code, with its output:
```javascript
4 + '7' // '47'
4 * '7' // 28
```
See what happened? In one case JS implicitly took 4 as a char and gave us a string 47. In another case it took the char 7 as a number and gave us 28. This was absolutely not in our control!

When types don't match for an operation, Javascript takes the liberty of converting things implicitly, making it a _Weakly Typed_ language. A Strongly Typed language would've thrown an error at such a statement. 

Strongly Typed <----> Weakly Typed languages is a spectrum, not just two categories.

Thus,
Based on WHEN TYPE CHECKING HAPPENS, we have:
1. Dynamic typing: At runtime
2. Static typing: At compile time

Based on HOW STRICT OPERATIONS WITH TYPES ARE, we have:
1. Weakly typed: Allows implicit conversions at the whim of the language.
2. Strongly typed: Doesn't allow implicit conversions.

*Javascript doesn't have compilation at all.