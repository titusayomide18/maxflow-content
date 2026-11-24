# 03. Never store money as a float

**Pillar:** payments
**Target length:** 8 to 10 min
**Target publish:** 2027-01-21
**Search term:** store money in database, float money bug, kobo integer
**Demo:** `demos/03-money-in-databases/` (to build): tiny JS + Python scripts and a SQLite file
**Facts used:** Paystack amounts are in the currency subunit ([facts](../research/payment-providers-facts.md#accepting-and-verifying-payments))

## Title options
1. Never store money as a float (here's the bug it causes)
2. ₦0.1 + ₦0.2 is not ₦0.3 in JavaScript. Store money properly
3. How to store naira in a database: kobo, integers and decimals
4. The money bug hiding in your e-commerce database

**Pick:** 1, with 3 as the SEO angle in the description and article.

## Thumbnail concept
- **Visual:** big code line `0.1 + 0.2 = 0.30000000000000004` with the long tail highlighted in red.
- **Text:** "YOUR MONEY IS WRONG"
- **Colours:** navy, red highlight.

## Hook (word for word)

> Open your browser console and type 0.1 plus 0.2. You won't get 0.3. Now imagine that's not a console. Imagine it's a customer's wallet, or your store's total for the month. Today: why floats and money don't mix, and the boring, correct way to store naira.

`[SCREEN: Chrome DevTools console, type 0.1 + 0.2, Enter. Show 0.30000000000000004.]`

## Outline and narration

### 1. Why floats lie (0:15 to 2:00)
- Floats are binary fractions. 0.1 can't be represented exactly, same way 1/3 can't be written exactly in decimal.
- Fine for physics, wrong for money where every kobo must add up.
- `[SCREEN: loop adding ₦0.10 ten thousand times in JS, compare to expected ₦1,000.00, show the drift]`
- `[YOU: run this yourself and show the real output. Don't predict it in the voiceover; read it off the screen.]`

### 2. The fix most payment APIs already use: integers in the smallest unit (2:00 to 4:00)
- Paystack takes amounts in **kobo**: ₦5,000 = `500000`. That's not an accident.
- Store `amount_kobo` as an **integer** (`BIGINT` in Postgres, `INTEGER` in SQLite).
- Convert to naira only for display: `(kobo / 100).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })`.
- JS safe integer limit (`Number.MAX_SAFE_INTEGER`, about 9 quadrillion) is far beyond any kobo amount you'll store. Mention `BigInt` exists if you ever need more.
- Name the column with the unit. `amount` is ambiguous. `amount_kobo` isn't.

### 3. When you need decimals (4:00 to 5:30)
- Interest, FX rates, fees as percentages: use a **decimal** type, not float.
  - Python: `from decimal import Decimal`, `Decimal("0.1") + Decimal("0.2") == Decimal("0.3")`. Note: `Decimal(0.1)` (no quotes) inherits the float error. Show it.
  - Postgres: `NUMERIC(precision, scale)`.
- Avoid the Postgres `money` type: its formatting depends on the database's locale setting. [VERIFY against Postgres docs before stating.]

### 4. Rounding and splitting (5:30 to 7:30)
- Split ₦1,000 three ways: 333.33 × 3 = 999.99. Where did the kobo go?
- Fix: work in kobo, give the remainder to one part. `[100000 → 33334, 33333, 33333]`
- `[SCREEN: small allocate(totalKobo, parts) function and its test]`
- Percentage fees: compute in kobo, decide your rounding rule once (round half up / bankers'), write it down, apply it everywhere.
- `[YOU: if you've hit a rounding issue in a real project, describe it anonymously. If not, skip this.]`

### 5. Checklist (7:30 to 8:30)
- Integer kobo for amounts. Currency column next to it.
- Decimal type for rates. Never float.
- Convert at the edges (display, API), never in the middle.
- One rounding rule, written down.
- Test with ugly numbers (₦0.01, ₦999,999.99, splits that don't divide evenly).

## Outro (word for word)

> Integers in kobo, decimals for rates, round once. Boring, and correct.
>
> Next video: what happens when a customer clicks "Pay" twice, or your server retries a request. That's how people get charged twice. Idempotency. See you in two weeks.
>
> I'm Ayomide. If you need a store or payment integration done properly, link's in the description.

## Before recording
- [ ] Verify the Postgres `money` type claim in the official Postgres docs (or cut it)
- [ ] All on-screen numbers come from code actually running
- [ ] `[YOU]` parts filled or cut
