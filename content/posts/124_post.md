+++
title = "124. Agents, 01: Intro to Transformers & LLMs"
date = 2025-06-24
+++

Let's start with LM, Language Models first;
Language models can, at a very abstract level, be thought of as functions. Given an input sentence, the function outputs the next word based on probability.

Now, let's add some more nuance to it.

1. The output is not deterministic (unless forced), hence it should be thought of a as _probablistic function_.
2. Token is the more correct replacement for "word". A token can be a word, a part of word or even punctuation.

Hence, a better way to think about LMs is:
At a high level, language models can be viewed as probabilistic functions. Given an input sequence of tokens, they output a probability distribution over possible next tokens, from which the next token is selected.

Large Language Models (LLMs) have the same basic idea, but these are the models which have a distinction of being trained over a massive amount of data, and often contain billions or parameters. This makes the LLM capable of deep semantic patterns in languages, reasoning abilities, coding skills, etc.

A LM can find the next word in the sentence: "Humpty Dumpty sat on a.. ", but a LLM could do that and also write the same poem in Gen-z Lingo, etc. An example I generated through GPT-4:

_Humpty Dumpty sat on the wall,_

_Big egg energy, vibin’ with it all._

_Humpty Dumpty had a great fall_

_RIP my guy, that wall did him dirty fr_

Apart from just "predicting" the next word like LMs, LLMs can also generate and reason.

Now, let's talk about transformers.

Transformers are a type of Neural Network architecture, well suited to handle large sequential data - especially text, through a mechanism called "self-attention". Attention is the mechanism that separates Transformers from RNNs and CNNs.

The function of transformers is to take in token embeddings (vectors) and transform them into richer, contextualized vectors using self-attention and feedforward layers. These vectors are then passed through a linear and softmax layer to predict the next token in language modeling tasks.

Large Language Models (LLMs) can, in theory, be built using different neural network architectures, but in practice, Transformers have become the dominant architecture. For example, GPT-3 is an LLM based on the GPT architecture, which is a type of transformer model.
