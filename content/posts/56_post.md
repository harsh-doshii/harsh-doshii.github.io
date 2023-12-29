+++
title = "56. Learning Rust ep2 - Cargo"
date = 2023-12-25

+++
This is a rusty christmas and today we are learning about Cargo in rust!

1. Cargo is Rust’s build system and package manager. Cargo handles a lot of tasks for you, such as building your code, downloading the libraries your code depends on, and building those libraries. The libraries are also called as dependencies. Cargo, in terms of functionality is somewhat similar to npm.
2. `cargo new hello_cargo --bin` creates an executable application called hello_cargo. Executables are binary executable files often called just binaries. In the hello_cargo directory, we can see that Cargo has generated two files and one directory for us: a Cargo.toml and a src directory with a main.rs file inside. It has also initialized a new git repository in the hello_cargo directory for us, along with a .gitignore file
3. Cargo.toml: TOML is the cargo config file format.
4. In Rust, packages of code are referred to as crates.
5. Cargo expects your source files to live inside the src directory. The top-level project directory is just for README files, license information, configuration files, and anything else not related to your code.
6. From your hello_cargo directory, build your project by entering the following command: `cargo build`. This command creates an executable file in target/debug/hello_cargo (or target\debug\hello_cargo.exe on Windows) rather than in your current directory. Because the default build is a debug build, Cargo puts the binary in a directory named debug.
7. Command `cargo run` does both builds and execute the executable in one command.
8. Command `cargo check` quickly checks your code to make sure it compiles but doesn’t produce an executable. It's a quick way to see if your code is error free and can be compiled.

This is it with cargo! Next we will code up a guessing game in rust.
