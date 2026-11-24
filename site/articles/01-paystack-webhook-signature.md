---
title: "How to verify Paystack webhooks with the new Paystack-Signature header"
description: "Paystack webhooks can now carry a timestamped Paystack-Signature header. Here's how to verify it in Next.js, protect against replays, and migrate from x-paystack-signature."
slug: paystack-webhook-signature
date: DRAFT
lastChecked: 2026-11-24
video: "[VIDEO LINK]"
code: "[GITHUB LINK to demos/01-paystack-webhook-signature]"
status: draft (needs screenshots and [YOU] parts)
---

> **Last checked against Paystack's docs:** 24 November 2026. Payment APIs change, so check the [official webhooks page](https://paystack.com/docs/payments/webhooks/) if you're reading this much later.

Your webhook URL is a public endpoint. Anyone who finds it can send it a fake `charge.success`, and if your code doesn't check where the request came from, you've just marked an unpaid order as paid.

Paystack now has a newer way to sign webhooks, the `Paystack-Signature` header, and it fixes the main weakness of the old `x-paystack-signature`. This post covers how both work, how to verify the new one properly in Next.js, and how to migrate without breaking production.

`[YOU: one or two sentences on why you care about this, in your own words. e.g. you build stores that take Paystack payments. Only true things.]`

## The old header: x-paystack-signature

Paystack computes an HMAC SHA512 of the **raw request body** using your **secret key**, and sends it in `x-paystack-signature`. You compute the same thing and compare.

Two weaknesses:

1. **No timestamp.** A genuine event captured from a log or a misconfigured proxy can be replayed later and it still verifies.
2. **It's keyed with your secret key**, the same key that can call the Paystack API.

## The new header: Paystack-Signature

```
Paystack-Signature: t=1760270400,v1=whk_3f9a1c2e:9d1b...e47a
```

- `t` is when Paystack signed the event (Unix seconds).
- Each `v1` is `<key id>:<signature>`. Key IDs start with `whk_`. There can be more than one `v1` while a secret is being rotated, so check all of them.
- The signature is a lowercase hex **HMAC SHA512 of `t` + `.` + the raw body**, keyed with your **webhook signing secret**, the whole thing including the `whsec_` prefix.

You get the signing secret from the Paystack dashboard under **Developers > API configuration**.

`[SCREENSHOT: your test-mode dashboard showing where the signing secret lives. Secret blurred.]`

This fixes both problems: the timestamp is signed, so you can reject anything older than **300 seconds** (Paystack's recommended window), and the signing secret can't be used to call the API. If it leaks, you revoke it and generate a new one.

## Verifying it in Next.js

The full code, with 17 tests, is in the [demo repo]([GITHUB LINK]). Here's the core:

```js
import crypto from 'node:crypto';

export function verifyPaystackSignature(rawBody, header, secrets, now = Math.floor(Date.now() / 1000)) {
  const parsed = parsePaystackSignatureHeader(header); // t + every v1 entry
  if (!parsed) return null;

  // Replay protection
  if (Math.abs(now - parsed.t) > 300) return null;

  for (const secret of secrets) {
    const expected = crypto.createHmac('sha512', secret)
      .update(parsed.t + '.')
      .update(rawBody)
      .digest();

    for (const { kid, hex } of parsed.entries) {
      if (!/^[0-9a-f]{128}$/.test(hex)) continue;
      if (crypto.timingSafeEqual(expected, Buffer.from(hex, 'hex'))) return kid;
    }
  }
  return null;
}
```

And the route handler:

```js
export async function POST(request) {
  const rawBody = Buffer.from(await request.arrayBuffer()); // NOT request.json()
  const kid = verifyPaystackSignature(
    rawBody,
    request.headers.get('paystack-signature'),
    [process.env.PAYSTACK_WEBHOOK_SECRET],
  );
  if (!kid) return new Response('Invalid signature', { status: 401 });

  const event = JSON.parse(rawBody.toString('utf8'));
  after(() => handlePaystackEvent(event)); // slow work after responding
  return new Response('OK', { status: 200 });
}
```

Four things that matter here:

1. **Raw bytes, not parsed JSON.** If you parse and re-serialise, spacing and number formats can change, and the signature won't match. In the App Router that means `request.arrayBuffer()`.
2. **Constant-time comparison.** `crypto.timingSafeEqual`, not `===`.
3. **Reject stale timestamps.** Keep your server clock in sync, or genuine events will fail too.
4. **Respond 200 fast.** Paystack retries when it doesn't get a 200, so send emails and update stock after responding. Next.js's `after()` does exactly that.

## Testing it

The demo includes a script that pretends to be Paystack (and an attacker):

```
valid         -> 200 ACCEPTED
tampered      -> 401 REJECTED
replay        -> 401 REJECTED
wrong-secret  -> 401 REJECTED
legacy        -> 200 ACCEPTED
```

`[YOU: replace with your own terminal screenshot.]`

`[YOU: describe your real test-mode payment through a tunnel: which header your event carried and whether it verified. Screenshot of the server log.]`

## Migrating from x-paystack-signature

1. Generate a signing secret in the dashboard.
2. Deploy code that verifies `Paystack-Signature`, with the old check as a **fallback only when the new header is missing**.
3. Once your events carry `Paystack-Signature`, **turn the fallback off**. While it's on, someone holding an old genuine event can strip the new header and replay it through the old check.
4. Paystack's docs warn: **don't delete your secret key** until your events carry the new header and your server verifies it, or Paystack stops sending webhooks.

Even with all this, make your order handling idempotent so a duplicate or replayed event can never fulfil an order twice. [Link to the idempotency article when it exists.]

## Signature checks aren't the whole story

A valid signature proves Paystack sent the event. It doesn't prove the customer paid what **you** expected. Always check the amount (in kobo) and currency against your own order record before delivering anything. More on that in [the next post / video].

---

*How this was made: I drafted this article with AI assistance from my video script, then edited it, ran every piece of code shown, and checked each Paystack detail against their official documentation on the date above. The screenshots are from my own test-mode account.*

`[YOU: make sure the note above is true for the final version, and adjust it if not.]`

*I'm Ayomide. I build e-commerce stores and payment integrations for Nigerian businesses. [Work with me]([PORTFOLIO_URL]).*
