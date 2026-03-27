# gemini.md
**Project:** Game404 — Armenian Cybersport Tournament Platform
**Version:** 1.0
**Last Updated:** March 2026

---

## Project Identity

- **Name:** Game404
- **Type:** Armenian Esports Tournament Platform
- **Stack:** Next.js 14+ App Router, TypeScript, Tailwind CSS, Prisma,
  Neon PostgreSQL, NextAuth.js v5, Cloudinary, shadcn/ui, Lucide React
- **Package Manager:** pnpm

---

## Mandatory Reading — Before Any Code

Read all five MD files attached to this project before writing
a single line of code:

1. **MD1_Project_Structure.md** — all pages, sections, buttons,
   components, responsive behavior
2. **MD2_Users_Flow.md** — all user roles, journeys, decision points,
   edge cases
3. **MD3_Brand_Guidelines.md** — all colors (hex), fonts, spacing,
   button styles, badges, cards
4. **MD4_Content_Texts.md** — every text string visible on the platform
5. **MD5_Tech_Stack.md** — exact stack, file structure, schema,
   env vars, code rules

---

## Hard Rules — Never Break These

1. Never use placeholder or dummy text — every string must come
   from MD4_Content_Texts.md exactly as written
2. Never use a color not defined in MD3 — always use exact hex values
3. Never install a library not listed in MD5 without asking first
4. Never use class components — functional components with hooks only
5. Every component must have explicit TypeScript prop types
6. Use `'use client'` only when strictly required:
   event handlers, browser APIs, useState / useEffect / useRef
7. Use `cn()` from `src/lib/utils.ts` for all conditional Tailwind classes
8. Always use Prisma singleton from `src/lib/prisma.ts` — never
   instantiate PrismaClient directly in any file
9. Validate all API route inputs with Zod before touching the database
10. Never make architectural decisions not covered in the MDs
    without asking first
11. Banned users must be rejected inside the NextAuth authorize()
    callback — not just in the UI
12. The registration API route must call requireAuth() at the top
    and return 401 for unauthenticated requests

---

## File Structure

Follow the exact structure defined in MD5 §7. Key rules:
- Components in `src/components/` organized by feature
- API routes in `src/app/api/`
- Database schema in `prisma/schema.prisma`
- Shared types in `src/types/`
- Utilities in `src/lib/`
- Never create files outside this structure without asking

---

## Authentication Rules

- Captain auth → Credentials provider with DB lookup + bcryptjs
- Admin auth → Credentials provider checking ADMIN_EMAIL
  and ADMIN_PASSWORD env vars
- Both use JWT session strategy
- Session must include: user id, name, email, role, status
- Admin routes protected by admin role check in layout
- Captain routes protected by requireAuth() helper
- Admin panel (`/admin/*`) is completely separate from
  captain auth (`/login`, `/register`, `/dashboard`)

---

## Database Rules

- Always use the Prisma singleton from `src/lib/prisma.ts`
- Use `DATABASE_URL` for all app queries (pooled connection)
- Use `DIRECT_URL` only for migrations (`prisma migrate dev`)
- Never run raw SQL — always use Prisma query methods
- Validate all inputs with Zod before any Prisma operation

---

## UI Rules

- All colors from MD3 §2 — exact hex values only
- All fonts from MD3 §3 — Barlow Condensed, Inter, JetBrains Mono
- All button styles from MD3 §6 — Primary, Secondary, Ghost, Danger,
  Icon Button
- All status badges from MD3 §9 — exact colors and styles
- All card styles from MD3 §8
- All input styles from MD3 §7
- All text from MD4 — never invent or modify any string
- Icons: Lucide React, outlined style, 20px default
- Logo: "GAME" in #FFFFFF, "404" in #00FF87, Barlow Condensed 800

---

## Build Process Rules

- Work in small numbered steps — one feature at a time
- Confirm each step works before moving to the next
- If a task fails twice in a row — stop and report, do not retry
- Git commit after each verified working step with a clear message
- Never modify files outside the current task scope
- Never jump ahead to the next step without confirmation

---

## If Anything Is Unclear

If any requirement is not covered in the MDs or these rules —
**stop and ask before proceeding.**
Do not assume, guess, or invent solutions.
Bring the question to the planning chat for resolution.

---
