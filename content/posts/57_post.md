+++
title = "57. Building a guessing game in Rust"
date = 2023-12-26

+++
Game requirements: The program will generate a random integer between 1 and 100. It will then prompt the player to enter a guess. After a guess is entered, the program will indicate whether the guess is too low or too high. If the guess is correct, the game will print a congratulatory message and exit.

Crates in rust are a collection of Rust source code files. Crates can be binary crates (applications) or library crates (code that is used in other files). To add a dependecy in the code, we have to include it inside the Cargo.toml file under \[dependencies\].

Crates.io is where all libraries/packages are. It is similar to dockerhub or npmjs.

Running the cargo doc --open command will build documentation provided by all your dependencies locally and open it in your browser.

Code:

```rust
use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);
    //In the first line, we call the rand::thread_rng function that gives us the particular random number generator we’re going to use: one that is local to the current thread of execution and is seeded by the operating system. 
    //The gen_range method takes a range expression as an argument and generates a random number in the range. The kind of range expression we’re using here takes the form start..=end and is inclusive on the lower and upper bounds, so we need to specify 1..=100 to request a number between 1 and 100.
loop{
        println!("Please input your guess: ");

        let mut guess = String::new(); //mut makes the variable mutable. Type::Associated function

        io::stdin().read_line(&mut guess).expect("Failed to read line"); //& defines a reference. like variables, references are immutable by default. Hence, you need to write &mut guess rather than &guess to make it mutable. 
        //read_line returns an enum called Result. Result’s variants are Ok and Err. The Ok variant indicates the operation was successful, and inside Ok is the successfully generated value. The Err variant means the operation failed, and Err contains information about how or why the operation failed.
        //If this instance of Result is an Err value, expect will cause the program to crash and display the message that you passed as an argument to expect
        //expect is basically a way to handle exceptions.
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {guess}");

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {println!("You win!"); break;}
        }
        //A match expression is made up of arms. An arm consists of a pattern to match against, and the code that should be run if the value given to match fits that arm’s pattern. Rust takes the value given to match and looks through each arm’s pattern in turn. Patterns and the match construct are powerful Rust features: they let you express a variety of situations your code might encounter and they make sure you handle them all}
    }
}
```
