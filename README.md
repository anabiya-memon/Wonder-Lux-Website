# Wonderlux (Next.js)

Luxury travel agency website built with Next.js 15 (App Router) and TypeScript.

**Pages:** `/` home · `/about` · `/packages` · `/packages/beach|culture|adventure` · `/contact` · `/admin`
**Backend:** `app/api/enquiries/route.ts` validates and stores booking requests, contact enquiries and newsletter signups, and optionally emails you each one.

## Run locally
```
npm install
cp .env.example .env.local     # set ADMIN_KEY at least
npm run dev                    # http://localhost:3000
```
Enquiries are saved to `data/enquiries.json`. Open `/admin` and enter your `ADMIN_KEY` to read them.

## Push to GitHub
```
git init -b main
git add .
git commit -m "Wonderlux Next.js site"
git remote add origin https://github.com/anabia-memon/wonderlux.git
git push -u origin main
```

## Deploy on Vercel
1. Import the GitHub repo at https://vercel.com/new
2. Add environment variables: `ADMIN_KEY`, and for email alerts `RESEND_API_KEY`, `NOTIFY_EMAIL`, `FROM_EMAIL`.
3. Deploy. You get a `*.vercel.app` link.

Vercel's disk is temporary, so enquiries saved to a file will not last there. Set up the Resend email alerts, or replace `saveEnquiry()` in the API route with a database (Vercel Postgres, Supabase, MongoDB).

## Edit content
Packages and destinations live in `lib/data.ts`. Styles are in `app/globals.css`.
