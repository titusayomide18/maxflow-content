# 02. The callback said "success". The order still failed.

**Pillar:** payments
**Target length:** 9 to 11 min
**Target publish:** 2027-01-07
**Search term:** paystack verify transaction, paystack callback url
**Demo:** extend `demos/01-paystack-webhook-signature/` with an initialize + callback + verify flow (`demos/02-verify-before-you-deliver/`, to build)
**Facts used:** [Accepting and verifying payments](../research/payment-providers-facts.md#accepting-and-verifying-payments)

## Title options
1. Paystack callback said "success". That proves nothing
2. Verify Paystack payments properly before you deliver anything
3. 4 checks before you mark a Paystack order as paid
4. The Paystack verify step most tutorials get wrong

**Pick:** 1 (curiosity) with "Paystack verify transaction" early in the description.

## Thumbnail concept
- **Visual:** a browser URL bar `...callback?reference=order_1042` with a green "PAID?" and a big amber question mark. Or a checklist with 4 ticks, the 4th one red.
- **Text:** "CALLBACK ≠ PAID"
- **Colours:** navy, amber question mark.

## Hook (word for word)

> When Paystack sends your customer back to your callback URL, it feels like the payment is done. It isn't. Anyone can type that URL into their browser. Paystack's own docs say visiting the callback doesn't prove the transaction was successful. So let me show you the four checks you actually need before you hand over anything.

`[SCREEN: paste http://localhost:3000/callback?reference=order_1042 into a fresh browser tab, a naive app shows "Thank you! Order confirmed". Freeze.]`

## Outline and narration

### 1. How the flow actually works (0:15 to 2:00)
- Initialize on the server (secret key stays on the server), amount in **kobo**: ₦5,000 = `500000`.
- Customer pays on Paystack (popup or redirect).
- Customer comes back to `callback_url?reference=...` AND Paystack sends a webhook.
- `[SCREEN: sequence diagram with two arrows back to your server: browser redirect (unreliable) and webhook (reliable)]`
- Key line: "The callback is the customer's browser. The webhook is Paystack. Trust Paystack."

### 2. The verify call (2:00 to 4:00)
- `GET https://api.paystack.co/transaction/verify/:reference` from the server with the secret key.
- The trap: `response.status` is whether the **API call** worked. The **payment** status is `response.data.status`.
  > It's really easy to write `if (response.status)` and call it paid. But that's `true` for a failed payment too, as long as the API call itself worked.
  `[YOU: if you've actually seen this mistake in real code (yours or someone's, no names), say so here. Otherwise keep the line above as is.]`
- `[SCREEN: show the verify JSON for a declined test card (4084 0800 0000 5408): top-level status true, data.status "failed"]`
- `[YOU: show the REAL response from your test account. Point at both status fields.]`

### 3. The four checks (4:00 to 7:00)
1. `data.status === "success"`
2. `data.amount` equals the amount **you** stored for that order (in kobo). Never the amount from the browser.
3. `data.currency` is what you expect (`NGN`).
4. You haven't already delivered this order (webhook and callback can both arrive; Paystack warns about double fulfilment for digital value).

- `[SCREEN: code for verifyAndFulfil(reference) with the four checks, each as one if-statement with a log line]`
- Show the attack the amount check stops: a modified frontend that initializes ₦50 instead of ₦5,000 (amount coming from the client). Verify says `success`, but amount check fails.
  > This is the one I'd underline. If your frontend sends the price, a customer with DevTools can change it. The payment will genuinely succeed. For ₦50.

[VERIFY: response fields `data.status`, `data.amount`, `data.currency`, `data.reference` on the verify docs page.]

### 4. Webhook vs callback: who does what (7:00 to 8:30)
- Webhook: source of truth, fulfils the order.
- Callback page: calls verify too, shows the customer the right message ("Payment received" / "We're confirming your payment" / "Payment failed").
- Both go through the **same** `verifyAndFulfil` function, which is safe to call twice.
- Paystack currently only sends webhooks for **successful** transactions, so failed/abandoned states come from verify.

### 5. Proof (8:30 to 10:00)
- `[YOU: run three real test payments: success card, declined card, and the "₦50 instead of ₦5,000" tampered client. Show the real outcome of each.]`
- `[YOU: one sentence on which of these checks you think people skip most, from what you've seen. Your opinion only.]`

## Outro (word for word)

> So: callback isn't proof, verify on the server, check status, amount, currency, and don't deliver twice. Code's in the description.
>
> That "don't deliver twice" part is harder than it sounds once two requests arrive at the same time. And before that, there's a bug in how a lot of people store the amount itself. That's next.
>
> I'm Ayomide, I build stores and payment integrations for Nigerian businesses. Link's below if you need one.

## Before recording
- [ ] Re-checked [Verify Payments](https://paystack.com/docs/payments/verify-payments/) and [Accept Payments](https://paystack.com/docs/payments/accept-payments/)
- [ ] Demo built and run with real test transactions
- [ ] `[YOU]` parts filled
