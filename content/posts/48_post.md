+++
title = "48. Autowire"
date = 2023-12-17

+++

One thing I realised recently, to be a top 1% software developer you must know every single word that is there in your code. I have been coding for a while, and at times, especially when I am changing some existing piece of code, I skip things that I don't know. The annotation @Autowire is one of those things. I have a high level idea of what it does (maybe I just guessed it?), now let's get a better understanding of it!!

Why is it called autowire? The logic is we are supposed to wire components together. Autowire is automatic-wiring, or just that the framework will now take care of the wiring. In simpler terms, autowiring allows the framework to automatically connect different parts of your code without you having to manually define those connections. This can streamline the development process, making it more efficient and less error-prone by reducing the need for explicit configuration of dependencies.

Autowiring feature of spring framework enables you to inject the object dependency implicitly. It internally uses setter or constructor injection.
Advantage: It requires the less code because we don't need to write the code to inject the dependency explicitly.

The @Autowired annotation in Spring reduces code in a project by handling the wiring of dependencies automatically, thereby minimizing the need for manual instantiation and connection of components.
Let's consider an example without @Autowired and then see how it simplifies the code in a Spring project.

Example without @Autowired:
Suppose you have a UserService class that depends on a UserRepository.

```java
public class UserService {
    private final UserRepository userRepository;

    public UserService() {
        this.userRepository = new UserRepositoryImpl(); // Manual instantiation
    }

    // ... other methods using userRepository
}
```

In this case, you're manually instantiating the UserRepositoryImpl within the UserService. If you decide to change the implementation class of UserRepository, you'll have to modify the UserService class, violating the principle of dependency inversion.

Example with @Autowired:
With @Autowired, Spring handles the injection of dependencies, reducing the manual setup required.

```java
@Component
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository; // Dependency injected by Spring
    }

    // ... other methods using userRepository
}
```

In this case, @Autowired instructs Spring to look for a bean of type UserRepository and inject it into the UserService constructor. This allows you to decouple the UserService from the specific implementation of UserRepository. If you change the implementation of UserRepository, you only need to modify the configuration without touching the UserService class itself.

By using @Autowired, you eliminate the need for manual instantiation and explicit wiring of dependencies in your code, reducing boilerplate code and making your codebase more maintainable and adaptable to changes in the project's structure or dependencies.

Let's go a step further. What if a Class constructor requires some parameters to instantiate, how do we pass it through Autowired? Let's extend the previous example.

Suppose the UserRepository class requires an argument DatabaseConnection for its instantiation:

```java
public class UserRepository {
    private final DatabaseConnection connection;

    public UserRepository(DatabaseConnection connection) {
        this.connection = connection;
    }

    // Other methods using connection
}
```

In such a case, you need to create a bean of type DatabaseConnection and then use that bean to instantiate the UserRepository. You can achieve this in the Spring configuration. The configuration should look like this:

```java
@Configuration
public class AppConfig {

    @Bean
    public DatabaseConnection databaseConnection() {
        // Initialize and configure DatabaseConnection
        return new DatabaseConnection(/* pass any required arguments here */);
    }

    @Bean
    public UserRepository userRepository(DatabaseConnection connection) {
        return new UserRepository(connection);
    }
}
```

Now we can use this userRepository in userService!
When you @Autowire the UserRepository into another class like UserService, Spring will handle the entire dependency tree, ensuring that all dependencies are properly instantiated and injected, even if they require arguments for construction.
