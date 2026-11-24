// What happens AFTER a webhook is verified.
// In-memory "database" so the demo runs with zero setup. A real app uses a real
// database with a unique constraint on the reference (see video 04, idempotency).

const orders = new Map([
  // reference -> order
  ['order_1042', { amountKobo: 500000, currency: 'NGN', status: 'pending' }], // ₦5,000
]);

const processedReferences = new Set();

export function handlePaystackEvent(event) {
  if (event.event !== 'charge.success') {
    console.log(`[orders] ignoring ${event.event}`);
    return;
  }

  const { reference, amount, currency } = event.data ?? {};
  const order = orders.get(reference);

  if (!order) {
    console.warn(`[orders] unknown reference ${reference}`);
    return;
  }

  // Duplicate events happen (retries, resends). Never fulfil twice.
  if (processedReferences.has(reference)) {
    console.log(`[orders] ${reference} already processed, skipping`);
    return;
  }

  // A valid signature proves Paystack sent it. It doesn't prove the customer
  // paid what YOU expected. Check amount and currency against your own record.
  if (amount !== order.amountKobo || currency !== order.currency) {
    console.warn(`[orders] ${reference} amount/currency mismatch: got ${amount} ${currency}`);
    return;
  }

  processedReferences.add(reference);
  order.status = 'paid';
  console.log(`[orders] ${reference} marked as PAID (₦${(amount / 100).toLocaleString('en-NG')})`);
}
