+++
title = "91. Checked vs Unchecked Exceptions"
date = 2024-06-17

+++

In Java, Exceptions are of two types - checked and unchecked.

## Checked Exceptions

1. These are checked at the compile time.
2. If some code _within_ a method throws a checked exception, we must do either of the following:

   a. Put the _throws XYZException_ in the method definition.

   b. Put a try-catch block _within_ the method (not where it is being called)

3. Eg. are IOException or Compile Time Exception

## Unchecked Exception

1. These are the exceptions that are not checked at compile time. It is up to the programmers to be civilized and specify or catch the exceptions.
2. In Java, exceptions under Error and RuntimeException classes are unchecked exceptions, everything else under throwable is checked.
3. We don't require a _throws_ clause or explicit exception handling (try-catch).
4. Eg. NPE, ArithmeticException (divide by 0), ArrayIndexOutOfBoundsException.

Should we actually catch Runtime Exceptions? Well that's a debate! I encourage the reader to do their own DD on it.
