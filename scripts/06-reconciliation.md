# 06. Webhooks fail. Reconciliation is how you sleep at night

**Pillar:** payments
**Target length:** 10 to 12 min
**Target publish:** 2027-03-04
**Search term:** payment reconciliation, missed webhook, paystack list transactions
**Demo:** `demos/06-reconciliation/` (to build): Python script comparing a local SQLite orders table with Paystack test transactions
**Facts used:** Paystack webhook retry windows; webhooks only for successful transactions ([facts](../research/payment-providers-facts.md))

## Title options
1. Webhooks fail. Here's how to catch the payments you missed
2. Payment reconciliation for small apps (with a Python script)
3. Your webhook missed a payment. Would you even know?
4. The midnight script every payment integration needs

**Pick:** 3 (question titles suit this one), with "payment reconciliation" early in the description.

## Thumbnail concept
- **Visual:** two columns, "Paystack" and "Your DB", rows matching with green ticks, one row with a red X.
- **Text:** "WOULD YOU KNOW?"
- **Colours:** navy, one red X.

## Hook (word for word)

> Here's a scenario. A customer pays. Paystack sends the webhook. Your server is redeploying at that exact moment. Paystack retries, but your bug fix takes longer than the retry window. The customer paid, Paystack has their money, and your database still says "pending". Would you even know? Today we build the script that catches it.

`[SCREEN: two tables side by side, one row highlighted: Paystack "success", your DB "pending_payment".]`

## Outline and narration

### 1. Why webhooks alone aren't enough (0:20 to 2:00)
- Retries are generous (Paystack live: every 3 min for 4 tries, then hourly for 72 hours) but not infinite.
- Bugs that reject genuine events (wrong secret after a rotation, clock drift breaking the timestamp check) can silently drop payments.
- Webhooks are only sent for successful transactions, so failures need checking a different way anyway.

### 2. What reconciliation means (2:00 to 3:00)
- Compare two records of the same truth: yours and the provider's. Every difference is either a bug, a delay or fraud.
- Three buckets:
  1. **Paid at Paystack, not paid in your DB** → missed webhook. Fix: verify and fulfil.
  2. **Paid in your DB, not at Paystack** → serious bug (or someone bypassed verification). Investigate.
  3. **Amounts differ** → manual review.

### 3. The script (3:00 to 7:30)
- Fetch Paystack transactions for a date range: `GET https://api.paystack.co/transaction` with filters (status, from, to, pagination). [VERIFY: exact query parameter names and pagination on the List Transactions API reference.]
- Fetch your orders for the same range.
- Index both by reference, compare, print the three buckets.
- For bucket 1, call the same `verifyAndFulfil(reference)` from video 02. Because it's idempotent (video 04), running reconciliation twice is safe.
- `[SCREEN: Python script, ~60 lines, run against test data]`
- `[YOU: create the mismatch for real: make a test payment with the webhook URL pointing nowhere (or the server stopped), then run the script and show it finding and fixing the order. Show the real output.]`

### 4. When and how to run it (7:30 to 9:30)
- Daily is fine for a small store. Hourly if volume grows.
- Free options: a cron job on your VPS, GitHub Actions `schedule` (free minutes on public repos [VERIFY current limits]), or Vercel Cron [VERIFY free-tier limits].
- Keep the secret key in the scheduler's secrets, never in the repo.
- Send yourself a summary (email or Telegram bot) only when something is in buckets 2 or 3.

### 5. Things that bite (9:30 to 10:30)
- Time zones: Paystack timestamps vs your DB (store UTC, display WAT).
- Pagination: don't stop at page 1.
- Rate limits: be gentle, paginate slowly.
- Transfers have their own verify endpoint (`/transfer/verify/{reference}`), same idea.

`[YOU: your opinion: how often would you run this for a small store, and what would you want alerted vs just logged.]`

## Outro (word for word)

> Webhooks are the fast path. Reconciliation is the safety net. You want both.
>
> Next: wallets. Why a single "balance" column is a trap, and what to use instead.
>
> I'm Ayomide. I build payment systems like this for businesses. Link below.

## Before recording
- [ ] Verify List Transactions parameters in the Paystack API reference
- [ ] Verify GitHub Actions / Vercel Cron free-tier details (or don't mention specifics)
- [ ] Real mismatch created and caught on camera
