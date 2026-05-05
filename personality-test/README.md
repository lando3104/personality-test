# Personality Test App

AI-powered personality analysis — 79 questions, fully personalized report.

## Stack
- React (Create React App)
- Claude API (built-in via claude.ai)
- Deployable to Vercel (free)

## Deploy to Vercel (share a link with anyone)

### Option 1 — GitHub + Vercel (recommended, 10 min setup)

1. Create a free account at github.com
2. Create a new repo called `personality-test`
3. Upload all these files to the repo
4. Go to vercel.com → sign up with GitHub
5. Click "New Project" → import your repo
6. Click Deploy
7. Vercel gives you a free link like `personality-test-abc.vercel.app`
8. Share that link with anyone

### Option 2 — Vercel CLI (fastest)

```bash
npm install -g vercel
cd personality-test
npm install
vercel
```
Follow the prompts. You'll get a live URL in ~2 minutes.

### Option 3 — Run locally first

```bash
npm install
npm start
```
Opens at http://localhost:3000

## How it works

1. User lands on the landing page
2. Answers 2 intake questions (gender + goal)
3. Goes through all 79 questions one at a time
4. On completion, all answers + intake info are sent to Claude AI
5. AI generates a fully personalized personality report
6. Results page shows: personality type, trait scores, 8 deep-dive sections, final note

## Future upgrades (already architected for this)
- Add user accounts (Supabase or Firebase)
- Save results to database
- Add a paid tier with even deeper reports
- Custom domain (e.g. yourtest.com)
- Share results as a link
