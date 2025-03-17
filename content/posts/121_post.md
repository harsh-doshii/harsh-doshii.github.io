+++
title = "121. Querying code as if it is a DB - CodeQL, an intro"
date = 2025-03-17
 
+++

We have been querying Database since forever, but can we query through a codebase? Yes we can through CodeQL now. CodeQL stands for Code Query Language.

Wait, how is searching through a codebase, through simple text search in IDE different from querying?
Searching through a codebase using an IDE's search functionality and querying with CodeQL serve different purposes and have different capabilities.

Most IDEs provide basic and advanced search capabilities, such as: Keyword search, Regex, Finding References to locate function or variable usages, etc. However, these searches are mostly syntactic—they work by finding literal text matches or simple patterns but do not analyze code semantics (i.e., meaning, relationships, or data flow).

On the other hand, CodeQL is a powerful static analysis tool that allows you to query a codebase semantically rather than just searching for text patterns. It:

1. Understands code structure: It builds an internal database (abstract syntax tree, control flow graph, etc.), so you can query program elements meaningfully.
2. Finds security vulnerabilities: You can write queries to detect SQL injections, hardcoded secrets, and memory leaks, which are impossible with simple text searches.
3. Analyzes relationships: Queries can track function calls, variable flows, inheritance, and data propagation.
4. Cross-file & cross-repository analysis: Unlike IDE searches, which are often limited to a single repository, CodeQL can analyze entire projects or organizations.

CodeQL analysis consists of three steps:

1. Preparing the code, by creating a CodeQL database. (Basically convert the code --> representation of code in terms of AST, Graphs, etc.)
2. Running CodeQL queries against the database.
3. Interpreting the query results.

Footnote:

Difference between Syntax and Semantics:

- Syntax is about the language laws, rules. It is basically "TAX". For eg, missing a `;` at the end of a C++ statement, is a syntactical error. "I goed to play." is a syntax mistake because it violates the rules of grammar.
- Semantics is about the logic and meaning. Remember it as "seMEANtics". For eg, dividing by 0 is a semantic error as it is illogical. "The chair ate the apple" is syntactically correct but semantically incorrect as it makes no sense.
