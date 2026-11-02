+++
title = "Privacy"
path = "privacy"
+++

*Last updated: November 2, 2026*

This page covers my [/body](/body/) page and the small app behind it, **doshi's scratchpad body sync**, which reads my own training and health data so I can show it here. It isn't offered to anyone else: the only account it ever signs in with is mine.

## What it reads

- **Hevy** (my workout log): workouts, exercises and sets, through Hevy's API with my own key.
- **Google Health API**: daily steps, resting heart rate and heart rate variability. These are recorded by my Apple Watch; the Google Health app on my phone imports them from Apple Health. It asks Google for two **read-only** permissions:
  - `googlehealth.activity_and_fitness.readonly` for steps
  - `googlehealth.health_metrics_and_measurements.readonly` for resting heart rate and HRV

It never writes, edits or deletes anything in Hevy or Google Health, and it doesn't request sleep, location or GPS data.

## What gets published

The sync turns that into daily summaries, which appear on the /body page and in a public data file in this site's GitHub repository:

- **Training:** dates, workout duration, working sets, volume, the best set or estimated one-rep max per exercise, and sets per muscle.
- **Health:** daily resting heart rate, HRV and steps.

Left out on purpose: sleep, workout titles, descriptions and notes, the time of day I train, GPS or routes, and minute-by-minute heart rate.

Because the data file lives in a public Git repository, past versions stay in its history.

## Where credentials are kept

The Hevy key and the Google sign-in token are stored only as encrypted GitHub Actions secrets and on my own computer, never in the repository. The nightly job uses them to fetch the day's data, then discards the short-lived access tokens.

## Google API Services User Data Policy

The use of information received from Google APIs follows the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including its Limited Use requirements. The data is used only to show my own summaries on this site; it isn't sold, used for advertising, or shared with anyone for other purposes.

## Visiting this site

Like the rest of this blog, the /body page is static and doesn't set its own cookies or ask for anything. Pages do load a few third-party services, which receive the usual request details (such as your IP address and browser):

- **Umami** and **Google Analytics**, to count page views
- **Google Fonts** for the typefaces, and **jsDelivr** for the math-rendering library (KaTeX)

The site is hosted on **GitHub Pages**.

## Turning it off

I can revoke the app's Google access at any time (Google Account → Security → Third-party connections), and regenerate the Hevy key to cut off workout data. Deleting the data file removes the numbers from the page, though not from the repository's history.

## Contact

Questions about this page: reach me through [GitHub](https://github.com/harsh-doshii).
