+++
title = "41. Hexagonal Architecture"
date = 2023-12-11

+++

An application usually comprises of three layers:

1. Presentation Layer: could be Frontend/API. Basically how you are showcasing your data.
2. Logic layer: Business logic
3. Data layer: Database

a Three-tier application model is a good place to start, but it is very easy to have the layers coupled with each other. To prevent coupling, we use dependecy injection in Presentation layer and Abstraction in Logic Layer. Hexagonal Architecur takes decoupling to a whole another level!

Imagine your application is a hexagon. Each side of it has a Port, which is basically an interface between the application and the outside world, it is throught this port that the application talks to services outside. The Port has a read and write method defined, which works with the database. There is an adapter on top of the port which converts the output given by the port to output that is fit to be consumed by the services outside. An adapter is basically something that converts things to make it suitable for consumption.

The application here has two side:

Input: Adapter --> Port --> Application

Output: Application --> Port --> Adapter

This design pattern has been given hexagonal shape to just show its different ip and op sides.
