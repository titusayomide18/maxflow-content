// Paystack webhook signature verification.
//
// Two schemes, per https://paystack.com/docs/payments/webhooks/ (checked 24 Nov 2026):
//
// 1. Paystack-Signature (new):  "t=<unix seconds>,v1=<key id>:<hex sig>[,v1=...]"
//    sig = HMAC-SHA512( t + "." + rawBody ), key = full webhook signing secret (whsec_...)
//
// 2. x-paystack-signature (legacy): hex HMAC-SHA512( rawBody ), key = secret key (sk_...)
//    No timestamp, so no replay protection.
//
// Always verify the RAW request bytes. Re-serialised JSON will not match.

import crypto from 'node:crypto';

export const TOLERANCE_SECONDS = 300;

const HEX_SHA512 = /^[0-9a-f]{128}$/;

/**
 * Parse a Paystack-Signature header into its timestamp and v1 entries.
 * Returns null if the header is malformed.
 * @param {string} header
 * @returns {{ t: number, entries: { kid: string, hex: string }[] } | null}
 */
export function parsePaystackSignatureHeader(header) {
  if (typeof header !== 'string' || header.length === 0) return null;

  let t = null;
  const entries = [];

  for (const part of header.split(',')) {
    const i = part.indexOf('=');
    if (i === -1) continue;
    const key = part.slice(0, i).trim();
    const value = part.slice(i + 1).trim();

    if (key === 't') {
      // Exactly one numeric timestamp allowed.
      if (t !== null || !/^[0-9]+$/.test(value)) return null;
      t = Number(value);
    } else if (key === 'v1') {
      // Split on the FIRST colon only: "<key id>:<signature>".
      const j = value.indexOf(':');
      if (j !== -1) entries.push({ kid: value.slice(0, j), hex: value.slice(j + 1) });
    }
    // Any other fields are ignored, as the docs say.
  }

  if (t === null || entries.length === 0) return null;
  return { t, entries };
}

/**
 * Verify the new Paystack-Signature header.
 * @param {Buffer} rawBody exact bytes Paystack sent
 * @param {string | null} header value of the Paystack-Signature header
 * @param {string[]} secrets one or more whsec_ signing secrets (more than one during rotation)
 * @param {number} [now] current Unix time in seconds (injectable for tests)
 * @returns {string | null} the key id (whk_...) that matched, or null if verification failed
 */
export function verifyPaystackSignature(rawBody, header, secrets, now = Math.floor(Date.now() / 1000)) {
  if (!Buffer.isBuffer(rawBody)) return null;

  const parsed = parsePaystackSignatureHeader(header);
  if (!parsed) return null;

  // Replay protection: reject events signed too long ago (or too far in the future).
  if (Math.abs(now - parsed.t) > TOLERANCE_SECONDS) return null;

  for (const secret of secrets) {
    if (!secret) continue;
    const expected = crypto
      .createHmac('sha512', secret) // whole secret, including the whsec_ prefix
      .update(parsed.t + '.')
      .update(rawBody)
      .digest();

    for (const { kid, hex } of parsed.entries) {
      if (!HEX_SHA512.test(hex)) continue;
      // Constant-time comparison. Both buffers are 64 bytes here.
      if (crypto.timingSafeEqual(expected, Buffer.from(hex, 'hex'))) return kid;
    }
  }
  return null;
}

/**
 * Verify the legacy x-paystack-signature header.
 * @param {Buffer} rawBody
 * @param {string | null} header
 * @param {string} secretKey your Paystack secret key (sk_test_... in test mode)
 * @returns {boolean}
 */
export function verifyLegacySignature(rawBody, header, secretKey) {
  if (!Buffer.isBuffer(rawBody) || typeof header !== 'string' || !secretKey) return false;
  const signature = header.trim().toLowerCase();
  if (!HEX_SHA512.test(signature)) return false;
  const expected = crypto.createHmac('sha512', secretKey).update(rawBody).digest();
  return crypto.timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}

// ---------------------------------------------------------------------------
// Signing helpers. ONLY for tests and the local demo script, which pretend to
// be Paystack. Your real server never needs these.
// ---------------------------------------------------------------------------

/** Build a Paystack-Signature header value for a body. */
export function signPaystackSignature(rawBody, secret, t = Math.floor(Date.now() / 1000), kid = 'whk_demo') {
  const sig = crypto.createHmac('sha512', secret).update(t + '.').update(rawBody).digest('hex');
  return `t=${t},v1=${kid}:${sig}`;
}

/** Build a legacy x-paystack-signature value for a body. */
export function signLegacySignature(rawBody, secretKey) {
  return crypto.createHmac('sha512', secretKey).update(rawBody).digest('hex');
}
