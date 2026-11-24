# Reusable AI prompts

Use these with Claude Code inside this repo (so it can read the strategy files), or paste them into any chat AI. Replace the `<...>` parts.

Each prompt tells the AI what it must **not** do, because that's what keeps the channel on the right side of YouTube's inauthentic content rules.

---

## 1. Research brief

```
Read strategy/channel-plan.md and research/payment-providers-facts.md.
Write a research brief for video <NN>: "<working title>".

- Use only official docs (provider docs, RFCs, language docs). Link every fact to its source URL and say the date you checked.
- List: the core concept, the exact API details I'll show (endpoints, headers, fields, units), common mistakes developers make, edge cases, and anything that changed recently.
- Flag anything you couldn't verify as VERIFY.
- Save to scripts/<NN>-<slug>/research.md (or add a Research section to the script).
Don't write the script yet.
```

## 2. Demo code

```
Using the research brief for video <NN>, write the smallest demo that shows the point on screen.

- Stack: <Next.js App Router / Python FastAPI / Node Express>.
- Test mode only. Read keys from .env, include .env.example with placeholders.
- Include a README with exact run steps on Windows (PowerShell).
- Add a tiny test or script that proves the key behaviour works without calling the real API where possible.
- Keep it short enough to explain in under 12 minutes.
- Mark anything I must check on my own machine with TODO(you).
Save to demos/<NN>-<slug>/.
```

## 3. Script draft

```
Draft the script for video <NN> using scripts/_template.md, the research brief and the demo code.

- Target length: <8 to 14> minutes of narration (about 130 to 150 words per minute).
- Voice: natural, slightly informal English, Nigerian/African context where it fits. No em dashes. No hype words ("game-changer", "unlock", "dive in").
- Hook in the first 10 seconds: a concrete problem, not "in this video I will".
- Wherever the script needs my experience, opinion, real result or a demo moment, write [YOU: what's needed]. Never invent these.
- Mark on-screen actions as [SCREEN: ...].
- End with one line pointing to my services and the next video.
```

## 4. Rewrite in my voice (after I've edited)

```
Here's my edited script. Tighten it for speaking out loud: shorter sentences, no words I'd stumble on, keep my phrasing and opinions exactly. Don't add new claims. Point out anything that sounds like written English rather than spoken English.
```

## 5. Titles and thumbnails

```
For video <NN> (final script attached), propose:
- 5 titles under 60 characters. Specific, no clickbait the video can't back up. At least two should contain the term developers would search (e.g. "Paystack webhook").
- 3 thumbnail concepts: max 4 words of text, one clear visual, readable at phone size. Use the channel colours from setup/youtube-channel-setup.md.
Say which title/thumbnail pair you'd pick and why in one line.
```

## 6. Description and chapters

```
Here are my final script and the chapter timestamps from my edit: <timestamps>.
Fill the description template from setup/youtube-channel-setup.md:
- 1 to 2 sentence summary with the main search term early.
- Code link, docs links (from research brief).
- Chapters (first must be 00:00, at least 3 chapters, each at least 10 seconds).
- Keep the services and test-mode lines.
Also suggest 5 to 8 tags.
```

## 7. Repurposing

```
Using the final script for video <NN>, draft posts following calendar/repurposing-plan.md:
- X: one post + a 4 to 6 post thread.
- LinkedIn: one post (150 to 250 words), first line must stand alone.
- Short/Reel/TikTok: a 30 to 50 second script cut from the strongest moment, with [SCREEN] notes.
- Instagram: carousel text (5 to 7 slides).
Use only things that are in the video. No new claims. Link to the video, not straight to my services, except LinkedIn where one line about services is fine.
```

## 8. Monthly review

```
Read calendar/content-tracker.csv. For the videos published in the last 30 days, summarise: what got the best CTR, best average view duration, and comments that suggest new video ideas. Suggest the next 2 topics from the backlog, and say if the schedule needs changing based on my logged hours.
```
