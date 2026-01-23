# RHYTHMS 2026 - Cultural Fest Website

## Overview

RHYTHMS 2026 is a fully responsive, mobile-first cultural fest website for A.C. Patil College of Engineering. The application features a dark mystery theme with immersive cinematic design, event registration, and digital ticket generation with QR codes. The fest is scheduled for March 5th & 6th, 2026, allowing students to browse events, register for participation, and receive digital entry passes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom mystery theme (dark mode default, deep purple/crimson/gold accents)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for page transitions, loading screens, and reveal effects
- **Forms**: React Hook Form with Zod validation
- **QR Codes**: qrcode.react for digital ticket generation
- **Build Tool**: Vite with Replit-specific plugins for development

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints with shared route contracts in `shared/routes.ts`
- **Session Management**: Express-session with MemoryStore (development) / connect-pg-simple (production ready)
- **Authentication**: Session-based auth using PRN (student ID) and date of birth - no passwords required

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit for schema migrations (`npm run db:push`)
- **Core Tables**: 
  - `users` - Student registration (name, PRN, DOB, college, branch)
  - `events` - Fest events (name, category, fees, prizes, venue)
  - `registrations` - Links users to events with unique ticket codes

### Project Structure
```
├── client/               # React frontend
│   └── src/
│       ├── components/   # Reusable UI components (Navbar, EventCard, TicketCard)
│       ├── pages/        # Route pages (Home, Events, Tickets, Login, Register)
│       ├── hooks/        # Custom hooks (use-auth, use-events, use-toast)
│       └── lib/          # Utilities and query client
├── server/               # Express backend
│   ├── routes.ts         # API route handlers
│   ├── storage.ts        # Database access layer
│   └── db.ts             # Database connection
├── shared/               # Shared types and contracts
│   ├── schema.ts         # Drizzle table definitions
│   └── routes.ts         # API contract definitions
```

### Key Design Patterns
- **Shared Contracts**: API routes defined in `shared/routes.ts` with Zod schemas for type-safe client-server communication
- **Storage Interface**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Theme System**: CSS variables in `client/src/index.css` define the dark mystery palette with custom fonts (Cinzel, Montserrat, Space Mono)

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Frontend Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms)
- **Framer Motion**: Animation library for cinematic effects
- **qrcode.react**: QR code generation for digital tickets
- **Embla Carousel**: Carousel component for event displays

### Session & Authentication
- **express-session**: Server-side session management
- **memorystore**: In-memory session store for development
- **connect-pg-simple**: PostgreSQL session store (production ready)

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **Replit Vite Plugins**: Development banner and cartographer for Replit integration