+++
title = "95. Generics"
date = 2024-06-22

+++

Suppose we want to create a Printer class that prints stuff, it could look like this:

```java 
public class Printer {
    private Integer thingToPrint;
    
    public Printer(Integer thingToPrint){
        this.thingToPrint = thingToPrint;
    }
    
    public void printer(){
        System.out.println(thingToPrint);
    }
}
```

Now let's say you wanted to give the same treatment to String and Double, then you would have to duplicate a lot of this code.
The better approach is to use Generics!

```java
public class Printer <T> {
    T thingToPrint;
    public Printer(T thing){
        this.thingToPrint = thing;
    }
    public void print(){
        System.out.println(thingToPrint);
    }
}
```

Here you can put anything you want instead of T for naming purposes.

The usage will be like this:

```java
public class Controller {
    public static void main (String[] args){
        Printer<Integer> printerInteger = new Printer<>(23);
        printetInteger.print();
        
        Printer<Double> printerDouble = new Printer<>(2.3);
        printerDouble.print();
    }
}
```
This way we can print any type of Objects!

Note: Generics don't work with primitives. That is, Printer<int> is wrong!!

Now what if you want to print only a certain type of objects?
Let's say we have classes: Cat and Dog. Both these classes extend the class Animal.

In that case, we will do:
`public class Printer <T extends Animal>{}`

Now whatever must be passed, must be an animal!

i.e. `Printer<Cat> cat = new Printer<>();` is correct but `Printer<Integer>` is wrong now! This is called _bounded generic_.