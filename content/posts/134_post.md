+++
title = "134. p values"
date = 2026-01-23
+++

1. p values are viewed in the context of hypothesis testing. Null hypothesis is something that we are trying to disprove. Alternate hypothesis is something we suspect, we actually care about or something that we want to be true. 

2. In the realm of hypothesis testing we can never prove that a hypothesis is true. Rather we conduct tests/experiments under the assumption that the null hypothesis is correct and try to see if there is an acceptable level of probability to reject it. In other words:
In hypothesis testing, we assume the null hypothesis is true, and we try to see whether the data provides strong enough evidence to reject it. If we reject the null, we say the data provides evidence in favor of the alternative — but we do not “prove” the alternative is true.

3. p value is short for probability value, hence p value has _everything_ to do with probability. It is the probability with which the data supports the null hypothesis. Thus a small p value means that the data is not supporting the null hypothesis a lot, so we can actually reject the null hypothesis. 

4. More precisely, a p-value doesn’t tell you if the null hypothesis is true or false. It just tells you how likely it
would be to obtain a particular result (from sample data) if the null hypothesis were true. 

Let's walk through with an example.
1. Let's say you have a coin. 
Your Ho is that the coin is fair.
Your H1 is that the coin is biased.

2. You tossed a coin 100 times, and 100 times its a head. (This is soo surprising for a fair coin!, our intuition now is that the coin is biased.)

3. Under the assumption that the null hypothesis is true (the coin is fair) what is the probability of this event? its 2^(-100). This is our p-value, it is extremely extremely small. Hence we have enough reason to reject the null hypothesis and believe the alternate hypothesis that our coin is biased. This fits our intuition as well!
