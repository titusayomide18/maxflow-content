export default function Home() {
  return (
    <main>
      <h1>Paystack webhook signature demo</h1>
      <p>
        Webhook endpoint: <code>POST /api/webhooks/paystack</code>
      </p>
      <p>Watch the terminal running <code>npm run dev</code> to see events being accepted or rejected.</p>
    </main>
  );
}
