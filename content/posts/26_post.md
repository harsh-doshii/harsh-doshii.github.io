+++
title = "26. Context vs Config"
date = 2023-11-25

+++

Context and Config are not necessarily Software terms, but are widely used in the industry. I generally tend to get confused on the differences between the two, so I am diving in deeper. I couldn't find good articles/videos on this topic (prolly this topic is self-explainatory for many). So this learning is an summary from my conversations with ChatGPT about the same.

Context: This has everything to do with "storage" or "state". Context typically refers to an object or structure that holds application-wide information or state and can be accessed throughout different parts of the application without explicit passing as a parameter. It provides a way to share specific information, settings, or data across components or layers of an application. It helps avoid the need to explicitly pass this information down through multiple layers of the application.

Config: This has everything to do with "properties". Config refers to settings, parameters, or variables that determine the behavior or settings of a software application, module, or system. It's used to define how an application should operate or behave under various circumstances. 

While they serve different purposes, there might be cases where they intersect. For instance, a context object might contain configuration settings that are used across various components of the application. However, conceptually, context primarily deals with sharing runtime information across components, whereas config deals with defining settings and behavior.

Let's use an analogy with a workplace to differentiate between "Context" and "Config":
Imagine you work in a large office building.

Context:
The context would be like the office environment itself. It includes everything within the office building that everyone can access and use. This environment encompasses shared resources such as meeting rooms, printers, cafeteria, and common areas. Regardless of where you are in the building, you have access to these shared resources without needing to carry them around. Similarly, in software, a context holds shared information or state accessible throughout the application without needing to pass it explicitly to every function or component.

Config:
Now, think of the configuration as the settings or preferences you have at your workstation within that office building. Your desk setup, chair height, monitor brightness, and other personal settings are specific to your workstation. You might adjust these settings to suit your preferences, but they don't affect the entire office. Similarly, in software, configuration settings determine specific behaviors or parameters for the application or a module. They are like personal preferences that customize how a particular part of the software operates without impacting the entire application's environment.

In this analogy, the office building represents the context, providing a shared space/environment accessible to everyone, while the workstation settings represent the configuration, offering personalized adjustments that tailor a specific area according to individual preferences.





