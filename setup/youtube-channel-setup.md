# YouTube channel setup (step by step)

Total time: about **60 to 90 minutes**, plus a day or so if YouTube takes time on phone verification. Everything here is free. Nothing goes public until you upload a video.

Specs in this guide were checked against YouTube Help on 24 Nov 2026. Sources: `research/platform-rules-and-monetisation.md` section 5. YouTube moves menu items around now and then, so if a label differs slightly, look for the nearest match.

---

## Step 1. Turn on 2-Step Verification on your Google account (5 min)

YPP requires it, so do it now.

1. Go to **myaccount.google.com** > **Security** (left menu) > **2-Step Verification**.
2. Follow the prompts. Use the Google prompt on your phone or an authenticator app. SMS works, but Nigerian SMS delivery can be slow.
3. **Save the backup codes** somewhere safe (password manager, or printed).

**You should see:** "2-Step Verification is on" with today's date.

## Step 2. Create the channel (10 min)

I recommend creating it as a **separate channel (Brand Account)** rather than on your personal profile. Your personal Google name stays off it, and you can add an editor or manager later without sharing your password.

1. Go to **youtube.com**, sign in with the Google account you'll use for this.
2. Go to **youtube.com/channel_switcher** (or profile picture > **Settings** > **Add or manage your channel(s)**).
3. Click **Create a channel**.
4. Channel name: **Maxflow Codes**. Tick the box agreeing to the terms. Click **Create**.

**You should see:** a new, empty channel page called Maxflow Codes, and the profile icon top-right now shows that channel.

## Step 3. Claim the handle (2 min)

1. Go to **studio.youtube.com** > **Customization** (left menu) > **Profile** (or **Basic info** on older layouts).
2. Under **Handle**, type `maxflowcodes`. If it's free you'll see a green tick.
3. Click **Publish** (top right).

**You should see:** your channel URL is now `youtube.com/@maxflowcodes`.

If it's taken: try `maxflow.codes` or `maxflowcodesng` and update `strategy/channel-plan.md`.

## Step 4. Verify your phone number (5 min)

Unlocks custom thumbnails and videos over 15 minutes. Without it you can't upload your own thumbnails.

1. Go to **youtube.com/verify** (or Studio > **Settings** > **Channel** > **Feature eligibility** > **Intermediate features** > **Verify phone number**).
2. Choose country **Nigeria**, enter your number, get the code by SMS or voice call.

**You should see:** Studio > Settings > Channel > Feature eligibility shows **Intermediate features: Enabled**.

Advanced features (higher upload limits, pinned comments) come later automatically from channel history. Don't bother with ID verification yet.

## Step 5. Channel settings (10 min)

In **Studio > Settings** (bottom of left menu):

**Channel > Basic info**
- Country of residence: **Nigeria**
- Keywords: `software engineering, payments, fintech, Paystack, Flutterwave, Nigeria, African developers, webhooks, Next.js, Python`

**Channel > Advanced settings**
- Audience: **"No, set this channel as not made for kids"**. (Made-for-kids disables comments and limits features. A dev channel is not for kids.)

**Upload defaults > Basic info**
- Title: leave empty.
- Description: paste the **description template** at the bottom of this file.
- Visibility: **Private** (so nothing goes public by accident; you switch to Public or Scheduled when ready).
- Tags: `software engineering, payments, Nigeria, Paystack, fintech, developers`

**Upload defaults > Advanced settings**
- Category: **Science & Technology**
- Video language: **English**
- Comments: **Hold potentially inappropriate comments for review**

**Community > Automated filters**
- Blocked words: add these. Money-related channels attract scam comments ("contact Mr X on WhatsApp for investment"):
  `whatsapp, wa.me, telegram, t.me, investment manager, forex, crypto signal, recover funds, account manager, +234`
  (Don't add `+1`: people write "+1" to agree with a comment.)
- Tick **Block links** (links in comments get held). You can approve real ones manually.

Click **Save**.

**You should see:** the settings dialog closes with no errors. Upload a test later and it'll start Private with the template filled in.

## Step 6. Branding images (30 to 45 min, using Canva free)

**Visual identity (proposed, change if you already have Maxflow Codes branding):**
- Background: very dark navy `#0B1220`
- Accent: money green `#22C55E` (success, "payment received")
- Secondary accent: amber `#F59E0B` (warnings, "bug" moments in thumbnails)
- Text: white `#FFFFFF`, muted grey `#94A3B8`
- Fonts (free): **Inter** for headings, **JetBrains Mono** for code-style text

If you already have a Maxflow Codes logo or colours, use those instead and note it in `strategy/assumptions.md`.

| Asset | Size | Max file | Notes |
|---|---|---|---|
| Profile picture | 800 x 800 px (square) | 15 MB | Shows at 98 x 98 and as a circle, so keep the logo in the middle. Simple "MC" monogram or your logo. |
| Banner | **2560 x 1440 px** (minimum 2048 x 1152) | 6 MB | Put ALL text in the centre **1235 x 338 px** safe area. Everything outside it gets cropped on phones. |
| Video watermark | 150 x 150 px (square) | 1 MB | Optional. A small "MC" mark. Set to show for the whole video. |

**Banner content (inside the safe area):**
- Line 1: **Maxflow Codes**
- Line 2: *Build software that works in Africa. Payments, fintech, real code.*
- Small: **New video every other Thursday**

**How to make them in Canva (free):**
1. Go to **canva.com**, sign in, click **Create a design** > **Custom size**.
2. Banner: 2560 x 1440. In Canva's template search type "YouTube banner" to get one with safe-area guides, or draw a 1235 x 338 rectangle in the centre as a guide and delete it before export.
3. Avoid anything marked with a crown (Pro). Download as **PNG**.

**Where to upload:** Studio > **Customization** > **Profile** (or **Branding** tab on older layouts) > **Picture** / **Banner image** / **Video watermark** > **Upload** > **Publish**.

**You should see:** your banner and picture on `youtube.com/@maxflowcodes`. Check it on your phone too: the text should not be cut off.

## Step 7. Profile text and links (10 min)

Studio > **Customization** > **Profile**:
- **Description:** paste the About text from `strategy/channel-plan.md` (fill in `[PORTFOLIO_URL]` and `[CHANNEL_EMAIL]` first, or leave those lines out until ready).
- **Links:** add your portfolio (first link, shows next to Subscribe) once it's live. Add GitHub, X and LinkedIn if you use them.
- **Contact info:** your channel email. Use a separate address, not your school or personal inbox.

Click **Publish**.

## Step 8. Things to leave for later

- **Channel trailer / featured video:** after video 2 or 3.
- **Playlists:** create "Payments engineering" when you have 2 videos in it.
- **Earn tab / YPP / AdSense:** when you get close to the thresholds. See `research/platform-rules-and-monetisation.md`.
- **US tax info (W-8BEN in AdSense):** when you set up AdSense, not before.

---

## Description template (for Upload defaults)

Copy this into **Settings > Upload defaults > Description**. Each video fills in the top part.

```
[ONE OR TWO SENTENCES ABOUT THIS VIDEO]

Code for this video: [GITHUB_LINK]
Docs referenced: [LINKS]

Chapters
00:00 [CHAPTER]

---
I'm Ayomide. I build e-commerce stores and payment integrations for Nigerian businesses.
Work with me: [PORTFOLIO_URL]
Business enquiries: [CHANNEL_EMAIL]

Everything in this video uses test mode. Never share your live secret keys.
This is engineering content, not financial advice.

#softwareengineering #payments #nigeria
```
