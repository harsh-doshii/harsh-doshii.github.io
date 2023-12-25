+++
title = "45. Controller-Service-Repository in Springboot"
date = 2023-12-14

+++

Controller-Service-Repository is a famous pattern prevelant in a lot of Spring Boot applications. It is actually an implementation of the more generic Presentation-Logic-Data pattern of building scalable software.

Controller: The Controller layer, at the top of this pattern, is solely responsible for exposing the functionality so that it can be consumed by external entities (including, perhaps, a UI component). This is where you will define the REST Api endpoints. Controller calls the service layer.

Service: This is where the business logic is.

Repository: Repository layer, at the bottom of this pattern, is responsible for storing and retrieving some set of data. Repository is a design pattern commonly used for implementing the persistence layer.

It is a pretty simple seperation of concerns!

Know that Springboot is not a Model-View-Controller architecture pattern! For that we have Spring MVC which is a different framework.
