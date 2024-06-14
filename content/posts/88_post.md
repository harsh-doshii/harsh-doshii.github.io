+++
title = "88. Way to by-pass private access modifier"
date = 2024-06-11

+++

Are you also writing unit tests? Do you also want to use a private field in the process? Are you wondering how to do it, cause it just doesnt seem possible! Well you have come to the right place!

Situation:

I wanted to write UTs for the following class:

```java
public class Demo{
    private final ObjectMapper objectMapper;
    private final Filter objectFilter;

    public Demo(String validStatuses){
        //more fields
        this.objectMapper = ObjectMapperFactory.createObjectMapper();
        this.objectFilter = new Filter(this.objectMapper, validStatuses);
    }
}
```

I am using this `objectMapper` and `objectFilter` later in the methods inside the class. But then how do I call them in the UT?

Ans: Using the reflection api! Reflection in Java allows you to inspect and modify the runtime behavior of applications. This is useful for unit testing when you need to inject mock dependencies into the class under test, especially when those dependencies are private and not accessible through public methods or constructors.

So inside my UT, I will do something like this:

```java
@BeforeEach
    void setUp() throws Exception {
        setPrivateField(demo, "objectMapper", objectMapper);
        setPrivateField(demo, "filter", objectFilter);
    }

    private void setPrivateField(Object target, String fieldName, Object fieldValue) throws Exception {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, fieldValue);
    }
```

the `field.setAccessible(true);` bypasses the private access modifier.
the `fields.set(target, fieldValue);` translates to something like `demo.setObjectMapper(objectMapper);`

This was a new problem that I ran into while coding up something. This looks like a decent solution! However I am a bit skeptical of how we are by-passing private access modifiers.
