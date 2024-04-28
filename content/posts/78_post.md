+++
title = "78. The Path to Observability"
date = 2024-04-28

+++

Observability is an upcoming doamin within SWE. I have dabbled with it before, during my internship in Flipkart, where in I used Jaeger, Open Telementery, Grafan and Prometheus to tinker around with stuff and built a tracing library for my team. Now I think it is a good time to dive deeper into it and become a SME. I want to carve a niche in this field. For that I am starting with this book Observability Engineering by Charity Majors, Liz Fong-Jones, George Miranda on O'Reilly. I will make blogs to note my key take-aways from this book.

## Difference between Observability and Monitoring

Even though both terms are being used interchangeably in the industry these days, Observability SMEs scoff at it.
> What separates monitoring from observability is the state space of system behavior, and moreover, how one might wish to explore the state space and at precisely what level of detail. By “state space,” I’m referring to all the possible emergent behaviors a system might exhibit during various phases: starting from when the system is being designed, to when the system is being developed, to when the system is being tested, to when the system is being deployed, to when the system is being exposed to users, to when the system is being debugged over the course of its lifetime. The more complex the system, the ever expanding and protean the state space.
> Observability allows for this state space to be painstakingly mapped out and explored in granular detail with a fine-tooth comb. Such meticulous exploration is often required to better understand unpredictable, long-tail, or multimodal distributions in system behavior. Monitoring, in contrast, provides an approximation of overall system health in broad brushstrokes.

## Definition of Observability from Mathematical Standpoint

 In control theory, observability is defined as a measure of how well internal states of a system can be inferred from knowledge of its external outputs.

## Definition of Observability from SWE standpoint

Definition of “observability” for software systems is a measure of how well you can understand and explain any state your system can get into, no matter how novel or bizarre. You must be able to comparatively debug that bizarre or novel state across all dimensions of system state data, and combinations of dimensions, in an ad hoc iterative investigation, without being required to define or predict those debugging needs in advance. If you can understand any bizarre or novel state without needing to ship new code, you have observability.

## Debugging with Metrics Versus Observability

The metrics-based approach of monitoring relies on having encountered known failure modes in the past. Monitoring helps detect when systems are over or under predictable thresholds that someone has previously deemed an anomaly. Modern distributed systems architectures notoriously fail in novel ways that no one is able to predict and that no one has experienced before.

Debugging with metrics requires you to connect dozens of disconnected metrics that were recorded over the course of executing any one particular request, across any number of services or machines, to infer what might have occurred over the various hops needed for its fulfillment. Debugging with observability starts with a very different substrate: a deep context of what was happening when this action occurred. Debugging with observability is about preserving as much of the context around any given request as possible, so that you can reconstruct the environment and circumstances that triggered the bug that led to a novel failure mode. Monitoring is for the known-unknowns, but observability is for the unknown-unknowns.

## The Role of Cardinality

Cardinality: In the context of databases, cardinality refers to the uniqueness of data values contained in a set. Low cardinality means that a column has a lot of duplicate values in its set. High cardinality means that the column contains a large percentage of completely unique values. Cardinality matters for observability, because high-cardinality information is almost always the most useful in identifying data for debugging or understanding a system.

## The Role of Dimensionality

While cardinality refers to the uniqueness of the values within your data, dimensionality refers to the number of keys within that data. Each dimension is a key-value pair. Imagine that you have an event schema that defines six high-cardinality dimensions per event: time, app, host, user, endpoint, and status. With those six dimensions, you can create queries that analyze any combination of dimensions to surface relevant patterns that may be contributing to anomalies. High-dimensionality data provides greater context about how those intersections unfold.

## Debugging with Observability

Observability tools are specifically designed to query against high-cardinality, high-dimensionality data. With observability, you iteratively investigate conditions you care about by exploring your data to see what it can reveal about the state of your system. You ask a question that you did not need to predict in advance to find answers or clues that will lead you to ask the next question, and the next, and the next. You repeat that pattern again and again until you find the needle in the proverbial haystack that you’re looking for. A key function of observable systems is the ability to explore your system in open-ended ways.

This finishes chapter 1 of the book. More to follow in upcomign blogs.
