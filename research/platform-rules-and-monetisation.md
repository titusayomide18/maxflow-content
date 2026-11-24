# Platform rules and monetisation for a Nigerian creator

Checked: **24 November 2026**. Rules change, so re-check the official links before relying on any number here. Anything marked **VERIFY** came from third-party sources or could not be fully confirmed.

---

## 1. YouTube Partner Program (YPP)

**Source:** [YouTube Partner Program overview & eligibility](https://support.google.com/youtube/answer/72851?hl=en)

Current thresholds for ad revenue (pick one route):

- 1,000 subscribers + 4,000 qualified watch hours on public long-form videos in the last 12 months, **or**
- 1,000 subscribers + 10 million qualified Shorts views in the last 90 days.
- Watch time from the Shorts feed does **not** count toward the 4,000 hours.

Other requirements listed on that page:

- Follow the channel monetization policies (see section 2).
- Live in a country where YPP is available. **Nigeria is listed** ([YPP availability](https://support.google.com/youtube/answer/7101720)).
- No active Community Guidelines strikes.
- 2-Step Verification on the Google account.
- Advanced features access on YouTube.
- One AdSense for YouTube account linked to the channel.
- Monetization can be switched off for channels with no uploads or posts for 6+ months.

### Big change on 1 February 2027

**Source:** [Changes to the YouTube Partner Program](https://support.google.com/youtube/answer/12843009?hl=en)

- New creators joining from 1 Feb 2027 need **1,000 subscribers + 8,000 watch hours in the last 365 days, or 20M Shorts views in the last 90 days**. That's double the current watch hours.
- Creators already in YPP are not affected.
- The fan-funding tier (memberships, Super Thanks etc.) stays at **500 subscribers + 3,000 watch hours in a year, or 3M Shorts views in 90 days**.
- Shorts Creator Pool earnings will need 10M Shorts views in the last 90 days each month.

**What this means for us:** a brand new channel will not hit 4,000 hours in the ~10 weeks before 1 Feb 2027. Plan as if the bar is **8,000 hours**. Realistically, ad revenue is 12+ months away, so it should not be the first income source. Services, sponsorships and affiliate links come first.

---

## 2. YouTube "inauthentic content" and "reused content" policies

**Source:** [YouTube channel monetization policies](https://support.google.com/youtube/answer/1311392?hl=en) (latest dated change on the page: 15 July 2025, when "repetitious content" was renamed "inauthentic content").

Not monetizable, per the page:

- Content that looks template-made or feels repetitive when you watch several videos in a row from the same channel.
- Image slideshows, templated storylines or scrolling text with little or no narrative, commentary or educational value.
- AI-generated content from generic templates that looks mass-produced and doesn't add the creator's own insight or perspective.
- AI personas presenting themselves as human experts on sensitive topics: health, legal, **finances**, politics.
- Reused content: repurposing other people's content (YouTube or elsewhere) without significant original commentary or changes. This applies even with the original creator's permission, and it is judged at the channel level.

Explicitly allowed: same intro/outro across videos, using AI to help edit scripts, using automated tools as long as the final product shows your own creative vision and gives real value.

**What this means for us:**

- Every video is anchored on something only Ayomide can provide: his screen, his code, his tests, his voice, his opinion. AI drafts and edits, it doesn't front the channel.
- No AI voiceover or AI avatar. Especially not if we touch anything money-related, because "finances" is on the sensitive-topic list.
- If we cover payments/fintech, keep it about **engineering** (how to build, test and secure payment flows), never investment or financial advice.
- Since enforcement hits the **whole channel**, one batch of lazy videos can cost everything. No filler uploads to "keep the schedule".

---

## 3. Google Search: scaled content abuse (for the companion site)

**Sources:** [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies), [Google Search guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)

- Scaled content abuse = many pages generated mainly to manipulate rankings rather than help users, "no matter how it's created" (AI, humans, or both).
- Examples Google gives: using gen-AI to produce many pages without adding value, scraping/rewriting other content, stitching pages together without adding value.
- Google's AI guidance: AI is fine for research and structure, but you must fact-check everything AI writes (including titles, meta descriptions, alt text) and consider telling readers how automation was used.

**What this means for us:** few articles, each built around Ayomide's own code, test results and screenshots. Every article ships with a working repo. No "100 programmatic pages" ideas.

---

## 4. Getting paid in Nigeria: what works and what doesn't

| Income source | Works for a Nigerian creator? | Notes and source |
|---|---|---|
| **YouTube ads (YPP)** | Yes | Nigeria is on the [availability list](https://support.google.com/youtube/answer/7101720). Thresholds above. |
| **AdSense payouts** | Yes, by wire transfer | Paid in USD by international wire once you pass the payment threshold. Google says only your bank can confirm it accepts AdSense wires ([AdSense for YouTube payment methods](https://support.google.com/youtube/answer/14728152)). In practice you want a **domiciliary (USD) account**. **VERIFY** with your bank before linking. |
| **US tax withholding on YouTube** | Applies | [Google's page](https://support.google.com/youtube/answer/10391362): if you submit no tax info, Google withholds **24% of worldwide earnings** (individual accounts). With tax info submitted, earnings from **US viewers** are withheld at 0 to 30% depending on whether your country has a tax treaty with the US. Third-party sources say Nigeria has no treaty in force, so expect **30% on US-viewer earnings**. **VERIFY** in the AdSense tax tool. Submitting the W-8BEN is still much better than the 24% worldwide default. |
| **YouTube fan funding** (memberships, Super Thanks) | Yes, at 500 subs | Same threshold before and after Feb 2027. |
| **YouTube Shopping affiliate** | **No** | Nigeria isn't in any version of the country list ([YouTube Shopping affiliate eligibility](https://support.google.com/youtube/answer/13376398?hl=en)). |
| **Amazon Associates** | **Poor fit** | No African Amazon store. Nigerian associates are mostly limited to gift-card payouts, and a Nigerian audience rarely buys on Amazon anyway ([Amazon Associates international payout FAQ](https://affiliate-program.amazon.com/help/node/topic/G8VUMS6GTBCR9RGV)). Skip. |
| **PayPal** | **Now yes** (receive) | Since January 2026, Nigerians can receive PayPal payments and withdraw in naira through **Paga** ([TechCabal, 27 Jan 2026](https://techcabal.com/2026/01/27/paypal-returns-to-nigeria-after-two-decades-this-time-through-paga/)). This opens up many international SaaS affiliate programs that pay via PayPal. Older blogs saying "PayPal doesn't work in Nigeria" are out of date. **VERIFY** fees/limits on Paga before relying on it. |
| **Payoneer** | Yes | Common route for affiliate and sponsor payouts, withdraw to a Nigerian bank. Fees vary; **VERIFY** current fees. |
| **Dev tool / hosting affiliates** (Hostinger, Namecheap, etc.) | Usually yes | Most pay by PayPal, Payoneer or bank transfer. Check each program's official terms in Phase 2 before adding links. |
| **Sponsorships** | Yes | Direct deals. Nigerian companies can pay in naira; foreign ones to a domiciliary account, Payoneer or PayPal. |
| **Own digital products** (templates, starter kits) | Yes | Paystack or Selar collect naira natively. |
| **Paid dev services** (your stores, integrations) | Yes, fastest | Paid directly in naira. This is the realistic first income from the channel. |

Sources used for the Nigeria-specific bits that aren't on official pages: [Lilach Bullock on receiving AdSense in Nigeria](https://www.lilachbullock.com/receive-adsense-payment-in-nigeria/), [Grey on receiving YouTube earnings in Nigeria](https://grey.co/blog/how-to-receive-youtube-earnings-in-nigeria). Both are fintech/affiliate blogs, so treat their numbers as indicative only.
