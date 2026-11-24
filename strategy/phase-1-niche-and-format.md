# Phase 1: Niche and format

Status: **proposal, waiting for Ayomide's choice.**
Rules and payout facts behind this doc: [research/platform-rules-and-monetisation.md](../research/platform-rules-and-monetisation.md) (checked 24 Nov 2026).

## Two facts that shape everything

1. **YouTube ad money is far away.** From 1 Feb 2027, new channels need 1,000 subs + **8,000** watch hours (double today's bar). A new channel won't make it before that date. So the channel has to earn first through **your services, sponsorships and affiliate links**, and ads come later as a bonus.
2. **Generic content is a liability, not just a waste.** YouTube can demonetize the whole channel for templated or mass-produced videos, and Google demotes sites for scaled AI content. The niche needs to be one where every piece naturally contains your own code, your own tests and your own opinion, because that's hard to fake and hard to copy.

So the question isn't only "what gets views", it's "what gets the *right* views from people who might pay you, while being impossible to do as filler".

---

## Option 1: Payments and fintech engineering for African developers

**One-liner:** How to build apps that actually take money in Nigeria, properly. Paystack, Flutterwave, bank transfers, webhooks, wallets, the stuff tutorials skip.

**Target audience:** Nigerian and African developers (junior to mid) building stores, SaaS, school portals or fintech side projects. Secondary: freelancers and founders who need payment-ready products, and students who want fintech jobs.

**Why you're credible:** you already build and sell e-commerce stores to Nigerian businesses, so payments are part of your real work, not a topic you looked up. Computer Engineering background, interest in fintech and architecture. Every video shows working code and real sandbox (test mode) transactions.

**First 10 titles (examples):**
1. I added Paystack to a Next.js store the right way (webhooks, not just the popup)
2. "Payment successful" but no order? Verifying Paystack webhooks properly
3. Paystack vs Flutterwave vs Monnify: I built the same checkout three times
4. Never store money as a float. Kobo, integers and decimals explained with bugs
5. Idempotency: the bug that charges your customer twice
6. How payment to a virtual account actually works, with code
7. Building a wallet in Python: why you need a ledger, not a balance column
8. What happens when your webhook fails at 2am? Reconciliation for small stores
9. How I'd design payments for a Nigerian e-commerce store (architecture walkthrough)
10. I let AI write my payment code. Here's what would have cost me money

**How it makes money:**
- **Services (strongest):** every video is a demo of the exact thing you sell. "Need a store that takes Paystack and doesn't lose orders? That's what I do."
- **Sponsorships:** Nigerian fintechs and payment providers actively court developers. A small, focused dev audience is worth more to them than a big general one.
- **Own products later:** a paid "Next.js + Paystack store starter" sold via Paystack/Selar.
- **Affiliates:** hosting and dev tools (verify each program in Phase 2).
- **Ads:** later. Tech audiences pay better than average, but views will be smaller.

**Competition:** **Low.** Mostly official docs, scattered blog posts and a few dated beginner tutorials. Almost nobody covers the production side (webhooks, reconciliation, idempotency, ledgers) for African payment providers.

**Time per week:** about **7 to 9 hours** for one long video every two weeks + 2 Shorts a week. Research is heavier because the code has to be right (it's money).

**Risks:** smaller audience, so subscribers grow slower. Must only ever show test keys. Must stay on engineering, never "which investment should you buy" (finance is a sensitive topic under YouTube's AI persona rule and a trust risk anyway).

---

## Option 2: Building real projects with AI tools, as a Nigerian student dev

**One-liner:** Honest build videos using Claude Code, Cursor, Copilot and friends, including where they fail.

**Target audience:** students and junior devs in Nigeria, Africa and globally who want to ship faster with AI tools.

**Why you're credible:** you use these tools daily on real client work, and you're experienced enough to judge the output instead of just trusting it.

**First 10 titles (examples):**
1. I built an e-commerce store with AI in a weekend. Here's everything it got wrong
2. Claude Code vs Cursor vs Copilot on the same real project
3. I asked AI to explain max-flow (the algorithm my brand is named after). Was it right?
4. AI wrote my backend. Then I tried to hack it
5. Building an AI WhatsApp assistant for a small Nigerian business
6. My actual prompt-to-production workflow
7. The 5 bugs AI keeps writing in Next.js apps
8. Building a chatbot over my own course notes (RAG, explained simply)
9. An AI agent that tallies a shop's daily sales from WhatsApp messages
10. Free vs paid AI coding tools on a Nigerian budget: what's worth the dollars

**How it makes money:** AI tool affiliates (many pay via PayPal, which works in Nigeria again through Paga), sponsorships from AI dev tools (big budgets), services (medium: shows you ship fast), ads later.

**Competition:** **Very high.** "I built X with AI" is the most crowded dev niche right now, and it's the format closest to what YouTube calls inauthentic content when done lazily. You'd need a sharp angle to stand out.

**Time per week:** about **6 to 8 hours**. Tools change monthly, so videos go out of date fast.

---

## Option 3: Student to first dev job in Nigeria (SIWES, internships, portfolios)

**One-liner:** The real path from Nigerian lecture halls to paid dev work, from someone in the middle of it.

**Target audience:** Nigerian CS and engineering undergrads (100L to 500L), fresh grads, NYSC members.

**Why you're credible:** you're in 400L and on SIWES right now. You're living the content.

**First 10 titles (examples):**
1. What SIWES at a tech agency is actually like (week by week)
2. How I got my SIWES placement and what I'd do differently
3. Portfolio projects that actually get Nigerian students interviews
4. The data structures questions I keep seeing, solved in Python
5. Remote internships for Nigerian students: real ones vs scams
6. 400 level + a dev side business: my weekly system
7. Writing your SIWES report without wasting three weeks
8. Free resources that beat paid bootcamps
9. What I'd learn in 100 level if I started again
10. Getting paid by foreign clients as a Nigerian student in 2026

**How it makes money:** the weakest of the three. Students have low spending power, ad rates for Nigerian audiences are low, sponsors are mostly edtech and bootcamps, and students don't buy e-commerce stores (weak services funnel).

**Competition:** **Medium to high.** Lots of Nigerian "tech career" content, mostly generic and motivational. Your edge is being specific and current.

**Time per week:** about **4 to 6 hours** (less coding prep).

**Risks:** your credibility here has an expiry date (graduation). Also, anything about your SIWES placement needs care: don't share internal NCC information or anything your supervisor wouldn't be comfortable with.

---

## My recommendation: Option 1, with AI as the workflow (not the topic)

Go with **Option 1, payments and fintech engineering for African developers**, and use Option 2 as a recurring segment inside it ("here's how I used AI on this, and where it was wrong").

Why:
- **It pays you first.** It points straight at what you already sell. A business owner or startup watching you fix webhook bugs is watching a sales demo.
- **Low competition, real demand.** Devs google these exact problems ("Paystack webhook signature invalid") and find docs, not explanations.
- **Safest under the platform rules.** You can't template a video where you build and test a real payment flow. Every video is naturally original.
- **Ages well.** Idempotency, ledgers and reconciliation don't change every month the way AI tool comparisons do.
- **Fits you.** Fintech, architecture, algorithms (reconciliation and ledgers are real algorithm problems) and your store business all live here.

The trade-off is slower subscriber growth than Option 2 or 3. I think that's fine: 2,000 of the right developers and founders are worth more to you than 50,000 students.

---

## Format: YouTube + a simple companion site

Recommended order: **start YouTube now, add the companion site in Phase 4.**

- **Why not site-first:** a new domain usually takes many months to get meaningful search traffic, and it doesn't build trust in *you* the way your voice and screen do. Your services sell on trust.
- **Why not YouTube only:** ad money is 12+ months away (8,000 hour bar). Developers fixing payment bugs search Google and want copy-pasteable code. A site is also the one place you own: services page, portfolio link, email list, no algorithm deciding who sees it.
- **How they work together:** each video produces a GitHub repo and, later, a written article with the same code and screenshots. Same research, two outputs, about 30% extra effort per piece. The site stays small: a handful of genuinely useful articles, not a content farm.

---

## Questions for you

1. **Which option?** (Option 1 as recommended, another one, or a tweak?)
2. **Camera:** happy to show your face, or voice + screen only, or face only in intros? (Voice + screen works fine for this niche. Your real voice is the non-negotiable part.)
3. **Time:** how many hours a week can you honestly give this during SIWES, and when do SIWES and exams end or get heavy?
4. **Kit and data:** do you have a decent mic (or just earphones)? Is uploading big video files a data-cost problem? (This changes the editing/export plan.)
5. **Existing accounts:** do you already have a YouTube channel, X, LinkedIn, TikTok or Instagram under Maxflow Codes? Any existing followers?
6. **Client work:** can you show any of the stores you've built (with the client's OK) as case studies?
7. **Companion site:** separate domain, or a `/blog` on your portfolio site you're rebuilding? Do you already own a domain? (A new domain costs money, so I'll ask before anything is bought.)
8. **Language:** plain English throughout, or some Pidgin flavour in places?
