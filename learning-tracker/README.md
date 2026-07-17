# Java Switch Tracker 🎯

A fully trackable learning dashboard to switch into a stronger Java backend role — built for a 3-YOE developer doing mostly fresh learning.

## Features

- **Dashboard** — overall progress ring, level system, daily goal, "up next" plan day
- **Streaks & points** — earn points per item, streak bonuses, 8 levels, daily-goal tracking
- **Reminders** — banner nudges you if you missed a day or are about to break a streak; optional browser notifications
- **Activity heatmap** — GitHub-style grid of your last ~18 weeks
- **Day-wise / month-wise study plan** — 12-week dependency-ordered plan (Core Java → DSA → SQL → Spring → Project → Microservices → System Design → Behavioral)
- **DSA problem sheet** — curated NeetCode-150-style set grouped by pattern, with difficulty filters, search, ⭐ Blind-75 markers and LeetCode links
- **Topic sheets** — Core Java, Databases, Spring, Resume Project, Microservices, System Design, Cloud/DevOps, Testing, Behavioral
- **Achievements** — 20+ badges for consistency and milestones
- **Settings** — daily goal, plan start date, notifications, export/import backup, reset

Progress is saved in your browser (localStorage) **and** optionally synced to the cloud (Supabase) so you can log in from your phone and laptop and see the same data.

## Run it

```bash
cd learning-tracker
npm install
npm run dev
```

Then open the URL it prints (default http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Cloud sync (optional) — sync across devices

The app works fully offline on `localStorage`. To also sync progress across devices, enable **Supabase** (free tier):

### 1. Create a Supabase project
1. Go to [supabase.com](https://supabase.com) → sign up (free) → **New project**.
2. Give it a name + database password, pick a region, and wait ~1 min for it to provision.

### 2. Create the progress table
Open **SQL Editor** in the Supabase dashboard, paste this, and click **Run**:

```sql
-- One row per user, storing the whole tracker state as JSON
create table if not exists public.progress (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Row Level Security: each user can only see/change their own row
alter table public.progress enable row level security;

create policy "own progress - select" on public.progress
  for select using (auth.uid() = user_id);
create policy "own progress - insert" on public.progress
  for insert with check (auth.uid() = user_id);
create policy "own progress - update" on public.progress
  for update using (auth.uid() = user_id);
```

### 3. Add your keys
1. In Supabase: **Project Settings → API**. Copy the **Project URL** and the **anon public** key.
2. In `learning-tracker/`, copy `.env.example` to `.env` and fill them in:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

3. Restart the dev server (`npm run dev`). A **Cloud sync** card now appears in **Settings** — create an account or sign in, and your progress syncs automatically.

### 4. (Optional) Email confirmation & Google login
- By default Supabase asks users to confirm their email. For a personal tool you can turn this off under **Authentication → Providers → Email → "Confirm email"**.
- To enable **Continue with Google**, configure the Google provider under **Authentication → Providers → Google** and add your site URL to the allowed redirect URLs.

### 5. Deploying (Netlify)
Add the same two variables in **Site settings → Environment variables** on Netlify, then redeploy. Also add your Netlify URL to Supabase **Authentication → URL Configuration → Site URL / Redirect URLs**.

> Security note: the `anon` key is safe to expose in the frontend — Row Level Security ensures each user can only read/write their own row.

## Tech

- React 18 + Vite
- React Router
- Persistence: `localStorage` (offline) + optional **Supabase** (Postgres + Auth) for cross-device sync

---

_Tip: open the app daily, complete your plan-day items, and watch the streak grow. Back up your data weekly._
