# Phase 4 plan: companion blog

Status: **prepared, not built.** Building starts when your portfolio exists (we need its repo and domain). Nothing here costs money.

## Where it lives

**`/blog` on your portfolio domain** (e.g. `yourdomain.com/blog/paystack-webhook-signature`), as you preferred. That's also the right call technically:
- One domain builds search reputation in one place, instead of splitting it with a subdomain or a second site.
- Every article sits one click from your services and project pages, which is the whole point.
- One codebase and one deploy to maintain.

It only stops making sense if the portfolio is built on something that can't host content easily (e.g. a no-code site builder). Then we'd discuss a separate repo on a subpath via rewrites, or a subdomain.

## Stack (assuming the portfolio is Next.js, your usual stack)

| Piece | Choice | Why |
|---|---|---|
| Articles | **MDX files in the repo** (`content/blog/*.mdx`) | Writing in Markdown, code blocks just work, versioned in git, no CMS cost |
| Rendering | Next.js App Router, statically generated (`generateStaticParams`) | Fast, cheap to host, great for SEO |
| Code highlighting | Build-time highlighting (e.g. Shiki via rehype) | No JS shipped for highlighting |
| SEO | Next.js Metadata API per article, `sitemap.ts`, `robots.ts`, canonical URLs, Article JSON-LD, Open Graph image per article | The basics done properly |
| Images | Your real screenshots in `public/blog/<slug>/`, compressed, with descriptive alt text | Real screenshots are what make these pages yours |
| Analytics | Something free and privacy-friendly, decided at build time | Know which articles bring people to your services |

If the portfolio isn't Next.js, the same plan works in **Astro** (content collections + MDX), which is even lighter for content sites.

## Hosting: one thing to check before Phase 4 (possible cost)

Vercel's **Hobby (free) plan is for non-commercial personal use only**; commercial use needs a paid plan ([Vercel fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines), [Hobby plan](https://vercel.com/docs/plans/hobby)). A portfolio that advertises paid services, with a blog that funnels to those services, **may count as commercial**. I couldn't find Vercel's exact rule of thumb, so this is unresolved.

Options when we get there (your decision, since one option costs money):
1. Read the fair use page / ask Vercel support whether a personal portfolio with a services page is fine on Hobby.
2. Build the site as fully static output so it can be hosted on any free static host whose terms allow it (check their terms at that time).
3. Pay for Vercel Pro (costs money: I won't suggest this without asking).

## Content rules for the blog (from Google's guidance)

Sources: [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies), [Google on AI-generated content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

- **One article per video, max.** No extra "SEO pages". The blog grows at the speed of the channel.
- Every article has: your own code (linked repo), your own screenshots of it running, at least one `[YOU]` opinion or experience, and the date the provider docs were checked.
- AI drafts from the video script; you edit; every fact checked against the live docs (titles, meta descriptions and alt text too).
- A short "How this was made" note at the bottom of each article, as Google suggests being transparent about automation.
- Update articles when APIs change (Paystack signatures will change again one day). Show "Last checked: <date>" at the top.

## Build checklist (when Phase 4 starts)

- [ ] Portfolio repo URL and domain from you
- [ ] Hosting decision (see above)
- [ ] `/blog` index + `/blog/[slug]` pages, MDX pipeline, code highlighting
- [ ] Metadata, sitemap, robots, JSON-LD, OG images
- [ ] Lighthouse check on mobile (aim for green across the board)
- [ ] First article: [`articles/01-paystack-webhook-signature.md`](articles/01-paystack-webhook-signature.md) with your real screenshots
- [ ] Each article links to its video and its code; each video description links to its article
- [ ] Submit the sitemap in Google Search Console (free, needs domain verification)

## Drafts

- [`articles/01-paystack-webhook-signature.md`](articles/01-paystack-webhook-signature.md): written version of video 01. Draft, needs your screenshots and `[YOU]` parts.
