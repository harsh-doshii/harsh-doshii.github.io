+++
title = "82. Stream Processing - A primer"
date = 2024-06-02

+++

"Stream" refers to data that is incrementally made available over time. These are unbounded. In a stream processing context, a record is more commonly known as an event, but it is essentially the same thing: a small, self-contained, immutable object containing the details of something that happened at some point in time. You can append an event in a file that you are processing, add it to a database or send across a network, etc. In a streaming system, related events are usually grouped together into a topic or stream.

Messaging Systems: A common approach for notifying consumers about new events is to use a messaging system: a producer sends a message containing the event, which is then pushed to consumers. In such a pub/sub model there are various kinds of systems that are possible. One must ask the following questions:

1. What happens if the producers send messages faster than the consumers can process them?
   There are three options:
   a. System can drop the messages.
   b. Buffer messages in a queue (The size of the queue grows).
   c. Apply Backpressure (aka Flow Control).

message broker (aka message queue), is essentially a kind of database that is optimized for handling message streams. It runs as a server, with producers and consumers connecting to it as clients. Producers write messages to the broker, and consumers receive them by reading them from the broker.

Producer --> Broker --> Consumer

Introduction of a Broker/Queue makes the consumers generally asynchronous. That is when a producer sends a message, it only waits for the broker to receieve it. The consumer will pick up and receieve it an undetermined point in time.

Multiple Consumers:
When there are multiple consumers which are reading messages from the same topic, two main patterns are being used:

1. Load Balancing: Each message is delivered to one of the consumers, so the consumers can share the work of processing the messages in the topic. The broker may assign messages to consumers arbitrarily. This is good for concurrency.

2. Fan-out: Each message is delivered to all of the consumers. Fan-out allows several independent consumers to each “tune in” to the same broadcast of messages, without affecting each other—the streaming equivalent of having several different batch jobs that read the same input file.

You can combine these two methods too! E.g. Keep two groups. First the message Fan-outs to both the groups. Inside each group, you can put a load balancer so that one node inside the two groups can process the message.

When a consumer is done processing a message, it is supposed to send a Ack to the broker. Else broker will reprocess the message. In case of one consumer crashing out of the multiple consumers, the reprocessing concept can cause ordering issues.

Credits: This blog follows the Chapter 11. Stream Processing from DDIA.
