+++
title = "117. An uber level view of BitTorrent"
date = 2025-01-30
 
+++

Why was BitTorrent created? To make downloading faster.

Why were downloads slow in the first place?

- Think of a normal client-server architecture in which the client is requesting an object from a server and downloading it.
- Downloading is a two-way street. There is a speed of asking (download speed of the client) and and speed of giving (upload speed of the server).
- Generally the upload speed of the server is highly strained because of multiple clients asking it for a resource, which acts as a limiting factor for the entire download.

How does BitTorrent solve this problem?

- BitTorrent solves this problem by allowing _downloads from multiple sources concurrently._
- It uses a P2P network, in which every node/computer/server is connected to another and have the same capibiliites.
- The protocol divides the resource (file to be downloaded) into blocks and blocks into pieces. Each server in the network then sends the pieces of the blocks to the client requesting for it. The client then finally stitches thes pieces back to form the main file.

Some terminology:

- Peers: Nodes in the P2P network are called Peers. _Active Peers_ is the subset of Peers that are participating in the upload/download transaction. Peers can be of two types - Leechers, Seeders.
- Leechers: Nodes/Peers that are actively downloading a resource, from other nodes.
- Seeders: Nodes that have completed the download of a resource and now are acting as servers for leechers that are asking for that resource.
