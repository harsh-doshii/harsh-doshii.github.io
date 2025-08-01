+++
title = "128. What are daemons?"
date = 2025-07-31
+++

A daemon is a service process that runs in the background and supervises the system or provides functionality to other processes, without direct user interaction. 

The main characteristics of daemons:

1. **Daemons run independently from the terminal/console.** Detaching from terminals prevents daemons from being affected by user logins, logouts, or terminal closures. This is essential for uninterrupted operation—daemons keep running to serve the system and users even when no one is logged in.

2. **Typically start at boot or Login.** Many daemons begin during system startup (e.g., network managers, logging, cron jobs), ensuring that core services are available as soon as the system is running and throughout its uptime.

3. **Managed by the System Init/Service Manager.** Tools like systemd, launchd (macOS), or the older init allow centralized management—starting, stopping, reloading, and monitoring daemons, ensuring system reliability and easier administration.

4. **Handles requests/events or monitors conditions.** Daemons commonly “wait” for events (e.g., incoming network connections, scheduled times, system signals) so they can respond instantly, providing services efficiently without polling or burdening the system with unnecessary computation. Daemons are a great fit for a client-server architecure thing, a common example of this is the Docker Daemon. 

The Docker daemon (dockerd) continuously runs in the background and waits for requests, typically sent via the Docker CLI, Docker Compose, or remote API calls such as “create a container,” “start/stop a container,” or “build an image.

5. **Daemons have a 'd' Suffix in their name.** So next time you see a process like `dockerd`, `sshd`, etc. know that these are daemon processes.



