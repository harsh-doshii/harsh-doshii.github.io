+++
title = "74. Topological Sort"
date = 2024-03-21

+++

1. A graph must be directed, acyclic to perform topo sort on it (DAG).
2. A DAG always has these two nodes: One with indegree 0 and one with outdegree 0, basically the starting point and ending point (There can be more than one as well for both scenarios).
3. Longest path is finite, i.e. There is no cycle

Topological sort is a linear ordering of vertices such that if there is directed edge uv, u will always appear before v in the topological ordering.

Eg. If there is a directed edge from u to v _u --> v_
Then the topological ordering must be of the pattern: _x x x x u x x v x x_ only

For topo sort, we will use Kahn's algorithm: i.e. use BFS + Queue

Input: Graph in the form of an adjeceny list.
Steps:

1. Find indegrees of all vertices. The nodes with indegree with 0, are the starting points. These will begin the topo sort. (You can save it in a array sized n, n is the number of vertices)
2. Push all nodes with indegree 0 in a queue (as these will begin the topo sort).
3. Now we gotta process the queue. We will also maintain a count variable. Processing means the following:
    a. We process the front of the queue.
    b. All the vertices it has edges to, we subtract 1 from their indegree. If the new indegree of any vertice is 0, we push it to the queue.
    c. We pop this element from the queue and save it in an array. We then increment the count variable by 1.
    d. In case there is no edge from a vertex (the end node) we dont decrement from indegree, we simply pop.
4. If at any point the count > number of nodes, it means that there is a cycle in the graph and it is not a DAG. Or if the queue is processed entirely and count != number of nodes, it means that there is a cycle in the graph.

Time Complexity: O(V+E);