+++
title = "130. It's all about that Bayes"
date = 2025-10-22
+++

One of the most surprising things about graduate school is how often the ideas from class start shaping the way I see the world. Some concepts stay confined to the whiteboard. Others quietly start living in your head, influencing how you reason, decide, and even reflect. For me, Bayes’ rule has become one of those ideas.

On paper, it’s a simple equation from probability theory --> a way to update your belief when you receive new evidence:
$$
P(A \mid B) = \frac{P(B \mid A) \* P(A)}{P(B)}
$$


This math translates to english like this:

The chance that something (A) is true after seeing some evidence (B) equals
1. how likely that evidence would be if A were true —-> we’re essentially flipping the direction to ask, “if this idea were true, how likely is it that I’d see this evidence?”
2. multiplied by how likely A was before seeing any evidence —-> this scales our belief based on how credible the idea already was.
3. and then divided by how likely that evidence was overall —-> this discounts the part of the evidence that could have appeared for other reasons.

An AI generated summary would be:
Bayes’ rule says that the chance something is true after seeing new evidence equals how likely that evidence would be if it were true, scaled by how much you believed it before, and adjusted for how common that evidence is in general.

But beneath the math lies a philosophy of thinking.

Bayes’ rule says that belief isn’t a switch you turn on or off. It’s something you calibrate. It tells you how strongly you should believe something, given both what you already thought (your prior) and what you’ve just observed (your evidence).

That’s a powerful idea. Because in everyday life, we tend to think in absolutes: something is true or it isn’t, someone is right or they’re wrong. But Bayes reminds us that the world is rarely that binary. Beliefs exist on a spectrum. Evidence doesn’t prove, it nudges.

I recently thought in Bayesian to choose a study spot, and this was my chain of thought:

1. The other day, I was trying to decide where to study for my Operating Systems midterm. My prior belief was simple and strong: the library is the best place to get work done!

2. Then came some new evidence. A friend mentioned that the library was completely packed. Meanwhile, a café on campus was supposedly half-empty and had decent Wi-Fi.

This is a perfect example of Bayesian thinking. How should I update my belief based on this new information?

3. If my old hypothesis --> “the library is the best place to study” were true, the likelihood of seeing it look like a crowded concert venue would be pretty low. But if the alternative hypothesis, A: “the café is the better spot today,” were true, then this new evidence fits perfectly.

4. After a moment of mental calculation, I updated my belief (my posterior) and decided to grab my laptop and walk to the café. The café turned out to be perfect: quiet, a nice playlist, and a power outlet that actually worked. Tiny, everyday confirmation that Bayesian thinking works, especially when caffeine is involved.

Here is how it fits the formula:
$$
P(A \mid B) = \frac{P(B \mid A) \* P(A)}{P(B)}
$$

1. Hypothesis (A): The café is a better place to study today.
2. Evidence (B): Your friend said the library is crowded and the café is quiet.

Now let’s map each term:

1. P(A) — the prior: How much I believed the café was a good spot before hearing the tip. Normally, I favor the library, so this is low.

2. P(B|A) — the likelihood: If the café really is the better spot today, how likely would my friend notice it’s quiet and tell me? High, because it makes sense.

3. P(B) — the evidence probability: How likely is it, overall, that my friend would report “library crowded, café quiet,” regardless of which spot is actually better? This normalizes the effect of the evidence.

4. P(A|B) — the posterior: My updated belief in the café being the better spot after hearing my friend’s tip. It’s higher than my prior, because the evidence supports it.

Like this, think Bayes, use your observations to update your beliefs and make better life decisions!