// Pretend to be Paystack (and an attacker) against your local server.
//
//   npm run webhook:send            -> runs every case
//   npm run webhook:send -- replay  -> runs one case
//
// Reads PAYSTACK_WEBHOOK_SECRET and PAYSTACK_SECRET_KEY from .env.local.

import { signPaystackSignature, signLegacySignature } from '../lib/paystack-signature.js';

const URL = process.env.WEBHOOK_URL ?? 'http://localhost:3000/api/webhooks/paystack';
const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
const secretKey = process.env.PAYSTACK_SECRET_KEY;

if (!secret) {
  console.error('PAYSTACK_WEBHOOK_SECRET is missing. Copy .env.example to .env.local first.');
  process.exit(1);
}

const now = () => Math.floor(Date.now() / 1000);

const payload = {
  event: 'charge.success',
  data: { reference: 'order_1042', amount: 500000, currency: 'NGN', status: 'success' },
};
const body = Buffer.from(JSON.stringify(payload));

const cases = {
  // Correctly signed, fresh timestamp.
  valid: () => ({ body, headers: { 'paystack-signature': signPaystackSignature(body, secret, now()) } }),

  // Signed correctly, then someone changes the amount.
  tampered: () => {
    const header = signPaystackSignature(body, secret, now());
    const changed = Buffer.from(body.toString().replace('500000', '50000000'));
    return { body: changed, headers: { 'paystack-signature': header } };
  },

  // A genuine event captured 10 minutes ago and sent again.
  replay: () => ({ body, headers: { 'paystack-signature': signPaystackSignature(body, secret, now() - 600) } }),

  // Signed with a secret that isn't yours.
  'wrong-secret': () => ({
    body,
    headers: { 'paystack-signature': signPaystackSignature(body, 'whsec_attacker_guess', now()) },
  }),

  // Old header only. Passes only if ALLOW_LEGACY_SIGNATURE=true.
  legacy: () => {
    if (!secretKey) throw new Error('PAYSTACK_SECRET_KEY missing for the legacy case');
    return { body, headers: { 'x-paystack-signature': signLegacySignature(body, secretKey) } };
  },
};

async function send(name) {
  const { body: b, headers } = cases[name]();
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: b,
  });
  const verdict = res.status === 200 ? 'ACCEPTED' : 'REJECTED';
  console.log(`${name.padEnd(13)} -> ${res.status} ${verdict}`);
}

const pick = process.argv[2];
const names = pick ? [pick] : Object.keys(cases);
for (const name of names) {
  if (!cases[name]) {
    console.error(`Unknown case "${name}". Options: ${Object.keys(cases).join(', ')}`);
    process.exit(1);
  }
  try {
    await send(name);
  } catch (err) {
    console.error(`${name.padEnd(13)} -> error: ${err.message}`);
  }
}
