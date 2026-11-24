# HANDOFF

Last updated: 24 Nov 2026. Phases 1 to 3 done, Phase 4 prepared.

## Done

**Phase 1: niche and format** ([strategy/phase-1-niche-and-format.md](strategy/phase-1-niche-and-format.md))
Practical software engineering for African developers, payments/fintech first. YouTube-first, voice-over + screen. Companion `/blog` on your portfolio later.

**Phase 2: setup**
- [strategy/channel-plan.md](strategy/channel-plan.md): Maxflow Codes / @maxflowcodes, positioning, 4 pillars, every other Thursday 18:00 WAT, money order, guardrails, About text.
- [setup/youtube-channel-setup.md](setup/youtube-channel-setup.md): 8 steps with where to click and what you should see.
- [workflow/production-workflow.md](workflow/production-workflow.md): two-week cycle (~7 hrs/video), AI vs you, free tools, OBS settings, mic test, checklists, exam mode.
- [workflow/prompts.md](workflow/prompts.md): prompts for each AI step.
- [calendar/content-tracker.csv](calendar/content-tracker.csv): 10 scheduled videos + 10 backlog ideas.
- [research/](research/): platform rules, Nigeria payouts, YouTube specs, payment provider facts, all with sources and dates.

**Phase 3: first batch**
- [scripts/](scripts/README.md): video 01 full script; 02 to 10 detailed outlines with word-for-word hooks and outros, title options, thumbnail concepts.
- [demos/01-paystack-webhook-signature/](demos/01-paystack-webhook-signature/README.md): working Next.js demo. 17 unit tests pass; production build passes; local webhook cases (valid/tampered/replay/wrong secret/legacy) behave as the script says.
- [calendar/repurposing-plan.md](calendar/repurposing-plan.md): platform priorities, per-video checklist, worked posts for video 01.
- [calendar/four-week-calendar.md](calendar/four-week-calendar.md): setup week + first 4 weeks day by day. Video 01 publishes **Thu 10 Dec 2026**, video 02 **Thu 7 Jan 2027** (moved off Christmas Eve).

**Phase 4: prepared** ([site/README.md](site/README.md))
Plan for `/blog` on your portfolio (MDX, static, SEO basics), content rules from Google's guidance, and a draft article for video 01 ([site/articles/01-paystack-webhook-signature.md](site/articles/01-paystack-webhook-signature.md)).

All decisions I made on my own are in [strategy/assumptions.md](strategy/assumptions.md).

## Next (your part, in order)

1. **This week:** YouTube setup (`setup/youtube-channel-setup.md`), mic test, Paystack test account. About 2.5 hrs.
2. **Week of 30 Nov:** run demo 01, real test payment through a tunnel, rewrite the script in your words, record.
3. **Week of 7 Dec:** narrate, edit, publish Thu 10 Dec.

## Next (my part, whenever you open a session)

- Build demo 02 (initialize + callback + verify with the four checks) before the week of 14 Dec.
- Turn the outline for whichever video is next into a full script once you've recorded the one before it.
- Titles, description and chapters for video 01 once you send your edit's timestamps.
- Phase 4 build once the portfolio repo exists.

## Needs your decision (blocking only where noted)

- **Hosting for Phase 4 (blocks Phase 4 only, possible cost):** Vercel's free Hobby plan is non-commercial only, and a portfolio advertising your services may count as commercial. Details and options in `site/README.md`.
- **Your first name on the channel:** scripts say "I'm Ayomide". Change if you'd rather not.

## Open questions (not blocking)

- Portfolio URL and channel email (placeholders `[PORTFOLIO_URL]`, `[CHANNEL_EMAIL]`).
- Existing Maxflow Codes logo/colours? Otherwise use the palette in the setup guide.
- Which Maxflow Codes social accounts already exist?
- Exam dates, so I can mark which videos to bank early.

## Things to verify later

- Bank accepts AdSense USD wires; Nigeria/US tax treaty status in AdSense; Paga/PayPal and Payoneer fees.
- Your Paystack test account: does it show the webhook signing secret yet? (Video 01 handles either case.) Dedicated Virtual Accounts need a registered business.
- Before video 08: Flutterwave v4 signature scheme, exact Monnify signature formula.
- Before video 03: Postgres `money` type claim. Before 06: Paystack List Transactions params, free cron limits.
- Clipchamp free plan on your machine actually exports 1080p without a watermark.
