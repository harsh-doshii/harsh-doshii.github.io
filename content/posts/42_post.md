+++
title = "42. Working with Debugger"
date = 2023-12-11

+++

I was writing an application in Java using Springboot. The best IDE for Java based projects according to me is IntelliJ. I was testing my code through API and obviously it was failing at the first few attempts of hitting the API. Instead of debugging manually, going over the code line by line, making mental connections, I used a debugger which made me very effecient and not wanting to smash my monitor! This blog walks through that experience.

Firstly, to run my application I had two choices --> I could either run it through a Docker container or through the local system (either through cmd or IntelliJ GUI). I chose the latter only because it would allow me to run the application in debug mode.

Firstly, you have to set up a breakpoint. Breakpoint is a self-explainatory term. When you execute your code through running the class/calling an API, the code literally Stops or "Puts a Break" there. After the code stopping its execution on the breakpoint, you have an option to either Step Over or Step Into. A step over allows you to execute just that line of code and then move on to the next. It is like a line-by-line execution. It prints next to the screen the values that are returned/used in that line. You can also observe the local variables and stuff in the Debugger console. Another option is to step into, which allows you to go Inside a method and then follow through its execution again by either stepping over or stepping into. Remember: You can't go back in the execution.

Now let's say in the process of debugging you are done and you dont want to keep stepping over line by line to finish the execution, in that case you can press on the continue button. Continue button gives back the control of execution from the programmar to the compiler. It will do one of two things:

1. If there is another breakpoint, it will take you there and stop.
2. If there is no other breakpoint, the code will just finish executing.

This is basically how the debugger works! It is an absolute essential tool for better development experience.
