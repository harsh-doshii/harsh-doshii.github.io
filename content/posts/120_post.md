+++
title = "120. What are React Hooks?"
date = 2025-02-28
 
+++

The term _hook_ in programming generally refers to a mechanism that allows users to insert their own code into an existing process.

In react, hooks were introduced to eliminate the need for class components.

Before hooks, React had two types of components:

1. Function Components: Simple, stateless, and used for UI rendering.
2. Class Components: Used when state or lifecycle methods were needed.

While Class Components worked, they had several problems, mainly related to complexity and poor code reusability.
Hooks transformed React development by eliminating class component complexity and making stateful logic reusable and readable. With hooks, React is now more functional, modular, and developer-friendly.

Remember:

1. State: A combination of values that describe the current condition of the UI.
2. Stateful logic: Any code that uses the state.

Think of hooks like a plugin system—you "hook into" React's internals and extend or modify behavior dynamically.

Let's learn about Hooks using useState - the most used react Hook.

The useState hook lets you add state to a function component. Remember, hooks are functions.

The syntax goes something like this:

```javascript
const [variableName, functionName] = useState(initialValue);
```

The `functionName` is basically a setter function. `functionName(valueA)` will basically make variableName = valueA;

However, a better way to use this `functionName` is to use previous State along with it, like, instead of:
`functionName(valueA + 1)` , use, `functionName(valueA => valueA + 1)`

You can use this `variableName` and the `functionName` everywhere in the JSX to make use of the values and/or to update them.

This is mainly all about the useState react hook, have fun with it!
