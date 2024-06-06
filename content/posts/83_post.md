+++
title = "83. You cant @Autowire everytime"
date = 2024-06-06

+++

Revisting some of Spring first:
Spring aka Spring Framework focusses on creating eneterprise applications with Java. It helps us skip a lot of boilerplate.
Springboot is built on Spring Framework. It is Spring + Superpowers. These superpowers are basically easier configuration through annotations. Springboot is great for standalone APIs.

Dependency Injection is basically instantiating an object in another class, without using the new keyword.

A bean is simply an instance of a class that is managed by the Spring container. Spring container when to create or instantiate or kill this instance.

Spring contianer is a part of the core Spring framework which is responsible to manage the lifecycle of beans.

Example of dependency injection:

```java
public class Demo {
   private S3Client s3Client = SpringContext.getBean(S3Client.class);
//...
}
```

The line private S3Client s3Client = SpringContext.getBean(S3Client.class); is using Spring Framework's dependency injection to obtain an instance of the S3Client class from the Spring application context. This way, the Demo class can use the S3Client instance without needing to instantiate it directly, allowing for better decoupling and easier testing. This is manual dependency injection. We couldve also done it using annotation like this:

```java
public class Demo {
    @Autowired
    private S3Client s3Client;
}
```

But, but @Autowired can only used to do a dependency injection in a Spring-managed Component. Thus the code above is wrong. The correct snippet is:

```java
@Component
public class Demo {
    @Autowired
    private S3Client s3Client;
}
```

Other ways to make Demo spring managed is by adding it under @Bean annotation in a config file.

To use @Autowired for injecting dependencies, both the class containing the dependency (Demo) and the dependency itself (S3Client) must be Spring-managed beans. This ensures that Spring can manage their lifecycles and perform the injection as needed.
