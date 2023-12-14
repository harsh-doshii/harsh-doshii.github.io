+++
title = "37. application.properties in Springboot"
date = 2023-12-05

+++

Springboot is a development framework for applications. Whenever you create a new springboot project, a file is located inside the src/main/resources folder named application.properties that define the configuration of the application. Configuration includes things like which port the app runs on, database connectivity, etc.

Some examples of properties that you can play with inside the file are:

1. `server.port=8989` defines the port on which our application will run.
2. `spring.application.name = userservice` defines the name of our application.
3. We can also define aws properties in the application.properties file

You can also define your own properties to work with!