+++
title = "125. The Story of My Experiments with AI: personal software"
date = 2025-06-26
+++

Thinly separated thoughts/ideas:

1. Sam Altman recently talked about this idea that AI will become deeply personal and customizable, enabling individuals to create software tailored to their specific needs and preferences.
2. AI-powered code editors like Cursor have significantly reduced the friction involved in building new software. So much so that I believe, in the future, instead of paying for apps with money or personal data, we’ll simply vibe-code our own. The delta between buying a generic app and quickly creating a lightweight, custom-built version that does exactly what you need is getting smaller every day.
3. With the skill of software writing being commoditized because of AI, the real moat lies in creativity. Execution is no longer the biggest challenge, now engineers can focus more on what should I build that will help everyone, over how would I build it.

I recently vibe-coded a lot of different software. Full disclosure - I used to be the one who would hate AI assisted coded, arguing that it is subpar, it takes the joy away, etc. But after successfully shipping a small utility app with AI’s help, I got hooked. With execution no longer being a major hurdle, I found myself getting bolder and more ambitious with the ideas I wanted to bring to life. 

Some of my recent experiments with AI include:
1. Thank-you board: [Link](https://thankyou-board.vercel.app/)

    The inconvenience: I wanted to say goodbye to my team at Salesforce with something meaningful; a personalized note for each person. I envisioned a retro board, something visual and interactive, rather than a static message or email.

    The solution: I designed and built a card-based web interface where each card starts with a teammate’s name. When clicked, the card flips to reveal a message. The interaction adds a tactile, almost nostalgic feel, turning a simple farewell into something more personal and memorable.

---

2. PennCoursePicker: [Github](https://github.com/harsh-doshii/pennCoursePicker)

    The inconvenience: Choosing the right courses at UPenn was surprisingly tedious. I had to sift through the course catalog, read long descriptions and prerequisites, then cross-reference each course number on the UPenn subreddit to see what other students were saying. This meant juggling multiple tabs, digging through threads, and manually piecing everything together to make a decision.

    The solution: I reimagined the course selection process as a single-step experience. I built a web app that scrapes official course data, fetches relevant Reddit discussions via API, and uses an LLM to synthesize peer feedback and course details into one conversational, easy-to-understand response. What used to take 20 minutes and five tabs can now be done in a few seconds through one intuitive interface. I am currently working on replacing the Reddit API calls with Reddit’s MCP server.

---

3. Corporate Clock:

    The inconvenience: At my previous company, project timelines followed a quarterly system, while product deployments adhered to a separate release schedule. These two calendars didn’t align perfectly, often leading to confusion about when exactly a quarter or a release cycle was ending.
    
    The solution: I built a lightweight “corporate clock” web tool that calculates, in real time, how far along we are in the current quarter and release cycle. It gives a quick, visual snapshot of the remaining time, making it easier to plan work, manage expectations, and stay aligned across both timelines.

---

4. Coldplay Countdown Script

    The inconvenience: I had booked tickets for a Coldplay concert I was really looking forward to, and I found myself constantly checking the calendar to see how many days were left. It was a bit of harmless excitement, but also mildly inefficient.

    The solution: I wrote a simple Python script that runs automatically whenever I open my terminal. It calculates and displays the days and hours remaining until the concert. A small addition, but it injected a bit of joy into my daily workflow and served as a constant reminder of something awesome to look forward to.

---

These small experiments have completely changed the way I think about building software. AI didn’t just make me faster, it lowered the barrier between idea and execution. For me, It’s no longer about writing perfect code, it's about noticing everyday frictions and having the power to fix them. And as AI continues to evolve, I’m excited to keep building things that are useful, personal, and sometimes just plain fun.
