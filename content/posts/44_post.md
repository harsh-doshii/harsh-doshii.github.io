+++
title = "44. Creational Design Patterns - Faactory Method"
date = 2023-12-13

+++

Creational design patterns are concerned with the way of creating objects. These design patterns are used when a decision must be made at the time of instantiation of a class (i.e. creating an object of a class). But you might argue, creating objects is so easy, we can do like this:

```java
StudentRecord s1=new StudentRecord();  
```

However, this is actually a hard-coded approach (using the new keyword) of creating objects which is not the best way to create objects. Sometimes, the nature of the object must be changed according to the nature of the program. In such cases, we must get the help of creational design patterns to provide more general and flexible approach.

Factory Method: A Factory Pattern or Factory Method Pattern says that just define an interface or abstract class for creating an object but let the subclasses decide which class to instantiate. In other words, subclasses are responsible to create the instance of the class. We don't really create the objects of the main class.

When to use Factory Method?

1. When a class doesn't know what sub-classes will be required to create
2. When a class wants that its sub-classes specify the objects to be created.
3. When the parent classes choose the creation of objects to its sub-classes.

What are the advantages of using Factory method?

1. Factory design pattern provides approach to code for interface rather than implementation.
2. Factory pattern removes the instantiation of actual implementation classes from client code. Factory pattern makes our code more robust, less coupled and easy to extend. For example, we can easily change PC class implementation because client program is unaware of this.
3. Factory pattern provides abstraction between implementation and client classes through inheritance.

Hence in a Factory Pattern, basically we have to create a superclass which can be a normal class, an abstract class or even an interface. Then we have to create concrete subclasses which will be instantiating the superclass.
