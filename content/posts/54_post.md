+++
title = "54. throw and throws"
date = 2023-12-23

+++
**throw** is basically us deciding when to throw an exception/error. It allows us to throw custom exceptions as well. It is mentioned explicitly inside the function or the block of code..

e.g.

```java
public class Main{  
   static void validate_Age(int age){  
     //if specified age is &lt; 18, throw ArithmeticException
     if(age&lt;18)  
      throw new ArithmeticException("Not eligible to vote and drive!!");  
     else   //print the message
      System.out.println("Eligible to vote and drive!!");  
   }  
   public static void main(String args[]){  
      //call validate_Age method
      validate_Age(10);  
      System.out.println("rest of the code...");  
  }  
} 
```

On the other habd **throws** is a keyword that is only allowed in the method signature. It is used in the method signature to declare an exception which might be thrown by the function while the execution of the code.
eg.

```java
public class TestThrowAndThrows  
{  
    // defining a user-defined method  
    // which throws ArithmeticException  
    static void method() throws ArithmeticException  
    {  
        System.out.println("Inside the method()");  
        throw new ArithmeticException("throwing ArithmeticException");  
    }  
    //main method  
    public static void main(String args[])  
    {  
        try  
        {  
            method();  
        }  
        catch(ArithmeticException e)  
        {  
            System.out.println("caught in main() method");  
        }  
    }  
}  
```

Then why even write throws in the method signature? This is because it is a good practice. It makes it mandatory to wrap the calling of the said method in a try-catch block. It enforces exception handling.
