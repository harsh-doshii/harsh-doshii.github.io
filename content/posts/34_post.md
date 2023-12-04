+++
title = "34. What is a bastion host?"
date = 2023-12-03

+++

Today I ssh-ed into an address which had 'bastion' in its domain. I have come across bastion before but never really looked into it, so here goes!

A bastion host is a server whose purpose is to provide access to a private network from an external network, such as the internet.

It is like a watchman to a house. It has a set of rules that decides whom to allow and not. The simplest way to achieve bastion protection is to only ssh only through the bastion host ip. Bastion is like the connection between a Private and Public network. Bastion host is a server in public subnet.
