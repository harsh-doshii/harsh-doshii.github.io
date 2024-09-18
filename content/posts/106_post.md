+++
title = "106. Notes on some Algos"
date = 2024-08-11

+++

1. When you have to do a DFS, and it is just a single, strongly connected component, you don't need to check and do a dfs over all the vertices.  Calling DFS on one is enough. So for every question, do check if it can contain more than one connected component or not.
2. When you are doing a DFS and you are sure that there is no cycle (let's say its a tree given in the form of an edge-list) you don't need to maintain a `visited` vector. Just passing the parent in the dfs call, and checking that the _next node is not the parent_ is enough!
3. When the question asks you to "generate all possible combinations" more often than not, this is backtracking. The backtracking function mainly contains: the input, the curr state: in the form of currString and/or the index and the final collector.
4. Whenever you see that you have to use a BFS, more often than not a queue will be used.
5. When you want to delete a node from a linked list, you need not only the next, but also the prev node.
6. 
