# Scripts

| # | Title (working) | Publish | Demo | Status |
|---|---|---|---|---|
| 01 | [Verify Paystack webhooks the new way](01-paystack-webhook-signature.md) | 10 Dec 2026 | [built + tested](../demos/01-paystack-webhook-signature/) | Full script, ready for your edit |
| 02 | [Callback said "success". The order still failed](02-verify-before-you-deliver.md) | 7 Jan 2027 | to build | Detailed outline |
| 03 | [Never store money as a float](03-money-in-databases.md) | 21 Jan 2027 | to build | Detailed outline |
| 04 | [Idempotency: the bug that charges your customer twice](04-idempotency.md) | 4 Feb 2027 | to build | Detailed outline |
| 05 | [How I'd design payments for a small Nigerian store](05-payments-architecture-small-store.md) | 18 Feb 2027 | diagram | Detailed outline, needs your opinions |
| 06 | [Webhooks fail. Reconciliation](06-reconciliation.md) | 4 Mar 2027 | to build | Detailed outline |
| 07 | [Build a wallet with a ledger, not a balance column](07-wallet-ledger.md) | 18 Mar 2027 | to build | Detailed outline |
| 08 | [Paystack vs Flutterwave vs Monnify webhooks](08-webhooks-compared.md) | 1 Apr 2027 | to build | Outline, docs must be re-verified first |
| 09 | [Your checkout on a bad network](09-checkout-bad-network.md) | 15 Apr 2027 | to build | Detailed outline |
| 10 | [I let AI write my payment code](10-ai-payment-code-review.md) | 29 Apr 2027 | your real test | Test protocol + outline. Result decides title |

**How to read them:** every script has title options, a word-for-word hook, a timed outline with narration beats, and a thumbnail concept. `[YOU: ...]` marks things only you can supply (opinions, real results, experiences). `[VERIFY: ...]` marks facts to re-check in the live docs on recording day. Hooks and outros are written to be spoken; rewrite them until they sound like you.

**Why only 01 is a full word-for-word script:** each later script will change once you've recorded the earlier ones (your pace, what viewers ask, what the demos actually show). The outlines are detailed enough that turning one into a full script takes me a few minutes once you start that video (prompt 3 in `workflow/prompts.md`).

Template for new scripts: [`_template.md`](_template.md).
