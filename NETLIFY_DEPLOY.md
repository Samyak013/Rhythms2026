# Netlify Deployment Guide

## ⚠️ Important: This is a Full-Stack App

This application has:
- **Frontend**: React + Vite (can be hosted on Netlify)
- **Backend**: Express.js server (needs separate hosting)

**Netlify hosts static sites, NOT Node.js servers.**

---

## Best Solution: Netlify + Railway

### Step 1: Deploy Frontend to Netlify

1. Go to https://app.netlify.com/
2. Click **"New site from Git"**
3. Select GitHub → Authorize → Choose `Samyak013/Rhythms2026`
4. **Build settings** (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist/public`
5. Click **"Deploy site"**
6. **Copy your Netlify URL** (e.g., `https://your-site.netlify.app`)

### Step 2: Deploy Backend to Railway

Railway is FREE and perfect for the backend!

1. Go to https://railway.app/
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select `Samyak013/Rhythms2026` repository
5. **Configure:**
   - Root directory: `Asset-Manager`
   - Start command: `npm run start`
6. **Add Variables** (click "Add Variable"):
   - `NODE_ENV`: `production`
7. **Add PostgreSQL Database:**
   - Click "Add Service" → "PostgreSQL"
   - Railway auto-generates `DATABASE_URL`
8. Click **"Deploy"** → Copy the deployed URL (e.g., `https://rhythms2026.up.railway.app`)

### Step 3: Connect Frontend to Backend

In **Netlify Dashboard:**
1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Add environment variable"**
3. Add:
   - Key: `VITE_API_URL`
   - Value: Your Railway URL (e.g., `https://rhythms2026.up.railway.app`)
4. Go back to **Deploys** → **Trigger deploy** (to rebuild with new env var)

---

## Alternative: Using Netlify Only (No Backend API)

If you just want to test the frontend UI on Netlify:

1. Connect repo to Netlify (same steps as above)
2. Deploy
3. UI will work, but API calls will fail (that's OK for testing)

---

## Database Setup (Choose One)

### Option A: Railway PostgreSQL (Easiest)
- Create in Railway (done in Step 2 above)
- Auto-configured

### Option B: Neon.tech
1. Go to https://neon.tech/
2. Sign up (free)
3. Create project
4. Copy connection string
5. In Railway → Add Variable: `DATABASE_URL` = copied string

### Option C: Supabase
1. Go to https://supabase.com/
2. Create project
3. Go to **Settings** → **Database** → Copy connection string
4. In Railway → Add Variable: `DATABASE_URL` = copied string

---

## File Structure

```
dist/
├── public/                  ← Netlify serves this ✅
│   ├── index.html
│   ├── assets/
│   └── favicon.png
└── index.cjs                ← Railway runs this ✅
```

---

## Testing Locally

```bash
# Development
npm run dev              # http://127.0.0.1:5000

# Production build
npm run build            # Creates dist/public + dist/index.cjs

# Run production backend
npm run start            # http://127.0.0.1:5000
```

---

## Deployment Checklist

- [ ] Frontend builds successfully: `npm run build`
- [ ] GitHub repo connected to Netlify
- [ ] Netlify build succeeds (green checkmark)
- [ ] Frontend live at `https://your-site.netlify.app`
- [ ] Backend deployed to Railway
- [ ] PostgreSQL database running
- [ ] `VITE_API_URL` set in Netlify environment
- [ ] Netlify redeployed with new env var
- [ ] Test API calls from frontend (check Network tab)

---

## Troubleshooting

### Still getting 404?
- [ ] Check Netlify Deploy log (red ❌ indicates build error)
- [ ] Verify `dist/public/index.html` exists
- [ ] Check `netlify.toml` publish directory is `dist/public`

### API calls failing?
- [ ] Backend deployed and running on Railway
- [ ] `VITE_API_URL` is set correctly
- [ ] Check browser console for actual error
- [ ] Test API directly: `curl https://your-railway-url/api/events`

### Build fails in Netlify?
1. Check deploy log for error message
2. Run `npm run build` locally to reproduce
3. Common causes:
   - Node version mismatch
   - Missing environment variable
   - Syntax error in code

---

## Support

- [Netlify Docs](https://docs.netlify.com/)
- [Railway Docs](https://docs.railway.app/)
- [Vite Docs](https://vitejs.dev/)
