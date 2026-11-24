# 04. Idempotency: the bug that charges your customer twice

**Pillar:** payments
**Target length:** 11 to 13 min
**Target publish:** 2027-02-04
**Search term:** idempotency payments, prevent duplicate payments, webhook duplicate events
**Demo:** `demos/04-idempotency/` (to build): Node or Python + SQLite, a race you can trigger on purpose
**Facts used:** Paystack resends aren't idempotent; transfer reference retry rule; Flutterwave and Monnify say duplicates happen ([facts](../research/payment-providers-facts.md))

## Title options
1. Idempotency: the bug that charges your customer twice
2. Why your payment code runs twice (and how to make that harmless)
3. Duplicate webhooks, double clicks, retries: idempotency explained with code
4. One order, two deliveries. Fixing duplicate payment processing

**Pick:** 1.

## Thumbnail concept
- **Visual:** two identical receipts side by side, "₦5,000" on each, one stamped "DUPLICATE" in red.
- **Text:** "CHARGED TWICE"
- **Colours:** navy, red stamp.

## Hook (word for word)

> Your code is going to run twice. Not maybe. Definitely. Customers double-click. Phones retry on bad networks. Paystack retries webhooks if you're slow. And the docs for Paystack, Flutterwave and Monnify all warn you about the same thing: you might get the same event more than once. So the question isn't how to stop duplicates. It's how to make them harmless.

`[SCREEN: terminal firing the same webhook twice at the same millisecond, logs show "Order paid. Email sent." twice, stock decremented twice.]`

## Outline and narration

### 1. Where duplicates come from (0:20 to 2:00)
- Double clicks / double submits.
- Client retries after a timeout (the first request actually succeeded).
- Provider webhook retries (Paystack: if no 200, retries; live mode every 3 minutes for 4 tries then hourly for 72 hours).
- Manual resends (Paystack's docs: resending events isn't idempotent; your handler must ignore events it already processed).
- Webhook + callback both triggering fulfilment.

### 2. What idempotent means (2:00 to 3:00)
- Doing it twice has the same effect as doing it once.
- `[SCREEN: "set status = paid" (idempotent) vs "stock = stock - 1" and "send email" (not idempotent)]`

### 3. The naive fix that doesn't work: check-then-act (3:00 to 5:00)
- `if (order.status !== 'paid') { fulfil() }`
- Two requests read "pending" at the same time, both fulfil.
- `[SCREEN: demo the race: fire 2 to 5 concurrent requests, show double fulfilment happening]`
- `[YOU: run it and show the REAL count. Race conditions are timing-dependent: if it doesn't reproduce, add an artificial delay between check and act and say so on camera.]`

### 4. Fix 1: let the database enforce it (5:00 to 7:30)
- A `processed_events` (or `fulfilments`) table with a **UNIQUE** constraint on the reference.
- `INSERT ... ON CONFLICT DO NOTHING` (Postgres/SQLite). If no row inserted, someone else already handled it: stop.
- Do the insert and the order update in **one transaction**.
- Run the race again: exactly one fulfilment.

### 5. Fix 2: idempotency keys for your own API (7:30 to 9:30)
- Client generates a key (UUID) per checkout attempt, sends it with "create order".
- Server stores key → response. Same key again: return the stored response, don't create a new order.
- Same idea Paystack uses for transfers: generate your own reference, and if a transfer request errors, **retry with the same reference**. A new reference means a new transfer.

### 6. Side effects (9:30 to 11:00)
- Emails, SMS, stock: do them **after** the unique insert succeeds, and ideally from a queue/outbox (mention, not build; future video).
- Return 200 to the provider even for a duplicate. It's not an error, it's expected.

### 7. Checklist (11:00 to 12:00)
- Unique constraint on provider reference.
- Insert-first, then side effects, in a transaction.
- Idempotency key on your own "create" endpoints.
- Same reference on retries for transfers.
- Tests that fire the same thing twice concurrently.

`[YOU: your take on which of these is most often missing in codebases you've seen (no client names), or in your own early code.]`

## Outro (word for word)

> Your code will run twice. Make the second time boring. Code and the race test are in the description.
>
> Next video I'll put all of this together: how I'd design payments for a small Nigerian store, end to end.
>
> I'm Ayomide. I build these systems for businesses. Link below.

## Before recording
- [ ] Re-check Paystack retry timings and resend note on the [webhooks page](https://paystack.com/docs/payments/webhooks/)
- [ ] Re-check the transfer reference rule on [Single Transfers](https://paystack.com/docs/transfers/single-transfers/)
- [ ] Race reproduced on your machine (or explained honestly with an artificial delay)
