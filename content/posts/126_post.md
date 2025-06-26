+++
title = "126. Concurrency vs Parallelism"
date = 2025-06-27
+++

Concurrency and Parallelism are very similar terms - which often leads to a confusion between them.

Concurrency is _managing_ multiple tasks at the same time.
Parallelism is _executing_ multiple tasks at the same time. 


First, let's establish the fact that a single physical core can only execute one thread at a time. 
Now let's take the following example.

1. Let's assume we have a single-core CPU, now we are executing a program that runs multiple tasks, like keeping the UI responsive but at the same time downloading something. Here the OS is actually repeatedly and quickly switching between the two tasks. Only one task executes at a time, but it feels like multiple tasks are progressing. These two tasks are hence, running concurrently.

2. Let's assume we have a multiple-core CPU, now we are running both Chrome and Spotify, these are two processes. Now these two are truly running on two different cores, so these processes are said to run _parallely_.

A analogy could be:
If we want to cook 3 dishes
Concurrency: 1 chef working on all of them by switching between them quickly.
Parallelism: We have 3 chefs each working on their own dishes at the same time.