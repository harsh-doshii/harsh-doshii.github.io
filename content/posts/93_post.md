+++
title = "93. Refreshing Java Concepts - Pass by Value vs Pass by Ref."
date = 2024-06-19

+++

Firstly, what do these terms mean?
1. Pass by Reference: When a method is called, the method arguments reference the same variable in memory as the caller.
2. Pass-by-value: When a method is called, the caller passes a copy of the argument variables to the method resulting in two values in memory.

Java is always pass by value, a 100% of the time! but it is slightly confusing as we.. pass.. references as values? Let's get deeper into it!

For primitives like int, string, etc. it is fairly straightforward pass by value. For eg:

```java
public class Run {

    public static void main(String args[]){
        int foo = 1;
        System.out.println(foo); // this will print "1"

        setFoo(foo);
        System.out.println(foo); // this will STILL print "1"!
    }

    public static void setFoo(int bar){
        bar = 2;
    }
}
```

Things can get a little complicated when we deal with objects.

Let's take the following eg.

```java 
@Data
public class Batsman {
    int runs;
}

public class Controller {
    public static void main(String[] args){
        Batsman viratKohli = new Batsman();
        viratKohli.setRuns(94);
        System.out.println(viratKohli.getRuns()); //prints 94;
        scoringSix(viratKohli);
        System.out.println(viratKohli.getRuns()); //This prints 100??? The value has changed!?
        
    }
    
    public static void main scoringSix(Batsman batsman){
        batsman.setRuns(batsman.getRuns() + 6);
    }
}
```

What exactly is happening?

1. The variable `viratKohli` doesn't really hold the object. What it holds is a reference to the object in memory.
2. Let's say the value of `viratKohli`is 0001 (a location in memory) and it is pointing to an object with 94 runs. `viratKohli` (0001) --> {94}
3. When we pass this in scoringSix() the value of viratKohli is copied and is passed, that is, 0001 is copied and passed. Thus, now the copy also points to the same object in memory. Now it can manipulate the values in the same object!

Hence, Java is always pass by value. But it can appear as if we are passing by reference, because the value it passes is actually a memory address. 