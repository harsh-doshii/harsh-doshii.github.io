+++
title = "76. Writing a cooldown mechanism"
date = 2024-04-05

+++
There are a lot of notifications that are being triggered in short time, which is causing notification spamming. This is in turn causes un-subscription to the SNS. To fix this we need a cool-down/throttling mechanism.

Problem is that this LOC gets hit over 10,000 times in 1 minute, causing email spam (expected) which in turn causes AWS SNS to automatically unsubscribe the members from this email topic (unexpected). This is an AWS policy to protect consumers against the spma. LOC:

```py
    self._sns_client.send_notification(self.topic_arn, subject, email)
```

I need to write a cooling mechanism, these are my thoughts:

1. Define a cooldown duration between two consecutive notifications. My target is to execute this LOC from 10,000 times a minute to 1,000 times a minute so I need:
1000 emails --> 60 seconds
1 email --> 0.06 seconds --> 60 ms.
Therefore there should be a cooldown duration of 60 ms between two consecutive emails.

2. Keep a track of current time (ct) (using python libraries) and maintain the time that the last notification (tln) was sent.

3. If current_time - time_since_last_notification < cooldown_duration, we put the thread to sleep: `time.sleep(self.cooldown_duration - time_since_last_notification)`

4. We hit the send_notification LOC as soon as the thread wakes up, and then we update the time_since_last_notification to be the current time.

Note: One thing that you have to be sure of is the unit of cooldown_definition when you define it. Be sure if it is seconds, milli seconds or something else.

This works!
