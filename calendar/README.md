# Calendar and tracker

## `content-tracker.csv`

One row per video idea, from idea to published. Open it in Excel, or import into Google Sheets (**sheets.new** > **File** > **Import** > **Upload** > pick the file > **Replace current sheet**). If you edit it in Sheets, export it back as CSV (**File > Download > CSV**) and replace this file so git keeps history. Or just edit it here in VS Code (the "Rainbow CSV" extension makes it readable).

**Status values (in order):**
`idea` > `researching` > `scripted` > `recorded` > `edited` > `scheduled` > `published` > `repurposed`

**Columns:**
- `pillar`: `payments`, `build`, `africa` or `ai` (see `strategy/channel-plan.md`)
- `target_publish`: planned Thursday (YYYY-MM-DD)
- `search_term`: the phrase a developer would type into Google/YouTube
- `your_hours`: how long the video actually took you. This decides whether we can speed up the schedule
- `views_7d`, `ctr_7d`, `avg_view_duration`: from YouTube Studio > Analytics, 7 days after publishing

**Adding an idea:** add a row with status `idea`. Ideas from comments are the best ideas. Note "from comment" in `notes`.

## Other files

- `four-week-calendar.md`: the first four weeks, day by day.
- `repurposing-plan.md`: how each video becomes posts for X, LinkedIn, TikTok/Reels and Instagram.
