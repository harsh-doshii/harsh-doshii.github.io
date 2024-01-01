+++
title = "58. Rust Variables and Mutability"
date = 2023-12-27

+++

Variables in Rust are by default immutable. Meaning same variable, once bound to a value, cannot be reassigned to something else. If done so, the compiler will throw an ImmutabilityError.

Eg. The following code will throw an error.

```rust
fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
```

Although variables are immutable by default, you can make them mutable by adding `mut` in front of the variable name.
E.g. `let mut x = 5;`

## Constants vs Variables

Constants, like immutable variables can never be changed.
Differences between constants and variables:

1. First, you aren’t allowed to use mut with constants. Constants aren’t just immutable by default—they’re always immutable. You declare constants using the const keyword instead of the let keyword, and the type of the value must be annotated.
2. Constants can be declared in any scope, including the global scope, which makes them useful for values that many parts of code need to know about.
3. Constants may be set only to a constant expression, not the result of a value that could only be computed at runtime.
4. `const` can be used in the global scope, and `let` can only be used in a function.

## Shadowing

1. With variables that are immutable, we can't reassign them as we saw earlier. However, rust allows us to declare the variable with the same name again. This is called shadowing.
Eg:

```rust
fn main() {
    let x = 5;

    let x = x + 1;

    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {x}");
    }

    println!("The value of x is: {x}");
}
```

Output is 5, 12, 6!
