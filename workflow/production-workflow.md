# Production workflow

One video every two weeks, about **7 hours of your time per video** (3 to 4 hours a week). Everything uses free tools you already have.

**Legend:**
- 🤖 **AI** does it (Claude in this repo, using the prompts in `workflow/prompts.md`)
- 🙋 **YOU** have to do it. It's your voice, your screen, your judgement, or a fact only you can confirm
- 🤝 **BOTH**: AI drafts, you decide and rewrite

---

## The two-week cycle

### Week A: build and record (about 3.5 hrs)

| # | Stage | Who | Your time | Output |
|---|---|---|---|---|
| 1 | **Pick the idea** from `calendar/content-tracker.csv` | 🤝 | 10 min | Status moves to `researching` |
| 2 | **Research brief**: read official docs, list facts, gotchas, links | 🤖 drafts, 🙋 checks key facts against the live docs | 20 min | `scripts/NN-*/research.md` or a section in the script |
| 3 | **Demo code**: smallest working example that shows the point | 🤖 drafts, 🙋 runs it, breaks it, fixes it, understands every line | 60 to 90 min | `demos/NN-*/` |
| 4 | **Script**: hook, outline, narration | 🤖 drafts, 🙋 rewrites in your own words, fills every `[YOU: ...]` | 30 to 45 min | `scripts/NN-*.md` final |
| 5 | **Record screen** (OBS, no talking needed) | 🙋 | 30 to 45 min | Raw screen clips |

### Week B: finish and ship (about 3.5 hrs)

| # | Stage | Who | Your time | Output |
|---|---|---|---|---|
| 6 | **Record narration** section by section | 🙋 | 30 min | Voice clips |
| 7 | **Edit** (Clipchamp): cut dead air, sync voice, zoom on code, add captions/labels | 🙋 | 75 to 90 min | Final MP4 |
| 8 | **Title + thumbnail** | 🤖 proposes 3 to 5 options, 🙋 picks and builds thumbnail in Canva | 30 min | Thumbnail PNG |
| 9 | **Publish**: description, chapters, tags, end screen | 🤖 drafts from your final script and timestamps, 🙋 checks and uploads | 20 min | Scheduled for Thursday 18:00 WAT |
| 10 | **Repurpose**: X, LinkedIn, Short (optional) | 🤖 drafts, 🙋 edits and posts | 20 to 30 min | Posts live |
| 11 | **Reply to comments** (first 48 hours matter most) | 🙋 | 10 min | |
| 12 | **Log results** in tracker after 7 days | 🤝 | 5 min | Views, CTR, avg view duration |

**Total: about 7 hours.** If a cycle runs over 9 hours twice in a row, shorten the videos before anything else.

---

## What AI must never do here

- Narrate the video (no AI voice). Your real voice is the channel.
- Invent your experiences, opinions, test results or client stories. Scripts mark these `[YOU: ...]` and they stay empty until you fill them.
- Be the final word on a payment API fact. You check the live docs on recording day.
- Generate "realistic" footage of things that didn't happen. (That would also need YouTube's AI disclosure label.)

Using AI for research, outlines, scripts, code drafts, titles, thumbnails ideas and captions is explicitly fine under YouTube's rules and doesn't need a disclosure label.

---

## Tools (all free)

| Job | Tool | Notes |
|---|---|---|
| Screen recording | **OBS Studio** (obsproject.com) | Settings below |
| Narration | **Phone voice recorder**, earphone mic, or laptop mic, whichever wins the mic test | See "Mic test" below |
| Audio cleanup (if needed) | **Audacity** (audacityteam.org) | Noise Reduction effect, Normalize to -1 dB |
| Editing | **Clipchamp** (preinstalled on Windows 11; Start menu > Clipchamp) | Free plan exports 1080p with no watermark on a personal Microsoft account. Don't use crown/premium assets or export gets blocked |
| Editing fallback | **Shotcut** (shotcut.org) | If Clipchamp is slow or limited |
| Thumbnails, banner | **Canva** free (canva.com) | Avoid crown (Pro) elements |
| Code screenshots for social | **ray.so** or **carbon.now.sh** | Free, browser-based |
| Shrinking big files before upload | **HandBrake** (handbrake.fr) | Preset "Fast 1080p30" usually cuts size a lot with little visible loss on screen recordings |
| Tunnelling webhooks to your laptop | **ngrok** free tier or **Cloudflare Tunnel** (`cloudflared`) | Paystack can't call localhost |

---

## Setup once (week 0, about 1 hour)

### Mic test (20 min). Do this before buying anything

Record the same 30-second paragraph (the hook of video 1) three ways, in the same quiet room:
1. Laptop built-in mic (in OBS)
2. Earphone mic (wired is usually better than Bluetooth for this)
3. Phone voice recorder, phone about 15 to 20 cm from your mouth, slightly to the side

Listen to all three on earphones. Pick the clearest. Write the winner in `strategy/assumptions.md`.

Cheap tricks that make a big difference, no money needed:
- Record in the smallest room with the most soft stuff (clothes, bed, curtains). Recording facing an open wardrobe full of clothes is an old trick that genuinely works.
- Turn off the fan/AC for the take if you can.
- Record at night or early morning when it's quiet (generator noise is the enemy).

We revisit upgrades after video 3, based on how the recordings actually sound.

### OBS settings

**Settings > Video**
- Base (canvas) resolution: **1920x1080**
- Output (scaled) resolution: **1920x1080**
- FPS: **30**

**Settings > Output** (set Output Mode to **Simple**)
- Recording format: **MKV** (survives a crash). Afterwards use **File > Remux Recordings** to get MP4 for the editor. (Newer OBS versions also offer Fragmented MP4, which is fine too.)
- Recording quality: **High Quality, Medium File Size**
- Encoder: a **Hardware** option (NVENC, QuickSync or AMF) if listed, otherwise Software (x264)

**Settings > Audio**
- Sample rate: **48 kHz**

**Mic filters** (if recording narration in OBS): in the Audio Mixer, click the ⋮ next to your mic > **Filters** > **+** > **Noise Suppression** (method: RNNoise).

**Scene:** one scene with a **Display Capture** (or **Window Capture** of VS Code / browser). That's it.

### Screen hygiene (every recording)

- **Windows Focus / Do not disturb on** (Settings > System > Notifications > Do not disturb). A WhatsApp popup on screen is a privacy leak.
- Use a **separate browser profile** for recording: no personal bookmarks, tabs or logged-in accounts.
- **Test keys only.** Paystack test keys start `sk_test_` / `pk_test_`. Even test keys: keep them in `.env`, never on screen. If one leaks on screen, roll it in the dashboard.
- VS Code: font size **18 to 20**, zoom in (Ctrl + =) until code is readable on a phone. Hide the minimap. Close unrelated tabs.
- Terminal: big font, clear before each take.

---

## Recording approach: screen first, voice second

This saves the most time for a voice-over channel:

1. **Record the screen** following the script outline. Don't talk. Go slower than feels natural. Pause 2 seconds between steps (easy cut points).
2. **Rough-cut** the screen clips in Clipchamp to the order of the script.
3. **Record narration section by section** while watching the rough cut. If you fluff a line, pause and say it again. You cut the bad take later.
4. **Drop the voice in**, trim the screen to match the voice (speed up boring bits like `npm install` to 4x or cut them).

If you're comfortable talking while coding, do that instead. It's faster once you're used to it.

---

## Editing checklist (Clipchamp)

- Cut silences and fluffed takes.
- Speed up or cut waiting (installs, builds).
- **Zoom in** on the code that matters (Clipchamp: select clip > **Transform** / crop, or the zoom effect).
- Add short **text labels** for key ideas ("Raw body, not parsed JSON").
- Add captions: **Captions** in Clipchamp, or upload to YouTube and fix the auto captions in Studio > Subtitles.
- Intro: no long intro. Hook in the first 10 seconds, no logo animation.
- Outro: 15 to 20 seconds with end screen space (subscribe + next video), plus one line about your services.

## Export and upload (data-friendly)

- Export at **1080p**. That's plenty for screen content.
- If the file is big (over about 700 MB for 10 min), run it through **HandBrake > Fast 1080p30** before uploading.
- Upload on the most stable connection you have. Upload at night if your data plan has cheaper night bundles.
- Upload as **Private**, set title, description, chapters, thumbnail, end screen, then **Schedule** for Thursday 18:00 WAT.
- Under **Altered content / AI use**: answer **No** for these videos. They're real screen recordings and your real voice. (Only realistic synthetic content needs it.)

---

## Pre-publish checklist (do not skip)

**Safety**
- [ ] No live keys, no secret values, no personal notifications, no client names/logos anywhere in the video (scrub through at 2x).
- [ ] Demo repo has no `.env` committed. Only `.env.example`.

**Accuracy**
- [ ] Every API fact checked against the live docs within the last 7 days. Update `research/payment-providers-facts.md` if anything changed.
- [ ] The code shown actually ran, and the result shown is the real result.

**Authenticity (YouTube's inauthentic content policy)**
- [ ] The video contains something only you could show: your code running, your test, your bug, your decision.
- [ ] You give at least one genuine opinion or recommendation in your own words.
- [ ] It doesn't follow the exact same structure as the last video beat for beat.
- [ ] Title and thumbnail promise exactly what the video delivers.

**Packaging**
- [ ] Description has the code link, docs links, chapters, portfolio line.
- [ ] Thumbnail readable at phone size (look at it at 20% zoom).
- [ ] End screen added.

---

## Exam mode

- Before each exam period, finish and **bank one video** (fully edited, scheduled or ready).
- During exams: no new production. Release the banked video, reply to comments once a week, post one Community update if you skip a slot ("Exams. Back on [date]. Next video is about X.").
- Don't make a rushed video to keep the schedule. Skipping costs nothing. A weak video can cost the channel.
