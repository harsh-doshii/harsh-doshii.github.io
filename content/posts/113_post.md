+++
title = "113. C++ STL Tips"
date = 2024-12-10
 
+++
Some STL Tips and Time Complexities:

### Data Structures

1. Vector
   1. Initialize a vector of size n, with int k: `vector<int> v(n, k)`
   2. Initialize a matrix of m rows and n columns and initialise it with int k: `vector<vector<int>> a(m, vector<int>(n, k));`
   3. Ops that take O(1): begin(), end(), size(), at(), push_back(), pop_back().
   4. Ops that take O(n): insert(), erase(), clear().
   5. `list` is similar to vector, but the underlying data structure becomes a DLL. Now you also get push_front() and pop_front() ops in O(1).

2. Stack
   1. Ops: push(), pop(), top(), empty() all are O(1)

3. Queue
   1. Ops: push(), pop(), front(), back(), empty() all are O(1)
   2. Deque is also some but now it gives you push_back(), pop_back(), push_front(), pop_front() options.

4. Set
   1. In an unordered set all ops are O(1): insert(), erase(), find(), empty()
   2. In a set, insert(), erase() and find() are all O(logn). Clear is O(n).
   3. Creating a set using vector: `set<int> s(v.begin(), v.end());`

5. Map
   1. Unordered map, all ops are O(1) on average: insert(), find(), erase(). But these can go to O(N) worst case.
   2. Ordered map: all ops are O(logN)

6. Priority Queue
   1. `priority_queue<int> pq` is a maxHeap by default.
   2. To make a mean heap: `priority_queue<X, vector<X>, greater<X>> pq`.
   3. Ops: push() and pop() are O(logN).
   4. top() is O(1)

Note: operations such as begin(), end(), empty(), size(), front() are always O(1) for almost all DS.

### Algorithms

1. Sorting
   1. `sort(v.begin(), v.end())` takes O(NlogN) on average.
   2. Using custom comparators generally don't affect the time complexity. If you want to sort in descending order: Return true if first element is greater than the second:
   E.g.: 
   ```c++
   static bool sortcol(int a, int b) return a > b; //for 1D vector, descending order
   
   static bool sortcol(vector<int> a, vector<int> b) return a[0] < b[0];
   //for 2D vector such that arranged by ascending order by the first element.
   ```
   
