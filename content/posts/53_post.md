+++
title = "53. try-catch-finally"
date = 2023-12-22

+++

**try block** contains the code that can possibly raise an exception - eg. divided by 0, out of bounds and so on.
If I am writing code, and I think there is a possibility of an exception being raised here, I will put it in a try block. When an exception occurs at a specific statement in a try block, then the rest of the code in the try block is not executed.

When an exception occurs in a try block at a particular statement, then the control comes out and the program terminates abruptly. To prevent this abrupt termination of the program, we should “handle” this exception. This handling is done using the “catch” keyword. So a try block always has a catch block following it.

**catch** is used to handle exceptions. Whenever an exception occurs in the try block, then the code in the catch block that corresponds to the exception is executed. We have to specify what kind of an exception it is that we want to handle/catch, and that goes in the argument `catch(Exception e)`
We can keep it generic parent exception or we can get more specific like `catch(ArithmeticException e)`. One try block can have multiple catch blocks with it to treat exceptions correctly.
Code example:

```java
public class Main {  
    public static void main(String[] args) {  
        //try block containing exception prone code
        try{    
            System.out.println("try Block:: Begin");  
            int myArray[]=new int[5];    
            myArray [5]=10/0;    
        } 
        //multiple catch blocks
        catch(ArithmeticException e)  
        {  
            System.out.println("Arithmetic Exception :: Divide by zero!!");  
        }
        catch(ArrayIndexOutOfBoundsException e)  
        {  
            System.out.println("ArrayIndexOutOfBounds :: Accessed index out of bounds");  
        } 
        catch(Exception e)  
        {  
            System.out.println("Exception :: " + e.getMessage ());  
        }       
        System.out.println("rest of the code");    
    }  
}
```

**finally** block is used to execute code that should be executed irrespective of the fact that their is an error or not.

so it is like

```java
try{
    //code that might raise exception
}
catch(Exception e){
    //code that handles exception
}
finally{
    //mandatory code to be executed
}
```
