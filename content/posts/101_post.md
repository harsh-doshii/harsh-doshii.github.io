+++
title = "101. @PostConstruct"
date = 2024-07-04

+++

1. @PostConstruct is a Springboot annotation that is applied to a method. 
2. The method annotated with this is only triggered once, and is triggered in the bean life-cycle after the dependency injections.
3. The life-cycle of a Spring Bean goes like this: Constructor of the class is called --> Dependencies are injected --> @PostConstruct method is called.

When do we use this?
1. Initialization Logic: When you need to perform some custom initialization after all dependencies have been injected. 
2. Resource Setup: When you need to set up resources or connections that the bean will use during its lifetime. 
3. Configuration Validation: To validate that the bean has been properly configured before it starts processing requests. 
4. Logging: To log a message indicating that the bean has been successfully initialized and is ready to be used.

Types of Methods to Annotate with @PostConstruct
1. The method should be a void method. 
2. The method should not accept any arguments. 
3. The method should not throw a checked exception. 
4. The method should be non-static.
