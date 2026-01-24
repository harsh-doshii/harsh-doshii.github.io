+++
title = "131. AI Agents are more than just prompts - Agents and Tools"
date = 2026-01-05
+++

For most of us, when we think of AI Engineering, we think of just writing Prompts. We import a model/make an api call, supply a prompt and voila the results are out - and we think that agentic development is complete. This is a very shallow view of how AI Agents development is supposed to be done. AI Agents and Agentic Systems are bigger than just answering prompts, they are usually capable of carrying out autonomous end-to-end tasks.

The most crucial feature that Agentic Systems bring is "orchestration". Let's say you want an answer to a question like "what is the temperature in mountain view in the month of May and are there any good outdoor events that I can go to in that temperature within 5 miles of Google Office?" This prompt, when given to a well developed agentic system will internally call: Weather agent to get the temperature, Events agent to get a list of events happening in May and Geolocation agents for proximity.

Some AI Agent development terms/definitions that one should be familiar with (coming straight from [Google ADK Docs](https://google.github.io/adk-docs/agents/), I will be strictly following the ADK environment)

1. Agents: Agent is a self-contained execution unit designed to act autonomously to achieve specific goals. Agents can perform tasks, interact with users, utilize external tools, and coordinate with other agents. Agents can be:
- LLM Agents: These are great entry points to the system as they can parse the natural language of prompts and then reason on what to do next.
- Workflow Agents: These specialized agents control the execution flow of other agents in predefined, deterministic patterns (sequence, parallel, or loop)
- Custom Agents: We can go nuts

2. Tools: A Tool represents a specific capability provided to an AI agent, enabling it to perform actions and interact with the world beyond its core text generation and reasoning abilities. What distinguishes capable agents from basic language models is often their effective use of tools. Tools are all the helpers that Agents call to execute work. Tools can be pre-built, think of APIs like Notion, Weather, etc. Other Agents can become tools too, that way agents orchestrate. You can build your custom tools too:
- Function Tools: Tools that we code up. They can be Async calls too.
- Agents-as-Tools: Use another, potentially specialized, agent as a tool for a parent agent.

In the next blog, we will dive deeper into AI Agents concepts of Memory, State, Sessions and Context!