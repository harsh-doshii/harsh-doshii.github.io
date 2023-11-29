+++
title = "32. Backtracking Problems"
date = 2023-12-01

+++

Now that I am getting back to solving Leetcode problems, I want to start writing few musings about the patterns that I identify and take help of to solve.
Backtracking involves recursion. But then how is it different from DP or Normal recursion?

Well, recursion just leads you to answers. Think that in a tree, recursion will simply give you all the leaf nodes.

DP on the other hand will lead you to the most optimal ans. In terms of tree, it will just give you one leaf noe.

Backtracking on the other hand will give you a comibination or all possible combinations. Think about the result not being just the leaf nodes, but a path or even all paths from the root to the leaf node.

So whenever the question mentions that return "All possible combinations" straight away think of recursion as a strategy to solve. 

Few sailent points are:
1. There will be a main function which gets the answer (Leetcode starter function).
2. Create a void function that will do the recursion for you. Make sure to pass things by reference and not value.
3. Pass a certain criteria, which usually is the index of the array in the function as well.
4. Write the stopping_condition on the basis of this criteria, which returns from the function.
5. Call the function recursively, changing the parameters that you want. Usually the index changes.
6. Many times you will add an element to an array, pass it to recursion and then pop it from the array.

```
void backTrack(criteria, ans){
    stopping_condition(criteria) --> return;
    meeting_condition(criteria, ans) --> return;
    recursive_condition --> backTrack(criteria+manipulation, ans);
}

vector<int> solve(){
    vector<int> ans;
    backTrack(criteria, ans);
}
```
