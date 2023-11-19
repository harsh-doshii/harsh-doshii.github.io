+++
title = "18. Namespace"
date = 2023-11-17

+++

Namespace is a common term that one can hear in the world of computers. Namespace comes up in C++, File Systems, k8s and so on. Todaym, I am looking to define it clearly for a better understanding. 

Wikipedia defines it as: In computing, a namespace is a set of signs (names) that are used to identify and refer to objects of various kinds. A namespace ensures that all of a given set of objects have unique names so that they can be easily identified.

As an analogy, consider a system of naming of people where each person has a given name, as well as a family name shared with their relatives. If the first names of family members are unique only within each family, then each person can be uniquely identified by the combination of first name and family name; there is only one (let's take it) Harsh Doshi, though there may be many Harsh. Within the namespace of the Doshi family, just "Harsh" suffices to unambiguously designate this person, while within the "global" namespace of all people, the full name must be used.

Namespaces are a way to organize things. In Kubernetes, namespaces are a way to organize clusters into sub-clusters. Namespaces cannot be nested within each other. You can loosely think of namespace as "scope".