# RHYTHMS 2026 - Cultural Fest Website

A full-stack web application for A.C. Patil College of Engineering's cultural festival with event registration and digital ticketing.

**Status:** ✅ Production Ready | 🚀 Deployed on Netlify

🔗 **[Live Demo](https://rhythms2026.netlify.app/)**

---

## 📁 Project Structure

```
rhythms2026/
├── client/                 # React frontend (TypeScript)
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities & config
│   │   └── index.css      # Tailwind styles
│   └── index.html
│
├── server/                 # Express backend (TypeScript)
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database connection
│   └── schema.ts          # Data models
│
├── shared/                 # Shared types & schemas
│   ├── routes.ts          # Route definitions
│   └── schema.ts          # Shared schemas
│
├── script/                 # Build scripts
├── dist/                   # Production build output
├── netlify.toml           # Netlify configuration
└── [Config files]
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.19.0
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5000
```

### Production Build
```bash
# Build for production
npm run build

# Run production server
npm start
```

---

## 🌐 Deployment

The project is deployed on **Netlify** and automatically builds from the main branch.

**Key Configuration:**
- Frontend builds to `dist/public`
- Auto-redirects for SPA routing
- Security headers configured
- Static assets cached

---

## 💻 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite + Tailwind CSS
- Shadcn/UI components
- TanStack Query for data fetching

### Backend
- Express.js + TypeScript
- Drizzle ORM
- SQLite (local) / PostgreSQL (production)
- Type-safe client generation

### Infrastructure
- **Hosting:** Netlify (Frontend)
- **Build Tool:** Vite
- **Package Manager:** npm

---

## ✨ Features

- 🎭 Browse 20+ cultural events
- 🎫 Digital ticket generation with QR codes
- 👤 User authentication (PRN + DOB)
- 📱 Fully responsive design
- 🎨 Modern UI with Shadcn/UI components
- ⚡ Real-time event updates
- 🔒 Secure authentication system

---

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build            # Build for production
npm start                # Run production server

# Database
npm run db:push          # Push schema to database

# Type Checking
npm run check            # Run TypeScript type check
```

---

## 📝 Environment Setup

Create a `.env` file based on `.env.example`:

```bash
VITE_API_URL=http://localhost:5000
```

---

## 👨‍💻 Development

The project uses Vite for fast development builds and React for the frontend. TypeScript ensures type safety across the codebase.

### File Organization

- **Components** are reusable and located in `client/src/components/`
- **Pages** represent routes and are in `client/src/pages/`
- **Hooks** contain custom React logic in `client/src/hooks/`
- **Server routes** are defined in `server/routes.ts`
- **Database schema** is managed with Drizzle ORM

---

## 📄 License

MIT

---

**Event:** RHYTHMS 2026 - A.C. Patil College of Engineering  
**Festival Date:** March 5th & 6th, 2026  
**Repository:** https://github.com/Samyak013/Rhythms2026
