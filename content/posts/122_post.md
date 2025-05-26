+++
title = "122. Identity vs Equality in DDD"
date = 2025-03-31
 
+++

Identity and Equality are important concepts in Object-Oriented Programming and especially useful in Domain-Driven Design (DDD), where we map business problems to the right models and behaviors.

A Value Object represents a business concept defined solely by its attributes and typically has no identity of its own. Two Value Objects are considered equal if all their attributes match. They are usually immutable to ensure consistency and avoid unintended changes.

For example, imagine a classroom where the only data points are First Name and Last Name. In such a setup, you wouldn't be able to differentiate between two students named John Doe, they would be indistinguishable as there’s no unique identifier separating them.

However, when dealing with domain entities, uniqueness comes from identity, not just values. Extending the previous example, if the classroom implements roll calls, then we could have one John Doe with roll number 17 and another with roll number 18. Now, even though both have the same name, they are distinct because their identity is defined by their roll number.

In this case, the student becomes an Entity, as it now has a unique identity.

This highlights the key difference:

1. Value Objects are equal if all their values match.

2. Entities are distinct based on identity, even if their attributes are identical.
