+++
title = "87. Records in Java"
date = 2024-06-11

+++

The motivation behing creating Records was to make the code less verbose. Here we are talking about Data-Carrier classes.
Let's say you want to send a request/response. Everything in Java is an object, so the only purpose of the object then becomes to carry data, no other changes are involved at all. Only thing that you have to be doing is Object -> JSON and then JSON -> Object.
There are two characteristics of this class:

1. It is immutable. We don't want to change the data.
2. Tere is no extra functionality.

Record does exactly that.

Syntax:

```java
record Student (int id, String name) {}
```

What does this do?
This is basically equivalent to the following java class:

```java
public final class Student {
    private final int id;
    private final String name;

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int id() {
        return id;
    }

    public String name() {
        return name;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (obj == null || obj.getClass() != this.getClass()) {
            return false;
        }
        var that = (Student) obj;
        return this.id == that.id &&
               Objects.equals(this.name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "Student[" +
               "id=" + id + ", " +
               "name=" + name + ']';
    }

}
```

Through a record we get the following things:

1. A constructor.
2. The fields, which are `final` ensuring immutability.
3. Getters. There are no setters, as the variables are final.
4. Overrides toString, equals and hashCode. equals and hashcode now makes two objects equal if their values are equal.

Records are awesome for this specific use-case!
