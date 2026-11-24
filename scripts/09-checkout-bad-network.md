# 09. Your checkout on a bad network

**Pillar:** africa
**Target length:** 10 to 12 min
**Target publish:** 2027-04-15
**Search term:** payment timeout retry, double submit prevention, checkout slow network
**Demo:** `demos/09-checkout-bad-network/` (to build): Next.js checkout page + API, tested with Chrome DevTools network throttling
**Facts used:** Paystack recommends webhooks over callbacks because callbacks fail on weak networks ([facts](../research/payment-providers-facts.md#webhook-signatures-there-are-now-two-schemes)); idempotency (video 04)

## Title options
1. Your checkout on a bad network (timeouts, retries, double clicks)
2. Building payments for slow internet: what actually breaks
3. I throttled my checkout to bad 3G. Here's what broke
4. Payment UX for African networks: handle the timeout properly

**Pick:** 3, but **only if the demo genuinely breaks in the ways the video shows**. Otherwise 1.

## Thumbnail concept
- **Visual:** phone with one bar of signal and a spinning loader over a "Pay ₦5,000" button, with "×2" in red.
- **Text:** "ONE BAR OF SIGNAL"
- **Colours:** navy, amber signal bar, red ×2.

## Hook (word for word)

> Most payment code is written on fast Wi-Fi and tested on fast Wi-Fi. Your customers are on a bus between Lagos and Ibadan with one bar of signal. They tap "Pay", nothing happens, so they tap again. Today I'm throttling my own checkout to a terrible connection to see what breaks, and how to fix each one.

`[YOU: swap the Lagos/Ibadan line for a route or situation that's real for you. Keep it specific and local.]`

`[SCREEN: Chrome DevTools > Network > throttling dropdown, pick a slow preset, then tap Pay twice.]`

## Outline and narration

### 1. Set up the bad network (0:20 to 1:30)
- Chrome DevTools > **Network** tab > throttling dropdown > a slow preset (e.g. "Slow 4G"/"3G") or **Add custom profile** with high latency and packet loss-like slowness. [VERIFY current preset names in your Chrome.]
- Note: throttling the browser doesn't throttle your server-to-Paystack calls. That's fine; the browser leg is the flaky one.

### 2. Break #1: the double tap (1:30 to 3:30)
- Two "create order / initialize" requests → two orders, two Paystack references.
- Fix: disable the button on first tap **and** send an idempotency key with the request (video 04). The button alone isn't enough (refresh, back button).
- `[YOU: show the real before/after.]`

### 3. Break #2: the timeout that actually succeeded (3:30 to 6:00)
- Client times out waiting for the server, but the server finished and created the transaction.
- Client retries → with idempotency key, gets the same order back instead of a new one.
- Retry rules: only retry safe/idempotent requests, exponential backoff with jitter, a max number of attempts.
- `[SCREEN: small fetchWithRetry helper with backoff + jitter]`

### 4. Break #3: the callback page that never loads (6:00 to 8:00)
- Customer paid, but the redirect back to your site dies on the bad network.
- This is exactly why the webhook is the source of truth (Paystack's docs say callbacks can fail on weak networks).
- When they come back later: an "order status" page that looks up the order by reference and calls verify, instead of assuming failure.
- Copy for the "we're confirming your payment" state: calm, specific, tells them they won't be charged twice. `[YOU: write this message in your own words.]`

### 5. Break #4: heavy pages (8:00 to 9:30)
- Measure the checkout page size under throttling (Network tab total transferred).
- Quick wins: don't load the payment script until needed, compress images, avoid giant JS bundles on checkout.
- `[YOU: show the real numbers for your demo page before and after.]`

### 6. Checklist (9:30 to 10:30)
- Button disabled + idempotency key.
- Retries only with idempotency, backoff, a cap.
- Webhook decides "paid", not the redirect.
- An order status page customers can come back to.
- Test with throttling before every release.

## Outro (word for word)

> Your customers' network isn't going to get better because you wrote good code. But your code can stop making it worse.
>
> Next video is a bit different. I let AI write a payment integration from scratch, then reviewed it like a client's money depended on it.
>
> I'm Ayomide. I build stores that work on real Nigerian networks. Link below.

## Before recording
- [ ] Every "break" reproduced for real; cut any that don't happen
- [ ] DevTools preset names checked
- [ ] `[YOU]` parts filled
