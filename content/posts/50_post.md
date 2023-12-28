+++
title = "50. Making my own Teeny Tiny Compiler - Parser"
date = 2023-12-19

+++

I am following this article: [Let's make a Teeny Tiny compiler, part 2](https://austinhenley.com/blog/teenytinycompiler2.html) by the very amazing Austin Henley. This blog is placeholder for my notes that I am making while I go follow Austin's article.

A compiler basically has the following flow:
source code --> lexer (gives tokens) --> parser (gives program tree) --> emitter (gives compiled code)

We finished with the lexer yesterday so now we are going forward with the parser.

The parser is the component that will make sure the code follows the correct syntax. It does this by looking at the tokens, one at a time, and deciding if the ordering is legal as defined by our language. The input to the parser is the sequence of tokens and the output is the parse tree. A parse tree is a more structured representation of the code than just a text string or a sequence of tokens. We will utilize the call stack of our parser to implicitly build the parse tree as we go.

The Language we are compiling for, needs a grammar. Grammar for Teeny Tiny looks like this:

```markdown
program ::= {statement}
statement ::= "PRINT" (expression | string) nl
    | "IF" comparison "THEN" nl {statement} "ENDIF" nl
    | "WHILE" comparison "REPEAT" nl {statement} "ENDWHILE" nl
    | "LABEL" ident nl
    | "GOTO" ident nl
    | "LET" ident "=" expression nl
    | "INPUT" ident nl
comparison ::= expression (("==" | "!=" | ">" | ">=" | "<" | "<=") expression)+
expression ::= term {( "-" | "+" ) term}
term ::= unary {( "/" | "*" ) unary}
unary ::= ["+" | "-"] primary
primary ::= number | ident
nl ::= '\n'+
```

When implementing the parser, each of these grammar rules will get their own function in the Python code. It is a one-to-one mapping from grammar to code.

