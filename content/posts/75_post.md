+++
title = "75. 0/1 Knapsack Problem"
date = 2024-03-22

+++

Q: Given a wt array, a val array and a maximum upperbound W determine what is the highest value that you can get after either selecting an item (only once for each item) or ignoring that item.

0/1 knapsack recursive code:
Let's say we have wt (weight) array, val (value) array, n is the size of that array and W is the max. weight allowed in the knapsack, the recursive function looks like:

```c++
int knapsack(vector<int> wt, vector<int> val, int n, int W){
    //Base condition
    if (n ==0 || w == 0) return 0;
    //You are allowed to take it: we have two choices here: take it or dont
    if(wt[n-1] <= W){
       return max(knapsack(wt, val, n-1, W-wt[n-1]), knapsack(wt, val, n-1, W));
    }
    //You are not allowed to take it: you have only once choice: can't take it.
    else return  knapsack(wt, val, n-1, W);
}
```

0/1 knapsack memoization: All the recursive function calls will be changed.

```c++
//Given the size of array is n, so we will make a matrix of n+1, w+1 and initialize all tp -1
vector<vector<int>> dp(n+1, vector<int>(w+1, -1));
//Rows basically represent the object index and columns represent the weight, and dp[i][j] represents the max profit for i objects, given the weight constraint is j.
//Base condition
for(int j=0;j<w+1;j++) dp[0][j] = 0;
for(int i=0;i<n+1;i++) dp[i][0] = 0;

for(int i=1;i<n+1;i++){
    for(int j=1;j<w+1;j++){
        if(wt[i-1]<=W){
            dp[i][j] = max(val[i-1] + dp[i-1][j-wt[i-1]], dp[i-1][j]);
        }
        else{
            dp[i][j] = dp[i-1][j];
        }
    }
}

return dp[n+1][w+1];
```
