+++
title = "86. DAO vs DTO vs POJO"
date = 2024-06-10

+++

DTO: Data Transfer Object
DAO: Data Access Object
POJO: Plain Old Java Object

DAO: DAO is all about Database access. DAO provides an abstract interface to a database. They encapsulate all the data access logic. Provides methods for CRUD (Create, Read, Update, Delete) operations.

E.g.: A DAO for a User entity would have methods like getUserById, saveUser, updateUser, and deleteUser.

The Entity (This annotation is used on classes that represent database tables. It tells the JPA provider (like Hibernate) that this class should be mapped to a table in the database.) will be User, like:

```java
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    private Long id;
    private String name;
    private String email;

    // Getters and Setters
}
```

Then the DAO will be:

```java
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class UserDAO {
    @PersistenceContext
    private EntityManager entityManager;

    public User getUserById(Long id) {
        return entityManager.find(User.class, id);
    }

    public void saveUser(User user) {
        entityManager.persist(user);
    }

    public void updateUser(User user) {
        entityManager.merge(user);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        if (user != null) {
            entityManager.remove(user);
        }
    }
}
```

DTO: DTOs have nothing to do with Database. They are more to do with APIs. These objects are used to transfer data between different layers of an application (from server to client).

E.g.: A UserDTO might be used to transfer user data from the backend to the frontend without exposing internal data structures.

```java
public class UserDTO {
    private Long id;
    private String name;
    private String email;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

POJO: A simple Java object not bound by any special restrictions other than those forced by the Java Language Specification.

E.g: A User POJO might be used to represent user data within the application without any specific data access or transfer logic.

```java
public class User {
    private Long id;
    private String name;
    private String email;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```
