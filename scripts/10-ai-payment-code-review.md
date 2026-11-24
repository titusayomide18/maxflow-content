# 10. I let AI write my payment code. Here's what would have cost money

**Pillar:** ai
**Target length:** 11 to 13 min
**Target publish:** 2027-04-29
**Search term:** ai generated code security, ai paystack integration, review ai code
**Demo:** whatever the AI produces, saved untouched in `demos/10-ai-payment-code-review/original/`, plus your fixed version in `fixed/`
**Facts used:** everything from videos 01 to 09

## How this video must be made (important)

This only works if the test is **real**. No predicting the outcome in the script.

1. Pick the AI tool(s) you actually use. `[YOU: which tool(s), which model, date.]`
2. Give each one the **same plain prompt** a typical developer would write (below). Don't coach it with the checklist.
3. Save the output untouched.
4. Review it against the checklist on camera. Score it. Fix it.
5. Report what it got **right** as well as wrong. If the AI nails everything, that's the video ("AI got this right, here's why you still check").

**The prompt (use as-is):**
```
Build a Next.js API route that receives Paystack webhooks and marks the order as paid in my database when a payment succeeds.
```

## Title options (pick AFTER the test, based on the real result)
1. I let AI write my payment code. Here's what would have cost money
2. AI wrote my Paystack webhook. I reviewed it like money depended on it
3. Can AI write safe payment code? I checked it line by line
4. (If AI did well) AI got my payment code mostly right. The "mostly" matters

## Thumbnail concept
- **Visual:** AI-generated code on the left with red annotations, your fixed version on the right with green ticks. Number of issues found in a big badge (real number only).
- **Text:** "[N] PROBLEMS" (real count) or "AI vs MONEY"
- **Colours:** navy, red/green annotations.

## Hook (word for word, adjust to the real result)

> I asked AI to write a Paystack webhook handler. One sentence prompt, the way most people would ask. It gave me working code in seconds. Then I reviewed it with the checklist from the last nine videos. `[YOU: real result, e.g. "It failed X of 10 checks" or "It passed most of them, but the one it missed is the one that costs money".]`

## The review checklist (scorecard on screen)

| # | Check | Video |
|---|---|---|
| 1 | Verifies the signature at all | 01 |
| 2 | Verifies on the **raw body**, not re-serialised JSON | 01 |
| 3 | Uses current scheme (Paystack-Signature) or at least correct legacy check | 01 |
| 4 | Constant-time comparison | 01 |
| 5 | Checks `data.status`, not just the API/top-level status | 02 |
| 6 | Checks amount and currency against **your** order | 02 |
| 7 | Idempotent: duplicate event doesn't fulfil twice | 04 |
| 8 | Responds 200 fast, slow work after | 01 |
| 9 | Secrets from env, nothing hard-coded or logged | 01 |
| 10 | Amounts handled as integer kobo | 03 |

## Outline and narration

### 1. The setup (0:20 to 1:30)
- Tool, prompt, date. Show the prompt on screen. Explain why the prompt is deliberately "normal" and not expert.

### 2. First impressions (1:30 to 2:30)
- Does it run? Does it look right? `[YOU: honest first reaction.]`

### 3. Going through the checklist (2:30 to 8:30)
- One check at a time. For each: what the AI did, whether it passes, and if it fails, **demonstrate** the failure (e.g. send a tampered webhook with demo 01's script, send a duplicate, send a ₦50 payment for a ₦5,000 order).
- `[YOU: all results real. Don't narrate a failure you didn't reproduce.]`

### 4. Asking it to fix itself (8:30 to 10:00)
- Paste your findings back in. Does it fix them correctly? Does it introduce new issues?
- `[YOU: real result.]`

### 5. What this means for how I use AI (10:00 to 11:30)
- `[YOU: your genuine view. Possible angles: AI is a fast first draft, the checklist is the real skill, the developers who benefit most are the ones who already know what "correct" looks like. Only say what you actually believe after doing the test.]`

## Outro (word for word)

> The checklist is in the description. Use it on your own code, AI-written or not.
>
> That's the first ten videos. `[YOU: one line on what's next, from the tracker or comments.]`
>
> I'm Ayomide. I build payment integrations that pass this checklist. Link below.

## Before recording
- [ ] Test actually run, outputs saved untouched in the demo folder
- [ ] Title and thumbnail chosen from the REAL result
- [ ] No claims about AI tools beyond what you tested
