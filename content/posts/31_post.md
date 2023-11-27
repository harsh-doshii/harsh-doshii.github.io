+++
title = "31. YMAL Ain't Markup Language"
date = 2023-11-30

+++

The nature of my work requires me to do devops stuff as well and YAML is an integral part of it. I would rather say, I have had more PRs in YAML than in any other coding language. YAML is a fairly easy, human-readable data-serialization language. I have used it extensively for configurations of pipelines, dockerfiles, aws-environments, etc. Let's go over what makes a YAML file.

1. Key-Value Pairs:

`fruit: apple

dessert: "apple pie"`

In case that there is a whitespace in the value, wrap it up inside inverted commas.


2. Arrays/Lists:

Each Key has multiple Values. Order matters:

`Drinks:

    - Smoothie

    - "Sparkling Water"
`
This is basically: `Drinks = [Smoothie, Sparkling Water]`

3. Directories/Maps:

There are Key-Value pairs for each Key. Order doesn't matter.

`Burger:

    Calories: 500

    Price: 15
`

This is basically: `Burger = [Calories --> 500, Price --> 15]`


4. Spacing matters in YAML! Keep it consistent.

Knowledge Credits: [Vincent Lab](https://www.youtube.com/watch?v=0fbnyS_lHW4)