# RHYTHMS 2026 - Cultural Fest Website

A full-stack web application for A.C. Patil College of Engineering's cultural festival with event registration and digital ticketing.

**Status:** ✅ Production Ready | 🚀 Ready for Deployment

---

## 🎯 Quick Links

| Document | Purpose |
|----------|---------|
| [**STRUCTURE.md**](./STRUCTURE.md) | Detailed project structure |
| [**DEPLOYMENT.md**](./DEPLOYMENT.md) | Quick 3-step deployment |
| [**Asset-Manager/README.md**](./Asset-Manager/README.md) | Full project documentation |
| [**Asset-Manager/NETLIFY_DEPLOY.md**](./Asset-Manager/NETLIFY_DEPLOY.md) | Detailed Netlify guide |

---

## 📁 Project Structure

```
Rhythms2026/
├── Asset-Manager/           # Main application folder
│   ├── client/             # React frontend
│   ├── server/             # Express backend
│   ├── shared/             # Shared types & schemas
│   ├── dist/               # Build output
│   ├── README.md           # App documentation
│   ├── netlify.toml        # Netlify config
│   └── package.json
│
├── STRUCTURE.md            # Project structure guide
├── DEPLOYMENT.md           # Quick deployment steps
└── [Config & docs]
```

**→ See [STRUCTURE.md](./STRUCTURE.md) for complete file listing**

---

## 🚀 Quick Start

### Local Development
```bash
cd Asset-Manager
npm install
npm run dev
# http://localhost:5000
```

### Production Build
```bash
npm run build
npm run start
```

---

## 🌐 Deployment

### 3-Step Deployment

1. **Frontend → Netlify**
   - Connect GitHub repo
   - Auto-builds from `netlify.toml`

2. **Backend → Railway**
   - Deploy to Railway
   - Auto-creates PostgreSQL

3. **Connect**
   - Set `VITE_API_URL` in Netlify
   - Done! ✅

**→ See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps**

---

## 💻 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite + Tailwind CSS
- Shadcn/UI components

### Backend
- Express.js + TypeScript
- Drizzle ORM
- PostgreSQL (production)

### Deployment
- Netlify (frontend)
- Railway (backend)

---

## ✨ Features

- 🎭 Browse 20+ cultural events
- 🎫 Digital ticket generation with QR codes
- 👤 User authentication (PRN + DOB)
- 📱 Fully responsive design
- 🎨 Dark theme UI
- ⚡ Real-time event updates

---

## 📚 Documentation

- **[STRUCTURE.md](./STRUCTURE.md)** - Detailed project structure & file organization
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Quick deployment guide
- **[Asset-Manager/README.md](./Asset-Manager/README.md)** - Full technical documentation
- **[Asset-Manager/NETLIFY_DEPLOY.md**](./Asset-Manager/NETLIFY_DEPLOY.md) - Comprehensive Netlify guide

---

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build for production
npm run start            # Run production server

# Utilities
npm run check            # TypeScript check
npm run db:push          # Database migrations
```

---

## 📦 Key Directories

| Directory | Purpose |
|-----------|---------|
| **Asset-Manager/client/** | React frontend application |
| **Asset-Manager/server/** | Express backend server |
| **Asset-Manager/shared/** | Shared types & schemas |
| **Asset-Manager/dist/** | Production build output |

---

## 📋 Checklist for Deployment

- ✅ Code is clean and organized
- ✅ No Replit dependencies
- ✅ Builds successfully locally
- ✅ Git repo is up to date
- ✅ Configuration files are ready
- ✅ Documentation is complete

**→ Ready to deploy! Follow [DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## 🎯 Next Steps

1. ✅ Code is ready
2. ⏳ Connect Netlify to GitHub
3. ⏳ Deploy backend to Railway
4. ⏳ Set environment variables
5. ⏳ Test live deployment

---

## 📞 Support

- Detailed guides in [Asset-Manager/](./Asset-Manager/)
- Deployment help in [DEPLOYMENT.md](./DEPLOYMENT.md)
- Structure reference in [STRUCTURE.md](./STRUCTURE.md)

---

## Event Details

**Festival Date:** March 5th & 6th, 2026  
**Venue:** A.C. Patil College of Engineering

---

**Repository:** https://github.com/Samyak013/Rhythms2026  
**Status:** ✅ Production Ready  
**Last Updated:** January 24, 2026
