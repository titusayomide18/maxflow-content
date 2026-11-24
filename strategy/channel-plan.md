# Channel plan

## Name

**Maxflow Codes** (YouTube handle **@maxflowcodes**).

Why keep it rather than a sub-brand:
- It's already your dev brand, so the channel, portfolio and services reinforce each other.
- "Max-flow" is a real algorithm (network flow), so the name already says "engineer", and money literally flows through payment systems. Nice coincidence to use once in the About section, not every video.
- It doesn't box you into payments forever. If the channel widens later, the name still fits.

`youtube.com/@maxflowcodes` returned "not found" on 24 Nov 2026, so it looks available. Claim it in setup step 3.

## Positioning

**One-liner (channel tagline):**
> Practical software engineering for African developers. Payments, fintech and real products, built properly and explained with real code.

**Short version (banner, social bios):**
> Build software that works in Africa. Payments, fintech, real code.

**Who it's for:** developers in Nigeria and across Africa who've done the beginner tutorials and now need their apps to handle real money, real users and real network conditions. Also freelancers and founders who need to know what "done properly" looks like.

**What makes it different:**
1. **Production, not "hello world".** Webhooks, retries, idempotency, reconciliation, ledgers. The stuff that breaks at 2am.
2. **African context by default.** Paystack, Flutterwave, Monnify, naira and kobo, bank transfer as a main payment method, flaky networks.
3. **Tested on screen.** Every claim is shown running in test mode. If it fails, the failure stays in.
4. **Honest about AI.** You use AI to work faster, and you show where it gets things wrong, especially with money.

## Content pillars

| Pillar | Share | What goes here | Example |
|---|---|---|---|
| **1. Payments engineering** (core) | ~60% | Integrations, webhooks, verification, idempotency, transfers, refunds, reconciliation, ledgers, money in databases | "Verify Paystack webhooks the new way" |
| **2. Build it properly** | ~20% | End-to-end builds of your own projects or anonymised demos, architecture walkthroughs, design decisions | "How I'd design payments for a small Nigerian store" |
| **3. Engineering for African conditions** | ~10% | Slow/flaky networks, offline-first, bank transfer UX, cost-aware hosting, SMS/WhatsApp flows | "Your checkout on a bad 3G connection" |
| **4. AI in the workflow** (segment, rarely standalone) | ~10% | A short "where AI got it wrong" section inside other videos. Occasional standalone video only when it has a real test behind it | "I let AI write my payment code. Here's what would have cost money" |

Pillar 4 is deliberately small. It's a recurring segment, not the channel's identity.

## Upload schedule

| | Normal weeks | Exam / heavy weeks |
|---|---|---|
| Long video | 1 every 2 weeks, **Thursday 18:00 WAT** | 1 every 4 weeks, or release a banked video |
| Shorts | 0 to 1 per long video (optional) | None |
| Social posts | 2 to 3 per long video (AI-drafted, you edit) | 1 or none |
| Your time | 3 to 4 hrs/week | about 1 hr/week |

Rules that keep this sustainable:
- **Bank one video before each exam period.** Make it in the weeks before exams so the channel doesn't go dark.
- **Skipping beats filler.** A missed upload costs nothing. A weak, generic video can hurt the whole channel under YouTube's inauthentic content policy.
- **Re-check the schedule after video 4.** If cycles take under 6 hours, move toward weekly. If they take over 9, shorten videos.
- YouTube may switch off monetization for channels with no uploads or posts for 6+ months, so never go 6 months without a post.

## How the channel makes money (in order)

1. **Your services (from video 1).** Every video description links to your portfolio and a short services line. Example: "I build e-commerce stores with Paystack for Nigerian businesses. Details: [PORTFOLIO_URL]". No hard selling in the video itself, one line in the outro at most.
2. **Sponsorships (from roughly 1,000 to 2,000 engaged subscribers).** Fintechs and dev tools that want Nigerian developers. Keep a simple media kit once there's data (Phase 4+).
3. **Own products (once a few videos land).** A tested "Next.js + Paystack starter" sold via Paystack or Selar.
4. **Affiliates (selectively).** Only tools you actually use. See `research/platform-rules-and-monetisation.md` section 7.
5. **YouTube ads (12+ months).** Plan around the 8,000 watch hour bar from 1 Feb 2027.

## Guardrails (non-negotiable)

- **Test keys only.** Never show a live secret key, real customer data or a real client's dashboard.
- **No client work without written permission.** Anonymise everything else (change names, amounts, logos).
- **Engineering, not financial advice.** No "which investment", no "best bank to save in". We explain how systems work.
- **Your voice, your opinions.** AI drafts. You decide, rewrite and narrate. No AI voiceover.
- **Re-check provider docs the day you record.** Payment APIs change, and a wrong security tutorial is worse than none.
- **Nothing about NCC internals.** Your SIWES placement is off-limits as content unless your supervisor is clearly fine with it.

## About section (draft, paste into YouTube Studio)

> Hi, I'm Ayomide. I'm a Computer Engineering student in Nigeria and I build software for real businesses, mostly e-commerce stores that take payments.
>
> This channel is about the practical side of software engineering for African developers. Mostly payments and fintech: integrating Paystack and friends properly, handling webhooks, making sure nobody gets charged twice, and building systems you can actually trust with money. Everything is tested on screen in test mode, with code you can grab and run.
>
> New video every other Thursday.
>
> Need a store or payment integration built? See my work: [PORTFOLIO_URL]
> Business enquiries: [CHANNEL_EMAIL]

(About 700 characters. YouTube's help page didn't list a limit when checked; keep it under 1,000 to be safe.)
