+++
title = "72. Data Warehouse and Data Lake"
date = 2024-03-19

+++

Based on the use case, DBs are generally of two types: Transaction processing systems (OLTP) & Analytic systems (OLAP).
OTLP is generally about persisting changes to the databases in the form of read and writes.
OLAP is mainly used to make intelligent business queries and decisions from the DB.

A data warehouse, is a separate database that analysts can query to their hearts’ content, without affecting OLTP operations. The data warehouse contains a read-only copy of the data in all the various OLTP systems in the company. Data is extracted from OLTP databases (using either a periodic data dump or a continuous stream of updates), transformed into an analysis-friendly schema, cleaned up, and then loaded into the data warehouse.

In data Warehouse, we have highly structured and unified data to support business intelligence and analytics needs. Data Lake, on the other hand is a repository that stores all of your organization's data — both structured and unstructured. Think of it as a massive storage pool for data in its natural, raw state (like a lake).

The main difference is that Lake contains both structured and unstructured data, whereas warehouse contains only structured data.
