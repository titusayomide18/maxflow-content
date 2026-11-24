# 08. Paystack vs Flutterwave vs Monnify: how each one signs webhooks

**Pillar:** payments
**Target length:** 10 to 12 min
**Target publish:** 2027-04-01
**Search term:** flutterwave webhook verification, monnify webhook signature, paystack vs flutterwave
**Demo:** `demos/08-webhooks-compared/` (to build): one Express or Next.js app with three verified endpoints
**Facts used:** [Paystack](../research/payment-providers-facts.md#paystack), [Flutterwave](../research/payment-providers-facts.md#flutterwave), [Monnify](../research/payment-providers-facts.md#monnify)

## Re-verify first (these were uncertain on 24 Nov 2026)

- [ ] Flutterwave: is `verif-hash` still the scheme? Does the v4 API use an HMAC signature header instead? Use whatever the current docs say.
- [ ] Monnify: docs phrase it both as "HMAC-SHA512 with client secret" and "SHA-512(client secret + body)". Test against a **real** production-format event or Monnify's own sample before teaching either. If you can't confirm, say so on camera.
- [ ] Monnify: signature header absent in sandbox. Still true?
- [ ] Paystack: Paystack-Signature rollout status.

## Title options
1. Paystack vs Flutterwave vs Monnify: webhook security compared
2. 3 Nigerian payment providers, 3 different ways to verify webhooks
3. Flutterwave and Monnify webhook verification (vs Paystack)
4. Not all webhook signatures are equal. Here's why

**Pick:** 2 for clicks, 1 for search. Put all three provider names in the first line of the description.

## Thumbnail concept
- **Visual:** three columns with each provider's header name in monospace: `Paystack-Signature`, `verif-hash`, `monnify-signature`, with a rating dot (green/amber) under each. Use plain text names, **not** the companies' logos (avoid implying endorsement).
- **Text:** "SAME JOB, 3 WAYS"
- **Colours:** navy, green/amber dots.

## Hook (word for word)

> Paystack, Flutterwave and Monnify all send webhooks. All three tell you to verify them. But they don't verify the same way, and the differences change what an attacker can do. If you integrate more than one provider, or you're picking one, this matters. Let's compare them properly, with code.

## Outline and narration

### 1. What a webhook signature should give you (0:20 to 1:30)
- **Authenticity:** it came from the provider.
- **Integrity:** the body wasn't changed.
- **Freshness:** it's not an old event being replayed.
- Use these three as the scorecard for the whole video.

### 2. Paystack (1:30 to 3:30)
- New `Paystack-Signature`: HMAC SHA512 over `t.rawBody` with a dedicated signing secret. Authenticity ✓, integrity ✓, freshness ✓ (300s window).
- Legacy `x-paystack-signature`: HMAC of body with secret key. Authenticity ✓, integrity ✓, freshness ✗.
- Quick recap, link to video 01.

### 3. Flutterwave (3:30 to 6:00)
- As documented (Sept 2026 docs): a secret hash **you** set in the dashboard is sent back in the `verif-hash` header. You compare it.
- Scorecard: it proves the sender knows your secret (authenticity, as long as the secret never leaks). But the header is the **same value on every request** and isn't computed from the body, so it doesn't prove the body wasn't changed, and there's nothing to stop a replay.
- What that means in practice: anyone who sees **one** request's headers (logs, a proxy, a debugging screenshot) can forge any event. So: never log that header, compare in constant time, and always **verify the transaction via the API** before giving value (Flutterwave's docs recommend verifying: `tx_ref` matches, status `successful`, currency and amount as expected).
- Mitigation: process idempotently; Flutterwave says duplicates can happen.
- [VERIFY: if the v4 API uses an HMAC signature, cover that instead and say v3 integrations still use `verif-hash`.]
- `[YOU: your honest take on this trade-off. Not "Flutterwave is bad". It's a design choice with consequences, and API verification closes most of the gap.]`

### 4. Monnify (6:00 to 8:00)
- `monnify-signature` header, SHA-512 based, keyed with your client secret. [VERIFY exact formula by testing.]
- Not sent in **sandbox**, only production. So you can't fully test your verification before going live. Suggestion: unit-test your verify function with a self-signed sample (like demo 01's tests).
- Single source IP listed (`35.242.133.146`), so IP allowlisting is an extra layer here.
- Scorecard: authenticity ✓, integrity ✓ (if body-based), freshness: no timestamp documented.
- `[YOU: if you've used Monnify before, one sentence on it. If not, say you're going by the docs.]`

### 5. Side by side + the rule that saves you everywhere (8:00 to 10:00)
- `[SCREEN: table: provider, header, algorithm, what's signed, replay protection, sandbox behaviour]`
- Whatever the scheme: **verify the transaction via the API before delivering value**, and make processing idempotent. That covers most of the gaps in any webhook scheme.
- `[SCREEN: one shared handlePayment(provider, reference) function used by all three endpoints]`

## Outro (word for word)

> Signature checks keep strangers out. API verification and idempotency keep your money right. Do all three, whatever provider you use.
>
> Next: what happens to all of this on a bad network. Timeouts, retries and the double-click.
>
> I'm Ayomide. Need any of these integrated properly? Link below.

## Before recording
- [ ] Every item in "Re-verify first" checked and this script updated
- [ ] No provider logos in thumbnail or video (names in text only)
- [ ] Tone is fair to all three providers
