+++
title = "94.🥊ing in Java"
date = 2024-06-20

+++

Just to be clear, I am referring to boxing and autoboxing in Java.

But first, we need to talk about the elephant in the room, that is the wrapper classes. 

You know people say Java is 99% Object Oriented. That is because not all things are extending the _Object class_, Java also supports primitve data-types like int, char, long etc.
This is good because we dont need to store them in the memory-heap like other objects, this makes things faster.

This is where Wrapper class comes in. For every primitive type we have a class. This class extends the Java object.

Like:
1. int -> Integer
2. char -> Char, etc

Coversion of a primitve value to an Object type is called boxing,i.e. primitive --> Class == Boxing.
So something like this:
```java
Integer num1 = new Integer(8); //boxing
```
is called boxing. However such a syntax is an old fashioned way to write, the better way to write is:
```java
Integer num1 = 8; //auto-boxing
```
and this is called autoboxing!

Similarly, going from Object type to primitive type is called un-boxing. This is what it looks like:
```java
int num2 = num1.intValue(); //unboxing
```
or
```java 
int num2 = num1; //auto-unboxing
```

Converting string to int:
```java
String str = "12";
int num3 = Integer.parseInt(str); //num3 becomes 12
```

Note: While using the collections framework, you can never use primitives, you mandatorily need to use Wrapper Classes, because Generics require reference types and not primitive types. 
i.e. `List<int>` is not allowed, only `List<Integer>` is allowed.