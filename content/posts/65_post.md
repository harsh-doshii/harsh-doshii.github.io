+++
title = "65.  Revisiting STL for C++"
date = 2024-03-07

+++

## Vectors

1. Declaration and Initialization:

    a. Declare an empty vector of integers:
    `vector<int> myVector;`

    b. Declare and initialize a vector with values:
    `vector<int> myVector = {1, 2, 3, 4, 5};`

    c. Declare a vector with size n and initialize all values to 0:
    `vector<int> myVector(n, 0);`

2. Accessing Elements:

    a. First element:
    `int a = myVector.front()`

    b. Last element:
    `int b = myVector.back()`

3. Adding Elements:

    a. Add an element to the end:
    `myVector.push_back(6);`

    b. Insert an element at a specific position:
    `myVector.insert(myVector.begin() + 2, 10);`

4. Size and Capacity:

    a. Get the size (number of elements) of the vector:
    `int size = myVector.size();`

5. Sorting and Reversing:
  
    a.Sort the vector in ascending order:
    `sort(myVector.begin(), myVector.end());`

    b.Sort the vector in descending order:
    `sort(myVector.rbegin(), myVector.rend());`

    c. Reverse the vector:
    `reverse(myVector.begin(), myVector.end());`
    x
6. Erasing and Removing Elements:

    a. Erase an element at a specific position:
    `myVector.erase(myVector.begin() + 3);`

7. Clearing the Vector:
    `myVector.clear();`
