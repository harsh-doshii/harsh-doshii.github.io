+++
title = "95. Java Collection Framework - Part 1"
date = 2024-06-21

+++

Collection Framework has a Collection interface in it. This framework is under java.util.\*.

It is extended by other interfaces: List, Set and Queue. Map and Iterator are interfaces that are outside the collections interface.

1. The List interface is then implemented by ArrayList, LinkedList and Stack.
2. The Set interface is then implemented by HashSet, TreeSet, EnumSet, LinkedHashSet.
3. The Queue interface is then implemented by ArrayQueue, LinkedList and PriorityQueue.
4. The Map interface is then implemented by HashMap, TreeMap, EnumMap, etc.

Let's go deeper into each!

## ArrayList

Arrays in Java are not dynamic. That is why we use ArrayList, these data structures are dynamic. The size is n + n/2 + 1, where n is the number of items inside the list.

```java
ArrayList<String> studentsName = new ArrayList<>();
// However it is always always better to code to an interface and not an object. Hence the better way to do this:
List<Sting> studentsName = new ArrayList<>();

//You can also omit the generics and do this:
List<Sting> studentsName = new ArrayList();
// But this^ is not highly suggessted, as this does not enforce type safety.

// To add to the list:
studentsName.add("Yo");

// To add to the list on a specific index:
studentsName.add(2, "Yoo");

// Adding another list to the currentList:
studentsName.addAll(newStudentsList);

// Retreieving an element based on index:
studentsName.get(1);

// Removing an element from a given index O(n):
studentsName.remove(1);

// Removing an element with value:
studentsName.remove("Harry");

// With an integer value of let's say 10:
bankAccount.remove(Integer.value0f(10));

// Set, to update a val on a particular index O(1):
studentsName.set(2, "Ron");

// Boolean check to see whether the item is present in the list or not.
studentsName.contains("Hermoine");

// Traversing the list:
// Let's say we have: List<Integer> list = new ArrayList<>();
1. for (int i=0;i<list.size();i++){}
2. for (Integer element : list) {} //Best method
3. Iterator<Integer> it = list.iterator();
   while(it.hasNext()) {}
```

## Stack
```java
Stack<String> students = new Stack<>();
students.push("Ron");
stundents.peek() --> Returns topmost element
students.pop() --> Removes the topmost element
```

## LinkedList and Queue
```java
Queue<Integer> queue = new LinkedList<>();
queue.offer(1); // adds to queue, returns true or false, not an exception
queue.poll(); // removes from queue, returns null if empty, not an exception
queue.peek(); // element at the first posn in queue

LinkedList implemented through a List has the same methods as we saw for ArrayList (because its just a diffenet implementation)
```

## Priority Queue
Super helpful for making min and max heaps.

```java 
    Queue<Integer> pq = new PriorityQueue<>();
    pq.offer();
    pq.poll(); // removes the smallest element.
    pq.peek(); // gives you the smallest element.
```

A Priority Queue is a MIN HEAP!! To implement a MAX HEAP we need comparators:

```java 
Queue<Integer> pq = new PriorityQueue<>(Comprator.reverseOrder());
```

## ArrayDeque
Adding and removing elements on both ends

```java 
ArrayDeque<Integer> adq = new ArrayDequeue<>();
adq.offer(); // adds to the end
adq.offerFirst(); // adds to the first
adq.offerLast(); // same as offer

// Similarly we have pollFirst, pollLast, peekFirst and peekLast
```