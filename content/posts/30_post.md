+++
title = "30. JAVA_HOME and Switching between JAVA versions"
date = 2023-11-29

+++

Switching between Java versions has been a constant headache for me and to some extent it stems fromt the fact that I don't have a clear understanding of how default versions are set. So, let's get this clarified now!

Firstly, let's talk about environment variables on an OS, (only talking about Linux based systems here). Environment varibles serve a specific function. For example:
$HOME: This is the address of the home directory,
$USER: This holds the username 
There are a lot of more such env variables, $PATH is a famous one.

$PATH holds a list of directories that your bash shell searches when you type a command in ther terminal. In other words, it contains path of directories where executables are stored. 
For example, when you use the command "ls" or "java" the terminal searches for this executable in the directories mentioned in the $PATH variable. 

$JAVA_HOME is an environment variable that points to the JDK. It is needed by development tools, like Maven and Gradle to pick up the exact version of JDK being used. 

If you just add JDK to $PATH, you might get errors with tools like Gradle and Maven as these tools look for $JAVA_HOME. Likewise, if you only set $JAVA_HOME and not $PATH you will get errors with applications like Eclipse.

Best way out is to use both $PATH and $JAVA_HOME variables together. And the best way is to set up the $JAVA_HOME variable first and then set up the $PATH variable like this:
PATH=$JAVA_HOME\bin

To switch between java versions:
1. `java --version` will list all the available JDK versions that you have downloaded and installed on your machine.
2. find the path of the version that you want and do `export $JAVA_HOME=path-of-the-jdk`