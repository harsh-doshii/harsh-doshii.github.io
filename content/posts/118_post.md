+++
title = "118. What is LLVM?"
date = 2025-02-03
 
+++

When you write code in languages like C or C++, it can't run directly on your computer. First, it needs to be translated from high-level source code to low-level machine code that your processor understands. This translation is the role of the **compiler**.

Compilers do more than just convert code—they apply optimizations to make the program faster and more efficient.

However, traditional compilers have a limitation: they are often **monolithic**. This means their components (like parsing, optimization, and code generation) are tightly coupled. Adding new optimizations or modifying existing ones can be challenging because the codebase isn't designed to be easily extensible. It’s like a black box—powerful, but difficult to tweak.

This is where **LLVM** comes in.

## LLVM: A Modular Compiler Framework

LLVM isn’t just a compiler—it’s a **compiler framework** designed with modularity and extensibility in mind. Compilers built on LLVM, like **Clang**, break the compilation process into flexible stages:

.c --> .ll (LLVM Intermediate Representation) --> asm (assembly languge code)

The `.ll` file represents **LLVM IR (Intermediate Representation)**, a platform-independent, low-level code that’s optimized but still abstract enough to allow further transformations. This IR acts as a common ground where various programming languages can be compiled down to, and where optimizations can be applied consistently.

The beauty of LLVM is that **you can write a new language front-end to target LLVM IR** and benefit from the powerful optimizations already available. This modular design saves a ton of effort—you don’t have to reinvent the wheel every time you need a new compiler or optimization pass.

To summarize:
LLVM brings modularity, reusability, and flexibility to the world of compilers. It opens up what was once a closed system, making it easier for developers to experiment, optimize, and innovate in the realm of programming languages.
