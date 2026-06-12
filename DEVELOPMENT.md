# Portfolio Development Notes

## Quick Reference

| Task | Command |
|------|---------|
| Run locally | `npm start` |
| Build only | `npm run build` |
| Deploy to live site | `npm run deploy` |
| Admin panel (local) | http://localhost:3000/#/admin |
| Admin panel (live) | https://kahandesai.me/#/admin |

---

## Branch Structure

```
adapted-source-01  (or main)   ← source code — edit here
gh-pages                        ← deployed site — managed automatically by gh-pages npm package
                                   DO NOT manually commit to gh-pages
```

**When developing:**
- Work on your source branch
- `npm start` to test locally
- Commit source changes: `git add . && git commit -m "..."`
- Deploy: `npm run deploy`

---

## How Deploy Works (`npm run deploy`)

Three steps run in sequence automatically:

```
1. node scripts/fetch-live-config.js   ← syncs live config from gh-pages
2. react-scripts build                 ← builds with the synced config
3. gh-pages -d build                   ← pushes build/ to gh-pages branch
```

### The sync step (step 1) explained

The live site can have config changes made via the admin panel (resume URL, profile pic, projects, experience) that only exist on the `gh-pages` branch — not in your source code. Without the sync step, a fresh deploy would overwrite those with the defaults from `public/config.json`.

The script (`scripts/fetch-live-config.js`) fetches:
- `config.json` from gh-pages → saves to `public/config.json`
- `profile-pic.*` from gh-pages → saves to `public/profile-pic.*`

So your admin-panel edits **survive every deploy automatically**. You do not need to re-save anything after deploying.

> **If gh-pages can't be reached** (e.g., first ever deploy, or network issue), the script prints a warning and falls back to the existing `public/config.json`. Deploy still proceeds normally.

---

## Admin Panel

**URL:** `https://kahandesai.me/#/admin`  
**Auth:** GitHub Personal Access Token (PAT) — stored in sessionStorage (cleared on tab close)

### Creating a PAT

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (Classic)
2. New token → select `repo` scope → Generate
3. Copy it — you won't see it again

The PAT is the only credential. If it's valid for the repo, you're in.

### What you can edit

**General tab**
- Resume URL — the link the navbar Resume button opens (Google Drive share link or any direct PDF URL)
- Hero status line — text shown below your name on the landing page
- Profile picture — paste any direct image URL, or upload a file (JPG/PNG/WebP)
  - Google Drive share links are auto-converted to embeddable format
  - Uploaded files land on gh-pages as `/profile-pic.ext` and are served directly

**Projects tab**
- Add / edit / delete / reorder projects
- Each project: name, description, tech tags (comma-separated), GitHub URL, demo URL, featured flag
- Featured projects appear in the top 3-column grid; others go in the "Show more" section

**Experience tab**
- Add / edit / delete / reorder experience entries
- Each entry: title, company, company URL, location, date range, type (CO-OP / Full-time / Contract / Part-time / Volunteer), skills (comma-separated)
- Highlights — shown by default (use these for the 2-page resume bullets, one per line)
- Know more details — hidden behind "Know more" toggle (extra bullets from full resume), one per line

### Saving

Click **"Publish All Changes"** — saves all three tabs at once to `config.json` on gh-pages.  
Changes go live within seconds. Reload the site to verify.

---

## Profile Picture Priority

The About Me section loads the profile pic in this order:

1. Config `profilePicUrl` if set (Drive links auto-converted to direct image URL)
2. `/profile-pic.jpg` from the `public/` folder (served at the site root)
3. `onError` fallback → bundled `src/assets/Profile-pic.jpg`

**To update your photo from your phone:** admin panel → General tab → upload a file.

**To update your photo by file replacement:** replace `public/profile-pic.jpg` and run `npm run deploy`.

---

## Admin Panel — Field-by-Field Data Flow

Every field the admin panel manages travels through the same three stages:
**Save (GitHub API) → Fetch at runtime (config.json) → Sync on deploy (predeploy script).**

Here is exactly where each field lives and how it moves:

---

### Resume URL

| Stage | Detail |
|-------|--------|
| **Saved to** | `config.json` → `resumeUrl` on the `gh-pages` branch (GitHub API PUT) |
| **Read by** | `usePortfolioConfig` fetches `/config.json` on page load → `NavBar.js` uses it as the `href` on the Resume button |
| **On `npm run deploy`** | predeploy script fetches `config.json` from gh-pages, writes it into `public/config.json` → build bakes it in → deployed |

---

### Transcript URL

| Stage | Detail |
|-------|--------|
| **Saved to** | `config.json` → `transcriptUrl` on gh-pages |
| **Read by** | `usePortfolioConfig` → `NavBar.js` — if `transcriptUrl` is set, it's used as the Transcript button `href`; if blank, falls back to the bundled `src/assets/transcript.pdf` |
| **On deploy** | travels through config.json sync — same as resume URL |

---

### Hero Status Line

| Stage | Detail |
|-------|--------|
| **Saved to** | `config.json` → `statusLine` on gh-pages |
| **Read by** | `usePortfolioConfig` → `IntroAboutMe.js` → rendered below your name |
| **On deploy** | travels through config.json sync — same as resume URL |

---

### Profile Picture — URL input

| Stage | Detail |
|-------|--------|
| **Saved to** | `config.json` → `profilePicUrl` on gh-pages |
| **Read by** | `usePortfolioConfig` → `AboutMe.js` — Google Drive share links (`/file/d/ID/view`) are auto-converted to `lh3.googleusercontent.com/d/ID` before being used as `<img src>` |
| **On deploy** | config.json synced — `profilePicUrl` baked into the deployed config |

---

### Profile Picture — file upload

This is the only field that writes **two** things to gh-pages:

| Stage | Detail |
|-------|--------|
| **Saved to (1)** | The image file is PUT directly to gh-pages root as `profile-pic.jpg` (or `.png`/`.webp`) via GitHub API |
| **Saved to (2)** | `config.json` → `profilePicUrl` is set to `/profile-pic.ext?t=<timestamp>` (a relative path, not a Drive link) |
| **Read by** | Browser hits `https://kahandesai.me/profile-pic.jpg` served directly from gh-pages root; `AboutMe.js` uses the relative URL from config |
| **On deploy** | predeploy script fetches `profile-pic.*` from gh-pages → saves to `public/profile-pic.*` → build copies it into `build/` → deployed as a bundled static asset |

The timestamp query string (`?t=...`) on the URL busts the browser cache so the new photo shows immediately.

---

### Projects array

| Stage | Detail |
|-------|--------|
| **Saved to** | `config.json` → `projects` array on gh-pages (full array every time you publish) |
| **Read by** | `usePortfolioConfig` → `useContent` hook — if `config.projects` is a non-empty array, `Projects.js` uses it; if the field is absent or empty, it falls back to `src/data/projectsData.js` |
| **On deploy** | config.json synced — full projects array baked into the deployed config |

Image URLs for projects edited via admin are stored as plain strings in the array. Bundled images (from `src/assets/`) only exist for projects defined in the static fallback file — admin-added projects should use a URL or leave image blank.

---

### Experience array

| Stage | Detail |
|-------|--------|
| **Saved to** | `config.json` → `experience` array on gh-pages |
| **Read by** | `usePortfolioConfig` → `useContent` → `Experience.js`; fallback to `src/data/experienceData.js` |
| **On deploy** | same as projects — travels through config.json sync |

Each experience entry stores `highlights` (shown by default — your 2-page resume bullets) and `moreDetails` (shown behind the "Know more" toggle — extra bullets from the full resume) as plain string arrays.

---

### Summary diagram

```
  Admin Panel  ──── GitHub API ────▶  gh-pages branch
                                          │
                                    config.json       profile-pic.jpg
                                          │                  │
  predeploy script ◀── fetches ──────────┴──────────────────┘
        │
        ▼
  public/config.json   public/profile-pic.jpg   (in source, before build)
        │
  react-scripts build
        │
        ▼
  build/config.json    build/profile-pic.jpg    (in build output)
        │
  gh-pages -d build
        │
        ▼
  gh-pages branch  (now has latest code + latest config + latest pic)
        │
        ▼
  https://kahandesai.me
```

Runtime fetch path (user visits the site):
```
  Browser ──▶ GET /config.json ──▶ usePortfolioConfig ──▶ NavBar / IntroAboutMe / AboutMe / useContent
                                                                     │
                                                               Projects.js
                                                               Experience.js
```

---

## Config System

`public/config.json` is served statically at `https://kahandesai.me/config.json`.  
The React app fetches it on every page load. Components read from it rather than hardcoded values.

Fields:
```json
{
  "resumeUrl": "https://...",
  "profilePicUrl": "https://...",
  "statusLine": "Seeking ...",
  "projects": [ ... ],   // null or absent → falls back to src/data/projectsData.js
  "experience": [ ... ]  // null or absent → falls back to src/data/experienceData.js
}
```

If `projects` or `experience` are absent from config, the app uses the static data files. Once you save from the admin panel, the full arrays are stored in config and take over.

---

## Key Files

```
public/
  config.json          ← runtime config (synced from gh-pages on deploy)
  profile-pic.jpg      ← default profile pic (synced from gh-pages on deploy)

scripts/
  fetch-live-config.js ← predeploy sync script

src/
  hooks/
    usePortfolioConfig.js  ← fetches /config.json at runtime
    useContent.js          ← returns projects/experience (config or static fallback)
  components/
    admin/AdminPanel.js    ← full CMS admin panel
    Experience.js          ← reads from useContent
    Projects.js            ← reads from useContent
  data/
    projectsData.js        ← static fallback for projects
    experienceData.js      ← static fallback for experience
```

---

## Updating Static Fallback Data

If you want to update the default content that ships with new clones / first deploys (before any admin edits), edit these files directly:

- `src/data/projectsData.js` — projects
- `src/data/experienceData.js` — experience
- `src/data/programingLanguagesData.js` — skills in the About Me section
- `public/config.json` — resume URL, status line (these are also the deploy defaults)

After editing static files, commit and deploy as normal.
