# RHYTHMS 2026 - Cultural Fest Website

## Overview

RHYTHMS 2026 is a fully responsive, mobile-first cultural fest website for A.C. Patil College of Engineering. The application features a dark mystery theme with immersive cinematic design, event registration with QR code-based digital tickets, and user authentication via PRN (student ID) and date of birth.

The fest is scheduled for March 5th & 6th, 2026, and the website allows students to browse events, register for participation, and receive digital entry passes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom mystery theme (dark mode default)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for page transitions and reveal effects
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints defined in shared route contracts
- **Session Management**: Express-session with MemoryStore (development) / connect-pg-simple (production)
- **Authentication**: Session-based auth using PRN and date of birth (no passwords)

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit for schema migrations (`npm run db:push`)
- **Tables**: users, events, registrations with proper relations

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route pages
│       ├── hooks/        # Custom React hooks
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared types and contracts
│   ├── schema.ts     # Drizzle schema definitions
│   └── routes.ts     # API contract definitions
└── migrations/       # Database migrations
```

### Key Design Patterns
- **Shared Schema**: Types and validation schemas shared between frontend and backend via `@shared/*` path alias
- **Storage Interface**: Database operations abstracted through `IStorage` interface for testability
- **API Contracts**: Route definitions with Zod schemas for type-safe API communication
- **Component Composition**: shadcn/ui components customized with mystery theme CSS variables

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Frontend Libraries
- **qrcode.react**: QR code generation for digital tickets
- **embla-carousel-react**: Carousel functionality
- **date-fns**: Date formatting utilities
- **lucide-react**: Icon library

### UI Framework
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **class-variance-authority**: Component variant management
- **tailwind-merge**: Tailwind class merging utilities

### Session Storage
- **memorystore**: In-memory session storage for development
- **connect-pg-simple**: PostgreSQL session storage for production

### Build & Development
- **Vite**: Frontend bundling with HMR
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development