# First four weeks (+ setup week)

Assumes about **3.5 hours a week**: one longer weekend session (about 2 hrs) and one or two short weekday evenings (about 45 min each). Move sessions around SIWES as needed; the order matters more than the exact day.

`🙋` = you, `🤖` = Claude (I can do these whenever you open a session).

## Week 0: Tue 24 Nov to Sun 29 Nov 2026 (setup, about 2.5 hrs)

| When | Who | Task | Done when |
|---|---|---|---|
| Any evening | 🙋 | `setup/youtube-channel-setup.md` steps 1 to 5 (2FA, channel, handle, phone verification, settings) | Studio shows the channel at @maxflowcodes, intermediate features enabled |
| Weekend | 🙋 | Steps 6 and 7: banner, profile picture, About text in Canva + Studio | Banner looks right on your phone |
| Weekend | 🙋 | Install OBS, check Clipchamp opens, do the **mic test** (`workflow/production-workflow.md`) | Winner written in `strategy/assumptions.md` |
| Weekend | 🙋 | Create a Paystack account if you don't have one, stay in **Test mode** | You can see test keys (don't copy them anywhere public) |

## Week 1: Mon 30 Nov to Sun 6 Dec (video 01, part A)

| When | Who | Task |
|---|---|---|
| Before the week | 🤖 | Done already: script `scripts/01-paystack-webhook-signature.md` and tested demo `demos/01-paystack-webhook-signature/` |
| Weekday evening (45 min) | 🙋 | Re-read Paystack's webhooks page. Run the demo (`README` in the demo folder): `npm test`, `npm run dev`, `npm run webhook:send` |
| Weekend (2 hrs) | 🙋 | Real test payment through a tunnel. Rewrite the script in your own words, fill every `[YOU]` |
| Weekend (45 min) | 🙋 | Record screen clips with OBS (no talking) |

## Week 2: Mon 7 Dec to Sun 13 Dec (video 01, part B + publish)

| When | Who | Task |
|---|---|---|
| Mon/Tue evening (45 min) | 🙋 | Record narration section by section |
| Tue/Wed evening (1.5 hrs) | 🙋 | Edit in Clipchamp. Export 1080p |
| Wed | 🤖 + 🙋 | AI: titles, description, chapters (send me your timestamps). You: thumbnail in Canva, upload as Private, **schedule Thu 10 Dec 18:00 WAT** |
| **Thu 10 Dec 18:00** | 🙋 | Goes live. Post X launch + thread (drafts in `calendar/repurposing-plan.md`). Reply to comments |
| Fri 11 Dec | 🙋 | LinkedIn post. Short to YouTube/TikTok/Reels (optional) |
| Weekend | 🙋 | Note your real hours in `calendar/content-tracker.csv` (`your_hours`) |

## Week 3: Mon 14 Dec to Sun 20 Dec (video 02, part A)

| When | Who | Task |
|---|---|---|
| Start of week | 🤖 | Build `demos/02-verify-before-you-deliver/` (initialize + callback + verify with the four checks) and tests |
| Weekday evening | 🙋 | Run demo, re-check Paystack verify docs |
| Weekend | 🙋 | Three real test payments (success, declined, tampered ₦50). Rewrite script, fill `[YOU]`. Record screen |
| Mid-week | 🙋 | X code-screenshot post for video 01 |
| Thu 17 Dec | 🙋 + 🤝 | Log video 01's 7-day stats in the tracker. Optional: ask me for a quick review of what worked |

## Week 4: Mon 21 Dec to Sun 27 Dec (Christmas: light week)

Video 02 publishes on **Thu 7 Jan 2027**, not Christmas Eve. Holiday weeks are bad for dev content and you deserve a break.

| When | Who | Task |
|---|---|---|
| If you have time | 🙋 | Record narration and edit video 02, schedule for 7 Jan. Then it's banked |
| Anytime | 🙋 | Reply to comments on video 01. Add ideas from comments to the tracker |
| Optional | 🤖 | Draft demos for videos 03 and 04 so January is lighter |

## After week 4

Continue the two-week cycle from the tracker (`calendar/content-tracker.csv`): 7 Jan, 21 Jan, 4 Feb, and so on. Send me your exam dates when you know them and I'll mark which videos to bank early.
