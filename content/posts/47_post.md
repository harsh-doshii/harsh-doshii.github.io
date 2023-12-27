+++
title = "47. Dependency Injection"
date = 2023-12-16

+++

I am following this article: [A quick intro to Dependency Injection: what it is, and when to use it](https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f)

In software engineering, dependency injection is a technique whereby one object (or static method) supplies the dependencies of another object. In this context a dependency is not like a package or a library, a dependency is an object that can be used (a service).

When class A uses some functionality of class B, then its said that class A has a dependency of class B.

In Java, before we can use methods of other classes, we first need to create the object of that class (i.e. class A needs to create an instance of class B).

So, transferring the task of creating the object to someone else and directly using the dependency is called dependency injection.

Why should I use dependency injection? We should use dependency injection because it allows loose-coupling of code. Let's say we want to remove dependency on object B and introduce a dependency on object C, it becomes a lot easier with DIs.

There are basically three types of dependency injection:

1. constructor injection: the dependencies are provided through a class constructor.
2. setter injection: the client exposes a setter method that the injector uses to inject the dependency.
3. interface injection: the dependency provides an injector method that will inject the dependency into any client passed to it. Clients must implement an interface that exposes a setter method that accepts the dependency.

So now its the dependency injection’s responsibility to:

1. Create the objects
2. Know which classes require those objects
3. And provide them all those objects

General concept/principle behind Dependency Injections: Inversion of Control.
This states that a class should not configure its dependencies statically but should be configured by some other class from outside. A class should concentrate on fulfilling its responsibilities and not on creating objects that it requires to fulfill those responsibilities. And that’s where dependency injection comes into play: it provides the class with the required objects.
