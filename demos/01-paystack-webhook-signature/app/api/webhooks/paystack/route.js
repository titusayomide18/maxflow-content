import { after } from 'next/server';
import { verifyPaystackSignature, verifyLegacySignature } from '../../../../lib/paystack-signature.js';
import { handlePaystackEvent } from '../../../../lib/handle-event.js';

// Webhook handler: POST /api/webhooks/paystack
export async function POST(request) {
  // 1. Raw bytes, NOT request.json(). Re-serialised JSON won't match the signature.
  const rawBody = Buffer.from(await request.arrayBuffer());

  const signingSecret = process.env.PAYSTACK_WEBHOOK_SECRET; // whsec_...
  const secretKey = process.env.PAYSTACK_SECRET_KEY; // sk_test_... (only for the legacy check)
  const allowLegacy = process.env.ALLOW_LEGACY_SIGNATURE === 'true';

  const newHeader = request.headers.get('paystack-signature');
  const legacyHeader = request.headers.get('x-paystack-signature');

  let verifiedBy = null;

  if (newHeader) {
    // If the new header is present, it is the ONLY thing we trust.
    const kid = signingSecret ? verifyPaystackSignature(rawBody, newHeader, [signingSecret]) : null;
    if (kid) verifiedBy = `Paystack-Signature (${kid})`;
  } else if (allowLegacy && legacyHeader) {
    // Migration fallback. Turn ALLOW_LEGACY_SIGNATURE off once your events carry
    // Paystack-Signature: while it's on, an attacker can replay an old genuine
    // event with the new header stripped off.
    if (verifyLegacySignature(rawBody, legacyHeader, secretKey)) verifiedBy = 'x-paystack-signature (legacy)';
  }

  if (!verifiedBy) {
    console.warn('[webhook] rejected: signature check failed');
    return new Response('Invalid signature', { status: 401 });
  }

  // 2. Parse only AFTER verifying.
  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return new Response('Bad JSON', { status: 400 });
  }

  console.log(`[webhook] verified via ${verifiedBy}: ${event.event} ${event.data?.reference ?? ''}`);

  // 3. Respond 200 fast; do the real work after the response is sent.
  after(() => handlePaystackEvent(event));
  return new Response('OK', { status: 200 });
}
