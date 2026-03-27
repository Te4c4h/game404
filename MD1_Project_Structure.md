# MD1_Project_Structure.md
**Project:** Game404 — Armenian Cybersport Tournament Platform
**Version:** 1.0
**Last Updated:** March 2026

---

## Overview

Game404 is structured into three main areas:
- **Public Site** — accessible to all visitors
- **Auth Area** — login and registration for team captains
- **Admin Panel** — private area for platform management

---

## 1. Public Pages

### 1.1 Home Page (`/`)

**Sections:**
- **Navbar** — Logo (Game404 text), nav links (Home, Tournaments, Games,
  About), Login button, Register button
- **Hero Section** — Full-width dark banner with neon headline,
  subheadline, two CTAs: "Browse Tournaments" and "Register Your Team"
- **Active Tournaments Strip** — Horizontal scrollable row of tournament
  cards: game icon, tournament name, prize pool, registration deadline,
  status badge (Open / Closed / Ongoing)
- **Featured Games Section** — Grid of supported game cards (CS2, Mobile
  Legends, Rocket League + any added games): game logo, game name,
  "View Tournaments" button per card
- **How It Works Section** — 3-step process:
  1. Register Account → 2. Join Tournament → 3. Compete & Win
  Icon + title + short description per step
- **Recent Results Section** — List of recently completed tournaments:
  tournament name, winning team, game, date
- **Footer** — Logo, nav links, social media icons, copyright text

---

### 1.2 Tournaments Page (`/tournaments`)

**Sections:**
- **Navbar** — same as Home
- **Page Header** — Title "Tournaments", subtitle
- **Filter Bar** — Filter by: Game (dropdown), Status (All / Open /
  Ongoing / Completed), Sort by (Newest / Prize Pool / Deadline)
- **Tournament Cards Grid** — Each card: game banner/icon, tournament
  name, status badge, prize pool, entry fee, team slots (e.g. 8/16),
  registration deadline, "View Details" button
- **Pagination** — visible if more than 12 tournaments
- **Footer** — same as Home

---

### 1.3 Tournament Detail Page (`/tournaments/[id]`)

**Sections:**
- **Navbar** — same as Home
- **Tournament Header** — game banner background, tournament name, game
  name, status badge, prize pool (neon highlight), entry fee, start date
- **Info Cards Row** — Format (Single Elimination), Total Slots,
  Registered Teams, Prize Distribution
- **Tabs Section:**
  - **Overview tab** — tournament description, rules, schedule,
    payment instructions
  - **Teams tab** — list of approved registered teams with team name
    and captain
  - **Bracket tab** — visual Single Elimination bracket with matches,
    scores, and progression (visible once tournament starts)
- **Registration CTA Block** — visible when status is Open:
  "Register Your Team" button (redirects to login if not authenticated)
- **Footer** — same as Home

---

### 1.4 Games Page (`/games`)

**Sections:**
- **Navbar** — same as Home
- **Page Header** — Title "Games", subtitle
- **Games Grid** — Cards per game: game image, game name, active
  tournament count, "View Tournaments" button
- **Footer** — same as Home

---

### 1.5 About Page (`/about`)

**Sections:**
- **Navbar** — same as Home
- **Hero Block** — platform name, short mission statement
- **About Text Block** — 2–3 paragraphs about Game404 and the Armenian
  esports scene
- **Contact Block** — email address, social media links
- **Footer** — same as Home

---

## 2. Auth Pages

### 2.1 Login Page (`/login`)

**Sections:**
- **Centered Card** — Game404 logo/name, Email input, Password input,
  "Login" button, "Don't have an account? Register" link,
  forgot password link (non-functional for MVP)

---

### 2.2 Register Page (`/register`)

**Sections:**
- **Centered Card** — Game404 logo/name, Full Name input, Email input,
  Password input, Confirm Password input, "Create Account" button,
  "Already have an account? Login" link
- Note: this creates a **team captain account**

---

### 2.3 Captain Dashboard (`/dashboard`)

**Sections:**
- **Navbar** — same as public navbar + username display + Logout button
- **Page Header** — "My Dashboard", welcome message with captain name
- **My Registrations Table** — columns: Tournament Name, Game, Entry Fee,
  Payment Status (Pending / Approved / Rejected), Tournament Status,
  Action ("View Tournament")
- **Empty State** — message + "Browse Tournaments" button if no
  registrations yet

---

### 2.4 Tournament Registration Form (`/tournaments/[id]/register`)

**Sections:**
- **Navbar** — same as dashboard
- **Form Card:**
  - Tournament name (readonly display)
  - Team Name input
  - Player 1–5 name inputs (count configurable per game in admin)
  - In-game nickname inputs per player
  - Payment proof upload (image)
  - Payment instructions reminder block
  - "Submit Registration" button
  - "Cancel" link back to tournament page
- **Success State** — confirmation message, pending approval notice

---

## 3. Admin Panel

> All admin routes protected under `/admin`. Accessible to admin only.

### 3.1 Admin Login (`/admin/login`)

**Sections:**
- **Centered Card** — "Admin Panel" title, Email input, Password input,
  "Login" button

---

### 3.2 Admin Dashboard (`/admin`)

**Sections:**
- **Sidebar Navigation** — Game404 logo, links: Dashboard, Games,
  Tournaments, Registrations, Bracket Manager, Users
- **Stats Cards Row** — Total Tournaments, Active Tournaments,
  Pending Registrations, Total Registered Teams
- **Pending Registrations Alert Block** — quick list of teams awaiting
  payment approval with "Review" buttons
- **Recent Activity Feed** — latest registrations, approvals, and
  tournament status changes

---

### 3.3 Games Management (`/admin/games`)

**Sections:**
- **Page Header** — "Games" title, "Add New Game" button
- **Games Table** — columns: Game Image, Name, Active Tournaments,
  Status (Active/Inactive), Edit button, Delete button
- **Add/Edit Game Modal** — Game Name input, Game Image upload,
  Max Players per Team input, Status toggle, Save button

---

### 3.4 Tournaments Management (`/admin/tournaments`)

**Sections:**
- **Page Header** — "Tournaments" title, "Create Tournament" button
- **Filter Bar** — filter by Game, Status
- **Tournaments Table** — columns: Name, Game, Status, Prize Pool,
  Entry Fee, Registered Teams / Max Teams, Start Date,
  Edit button, Manage button, Delete button

---

### 3.5 Create / Edit Tournament
**Routes:** `/admin/tournaments/create` and `/admin/tournaments/[id]/edit`

**Form Fields:**
- Tournament Name input
- Game selector (dropdown of active games)
- Description / Rules textarea
- Max Teams selector (8, 16, 32)
- Entry Fee input (AMD amount)
- Prize Pool input + Prize Distribution textarea
  (e.g. 1st: 70%, 2nd: 30%)
- Registration Deadline date picker
- Tournament Start Date date picker
- Payment Instructions textarea (bank transfer details shown to teams)
- Status selector (Draft / Open / Ongoing / Completed)
- Save button, Cancel button

---

### 3.6 Registrations Management (`/admin/registrations`)

**Sections:**
- **Filter Bar** — filter by Tournament, Status
  (Pending / Approved / Rejected)
- **Registrations Table** — columns: Team Name, Tournament,
  Captain Name, Submitted Date, Payment Proof (view link),
  Status badge, Approve button, Reject button

---

### 3.7 Bracket Manager (`/admin/tournaments/[id]/bracket`)

**Sections:**
- **Tournament Header** — name, game, status
- **Generate Bracket Button** — visible once registration is closed and
  teams are approved. Randomly seeds teams into bracket
- **Bracket View** — visual Single Elimination bracket. Each match:
  Team A vs Team B, score input per team, "Set Winner" button
- **Lock Match Button** — confirms result and advances winner to
  next round
- **Tournament Complete Button** — marks tournament as completed after
  final match

---

### 3.8 Users Management (`/admin/users`)

**Sections:**
- **Users Table** — columns: Name, Email, Registered Date,
  Number of Registrations, Status (Active/Banned),
  Ban/Unban button

---

## 4. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile < 768px | Hamburger navbar, single-column cards, horizontal bracket scroll, admin sidebar collapses to icon bar |
| Tablet 768px–1024px | Two-column tournament grid, admin tables scroll horizontally |
| Desktop > 1024px | Full layout as described above |

---
