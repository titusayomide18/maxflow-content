# Payment provider facts (for scripts and demo code)

Checked: **24 November 2026**, read directly from each provider's official docs. Payment APIs change, so **re-check the linked page the day you record** and update this file if anything moved. Every script that leans on one of these facts links back here.

---

## Paystack

### Webhook signatures: there are now TWO schemes

Source: [Paystack Webhooks](https://paystack.com/docs/payments/webhooks/)

**New: `Paystack-Signature` header (signing secret)**
- Header looks like `Paystack-Signature: t=1760270400,v1=whk_<key id>:<hex signature>`.
- `t` = Unix seconds when Paystack signed it. Each `v1` = `<key id>:<signature>`. There can be **more than one `v1`** (during secret rotation), so check every one.
- Signature = lowercase hex **HMAC SHA512** of `t + "." + raw body`, keyed with the **whole webhook signing secret including the `whsec_` prefix**. 128 hex characters.
- Reject if `t` is more than **300 seconds** from your server time (replay protection).
- Use a constant-time comparison. Return 401 if nothing matches, 200 if one does, then process.
- The signing secret is managed in the dashboard under **Developers > API configuration**. Rotation supports an overlap window (1 hour, 24 hours, 3 days or 7 days). A leaked secret can be revoked and stops signing within a minute.
- Retries and resends are re-signed with a new `t`.

**Legacy: `x-paystack-signature` header (secret key)**
- HMAC SHA512 of the **raw body**, keyed with your **secret key**. No timestamp, so no replay protection.
- Still sent while your integration has a secret key. Paystack says: don't delete your secret key until your events carry `Paystack-Signature` and your server verifies it, or webhooks stop.

**Both schemes:** verify on the **raw request bytes**. If your framework parses JSON and you re-serialize, spacing and number formats (e.g. `1.50`) change and the signature won't match.

### Other webhook facts (same page)
- Must return **200 OK**. Do slow work after acknowledging.
- Retries: **live** mode every 3 minutes for the first 4 tries, then hourly for 72 hours. **Test** mode hourly for 10 hours, 30-second timeout.
- Webhook source IPs (test and live): `52.31.139.75`, `52.49.173.169`, `52.214.14.220`.
- Localhost URLs can't receive events (you need a public URL or a tunnel).
- Resending events via the Webhook Events API **is not idempotent**: your handler must ignore events it already processed.
- Webhook endpoints (multiple URLs per integration) are in **pilot**, by request.
- Key events: `charge.success`, `transfer.success`, `transfer.failed`, `transfer.reversed`, `refund.*`, `dedicatedaccount.assign.success/failed`, `charge.dispute.*`.

### Accepting and verifying payments
Sources: [Accept Payments](https://paystack.com/docs/payments/accept-payments/), [Verify Payments](https://paystack.com/docs/payments/verify-payments/)
- Initialize from your **backend** (secret key never goes to the browser or mobile app). Email and amount are required.
- `amount` is in the **subunit** of the currency (kobo for NGN). ₦5,000 = `500000`.
- Use your own unique ID as `reference`. `callback_url` can be set per request or in the dashboard.
- Popup V2 uses the `access_code` from initialize with `resumeTransaction`.
- Visiting `callback_url` **does not prove payment**. Always call `GET https://api.paystack.co/transaction/verify/:reference` from the server.
- `response.status` is the **API call** status. The **transaction** status is `response.data.status`.
- Transaction statuses: `abandoned`, `failed`, `ongoing`, `pending`, `processing`, `queued`, `reversed`, `success`.
- Webhooks are currently sent **only for successful** transactions.
- Docs say to also verify the **amount** matches before delivering value, and to guard against **double fulfilment** when using both webhooks and verify.

### Test mode
Source: [Test Payments](https://paystack.com/docs/payments/test-payments/)
- Successful card, no validation: `4084 0840 8408 4081`, any future expiry, CVV `408`.
- Declined card: `4084 0800 0000 5408`, CVV `001`.
- Insufficient funds: `4084 0800 0067 0037`, CVV `787`.
- PIN, PIN+OTP, bank auth and refund-scenario cards are also listed on that page.
- Test transfer recipients: Zenith `1000000001` (code `057`). Demo Bank app for test virtual accounts.

### Dedicated Virtual Accounts (DVA)
Source: [Dedicated Virtual Accounts](https://paystack.com/docs/payments/dedicated-virtual-accounts/)
- **Only for registered businesses in Nigeria and Ghana that have completed go-live.** A student account may not be able to use it, even in test. **VERIFY on your own dashboard before planning a demo around it.**
- Payments into a DVA arrive as `charge.success` with `channel: "dedicated_nuban"`. Webhooks are the only way to know.
- Testing: `preferred_bank: "test-bank"` with the test secret key.
- Nigerian businesses may need to validate customers (BVN etc.) first.

### Transfers and idempotency
Source: [Single Transfers](https://paystack.com/docs/transfers/single-transfers/)
- Generate your own transfer `reference` (they suggest a v4 UUID, max 50 chars, lowercase letters, digits, `_` and `-`).
- If a transfer request errors, **retry with the same reference** to avoid double crediting. A new reference = a new transfer.
- Events: `transfer.success`, `transfer.failed`, `transfer.reversed`. Verify with `GET /transfer/verify/{reference}`.
- I did not find a documented `Idempotency-Key` header. The reference is the idempotency mechanism.

---

## Flutterwave

Sources: [Webhooks](https://developer.flutterwave.com/docs/webhooks), [Transaction verification](https://developer.flutterwave.com/docs/transaction-verification) (both pages last updated 13 Sept 2026)
- Webhook check is a **shared secret hash, not an HMAC**: Flutterwave sends the secret hash you set in the dashboard (Settings > Webhooks) in a `verif-hash` header, and you compare it.
- Must return 200. Timeout 60 seconds. If retries are enabled: 3 retries, 30 minutes apart.
- IPs are dynamic, so they recommend signature checks over IP whitelisting.
- They may send the same event more than once: process idempotently.
- Verify by transaction **ID** (`data.id`), e.g. `GET https://api.flutterwave.com/v3/transactions/:id/verify`. Check `tx_ref` matches, `status` is `successful`, currency matches, amount is at least what you expect.
- The docs reference a newer v4 docs host. I could not confirm whether v4 uses a different signature scheme. **VERIFY before recording any Flutterwave comparison.**

---

## Monnify

Source: [Monnify Webhooks](https://developers.monnify.com/docs/webhooks)
- Header: `monnify-signature`. Docs describe it as HMAC-SHA512 of the request body using your **client secret**, and elsewhere as "SHA-512(client secret key + object of request body)". The two phrasings aren't the same thing, so **test against a real event before teaching it**.
- The `monnify-signature` header is **only sent in production, not in sandbox**. (Good detail for a video: you can't fully test signature checks in sandbox.)
- Webhook IP: `35.242.133.146`.
- Best practices they list: verify hash, whitelist IP, check for duplicates, respond 200 before slow work.
