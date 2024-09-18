+++
title = "105. Notes on refactoring"
date = 2024-08-06

+++

1. Make sure that the code is well tested. So the flow will go like compile --> test --> commit.
2. Use method extractions to wrap a coding block in  a logical function.
3. Keep local variables less, that is the arguments to the methods must be less.
4. Motivation behind DRY is not that you decrease the Lines of Code to improve performance. It is more so, so that it becomes easier to modify. If you want to change at one place, you don't need to change everywhere else. Reducing the amount of code does make a big difference in modification of the code. The more code there is, the harder it is to modify correctly.
5. 