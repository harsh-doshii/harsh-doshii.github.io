+++
title = "89. The :: in Java"
date = 2024-06-14

+++

The `::` in Java is known as the method reference operator. It is used to refer to methods without invoking them. These are can be useful in contexts that expect a functional interface\*, such as with the Java Streams API or other places where lambda expressions are used.

`::` references to a method. It doesnt execute it immmediately.
`()` calls a method. It is executed immediately.

"To Reference": When you use ClassName::methodName (in case of static methods) or instance::methodName, you are creating a reference to the method. This means you are specifying which method to use, but you are not actually executing (calling) it at that point. `System.out::println` is a method reference. It tells the `forEach` method to use `System.out.println` for each element in the list. The println method is called by the forEach method, not directly by us.

"To Call": When you invoke (call) a method, you execute it immediately. For example, `System.out.println("Hello")` calls the println method and executes it, printing "Hello" to the console.
