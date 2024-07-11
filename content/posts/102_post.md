+++
title = "102. Wrapping a JAR in a Docker container"
date = 2024-07-11

+++

You can wrap a Java executable (JAR/WAR) in a docker container.

Basically you need to create a Dockerfile, which has java as a part of its installations in the base image. Then you need to copy the JAR from local to the Dockerfile using `COPY`. Then you need to run the java `CMD`.

```dockerfile
FROM openjdk:21

COPY target/demoApp-*.jar /demoApp.jar

CMD ["java", "-jar", "/demoApp.jar"]
```

Now you gotta build the image:

`docker build -t giveItAName:versionNumber .`

Now you gotta run it as well:

`docker run -p 8080:8080 giveItAName:versionNumber`

voila, it works!