+++
title = "33. Docker containers for local development"
date = 2023-12-02

+++

Development using Docker is now a default. Today, we explore on the basics of Docker.

Dockerfile:

1. Dockerfile builds a docker image --> image runs and forms a container --> container.
2. Dockerfile is a set of Docker Commands. A Docker image consists of read-only layers, each of which represents a Dockerfile instruction. The layers are stacked and each one is a delta of the changes from the previous layer. Each instruction in the Dockerfile builds an layer on the image. A Dockerfile must begin with a FROM instruction.
3. Running an image and generating a container adds a new writable layer, the “container layer,” on top of the underlying layers. All changes made to the running container, such as writing new files, modifying existing files, and deleting files, are written to this writable container layer.

A Dockerfile basically tells you how the image is build. Then you can use `docker run` and give configuration in the CMD to run it. Like `docker run -flags -port:mapping image-name`.
However, using docker command is sort of messy, especially when you have to define a lot of environment variables for that container and when you have to spin up multiple containers.
There is a better way to do this image --> container transformation and that is through `docker compose up`.

docker-compose: docker-compose.yaml is a file that defines how to go from image --> container. It basically does things like define ports, container names, manage volumes and all other properties that you can imagine. It is a readable and more organized way of orchestrating containers.

It is like this,
A docker run command like this:
`docker run -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g nginx`

is equivalent to a docker-compose.yaml:

```
name: <your project name>
    services:
    nginx:
        ports:
            - 80:80
        volumes:
            - /var/run/docker.sock:/tmp/docker.sock:ro
        restart: always
        logging:
            options:
            max-size: 1g
    image: nginx
```
And a `docker-compose up` command

An important FAQ straight from Docker documentation:
What's the difference between up, run, and start?

Typically, you want `docker compose up`. Use up to start or restart all the services defined in a compose.yml. In the default "attached" mode, you see all the logs from all the containers. In "detached" mode (-d), Compose exits after starting the containers, but the containers continue to run in the background.

The `docker compose run` command is for running "one-off" or "adhoc" tasks. It requires the service name you want to run and only starts containers for services that the running service depends on. Use run to run tests or perform an administrative task such as removing or adding data to a data volume container. The run command acts like docker run -ti in that it opens an interactive terminal to the container and returns an exit status matching the exit status of the process in the container.

The `docker compose start` command is useful only to restart containers that were previously created but were stopped. It never creates new containers.

Final Note:
The three primary differences between the Dockerfile and docker-compose are:

1. The Dockerfile is used to build images while the docker-compose.yaml file is used to run images.
2. The Dockerfile uses the docker build command, while the docker-compose.yaml file uses the docker-compose up command.
3. A docker-compose.yaml file can reference a Dockerfile, but a Dockerfile can’t reference a docker-compose file.

Knowledge Credits: [TheServerSide](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Dockerfile-vs-docker-compose-Whats-the-difference)