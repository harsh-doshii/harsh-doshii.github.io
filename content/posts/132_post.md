+++
title = "132. What is a RAG"
date = 2026-06-01
+++

LLMs are awesome to get reasoned information - but what about when you want reasoning capabilities on data that the LLM has not been trained on? Think of a case in which you want to get information (retrieve) from internal documentations or your own whatsapp chats or your own essays. This is where Retrieval-Augmented Generation (RAG) comes in. By combining the ability to retrieve specific contextual information with the power of reasoning, RAG enables AI to tap into your unique knowledge base and generate intelligent responses. Retrieval-Augmented Generation literally means that first you retrieve (update context) the right information from knowledge base then augment it with generative AI capabilities.

Generally the RAG knowledge base is stored as a vector-database. Another advantage of a RAG based system is that we can constantly keeo updating a knowledge base compared to a fixed out-of-the-box trained LLM, wherein we can't update it's knowledge (finetuning). Finetuning for small tasks is essentially an overkill. 

Here's the flow of a RAG system:
1. The User Query comes in, it is then encoded into apt numerical values.
2. The encoded query goes to a Retreival Model, which then searches the knowledge base for accurate information.
3. The retrieved context and the user query is then fed into the LLM, which then generates a superior response.

That's it, RAGs are simple!