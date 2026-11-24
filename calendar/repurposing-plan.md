# Repurposing and distribution plan

Social is for **growth and pointing people to your work**, not a separate business. Budget: **20 to 30 minutes of your time per video**, with AI drafting everything (prompt 7 in `workflow/prompts.md`).

## Which platforms, in what order

| Priority | Platform | Why | What to post | Effort |
|---|---|---|---|---|
| 1 | **X** | Nigerian dev community lives here. Fast feedback | 1 launch post + 1 thread per video, 1 code-screenshot post mid-cycle | 10 min |
| 2 | **LinkedIn** | Where business owners and hiring managers see you. Best for your services | 1 post per video (with a services line) | 10 min |
| 3 | **YouTube Shorts** | Same platform as the channel, feeds subscribers directly | 1 vertical clip per video, optional | 15 to 20 min |
| 4 | **TikTok + Instagram Reels** | Reach only. TikTok Creator Rewards isn't available in Nigeria, so no income here | Upload the **same** Short file | 5 min |
| 5 | **Instagram carousel** | Saves well for "checklist" videos | Reuse the LinkedIn carousel images, only for checklist-style videos | 10 min, optional |

**Existing accounts:** use your existing Maxflow Codes handles wherever they exist. If a platform has no account yet, skip it rather than blocking. Start with X and LinkedIn, add the rest when the cycle feels easy. Make sure every bio says the same thing (one-liner from `strategy/channel-plan.md`) and links to the YouTube channel (later: portfolio).

**Communities (high value, handle with care):** Nigerian dev WhatsApp/Telegram groups, Paystack's developer Slack, relevant Discords. Share only when it genuinely answers something someone asked, or where the group allows self-promotion. Never mass-post the same link.

## Per-video checklist (Week B, after upload)

| When | What |
|---|---|
| Publish day (Thu 18:00 WAT) | X launch post + thread. Reply to every comment in the first 2 hours if you can |
| Friday morning | LinkedIn post (weekday mornings work better there) |
| Friday/Saturday | Short to YouTube, then same file to TikTok/Reels |
| Mid-cycle (following Tue/Wed) | One X post: a code screenshot (ray.so) of the key snippet, linking the video |

## Rules

- Only say what's in the video. No new claims on social.
- Adapt per platform. Don't paste identical text everywhere.
- Link to the **video** on X/TikTok/IG. On LinkedIn, one line about your services is fine.
- No engagement bait ("comment YES for the code"). Put the code link in the post or the first reply.
- Screenshots: test-mode only, blur keys, no notifications, no client data.
- Shorts must stand alone: one idea, solved in 30 to 50 seconds, captions burned in (most people watch muted).

## How to make the Short (one edit, three uploads)

1. In Clipchamp, start a **new project** and import your finished 1080p export.
2. Change aspect ratio to **9:16**.
3. Keep the single strongest 30 to 50 second moment. Crop/zoom so code is readable on a phone.
4. Add auto captions (Clipchamp **Captions**) and a 3 to 5 word title at the top.
5. Export 1080p. Upload to YouTube as a Short (vertical, under 3 minutes), then TikTok and Instagram Reels.

---

## Worked example: video 01 (draft posts)

These are drafts built only from the script. Adjust wording to your own voice and update anything that changes after you record (especially results).

### X: launch post

> Paystack has a newer way to sign webhooks: the Paystack-Signature header.
>
> Timestamp inside the signature (replay protection), separate whsec_ signing secret, rotation without downtime.
>
> Here's how to verify it properly in Next.js, with tests:
> [VIDEO LINK]

### X: thread

> 1/ Your webhook URL is a public endpoint. If you don't verify where requests come from, anyone can send you a fake "payment successful". Here's how Paystack webhooks are signed now 🧵
>
> 2/ Old way: x-paystack-signature = HMAC SHA512 of the raw body, keyed with your secret key. No timestamp, so a captured event can be replayed forever.
>
> 3/ New way: Paystack-Signature: t=<time>,v1=<key id>:<sig>. The sig is HMAC SHA512 of "t.rawBody" with a whsec_ signing secret. Reject anything older than 300 seconds.
>
> 4/ The mistake that breaks everything: verifying parsed JSON. Re-serialising changes spacing and numbers. Verify the raw bytes. In Next.js: request.arrayBuffer(), not request.json().
>
> 5/ Use crypto.timingSafeEqual, return 200 fast, do slow work after. And keep the legacy check only while migrating: while it's on, an old event can be replayed through it.
>
> 6/ Full walkthrough + code with 17 tests: [VIDEO LINK]

### LinkedIn

> A webhook URL is a public endpoint. Anyone who finds it can send it a "payment successful" message.
>
> That's why verifying webhook signatures isn't optional, and Paystack now offers a stronger way to do it. Their new Paystack-Signature header adds a timestamp (so old events can't be replayed) and a separate signing secret (so the key that verifies webhooks can't move money).
>
> In my latest video I walk through:
> • how the new header works, step by step
> • the raw-body mistake that makes verification fail
> • replay protection and secret rotation
> • migrating safely from the old x-paystack-signature
>
> Everything is tested on screen, in test mode, with code you can run.
>
> If you run a business and want a store or payment integration built this carefully, that's what I do. [PORTFOLIO_URL]
>
> Video: [VIDEO LINK]

### Short / Reel / TikTok (35 to 45 sec)

> [SCREEN: terminal, fake webhook accepted, "Order marked PAID"]
> "This order just got marked as paid. Nobody paid. I sent that request myself."
> [SCREEN: route.js, the verify call]
> "Your Paystack webhook URL is public. So you check the signature. Paystack's new header puts a timestamp inside the signature, so you can reject anything older than five minutes."
> [SCREEN: run the four cases: 200, 401, 401, 401]
> "Genuine: accepted. Changed amount: rejected. Old event replayed: rejected. Wrong secret: rejected."
> "Full walkthrough on the channel."

On-screen title: **"Is this webhook really Paystack?"**

### Mid-cycle X post (code screenshot)

> The 3 lines that matter when verifying a Paystack webhook in Next.js:
> raw bytes, HMAC of "t.body", constant-time compare.
> [ray.so image of the core of verifyPaystackSignature]
> Full video: [VIDEO LINK]
