+++
title = "35. Some Dont's for Python "
date = 2023-12-04

+++

I am writing code in Python these days and these are a few practices that I am definitely avoiding!!

1. Using manual string formatting (+ signs) instead of f strings

Instead of

```python
    print("Wow" + name + "!")
```

use

```python
    print(f"Wow {name}!")
```

2. Using bare except clause.

This is wrong:

```python
    try:
        break
    except:

```

This is because user-interrupts in Python are propogated as exceptions. So if you `Ctrl+C` for such code, it wont really exit, it will execute whatever is in the `except` block

So use

```python
     try:
        break
    except Exception:
```

3. Using == to check if None, True or False

Instead of:

```python
     if x == None:

     if x == True:

     if x == False:
```

use:

```python
     if x is None:

     if x is True:

     if x is False:
```

Use Identity instead of Equality!

4. Checking bool or len

Instead of:

```python
     if bool(x):

     if len(x)!=0:
```

you can directly use:

```python
     if x:
```

5. Don't use range-length for for loops

Instead of:

```python
    a = [1, 2, 3]
    for i in range(len(a)):
        v = a[i]
        print(v)
```

simply use:

```python
    a = [1, 2, 3]
    for v in a:
        print(v)
```

and in case you want indices use enumerate:

```python
    a = [1, 2, 3]
    for i, v in enumerate(a):
        print(i) #index
        print(v) #value
```
