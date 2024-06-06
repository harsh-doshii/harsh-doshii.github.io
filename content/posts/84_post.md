+++
title = "84. Difference between @Bean and @Component in Spring"
date = 2024-06-07

+++

In Spring, @Component and @Bean are used to define beans, but they are used in different contexts and have different implications. Here’s a detailed comparison:

@Component

Annotation: @Component is a class-level annotation.

Purpose: It is used to mark a class as a Spring-managed component. Spring will automatically detect these classes through classpath scanning and register them as beans in the application context.

Usage: It is typically used to annotate implementation classes that you want to be automatically discovered by Spring.
Stereotype Annotations: @Component is the generic form, while @Service, @Repository, and @Controller are specializations with specific semantics:

Example:

```java
import org.springframework.stereotype.Component;

@Component
public class S3Client {
    // Implementation details
}
```

@Bean

Annotation: @Bean is a method-level annotation.

Purpose: It is used to declare a bean within a Spring configuration class. Methods annotated with @Bean return objects that will be registered as beans in the Spring application context.

Usage: It provides more control over the instantiation and configuration of beans. You can use it to create beans from third-party classes or when you need to apply complex initialization logic.

Configuration Class: Methods annotated with @Bean are typically within a class annotated with @Configuration.
Example:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public S3Client s3Client() {
        return new S3Client();
    }

    @Bean
    public FetchArtifactMetadataStage fetchArtifactMetadataStage(S3Client s3Client) {
        return new FetchArtifactMetadataStage(s3Client);
    }
}
```

Key Differences

Discovery and Registration:

@Component: Used for automatic bean discovery and registration via classpath scanning.
@Bean: Used for explicit bean registration within a configuration class.

Granularity:

@Component: Applied at the class level.
@Bean: Applied at the method level.

Control:

@Component: Less control over bean creation; Spring manages it.
@Bean: More control over bean creation, initialization, and dependencies.

Use Cases:

@Component: Simple cases where classes need to be automatically detected and registered.
@Bean: Complex cases where you need to configure bean creation manually, often involving third-party libraries or more advanced initialization logic.

When to Use Which?
Use @Component (or @Service, @Repository, @Controller) for your application’s own classes where automatic scanning and detection are appropriate.
Use @Bean in a @Configuration class when you need to create beans from third-party libraries, need more control over the bean lifecycle, or need to perform complex initialization.
