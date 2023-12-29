+++
title = "55. Hello Rust!"
date = 2023-12-24

+++
All coding languages and frameworks that I have used have been mainly to make web apps or mobile apps. I have never really played around with a low-level language. Rust seems like the perfect opportunity. It is trending a lot these days. I had always known that there is a language called 'Rust' but I got to know that it is trending when I saw a reel about it on instagram. I will start on my rust journey by referring the book: [The Rust Programming Language](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/second-edition/ch01-00-introduction.html).

Today I learnt:

1. Rust is a low-level language. It is mainly used for systems related things.
2. We will download Rust through rustup (a command line tool for managing Rust versions and associated tools).
3. You will also need a linker, which is a program that Rust uses to join its compiled outputs into one file. C compiler acts as a linker.
4. A rust file is a .rs file.
5. Hello world looks like this:

```rust
fn main() {
    println!("Hello, world!");
}
```

6. Then you have to compile the file with the following command `rustc file-name.rs` then an executable will be generated of the same name. `./file-name` will run the executable. Compiling and running are separate steps.
7. The main function is special: it’s the first code that is run for every executable Rust program.
8. println! is a rust macro. If it were calling a function instead, it would look like this: println (without the !). When you see a ! that means that you’re calling a macro instead of a normal function.
9. The line ends with a semicolon (;).

That's all for the day! Next time we will learn about Cargo!
