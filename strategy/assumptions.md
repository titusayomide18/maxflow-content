# Assumptions and decisions log

Decisions I made without asking, so you can see them and overrule any of them. Each one is reversible. Newest at the bottom of each section.

## Your decisions (24 Nov 2026)

- Niche: practical software engineering for African developers, **payments and fintech engineering as the main focus**. AI-assisted dev, architecture and real product builds appear naturally. Not generic AI-tools content.
- Format: YouTube-first, voice-over + screen recording. Face optional.
- Budget: **3 to 4 hours a week**, one substantial video every two weeks. Lighter during exams.
- Free tools and existing equipment only. No purchase suggestions until we've tested your recording quality.
- Fresh YouTube channel. Reuse existing Maxflow Codes social accounts where they exist.
- No identifiable client work without permission. Own projects and anonymised demos only.
- Companion site later, as `/blog` on your portfolio domain. No domain or hosting purchases.
- Natural, slightly informal English with Nigerian/African context. No forced Pidgin. No em dashes.

## Decisions I made (Phase 2)

| Decision | Why | Easy to change? |
|---|---|---|
| Channel name **Maxflow Codes**, handle **@maxflowcodes** | Matches your existing brand. Max-flow is a real algorithm, which suits a channel about engineering. Handle looked free on 24 Nov 2026. | Yes, until the channel grows |
| Upload day: **every other Thursday, 18:00 WAT** | After work/lectures for Nigerian devs. Gives you the weekend to record and a few weekdays of slack before upload. | Yes |
| Video length target: **8 to 14 minutes** | Long enough for real depth, short enough to make in ~7 hours. | Yes |
| Shorts: **optional**, at most 1 per long video | Shorts eat time and don't count toward the 4,000/8,000 long-form hours. Only cut one if the cycle went well. | Yes |
| Default editor: **Clipchamp** (preinstalled on Windows 11), fallback **Shotcut** | Free 1080p without watermark, light on student laptops. DaVinci Resolve is better but heavy. | Yes |
| Recording: **OBS Studio** for screen, narration recorded separately | Separating screen and voice makes retakes cheap and lets you test phone vs earphone vs laptop mic. | Yes |
| Demo code lives in this repo under `demos/` | Keeps script, code and article together. Can move to separate public repos when published. | Yes |
| All demos use **test mode keys only** | Safety. Live keys never appear on screen or in the repo. | No, keep this |
| Tracker is a **CSV** (`calendar/content-tracker.csv`) | Opens in Excel or imports into Google Sheets, diffs cleanly in git. | Yes |
| First video topic: **Paystack's new webhook signature (Paystack-Signature)** | Paystack's docs now describe a new signing-secret scheme alongside the old `x-paystack-signature`. Timely, specific, and almost nobody has covered it. | Yes |
| No affiliate links in the first videos | No audience yet, and we only link things you've actually used. Services link and portfolio come first. | Yes |

## Things I assumed (please correct if wrong)

- You have a Windows 11 laptop that can run OBS and VS Code at 1080p.
- You have a smartphone with a voice recorder app and wired or Bluetooth earphones with a mic.
- You have (or can create) a **Paystack test account**. Test mode works before business registration. Some features (Dedicated Virtual Accounts) need a registered business, so those videos use other approaches until we know what your account can do.
- Your portfolio isn't live yet. Wherever a link to it should go, files say `[PORTFOLIO_URL]`.
- Contact email for the channel: `[CHANNEL_EMAIL]`. I'd suggest a separate Gmail (e.g. a Maxflow Codes business address) so channel mail stays out of your school inbox. Your call.
- You're comfortable with your first name (Ayomide) being on the channel. Scripts introduce you as "Ayomide" and can be changed to "Max" or no name if you prefer.

## Things only you can provide (never fabricated in these files)

Scripts mark these with `[YOU: ...]`:
- Your opinions and takes.
- Your real experiences (e.g. bugs you've hit, client situations, described anonymously).
- Real test results, timings, screenshots and recordings.
- Anything about your SIWES placement, school or clients.
