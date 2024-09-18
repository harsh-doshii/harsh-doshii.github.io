+++
title = "107. UTs concepts - @Mocks"
date = 2024-08-18

+++

Recently I have been enjoying writing UTs for my Java-Springboot code. It is such a flex, writing a UT covered code! I am also helping a friend out with writing UTs for her code.

When you open a test file - You will immediately see `@Mocks` and `@InjectMocks` annotations and you might feel like throwing your laptop away. But don't, bear with me.

Let's first understand what _mocking_ means. It means to "act". Let's say you have a function that has this simple logic: 
`f(n) --> 2*n;`

Mocking this function means we take away the logic entirely, that you are multiplying by two. You simply have to think in terms of input and output.
An example mocking would be:

`when(f(2)).thenReturn(4);`

This was mocking a function. Now let's build on this by talking about "mocking an object". Just like mocking a function replaces the actual logic with predetermined input-output behavior, mocking an object means that we replace the actual object (and its methods) with a fake object (a mock). This mock object doesn't contain any real behavior or logic from the original class; instead, it is used to simulate interactions with that object in a controlled way.

Why do we need to mock an object? Because when testing a class we don't need to go through the headache of simultaneously testing its dependencies. When testing a class, we want to focus only on the logic of the class under test, not the behavior of its dependencies.

Let's go through an example! 

Let's say we have a class `CalculatorService` and a method `multiply`:

```java
public class CalculatorService {
    public int multiply(int a, int b) {
        return a * b;
    }
}
```
Let's say you are using this class inside another class - `MathApplication`. Somewhat like this:

```java 
public class MathApplication {
    private When testing a class, we want to focus only on the logic of the class under test, not the behavior of its dependencies. calculatorService;
    
    public MathApplication (CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }
    
    public int calculate(int a, int b) {
        return calculatorService.multiply(a, b);
    }
}
```

Thus, now `CalculatorService` becomes a dependency of `MathApplication`. Now we know we that when testing `MathApplication` class we have to mock `CalculatorService`. It goes something like this:

```java 
public class MathApplicationTest {
    @Mock
    CalculatorService calculatorService;
    
    @InjectMocks
    MathApplication mathApplication;
    
    @Before
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }
    
    //mocking:
    when(calculatorServiceMock.multiply(10, 20)).thenReturn(200);

    //Now the mathApp uses the mocked object
    int result = mathApplication.calculate(10, 20);
    assertEquals(200, result);
}
```

Note:
`@Mocks`: Instantiates those dependencies that will be used by the class under test.
`@InjectMocks`: Instantiates the class under test.

`MockitoAnnotations.openMocks(this);` is required if using these annotations.