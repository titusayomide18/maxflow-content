# Demo 01: Verify Paystack webhooks (Paystack-Signature + legacy fallback)

Companion code for `scripts/01-paystack-webhook-signature.md`. Next.js App Router, plain JavaScript, no database. **Test mode only.**

## What's here

| File | What it does |
|---|---|
| `lib/paystack-signature.js` | Verifies the new `Paystack-Signature` header and the legacy `x-paystack-signature`. The part to show on screen |
| `lib/paystack-signature.test.js` | 17 tests: genuine, tampered, re-serialised JSON, replay, wrong secret, rotation, malformed headers, legacy |
| `app/api/webhooks/paystack/route.js` | The webhook route: raw body, verify, respond 200, process with `after()` |
| `lib/handle-event.js` | Fake order store: duplicate check, amount/currency check, mark as paid |
| `scripts/send-test-webhook.mjs` | Pretends to be Paystack (and an attacker) so you can demo every case locally |

## Run it (PowerShell, from this folder)

```powershell
npm install
```

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and set the values. For the local demo **any** fake values work, e.g. `whsec_local_demo` and `sk_test_local_demo`. For a real Paystack test, use your real **test** values from the dashboard.

```powershell
npm test
```

You should see `pass 17`, `fail 0`.

```powershell
npm run dev
```

Then in a **second** terminal:

```powershell
npm run webhook:send
```

**You should see:**

```
valid         -> 200 ACCEPTED
tampered      -> 401 REJECTED
replay        -> 401 REJECTED
wrong-secret  -> 401 REJECTED
legacy        -> 200 ACCEPTED
```

And in the `npm run dev` terminal: `order_1042 marked as PAID (₦5,000)`, then `already processed, skipping` for the duplicate. Run a single case with `npm run webhook:send -- replay`.

Set `ALLOW_LEGACY_SIGNATURE=false` in `.env.local` and restart: the `legacy` case should now be `401`.

(Checked on 24 Nov 2026 with Next.js 16.4.6 and Node 24: production build passes and the five cases give exactly the output above.)

## Real Paystack test (TODO(you))

Paystack can't reach `localhost`, so you need a public tunnel:

1. Install one (free): **ngrok** (ngrok.com, needs a free account) or **cloudflared** (Cloudflare Tunnel, `cloudflared tunnel --url http://localhost:3000`, no account needed for quick tunnels).
2. Copy the `https://...` URL it prints.
3. Paystack dashboard (**Test mode**) > **Settings** > **API Keys & Webhooks** > Test Webhook URL: `https://<your-tunnel>/api/webhooks/paystack`. [VERIFY the exact menu on the day.]
4. Make a test payment for **₦5,000** with reference `order_1042` (or change the order in `lib/handle-event.js` to match your test), card `4084 0840 8408 4081`, any future expiry, CVV `408`.
5. Watch the `npm run dev` terminal. Record what **actually** happens, including which header your event carried.

## Security notes

- Never commit `.env.local`. It's in `.gitignore`.
- Never show the signing secret or secret key on screen, even test ones. If you do, rotate them.
- While `ALLOW_LEGACY_SIGNATURE=true`, someone holding an old genuine event could strip the new header and replay it through the legacy check. That's why the fallback is for migration only. The duplicate check in `handle-event.js` is your second line of defence.
- The in-memory store resets on restart and isn't shared between server instances. Real apps use a database with a unique constraint (video 04).
