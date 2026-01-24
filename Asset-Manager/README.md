# RHYTHMS 2026 - Cultural Fest Website

A fully responsive, mobile-first cultural fest website for A.C. Patil College of Engineering built with modern web technologies.

## Features

✨ **Event Management**
- Browse 20+ cultural events across multiple categories
- Register for events with digital QR-code based tickets
- Real-time event registration status

🎭 **Event Categories**
- On-Stage (Dance, Singing, Fashion Show)
- On-Ground (Antakshari, Flashmob)
- Literary Arts (Poetry, Stand-up Comedy, Storytelling)
- Fine Arts (Sketching, Rangoli, Mandala Art)
- Miscellaneous (Treasure Hunt, Rellography)

🔐 **Authentication**
- PRN (Student ID) + Date of Birth based authentication
- Secure session management
- No passwords required

🎫 **Digital Tickets**
- QR code-based digital entry passes
- Instant ticket generation on registration
- Easy ticket verification

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** components with Radix UI primitives
- **TanStack React Query** for server state management
- **Wouter** for lightweight client-side routing
- **Vite** for fast development and building

### Backend
- **Node.js** with Express 5
- **TypeScript** with ESM modules
- **SQLite** for development (PostgreSQL ready for production)
- **Drizzle ORM** for type-safe database queries
- **Express-session** for session management

### Build & Deploy
- **Vite** with hot module replacement
- **esbuild** for production bundling
- **Drizzle Kit** for database migrations

## Project Structure

```
Asset-Manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and query client
│   └── index.html
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API endpoints
│   ├── db.ts             # Database connection
│   ├── storage.ts        # Database operations
│   ├── vite.ts           # Vite dev server setup
│   └── init-db.ts        # Database initialization
├── shared/               # Shared types and schemas
│   ├── schema.ts         # Database schema
│   └── routes.ts         # API contract definitions
├── package.json
├── tsconfig.json
├── vite.config.ts
└── drizzle.config.ts
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Samyak013/Rhythms2026.git
cd Rhythms2026/Asset-Manager
```

2. Install dependencies
```bash
npm install
```

3. Initialize the database
```bash
npm run db:init
```

4. Start the development server
```bash
npm run dev
```

The website will be available at `http://localhost:5000`

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

### Database

**Development:** Uses SQLite (no setup required)
**Production:** Configure PostgreSQL with `DATABASE_URL` environment variable

## Event Details

The fest is scheduled for **March 5th & 6th, 2026**

### Sample Events
- Solo Dance - 100 entry fee, 1000 prize
- Group Dance - 500 entry fee, 3000 prize
- Fashion Show - 1500 entry fee, 7000 prize
- Antakshari - 250 entry fee, 1500 prize
- Sketch Competition - 50 entry fee, 500 prize
- Stand-up Comedy - 100 entry fee, 1000 prize

## Deployment

### Quick Deploy (Netlify + Railway)

1. **Frontend:** Deploy to Netlify (automatic from GitHub)
2. **Backend:** Deploy to Railway with PostgreSQL
3. Set `VITE_API_URL` environment variable in Netlify

**See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for detailed steps**

### Hosting Options

**Netlify (Frontend only)**
- Easiest to set up
- Free tier available
- Static site hosting
- See `netlify.toml` for configuration

**Railway (Backend + Database)**
- Runs Node.js server
- Includes PostgreSQL database
- Free tier available
- Perfect for this stack

**Hostinger (Both Frontend & Backend)**
- Traditional hosting
- Full control
- May require more setup

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details

### Registrations
- `POST /api/register` - Register for event
- `GET /api/my-registrations` - Get user's registrations
- `GET /api/tickets/:id` - Get ticket with QR code

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own events!

## Support

For issues, questions, or suggestions, please create an issue on GitHub.

---

**Event Date:** March 5-6, 2026
**Venue:** A.C. Patil College of Engineering
**Status:** 🟢 Live and Ready to Register!
