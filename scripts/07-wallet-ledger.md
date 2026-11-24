# 07. Build a wallet with a ledger, not a balance column

**Pillar:** payments
**Target length:** 12 to 14 min
**Target publish:** 2027-03-18
**Search term:** wallet system design, double entry ledger, ledger database design
**Demo:** `demos/07-wallet-ledger/` (to build): Python + SQLite, double-entry ledger with tests
**Facts used:** money as integer kobo (video 03), idempotency (video 04)

## Important framing (say it in the video)

This is about the **engineering** of tracking value. Actually holding other people's money as a wallet business in Nigeria is regulated, and may need a licence from the CBN. The demo uses a **closed-loop store credit / loyalty balance** inside one business, which is a common, legitimate use. Don't present this as "how to start a fintech". [VERIFY: if you mention CBN licensing, link an official CBN source or keep it general like the sentence above.]

## Title options
1. Build a wallet with a ledger, not a balance column
2. Why fintechs don't just store your "balance" (double-entry explained)
3. Wallet system design in Python: the ledger approach
4. The balance column trap (and the 500-year-old fix)

**Pick:** 1, or 4 if you want a curiosity angle (double-entry bookkeeping is centuries old).

## Thumbnail concept
- **Visual:** a database column `balance` crossed out in red, next to a neat ledger table with + and − rows.
- **Text:** "DON'T STORE BALANCE"
- **Colours:** navy, green/red ledger signs.

## Hook (word for word)

> The obvious way to build a wallet is a users table with a balance column. Top up, add to it. Spend, subtract. It works in the demo. Then two requests hit at the same time, the numbers stop adding up, and you've got no way to find out why. Here's how people who handle money for a living do it instead.

`[SCREEN: two concurrent "spend ₦3,000" requests against a ₦5,000 balance. Both succeed. Balance shows -₦1,000 or ₦2,000 depending on timing.]`

## Outline and narration

### 1. What's wrong with a balance column (0:20 to 2:30)
- Race conditions: read balance, check, write new balance. Two requests interleave.
- No history: the number changes, but you can't explain **why** it's that number.
- No audit: support asks "where did my ₦2,000 go?" and you have nothing.
- `[YOU: run the race demo. Show the REAL result. If it doesn't reproduce, add a delay and say so.]`

### 2. The ledger idea (2:30 to 5:00)
- Every movement of value is a **transaction** made of **entries**.
- Each entry: account, amount in kobo (positive or negative), transaction id, timestamp.
- **Double-entry rule:** the entries of every transaction sum to **zero**. Money moves; it's never created or destroyed by accident.
- Example: customer tops up ₦5,000 store credit:
  - `cash_received` −500000 (or "store's external funds", naming is a design choice; explain it)
  - `customer:42` +500000
- Balance = `SUM(amount)` of that account's entries.
- `[SCREEN: three tables: accounts, transactions, entries]`

### 3. The code (5:00 to 9:00)
- `post_transaction(entries, idempotency_key)`:
  1. Check entries sum to zero, else reject.
  2. Insert the transaction with a **unique** idempotency key (video 04).
  3. Insert entries in the **same DB transaction**.
- `balance(account)`: `SELECT COALESCE(SUM(amount_kobo), 0) ...`
- Preventing overspend: inside the DB transaction, lock or re-check the balance before inserting the spend. In SQLite, `BEGIN IMMEDIATE`; in Postgres, `SELECT ... FOR UPDATE` on the account row. [VERIFY wording against each database's docs.]
- Tests: sum-to-zero enforced, concurrent spends never overdraw, replaying the same key does nothing.

### 4. Corrections without deleting (9:00 to 10:30)
- Never update or delete an entry. Mistakes are fixed with a **reversing transaction**.
- That's what gives you the audit trail.

### 5. Performance, honestly (10:30 to 11:30)
- Summing entries is fine for a long time at small scale.
- When it isn't: cached balances updated in the same transaction, or periodic snapshots. The ledger stays the source of truth.

`[YOU: your opinion on when a small app actually needs this vs when a simple balance column is "fine". Be honest about the trade-off.]`

## Outro (word for word)

> Entries that sum to zero, never edit history, one transaction per movement. That's the whole trick.
>
> Next video: Paystack, Flutterwave and Monnify webhooks side by side. They don't verify the same way, and one difference surprised me.
>
> `[YOU: only keep "surprised me" if it genuinely did after you test video 08's material. Otherwise: "and the differences matter."]`
>
> I'm Ayomide, link's below if you need payment systems built.

## Before recording
- [ ] Licensing sentence checked or kept general
- [ ] Demo tests pass, race demo run for real
- [ ] `[YOU]` parts filled
