+++
title = "90. Functional Interfaces"
date = 2024-06-16

+++

Functional Interfaces are literally Uncle SAM - Single Abstract Method interfaces. Why is it important to know aboht FIs? They help us to use Lambda Expressions.
We can use this annotation `@FunctionalInterface` to enforce this.

E.g.:

```java
@FunctionalInterface
interface Abc{
    void show();
}
```

```java
public class InterfaceDemo
{
    public static void main(String[] args){
        Abc obj = () -> System.out.println("Hello World");
        obj.show();
    }
}
```

We obviously cannot instantiate an Interface, `Abc obj = new Abc();` is not allowed. We always need an implementation of an interface before instantiating an object. Basically what we are doing here is writing the implementation in the `Abc obj = ` line.
It is equivalent to:

```java
    Abc obj = new Abc() {
        public void show(){
             System.out.println("Hello World");
        }
    };
    obj.show();
```

Basically ` () -> ``  ` defines the implementation of the single method. We don't need to mention the method name show while implementing it, because there is just one method!
Most of the interfaces in Java are Funtional Interfaces.
