# Netlify Deployment Guide

## Quick Steps to Deploy

### 1. **Connect to Netlify**
- Go to https://app.netlify.com/
- Click **"New site from Git"**
- Select GitHub and authorize
- Choose the **Samyak013/Rhythms2026** repository

### 2. **Configure Build Settings**
Netlify should automatically detect these from `netlify.toml`:
- **Build command:** `npm run build`
- **Publish directory:** `dist/public`
- **Node version:** 18.17.0

### 3. **Set Environment Variables**
Go to **Site settings → Build & deploy → Environment**

Add these variables:
```
DATABASE_URL = postgresql://user:password@host:5432/rhythms2026
NODE_ENV = production
```

**For PostgreSQL, use one of these:**

#### Option A: Neon (Free tier available)
1. Go to https://neon.tech/
2. Sign up and create a PostgreSQL database
3. Copy the connection string
4. Paste as `DATABASE_URL` in Netlify

#### Option B: Supabase (Free tier available)
1. Go to https://supabase.com/
2. Create a new project
3. Copy the PostgreSQL connection string
4. Paste as `DATABASE_URL` in Netlify

#### Option C: Railway (Free tier available)
1. Go to https://railway.app/
2. Create a new PostgreSQL service
3. Copy the connection string
4. Paste as `DATABASE_URL` in Netlify

### 4. **Deploy**
- Click **"Deploy site"**
- Netlify will automatically build and deploy
- Wait for the build to complete (usually 2-5 minutes)
- Your site will be available at `https://your-site-name.netlify.app`

## Troubleshooting

### Build Fails
- Check the **Deploy log** in Netlify dashboard
- Ensure all dependencies are properly declared in `package.json`
- Make sure `npm run build` works locally

### 404 Errors
- Netlify uses the `netlify.toml` configuration for routing
- Redirects are configured to serve `index.html` for SPA routes
- API routes are proxied to the backend

### Environment Variables Not Working
- Make sure variables are added before deploying
- Trigger a new deployment after adding variables (Site settings → Trigger deploy)

## Production Checklist

- ✅ Build succeeds locally: `npm run build`
- ✅ Environment variables configured in Netlify
- ✅ PostgreSQL database accessible from Netlify
- ✅ `DATABASE_URL` correctly formatted
- ✅ Git repository connected to Netlify
- ✅ `netlify.toml` properly configured

## Custom Domain

After deployment:
1. Go to **Site settings → Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., rhythms2026.com)
4. Update your domain registrar's DNS settings

## Auto-Deploy on Push

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to `main` branch
- Run the build command
- Serve the updated site

No additional configuration needed!
