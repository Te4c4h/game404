# MD5_Tech_Stack.md
**Project:** Game404 — Armenian Cybersport Tournament Platform
**Version:** 1.0
**Last Updated:** March 2026

---

## 1. Frontend

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js App Router | 14+ |
| Language | TypeScript | 5+ |
| Styling | Tailwind CSS | 3+ |
| Component Library | shadcn/ui | Latest |
| UI Primitives | Radix UI | Latest (via shadcn) |
| Icons | Lucide React | Latest |
| Fonts | Google Fonts — Barlow Condensed, Inter, JetBrains Mono | — |
| Class Utility | clsx + tailwind-merge via `cn()` in `src/lib/utils.ts` | Latest |

---

## 2. Backend

| Layer | Choice |
|---|---|
| API Routes | Next.js App Router API Routes (`src/app/api/`) |
| Server Logic | Next.js Server Components + Server Actions |
| ORM | Prisma |
| Database | Neon PostgreSQL (Serverless) |

---

## 3. Authentication

| Layer | Choice |
|---|---|
| Auth Solution | NextAuth.js v5 (Auth.js) |
| Strategy | Credentials Provider (email + password) |
| Session | JWT strategy |
| Password Hashing | bcryptjs |
| Admin Auth | Separate credentials check against env-defined admin email/password |
| Banned User Check | Checked inside authorize() callback — banned users cannot login |

---

## 4. File Storage

| Layer | Choice |
|---|---|
| Payment Proof Uploads | Cloudinary |
| Game Image Uploads | Cloudinary |
| Upload Method | Cloudinary unsigned upload via REST API |

---

## 5. Deployment

| Layer | Choice |
|---|---|
| Hosting | Vercel |
| Database | Neon PostgreSQL (managed serverless) |
| Deployment | Auto-deploy from `main` branch |
| Domain | `game404.am` (configured post-launch) |

---

## 6. Package Manager
pnpm

---

## 7. File Structure

game404/
├── prisma/
│ ├── schema.prisma
│ └── seed.ts
├── src/
│ ├── app/
│ │ ├── (public)/
│ │ │ ├── page.tsx # Home
│ │ │ ├── tournaments/
│ │ │ │ ├── page.tsx # Tournaments list
│ │ │ │ └── [id]/
│ │ │ │ ├── page.tsx # Tournament detail
│ │ │ │ └── register/
│ │ │ │ └── page.tsx # Registration form
│ │ │ ├── games/
│ │ │ │ └── page.tsx # Games list
│ │ │ └── about/
│ │ │ └── page.tsx # About page
│ │ ├── (auth)/
│ │ │ ├── layout.tsx
│ │ │ ├── login/
│ │ │ │ └── page.tsx
│ │ │ └── register/
│ │ │ └── page.tsx
│ │ ├── dashboard/
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx # Captain dashboard
│ │ ├── admin/
│ │ │ ├── login/
│ │ │ │ └── page.tsx
│ │ │ ├── layout.tsx # Admin layout + sidebar
│ │ │ ├── page.tsx # Admin dashboard
│ │ │ ├── games/
│ │ │ │ └── page.tsx
│ │ │ ├── tournaments/
│ │ │ │ ├── page.tsx
│ │ │ │ ├── create/
│ │ │ │ │ └── page.tsx
│ │ │ │ └── [id]/
│ │ │ │ ├── edit/
│ │ │ │ │ └── page.tsx
│ │ │ │ └── bracket/
│ │ │ │ └── page.tsx
│ │ │ ├── registrations/
│ │ │ │ └── page.tsx
│ │ │ └── users/
│ │ │ └── page.tsx
│ │ ├── api/
│ │ │ ├── auth/
│ │ │ │ ├── [...nextauth]/
│ │ │ │ │ └── route.ts
│ │ │ │ └── register/
│ │ │ │ └── route.ts
│ │ │ ├── games/
│ │ │ │ ├── route.ts
│ │ │ │ └── [id]/
│ │ │ │ └── route.ts
│ │ │ ├── tournaments/
│ │ │ │ ├── route.ts
│ │ │ │ └── [id]/
│ │ │ │ ├── route.ts
│ │ │ │ ├── register/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── bracket/
│ │ │ │ │ └── route.ts
│ │ │ │ └── matches/
│ │ │ │ └── [matchId]/
│ │ │ │ └── route.ts
│ │ │ ├── registrations/
│ │ │ │ ├── route.ts
│ │ │ │ └── [id]/
│ │ │ │ └── route.ts
│ │ │ ├── users/
│ │ │ │ └── route.ts
│ │ │ └── upload/
│ │ │ └── route.ts
│ │ ├── not-found.tsx
│ │ ├── error.tsx
│ │ ├── layout.tsx # Root layout
│ │ └── globals.css
│ ├── components/
│ │ ├── ui/ # shadcn/ui base components
│ │ ├── layout/
│ │ │ ├── Navbar.tsx
│ │ │ ├── Footer.tsx
│ │ │ └── AdminSidebar.tsx
│ │ ├── tournaments/
│ │ │ ├── TournamentCard.tsx
│ │ │ ├── TournamentFilters.tsx
│ │ │ ├── TournamentBracket.tsx
│ │ │ └── RegistrationForm.tsx
│ │ ├── games/
│ │ │ └── GameCard.tsx
│ │ ├── admin/
│ │ │ ├── StatsCard.tsx
│ │ │ ├── DataTable.tsx
│ │ │ └── GameModal.tsx
│ │ └── shared/
│ │ ├── StatusBadge.tsx
│ │ ├── EmptyState.tsx
│ │ └── LoadingSpinner.tsx
│ ├── lib/
│ │ ├── utils.ts # cn() utility
│ │ ├── prisma.ts # Prisma singleton
│ │ └── auth.ts # NextAuth config
│ └── types/
│ ├── tournament.ts
│ ├── game.ts
│ ├── registration.ts
│ ├── user.ts
│ └── next-auth.d.ts
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json
└── package.json


---

## 8. Prisma Schema — Models & Enums

### Enums
Role → CAPTAIN, ADMIN
UserStatus → ACTIVE, BANNED
GameStatus → ACTIVE, INACTIVE
TournamentStatus → DRAFT, OPEN, ONGOING, COMPLETED
PaymentStatus → PENDING, APPROVED, REJECTED


### Models
- **User** — id, name, email, passwordHash, role (Role),
  status (UserStatus), createdAt
- **Game** — id, name, imageUrl, maxPlayersPerTeam, status (GameStatus),
  createdAt
- **Tournament** — id, gameId, name, description, rules, maxTeams,
  entryFee, prizePool, prizeDistribution, paymentInstructions,
  registrationDeadline, startDate, status (TournamentStatus), createdAt
- **Registration** — id, tournamentId, userId, teamName, players (Json),
  paymentProofUrl, paymentStatus (PaymentStatus), createdAt
- **Match** — id, tournamentId, round, position, team1Id, team2Id,
  score1, score2, winnerId, locked, createdAt

---

## 9. Environment Variables

```env
# Database — Neon PostgreSQL
DATABASE_URL=          # Pooled connection string (app queries)
DIRECT_URL=            # Direct connection string (migrations only)

# Authentication
NEXTAUTH_SECRET=       # Random secret string (min 32 chars)
NEXTAUTH_URL=          # http://localhost:3000 (local)
                       # https://game404.am (production)

# Admin Credentials
ADMIN_EMAIL=           # Admin login email
ADMIN_PASSWORD=        # Admin login password

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=   # Used client-side for uploads

# App
NEXT_PUBLIC_APP_URL=   # http://localhost:3000 (local)
                       # https://game404.am (production)
```

---

## 10. Key Dependencies (`package.json`)

```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3",
    "prisma": "latest",
    "@prisma/client": "latest",
    "next-auth": "^5",
    "bcryptjs": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "lucide-react": "latest",
    "cloudinary": "latest",
    "zod": "latest"
  },
  "devDependencies": {
    "@types/bcryptjs": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}
```

---

## 11. Code Rules

- Functional components with hooks only — never class components
- All components must have explicit TypeScript prop types
- Prefer server components — use `'use client'` only for:
  event handlers, browser APIs, useState / useEffect / useRef
- Use `cn()` from `src/lib/utils.ts` for all conditional Tailwind classes
- Prisma client must always use singleton from `src/lib/prisma.ts`
- Validate all API route inputs with Zod before any DB operation
- Never use placeholder text — all strings from MD4 only
- Never use colors not in MD3 — always use exact hex values
- Never install a library not listed here without asking first
- Never make architectural decisions not in the MDs without asking

---
