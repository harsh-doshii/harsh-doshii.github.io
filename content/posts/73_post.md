+++
title = "73. Why do a binary encoding on JSON?"
date = 2024-03-20

+++

JSON is normally in text-format, which gives it the buff it needs to be human readable and easy to work with. However, the textual JSON is inefficient in terms of storage space and processing speed, especially while dealing with large volumes of data. Binary encoding of JSON addresses these inefficiencies by representing JSON data in a more compact and efficient binary format.

Here are some reasons why binary encoding of JSON is beneficial:

Reduced Size: Binary encoding typically results in smaller payloads compared to their textual counterparts. This reduction in size is particularly advantageous in scenarios where bandwidth or storage space is limited, such as in network communication protocols or mobile applications.

Faster Parsing: Binary encoding can be parsed more quickly than textual JSON because it avoids the need for string parsing and interpretation. Binary-encoded data can be deserialized directly into memory structures, reducing processing overhead and improving performance, especially in applications that need to handle large volumes of JSON data rapidly.

Efficient Transmission: Binary encoding can lead to faster data transmission over networks due to smaller payload sizes. This can result in improved response times and better overall network performance, especially in situations where latency is a concern.

Compact Representation: Binary encoding can represent complex JSON data structures more compactly, leading to more efficient use of memory and storage resources.

Binary Protocols Integration: In some cases, binary encoding of JSON is used to integrate JSON data with binary protocols or systems that work more efficiently with binary data formats.
