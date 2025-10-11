+++
title = "129. Arrays are just hidden Pointers in C"
date = 2025-10-11
+++

Pointers and Arrays are closely related in C.

Concept: In most contexts, an array name automatically converts (decays) to a pointer to its first element.
```c
int arr[5] = {10, 20, 30, 40, 50};
int *ptr = arr;  // arr decays to &arr[0]
```
Here, arr is equivalent to &arr[0] - a pointer to the first element. Basically the array name signifies the address of the first index.

This is semantically wrong:
```c
int arr[5] = {10, 20, 30, 40, 50};
int *ptr = &arr;  
```
As this is type mismatch.

&arr[0]  --> Type: int *           (pointer to int)

&arr     --> Type: int (*)[5]      (pointer to array of 5 ints)

TL;DR: Same address, different semantic meaning! &arr treats the entire array as a single unit.

1. Array Indexing IS Pointer Arithmetic
When you use arr[i], C actually does pointer arithmetic:

```c
arr[i]  ≡  *(arr + i)
```
Example:
```c
int arr[5] = {10, 20, 30, 40, 50};

arr[2]        // accesses 30
*(arr + 2)    // also accesses 30 (same thing!)

int *ptr = arr;
ptr[2]        // also accesses 30
*(ptr + 2)    // also accesses 30
```
All four expressions are identical - they all mean "start at arr, move forward 2 integers, and dereference."


Arrays and Pointers Are NOT Identical

Similarities:
1. Both can be indexed: arr[i] and ptr[i]
2. Both support pointer arithmetic
3. Array names decay to pointers when passed to functions

Differences:
1. sizeof() behaves differently:
```c
int arr[5];
int *ptr = arr;

sizeof(arr)  // 20 bytes (5 * 4 bytes)
sizeof(ptr)  // 8 bytes (size of pointer on 64-bit system)
```

2. Arrays are not modifiable lvalues:
```c
int arr[5];
int *ptr = arr;

ptr = ptr + 1;  // ✓ Valid - ptr is a variable
arr = arr + 1;  // ❌ Error - arr is not a variable!
```
3. Taking the address:
```c
int arr[5];
&arr     // type: int (*)[5] - pointer to array of 5 ints
arr      // type: int * - pointer to int (after decay)
Function Parameters
When you pass an array to a function, it always decays to a pointer:
cvoid func(int arr[]) {  
    // arr is actually int *arr
    sizeof(arr);  // 8 bytes (pointer size), NOT array size!
}

void func(int *arr) {  // Exactly the same as above
    // ...
}
```
These two function signatures are identical.