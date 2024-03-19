+++
title = "70. Why index a DB?"
date = 2024-03-16

+++

Let's say you have a database with n records, the cost of lookup there is O(n) which is actually pretty expensive. In order to efficiently find the value for a particular key in the database, we need a different data structure: an _index_.

An index is an additional structure that is derived from the primary data. Indexing speeds up Reads but really slows down Writes. Any kind of index usually slows down writes, because the index also needs to be updated every time data is written. It is tradeoff, and this is why indexing is not done by default, it is developer's choice.

Note: A log is an append-only sequence of records. Many databases internally use a log, which is an append-only data file.

1. Hash Indexes:
Let's say we have key-value data.
The simplest way of hashing is: key --> byte offset. Basically the key saves the in-memory location of the value and not the value. Such an arranagment gives faster reads and writes. But the catch is that all keys must fit in the available RAM since the hash-map is kept completely in memory. This is an ideal arrangement where there are not a lot of keys but the value associated with key is updated frequently.

We only ever append to a file (log) — so how do we avoid eventually running out of disk space? A good solution is to break the log into segments of a certain size by closing a segment file when it reaches a certain size, and making subsequent writes to a new segment file. We can then perform compaction on these segments. Compaction means throwing away duplicate keys in the log, and keeping only the most recent update for each key. We can then merge segments, these have the most recently updated values from all Data file segments.

More about internal implementations of a DB:

1. File-format: CSV is not the best format for a log. It is better to use a binary format that first encodes the length of a string in bytes.
2. Deleting records: If you want to delete a key and its associated value, you have to append a special deletion record to the data file (sometimes called a tombstone).
3. Crash recovery: 