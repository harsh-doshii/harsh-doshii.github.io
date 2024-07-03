+++
title = "100. CIDRs"
date = 2024-07-03

+++

Recently at work, we got flagged for one of our services having the `K8S_PUBLIC_ENDPOINT_WHITELIST”: “[\“0.0.0.0/0\“]`. This is wrong because it allows literally all IPs to access the service. My senior told me that this happened because the _CIDRs for this environment were not defined_.

Break, pause, stop. I remember reading about CIDRs in my Networks class, but now it is certainly the time to dive deeper into this.

I will be following this [aws blog](https://aws.amazon.com/what-is/cidr/) to understand this. You can keep reading this one or just jump on to the link.

What is CIDR?

We know that every machine that connects to the internet has a unique number associated with it, this is the IP address. Devices use IP addresses to communicate with each other.
The machines are not _born with_ the IP addresses, IP addresses are rather allotted to the machines. Classless Inter-Domain Routing (CIDR) is an IP address allocation method that improves data routing efficiency on the internet.

What are the different IP address formats?

An IP address has two parts:
1. The network address is a series of numerical digits pointing to the network's unique identifier 
2. The host address is a series of numbers indicating the host or individual device identifier on the network.

IP Addresses earlier were allocated using the Classful addressing system. The total length of the address was fixed (32 for IPv4), and the number of bits allocated to the network and host portions were also fixed.

Classful Address:
The change between different classes are basically the different ratios/counts of the network address and host address.
Like:
1. Class A - 8 network bits + 24 host. (Class A supports 16,777,214 hosts for a network)
2. Class B - 16 network + 16 host
3. Class C - 24 network + 8 host.

Classless addresses:
Classless or Classless Inter-Domain Routing (CIDR) addresses use variable length subnet masking (VLSM) to alter the ratio between the network and host address bits in an IP address. A subnet mask is a set of identifiers that returns the network address’s value from the IP address by turning the host address into zeroes.

CIDR notation represents an IP address and a suffix that indicates network identifier bits in a specified format. For example, you could express 192.168.1.0 with a 22-bit network identifier as 192.168.1.0/22.
One more example, 192.0.2.0/24 is an IPv4 CIDR address where the first 24 bits, or 192.0.2, is the network address. 

I encourage the readers to read more about this in the aws blog I have linked above.

PS: This marks my 100th post, I am very happy with my learning progress!