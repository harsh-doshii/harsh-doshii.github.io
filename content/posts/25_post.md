+++
title = "25. Finding Cadidate Keys in a Database"
date = 2023-11-24

+++

Candidate keys are a set of columns that can uniquely identify a row. They are not a minimal set. They are all possible combinations of columns that can uniqely identify a row.

Let's say we have a database with N cols and R rows, how do we find the Candidate keys?
1. We make all possible combintations of columns. Let's say we have 3 columns, in that case 2^3 - 1, 7 combinations are possible:
A, B, C, AB, BC, AC, ABC
We ignore Null Set.
Thus, total combinations possible are: 2^N - 1.
2. For each combination, we have to test if it is a candidate key. Let's take the example of Set: AC. Now within the subset of columns A and C we drop all the duplicate rows. Now We are left with unique rows, let's call it R'.
3. If R' == R, it means no duplicate rows were dropped and all rows within the dataset in the subset of AC are unique. Hence, AC can uniquely identify a row in the database and is indeed a candidate key! (Else it is not).

Now I will code this in a Python Script. 