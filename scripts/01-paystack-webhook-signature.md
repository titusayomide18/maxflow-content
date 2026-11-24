# 01. Verify Paystack webhooks the new way (Paystack-Signature)

**Pillar:** payments
**Target length:** 10 to 12 min
**Target publish:** 2026-12-10 (Thursday 18:00 WAT)
**Search term:** paystack webhook signature, paystack-signature, verify paystack webhook
**Demo:** [`demos/01-paystack-webhook-signature/`](../demos/01-paystack-webhook-signature/)
**Facts used:** [Paystack webhook signatures](../research/payment-providers-facts.md#webhook-signatures-there-are-now-two-schemes)

## Why this video first

Paystack's docs now describe a new `Paystack-Signature` header (timestamp + HMAC with a `whsec_` signing secret) alongside the old `x-paystack-signature`. Older tutorials only cover the old one. It's specific, useful, security-related, and shows exactly the kind of "done properly" content the channel is about.

## Title options
1. Paystack has a new way to sign webhooks. Here's how to verify it
2. Verify Paystack webhooks properly (new Paystack-Signature header)
3. Your Paystack webhook can be faked. Fix it in 10 minutes
4. Paystack webhooks in Next.js: signatures, raw body and replay attacks
5. Stop trusting your Paystack webhook (until you check this)

**Pick:** 1 or 2. Both contain the search term, and 1 has a reason to click now.

## Thumbnail concept
- **Visual:** a webhook request (envelope icon or a JSON snippet) with a big green tick on one side and a red "FAKE" stamp on another copy. Or: the header `Paystack-Signature: t=...,v1=...` in monospace, with `t=` and `v1=` highlighted.
- **Text:** "NEW WEBHOOK SIGNATURE" or "IS IT REALLY PAYSTACK?"
- **Colours:** dark navy background, green for genuine, amber/red for fake.

## Hook (word for word, about 15 seconds)

> Your webhook URL is public. Anyone who finds it can send it a fake "payment successful" event, and if your code doesn't check where that request came from, you just gave someone free stuff. Paystack now has a newer way to sign webhooks, and it fixes a weakness in the old one. Let me show you both, and how to check them properly.

`[SCREEN: terminal sending a fake charge.success to localhost with curl, server logs "Order #1042 marked as PAID". Freeze frame. Red text: "This was fake."]`

## Outline and narration

### 1. The problem: a webhook URL is just a public POST endpoint (0:15 to 1:30)

> Quick recap if you're new to webhooks. When a customer pays, Paystack sends a POST request to a URL on your server, saying "this transaction succeeded". That's how your app knows to mark the order as paid, even if the customer's phone dies before they get back to your site. Paystack actually recommends webhooks over callbacks for exactly that reason: the callback depends on the customer's network.
>
> But think about what that URL is. It's a public endpoint. Your app trusts whatever lands there. So the first job of any webhook handler is: prove this request really came from Paystack and nobody changed it on the way.

`[SCREEN: simple diagram. Customer > Paystack > POST /api/webhooks/paystack > your DB. Then an attacker arrow also pointing at the same URL.]`

`[YOU: one or two sentences on why this matters to you. e.g. whether you've seen unverified webhook handlers in code you've looked at (no client names), or why you care as someone who builds stores. Only if true.]`

### 2. The old way: x-paystack-signature (1:30 to 3:00)

> The old way, which is what older tutorials show, is a header called `x-paystack-signature`. Paystack takes the raw request body, runs an HMAC SHA512 over it using your secret key, and puts the result in that header. You do the same calculation on your side and compare.

`[SCREEN: the legacy verify function in demos/01.../lib/paystack-signature.js, function verifyLegacySignature]`

> It works, but it has two weaknesses. One: there's no timestamp. If someone captures a genuine webhook, say from a log file or a misconfigured proxy, they can send that exact request again later and it still passes. That's a replay attack. Two: it's signed with your main secret key, the same key that can move money through the API. That key ends up in more places than it should.

[VERIFY: Paystack docs still describe `x-paystack-signature` as HMAC SHA512 of the raw body with the secret key, no timestamp.]

### 3. The new way: Paystack-Signature (3:00 to 5:00)

> The new header is called `Paystack-Signature`, and it looks like this.

`[SCREEN: header on screen: Paystack-Signature: t=1760270400,v1=whk_3f9a1c2e:9d1b...e47a. Highlight each part as you explain.]`

> `t` is the time Paystack signed the event, in Unix seconds. Then one or more `v1` values. Each `v1` is a key ID, which starts with `whk_`, then a colon, then the actual signature.
>
> The signature is an HMAC SHA512, but this time of the timestamp, then a dot, then the raw body. And the key isn't your secret key. It's a separate webhook signing secret that starts with `whsec_`, which you get from the dashboard under Developers, API configuration.
>
> That fixes both problems. The timestamp is inside the signature, so you can reject anything older than five minutes. Paystack's docs say 300 seconds. And if the signing secret leaks, it can't be used to call the API. You just rotate it.
>
> Why can there be more than one `v1`? Rotation. When you rotate the secret, Paystack signs with both the old and new secret for an overlap period you choose, so your server doesn't break while you deploy the new one.

`[SCREEN: Paystack dashboard, Developers > API configuration, signing secret section. TEST MODE ONLY. Blur the secret.]`

`[YOU: record this dashboard section from your own test account. If your account doesn't show the signing secret option yet, say so honestly on camera: "my test account doesn't have it yet, here's what the docs say", and show the docs page instead.]`

[VERIFY: header format, `whsec_` prefix, 300-second window, rotation options, dashboard location.]

### 4. The code (5:00 to 8:30)

`[SCREEN: VS Code, demos/01.../lib/paystack-signature.js]`

Walk through `verifyPaystackSignature` step by step:

1. **Raw body as bytes.**
   > First rule, and this is where most people get it wrong: you verify the raw bytes Paystack sent, not your parsed JSON. If you parse it and stringify it again, spacing or a number like 1.50 can change, and the signature won't match. In a Next.js route handler that means `request.arrayBuffer()`, not `request.json()`.
   `[SCREEN: route.js, the line const rawBody = Buffer.from(await request.arrayBuffer())]`
2. **Parse the header.** Split on commas, take `t`, collect every `v1`, split each on its first colon.
3. **Check the timestamp.** Reject if more than 300 seconds from now.
   > This is also why your server clock matters. If your server's time is off by ten minutes, every genuine webhook fails.
4. **Compute the HMAC** of `t + "." + rawBody` with the whole `whsec_` secret, prefix included.
5. **Constant-time compare** against each `v1`.
   > Use `crypto.timingSafeEqual`, not `===`. A normal string comparison stops at the first different character, and in theory that timing leaks information. It's a one-line change, so just do it.
6. **Return 401 if nothing matches. Return 200 fast if it does**, then do the slow work.
   > Paystack retries if you don't return 200, so don't send emails or call other APIs before responding. In Next.js I'm using `after()` to run the processing once the response is sent.

`[YOU: a short honest comment on anything in the code you'd do differently in your own projects, or something that surprised you while testing.]`

### 5. Prove it works (8:30 to 10:30)

`[SCREEN: terminal split: npm run dev on the left, node scripts/send-test-webhook.mjs on the right]`

Run the four cases with the demo's script and show the server's response each time:
1. Genuine signed event → **200**, order marked paid.
2. Same body, one character changed (amount edited) → **401**.
3. Valid signature but timestamp 10 minutes old → **401** (replay blocked).
4. Signed with the wrong secret → **401**.

> And just to be sure this isn't only working against my own test script, here's a real test-mode payment through Paystack.

`[YOU: run a real test payment through a tunnel (ngrok or cloudflared) with the Paystack test card 4084 0840 8408 4081, show the event arriving and passing verification. Show the REAL result, whatever happens. If the event only carries x-paystack-signature, show that and show the fallback working.]`

Also run `npm test` briefly to show the unit tests pass.

### 6. Migrating safely (10:30 to 11:15)

> If you already have the old check in production: generate a signing secret, deploy code that accepts the new header, and keep the old check as a fallback until your events actually carry `Paystack-Signature`. And here's the part from the docs I'd underline: don't delete your secret key before your webhooks carry the new header, or Paystack stops sending you webhooks.
>
> One catch with that fallback. While your server still accepts the old header, someone holding an old genuine event can strip off the new header and replay it through the old check. So treat the fallback as temporary. Once your events carry the new header, switch it off. In my code that's one environment variable.

`[SCREEN: set ALLOW_LEGACY_SIGNATURE=false, restart, run npm run webhook:send -- legacy, show 401]`

> And that's also why the duplicate check in the order handler matters. Even if a replay sneaks through, the same order never gets fulfilled twice. More on that in the idempotency video.

[VERIFY: migration guidance still says this.]

## Outro (word for word)

> That's it. Raw body, check the timestamp, constant-time compare, respond fast. The code is linked in the description, with tests.
>
> Verifying the signature tells you the request is genuine. It doesn't tell you the amount is right or that you haven't already delivered the order. That's the next video: what to check before you deliver value.
>
> I'm Ayomide. I build stores and payment integrations for Nigerian businesses. If that's something you need, the link's in the description. See you in two weeks.

## Before recording
- [ ] Re-read [Paystack webhooks docs](https://paystack.com/docs/payments/webhooks/) and update `research/payment-providers-facts.md` if anything changed
- [ ] Demo runs on my machine: `npm install`, `npm test`, `npm run dev`, `node scripts/send-test-webhook.mjs`
- [ ] Real test payment done through a tunnel
- [ ] All `[YOU]` parts filled in or cut
- [ ] Signing secret and keys blurred or never shown
