+++
title = "97. Don't use the `new` keyword alot"
date = 2024-06-23

+++

Title is a click-bait? Basically I want to write about the correct uses of Dependency Injections.

Using the new keyword to create objects of other classes within a class often indicates that you're not fully adhering to the DI principle. However, it's not an absolute rule!
 
Why avoid `new` for dependencies?

1. It makes it difficult to substitute different implementations (e.g., for testing or changing behavior). Basically you anyway should not be injecting an object, always better to inject an interface!
2. It violates the Dependency Inversion Principle, as high-level modules are directly depending on low-level modules.
3. It makes the class responsible for knowing how to create its dependencies, violating the Single Responsibility Principle.

Let's say we have a class A which wants to use an object of B, then this would be the bad approach:

```java 
public interface BInterface {
    // Define methods that B should implement
}

public class B implements BInterface {
    // Implementation of BInterface
}
```

It is generally preferred to inject interfaces rather than concrete objects in Dependency Injection. This practice aligns with several important software design principles.

The correct approaches are:
1. Pass the dependency through constructor. 
```java
public class A {
    private BInterface b;
    
    public A(BInterface b) {
        this.b = b;
    }
}
```

2. Setter injection:

```java 
public class A {
    private BInterface b;

    public A() {
        // Default constructor
    }

    public void setB(BInterface b) {
        this.b = b;
    }
}
```

3. Injector Interface, I found this rather un-readable and complicated. It is against my KISS principles, so Imma ignore it. But YOU should read about it somewhere!

We can use class A in multiple ways:
```java 
// Constructor Injection
BInterface bImpl = new B();
A a1 = new A(bImpl);

// Setter Injection
A a2 = new A();
a2.setB(bImpl);
```

That's all folks.