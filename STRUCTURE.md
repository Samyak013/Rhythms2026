# 📁 Project Structure - RHYTHMS 2026

## Overview
```
Rhythms2026/                        # Git repository root
├── client/                         # React Frontend
├── server/                         # Express Backend
├── shared/                         # Shared types & schemas
├── script/                         # Build scripts
├── dist/                           # Built output
├── node_modules/                   # Dependencies (gitignored)
│
├── 📄 Configuration Files
├── 📄 Documentation Files
└── 📄 Environment Files
```

---

## 📂 Detailed Structure

### **client/** - React Frontend
```
client/
├── src/
│   ├── components/
│   │   ├── EventCard.tsx          # Event display component
│   │   ├── Navbar.tsx             # Navigation header
│   │   ├── TicketCard.tsx         # Ticket display
│   │   └── ui/                    # Shadcn/UI components (40+)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       └── ... (20+ more UI components)
│   │
│   ├── pages/
│   │   ├── Home.tsx               # Home page
│   │   ├── Events.tsx             # Events listing
│   │   ├── Tickets.tsx            # User tickets
│   │   ├── Login.tsx              # Login page
│   │   ├── Register.tsx           # Registration
│   │   ├── About.tsx              # About page
│   │   ├── Contact.tsx            # Contact page
│   │   └── not-found.tsx          # 404 page
│   │
│   ├── hooks/
│   │   ├── use-auth.ts            # Auth logic
│   │   ├── use-events.ts          # Events data fetching
│   │   ├── use-mobile.tsx         # Mobile detection
│   │   └── use-toast.ts           # Toast notifications
│   │
│   ├── lib/
│   │   ├── queryClient.ts         # React Query setup
│   │   └── utils.ts               # Utility functions
│   │
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles
│   └── public/
│       └── favicon.png
│
├── index.html                     # HTML template
├── tsconfig.json                  # TypeScript config
└── requirements.md                # Frontend requirements
```

### **server/** - Express Backend
```
server/
├── index.ts                       # Server entry point
│                                 # - Express app setup
│                                 # - Middleware configuration
│                                 # - Route registration
│                                 # - Server listening
│
├── routes.ts                      # API route handlers
│                                 # - GET /api/events
│                                 # - POST /api/register
│                                 # - GET /api/user
│                                 # - POST /api/auth/*
│                                 # - GET /api/my-registrations
│
├── db.ts                         # Database connection
│                                 # - SQLite (dev) / PostgreSQL (prod)
│                                 # - Drizzle ORM setup
│
├── storage.ts                    # Database operations
│                                 # - CRUD operations
│                                 # - Query functions
│
├── init-db.ts                    # Database initialization
│                                 # - Creates tables
│                                 # - Seed data
│
├── vite.ts                       # Vite dev server setup
│                                 # - HMR configuration
│                                 # - Dev server integration
│
└── static.ts                     # Static file serving
```

### **shared/** - Shared Code
```
shared/
├── schema.ts                      # Database schema
│                                 # - users table
│                                 # - events table
│                                 # - registrations table
│                                 # - Zod validation schemas
│
└── routes.ts                      # API contract definitions
                                  # - Route definitions
                                  # - Type contracts
```

### **script/** - Build Scripts
```
script/
└── build.ts                       # Production build script
                                  # - Vite client build
                                  # - esbuild server bundle
                                  # - Output to dist/
```

### **dist/** - Production Build Output
```
dist/
├── public/                        # Static frontend files
│   ├── index.html                # SPA entry
│   ├── assets/                   # Bundled JS/CSS
│   │   ├── index-*.js
│   │   └── index-*.css
│   └── favicon.png
│
└── index.cjs                      # Server bundle
                                  # - Bundled Express app
                                  # - Runs with: npm run start
```

---

## 📋 Configuration Files

| File | Purpose |
|------|---------|
| **package.json** | Dependencies & scripts |
| **tsconfig.json** | TypeScript configuration |
| **vite.config.ts** | Vite bundler config |
| **drizzle.config.ts** | Database migration config |
| **tailwind.config.ts** | Tailwind CSS theme |
| **postcss.config.js** | PostCSS plugins |
| **components.json** | Shadcn/UI config |
| **.gitignore** | Git ignore rules |
| **.netlifyignore** | Netlify ignore rules |
| **.env.example** | Environment template |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Project overview & setup |
| **NETLIFY_DEPLOY.md** | Detailed Netlify deployment guide |
| **DEPLOYMENT.md** | Quick deployment steps |
| **STRUCTURE.md** | This file - project structure |

---

## 🔧 Key Scripts

```json
{
  "dev": "Development server (hot reload)",
  "build": "Production build",
  "start": "Run production backend",
  "check": "TypeScript type checking",
  "db:push": "Database migrations"
}
```

---

## 🗂️ File Organization

### Frontend Files (React)
- All in `client/src/`
- Components separated by purpose
- UI components in `components/ui/`
- Pages in `pages/`
- Custom hooks in `hooks/`
- Utilities in `lib/`

### Backend Files (Express)
- All in `server/`
- Modular handlers
- Database layer separated
- Type-safe routes

### Shared Code
- `shared/` for types used by both
- Schemas for validation
- Route definitions

### Environment
- `.env.example` for template
- `.env` (gitignored) for local dev
- Environment vars set in Netlify/Railway

---

## 🌍 Environment Variables

### Development (local `.env`)
```
DATABASE_URL=sqlite (auto-created dev.db)
NODE_ENV=development
```

### Production (Netlify/Railway)
```
DATABASE_URL=postgresql://...
NODE_ENV=production
VITE_API_URL=https://your-api.railway.app
```

---

## 📦 Build Output

After `npm run build`:

```
dist/
├── public/                # Deployed to Netlify
│   ├── index.html        # Frontend static files
│   └── assets/
│
└── index.cjs             # Deployed to Railway
                          # Backend Node.js server
```

---

## 🚀 Deployment Mapping

| Component | Host | Output |
|-----------|------|--------|
| Frontend (React) | Netlify | `dist/public/` |
| Backend (Express) | Railway | `dist/index.cjs` |
| Database | Railway PostgreSQL | Connection string |

---

## ✨ Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/UI
- React Query
- Wouter (routing)

### Backend
- Node.js
- Express 5
- TypeScript
- Drizzle ORM
- Better-SQLite3 (dev)
- PostgreSQL (prod)

### Build & Deploy
- Vite (client bundler)
- esbuild (server bundler)
- Netlify (static hosting)
- Railway (backend hosting)

---

## 📝 Notes

- ✅ Clean structure, no Replit dependencies
- ✅ Type-safe with TypeScript throughout
- ✅ Modular and maintainable
- ✅ Ready for production deployment
- ✅ Proper separation of concerns

---

**Last Updated:** January 24, 2026  
**Status:** ✅ Production Ready
