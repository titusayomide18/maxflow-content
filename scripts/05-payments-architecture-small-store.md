# 05. How I'd design payments for a small Nigerian store

**Pillar:** build
**Target length:** 12 to 14 min
**Target publish:** 2027-02-18
**Search term:** payment system design, e-commerce payment architecture, paystack integration architecture
**Demo:** diagram (Excalidraw, free) + code snippets from demos 01 to 04. No client material.
**Facts used:** everything in [payment-providers-facts.md](../research/payment-providers-facts.md), especially webhooks and verify

## Privacy rule for this video

This video describes **your own design approach**. Use a made-up store ("Ada's Fabrics" or similar) or one of your own projects. No real client names, screens, logos, numbers or URLs. If you want to reference a real project, get written permission first.

## Title options
1. How I'd design payments for a small Nigerian store
2. Paystack integration architecture: from "Pay" button to delivered order
3. Payment system design for small businesses (no overengineering)
4. The whole payment flow of an online store, explained on one diagram

**Pick:** 1. It's personal and specific, which is the point of the channel.

## Thumbnail concept
- **Visual:** a clean architecture diagram (boxes: Store, Orders DB, Paystack, Webhook, Reconcile job) with the money path in green.
- **Text:** "HOW I'D BUILD IT"
- **Colours:** navy, green flow line.

## Hook (word for word)

> Every payment tutorial shows you the "Pay" button. Almost none show you what happens around it: the order states, the webhook, the stuff that runs at midnight to catch what you missed. So here's the whole thing on one diagram. How I'd design payments for a small online store in Nigeria, without overengineering it.

`[SCREEN: the finished diagram appears, then zoom to the "Pay" button box.]`

## Outline and narration

### 1. The constraints (0:20 to 1:30)
- Small business: one developer (you), low budget, no ops team.
- Customers pay by card, bank transfer and USSD; networks are unreliable.
- Goals: never lose a paid order, never deliver an unpaid one, never deliver twice, and be able to answer "did this customer pay?" in 30 seconds.
- `[YOU: in your own words, what small business owners actually care about when it comes to payments, from your experience building stores. Generalise, no names.]`

### 2. Order states (1:30 to 3:30)
- `pending_payment` > `paid` > `fulfilled`, plus `failed`, `abandoned`, `refunded`.
- Only the server moves an order to `paid`, and only after verification.
- `[SCREEN: state machine diagram; arrows labelled with what triggers each move]`

### 3. The happy path (3:30 to 6:00)
1. Customer checks out. Server creates the order with the price **from the database** (not the browser), amount in kobo.
2. Server initializes the Paystack transaction with the order's own reference.
3. Customer pays (popup or redirect).
4. Webhook arrives: verify signature (video 01), check amount/currency (video 02), unique insert (video 04), mark `paid`.
5. Customer lands on callback page: verify, show the right message.
6. Fulfilment (email, WhatsApp to the shop owner, stock update) runs **after** the order is marked paid.

### 4. The unhappy paths (6:00 to 9:00)
- Webhook never arrives (server down, bug) → reconciliation job (video 06).
- Customer pays by transfer and it lands late → order stays `pending_payment`, webhook updates it later. Decide how long to hold stock.
- Amount mismatch → flag for manual review, don't auto-fulfil.
- Refunds → `refund.*` events, update state, never delete records.
- `[YOU: your decision on how long to reserve stock for unpaid orders and why. Your opinion.]`

### 5. What I'd keep simple on purpose (9:00 to 11:00)
- One database (Postgres or even SQLite on a small VPS). No microservices.
- No queue system at first; a simple "jobs" table or `after()` is enough at this size.
- One payment provider to start. Add a second only when you have a reason.
- A daily reconciliation script beats a complex real-time system you can't maintain.
- `[YOU: one thing you'd deliberately NOT build for a small store, and why. Genuine opinion.]`

### 6. What to log and watch (11:00 to 12:30)
- Every webhook received (raw event, verified or not, result).
- Every verify call result.
- A daily summary: paid orders vs Paystack settlements.
- Alert (even just an email to yourself) when a mismatch shows up.

## Outro (word for word)

> That's the whole picture. The webhook is the source of truth, but you still need something that checks the webhook didn't miss anything. That's reconciliation, and it's the next video.
>
> If you run a business and want a store built like this, that's literally what I do. Link's in the description.

## Before recording
- [ ] Diagram made in Excalidraw (excalidraw.com, free) and exported as PNG
- [ ] No real client details anywhere
- [ ] `[YOU]` opinions filled in
