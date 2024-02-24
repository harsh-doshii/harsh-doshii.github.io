+++
title = "64.  A very very subtle flag difference"
date = 2024-02-24

+++

Whenever I am writing a command using the CLI, I often have the confusion whether the flag is `--` or `-`?
Like is it `--name Harsh` or `-name Harsh`?

The answer is pretty obvious, but I learnt it today so putting it out here.
`--` is when you use the full name of the flag
`-` is when you use shorthand (a single letter) for the flag. More technically these are not even called flags, these are called options.

So in this case: `--name Harsh` is correct and so is `-n Harsh`.
