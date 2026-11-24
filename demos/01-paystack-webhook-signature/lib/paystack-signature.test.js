// Run with: npm test   (uses Node's built-in test runner, no extra packages)

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  verifyPaystackSignature,
  verifyLegacySignature,
  parsePaystackSignatureHeader,
  signPaystackSignature,
  signLegacySignature,
} from './paystack-signature.js';

// Fake values for tests only. Not real secrets.
const SECRET = 'whsec_test_only_not_a_real_secret';
const OTHER_SECRET = 'whsec_another_fake_secret';
const SECRET_KEY = 'sk_test_fake_key_for_unit_tests';
const NOW = 1_760_270_400;

const body = Buffer.from(
  JSON.stringify({ event: 'charge.success', data: { reference: 'order_1042', amount: 500000, currency: 'NGN' } })
);

test('accepts a genuine event', () => {
  const header = signPaystackSignature(body, SECRET, NOW, 'whk_abc');
  assert.equal(verifyPaystackSignature(body, header, [SECRET], NOW), 'whk_abc');
});

test('rejects a tampered body (amount changed)', () => {
  const header = signPaystackSignature(body, SECRET, NOW);
  const tampered = Buffer.from(body.toString().replace('500000', '50000000'));
  assert.equal(verifyPaystackSignature(tampered, header, [SECRET], NOW), null);
});

test('rejects re-serialised JSON (spacing changed)', () => {
  const header = signPaystackSignature(body, SECRET, NOW);
  const reserialised = Buffer.from(JSON.stringify(JSON.parse(body.toString()), null, 2));
  assert.equal(verifyPaystackSignature(reserialised, header, [SECRET], NOW), null);
});

test('rejects an event older than 300 seconds (replay)', () => {
  const header = signPaystackSignature(body, SECRET, NOW - 301);
  assert.equal(verifyPaystackSignature(body, header, [SECRET], NOW), null);
});

test('accepts an event exactly at the 300 second edge', () => {
  const header = signPaystackSignature(body, SECRET, NOW - 300);
  assert.equal(verifyPaystackSignature(body, header, [SECRET], NOW), 'whk_demo');
});

test('rejects an event timestamped too far in the future', () => {
  const header = signPaystackSignature(body, SECRET, NOW + 301);
  assert.equal(verifyPaystackSignature(body, header, [SECRET], NOW), null);
});

test('rejects the wrong secret', () => {
  const header = signPaystackSignature(body, OTHER_SECRET, NOW);
  assert.equal(verifyPaystackSignature(body, header, [SECRET], NOW), null);
});

test('accepts when any of several v1 signatures matches (secret rotation)', () => {
  const oldSig = signPaystackSignature(body, OTHER_SECRET, NOW, 'whk_old');
  const newSig = signPaystackSignature(body, SECRET, NOW, 'whk_new');
  const header = `t=${NOW},${oldSig.split(',')[1]},${newSig.split(',')[1]}`;
  assert.equal(verifyPaystackSignature(body, header, [SECRET], NOW), 'whk_new');
});

test('server holding two secrets during rotation accepts either', () => {
  const header = signPaystackSignature(body, OTHER_SECRET, NOW, 'whk_old');
  assert.equal(verifyPaystackSignature(body, header, [SECRET, OTHER_SECRET], NOW), 'whk_old');
});

test('rejects malformed headers', () => {
  assert.equal(verifyPaystackSignature(body, '', [SECRET], NOW), null);
  assert.equal(verifyPaystackSignature(body, null, [SECRET], NOW), null);
  assert.equal(verifyPaystackSignature(body, 'v1=whk_a:abcd', [SECRET], NOW), null); // no t
  assert.equal(verifyPaystackSignature(body, `t=${NOW}`, [SECRET], NOW), null); // no v1
  assert.equal(verifyPaystackSignature(body, `t=abc,v1=whk_a:${'a'.repeat(128)}`, [SECRET], NOW), null);
  assert.equal(verifyPaystackSignature(body, `t=${NOW},v1=whk_a:nothex`, [SECRET], NOW), null);
});

test('rejects a header with two timestamps', () => {
  const header = signPaystackSignature(body, SECRET, NOW);
  assert.equal(verifyPaystackSignature(body, `t=${NOW - 5000},${header}`, [SECRET], NOW), null);
});

test('rejects a string body (must be raw bytes)', () => {
  const header = signPaystackSignature(body, SECRET, NOW);
  assert.equal(verifyPaystackSignature(body.toString(), header, [SECRET], NOW), null);
});

test('ignores unknown header fields', () => {
  const header = signPaystackSignature(body, SECRET, NOW) + ',v0=something,foo=bar';
  assert.equal(verifyPaystackSignature(body, header, [SECRET], NOW), 'whk_demo');
});

test('parses header parts', () => {
  const parsed = parsePaystackSignatureHeader(`t=${NOW},v1=whk_a:${'b'.repeat(128)}`);
  assert.equal(parsed.t, NOW);
  assert.deepEqual(parsed.entries, [{ kid: 'whk_a', hex: 'b'.repeat(128) }]);
});

test('legacy: accepts a genuine x-paystack-signature', () => {
  assert.equal(verifyLegacySignature(body, signLegacySignature(body, SECRET_KEY), SECRET_KEY), true);
});

test('legacy: rejects tampered body and wrong key', () => {
  const sig = signLegacySignature(body, SECRET_KEY);
  assert.equal(verifyLegacySignature(Buffer.from(body.toString() + ' '), sig, SECRET_KEY), false);
  assert.equal(verifyLegacySignature(body, signLegacySignature(body, 'sk_test_other'), SECRET_KEY), false);
  assert.equal(verifyLegacySignature(body, 'not-a-signature', SECRET_KEY), false);
});

test('legacy: has no replay protection (why the new header exists)', () => {
  // The same signature is valid forever. This test documents the weakness.
  const sig = signLegacySignature(body, SECRET_KEY);
  assert.equal(verifyLegacySignature(body, sig, SECRET_KEY), true);
});
