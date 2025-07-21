+++
title = "127. Opening Chrome: A High Level View of CS Concepts"
date = 2025-07-19
+++

If you’ve studied Computer Science, you've likely come across foundational topics like Operating Systems, Compilers, Networking, Automata, Data Structures & Algorithms, Microprocessors, and Programming Languages.

But have you ever wondered how these concepts actually come together in something as simple and everyday as opening Google Chrome on your laptop?

In this blog post, we’ll walk through what happens when you open Chrome. It turns out that this single mouse click touches a lot of different aspects of Computer Science.  This is, of course, a 10,000 ft view, but by following this journey, we’ll see how these aspects connect (or sometimes don’t!), and gain a clearer picture of the big picture behind the CS curriculum.

Task: Opening Google Chrome

1. You double click the Chrome Icon:  
    - OS
        - The OS GUI registers the mouse click.  
        - The OS looks up the `.desktop` or `.exe` shortcut, and resolves it to the actual binary file on disk (e.g., `/opt/google/chrome/chrome`)
    
    - File Systems (bridge between the OS and Hardware Storage)
        - Chrome’s binary and resources are loaded from disk (SSD/HDD) into main memory (RAM).
        - Uses file system structures like inodes, FAT, NTFS, ext4, etc.



2. The OS creates a process.
    - Processes and Threads:
        - OS allocates a new process for Chrome.
        - Loads the executable binary and starts the main thread.
        - Chrome may soon create multiple threads/processes — for UI, renderer, network, etc.
    - Virtual Memory:
        - The OS gives the process its own virtual address space.
        - Virtual memory gives each process a clean, isolated view of memory while letting the OS control, protect, and efficiently manage the real physical RAM.
        - Chrome access memory through a virtual address which is then mapped to a physical address on the RAM.
    - System Calls:
        - Chrome makes syscalls like fork(), exec(), mmap(), open(), etc. to interact with the OS.
        - For example, if you create a new tab, Chrome will make a fork() syscall to create a new process.

3. CPU starts executing instructions.
    - Computer Architecture / Microprocessors:
        - The CPU fetches, decodes, and executes the machine instructions, which come from the loaded Chrome binary.
        - The compiled binary uses an ISA (e.g., x86, ARM), which the CPU understands.
        - Data and instructions are loaded into L1/L2/L3 CPU caches for speed. The CPU cache helps speed up repeated access to data like HTML, JavaScript, DOM trees, images, etc.

4. Chrome starts up: Code executes.
    - Compilers and Languages:
        - The Chrome binary was produced by a compiler (e.g., Clang) from C++ source (This happened at Google's office, not in your laptop, you just downloaded the compiled binary).
        - It includes runtime libraries, startup routines (main()), and UI code.
    - Dynamic Linking:
        - Libraries like libc, graphics, or network are dynamically loaded. This is done to reduce the effective size, use shared code, etc.
    - Heap/Stack:
        - Chrome allocates memory dynamically for tabs, DOM trees, user input buffers, etc.

5. Threads are created.
    - Concurrency / Multithreading:
        -  Chrome creates: Main thread for UI, renderer processes (one per tab, for security) and network thread for sending/receiving HTTP data.
    - OS Scheduling:
        - The OS uses a scheduler to give CPU time slices to these threads and processes.
    - Context Switching:
        - When switching between tabs/processes or running in the background, context switches happen.

6. A tab is opened.
    - Networking:
        - When you type https://www.google.com, Chrome: Resolves DNS --> Opens a TCP connection to Google servers --> Performs a TLS handshake (for HTTPS) --> Sends/receives HTTP requests/responses.
    - Sockets / Protocol Stack:
        - Interacts with the OS’s TCP/IP stack via socket system calls.
        - Underneath, data travels through: Application layer (HTTP) --> Transport (TCP) -->  Network (IP) --> Link (Ethernet/Wi-Fi)

7. Rendering and JS execution begins.
    - DOM and Rendering:
        - HTML and CSS are parsed into DOM and CSSOM trees.
        - JavaScript is parsed and executed.
    - Compiler and Interpreter:
        - JS is interpreted or JIT-compiled (e.g., by V8 engine).
        - V8 uses compiler concepts: tokenization, parsing, bytecode, optimization.
    - Automata Theory:
        - Lexing and parsing JS/HTML rely on finite automata, CFGs, and parsers — classic compiler theory.

8. Display output happens.
    - Graphics Subsystem:
        - GPU is involved for compositing and rendering.
        - Chrome uses Skia or OpenGL/Vulkan under the hood.
    - Syscalls to OS:
        - Chrome uses GUI libraries to draw to the screen (X11, Wayland, Windows GDI, etc.).
        - Keyboard and mouse inputs are captured by the OS and passed to Chrome.



