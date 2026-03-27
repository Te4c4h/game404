# MD2_Users_Flow.md
**Project:** Game404 — Armenian Cybersport Tournament Platform
**Version:** 1.0
**Last Updated:** March 2026

---

## Overview

Game404 has three user roles:

| Role | Access | Description |
|---|---|---|
| Guest | Public pages only | Any visitor, not logged in |
| Team Captain | Public pages + Dashboard + Registration | Registered account holder |
| Admin | Admin panel only | Platform owner/operator |

---

## 1. Guest User Flows

### 1.1 Browsing Tournaments
1. Arrives at Home Page (`/`)
2. Views Active Tournaments Strip or clicks "Browse Tournaments" CTA
3. Lands on Tournaments Page (`/tournaments`)
4. Applies filters (Game, Status, Sort) — page updates without reload
5. Clicks "View Details" on a tournament card
6. Lands on Tournament Detail Page (`/tournaments/[id]`)
7. Browses Overview, Teams, and Bracket tabs freely
8. Clicks "Register Your Team" CTA
9. → Redirected to Login Page (`/login`) with redirect param saved

### 1.2 Browsing Games
1. Clicks "Games" in navbar
2. Lands on Games Page (`/games`)
3. Sees all active games with active tournament count
4. Clicks "View Tournaments" on a game card
5. → Redirected to Tournaments Page pre-filtered by that game

### 1.3 Viewing Results
1. On Home Page scrolls to Recent Results Section
2. Sees latest completed tournaments with winning team
3. Can click to view the full bracket on Tournament Detail Page

---

## 2. Team Captain Flows

### 2.1 Registration (New Account)
1. Clicks "Register" in navbar or "Register Your Team" CTA
2. Lands on Register Page (`/register`)
3. Fills in: Full Name, Email, Password, Confirm Password
4. Clicks "Create Account"
5. **Success** → Redirected to Captain Dashboard (`/dashboard`)
6. **Error (email taken)** → Inline error shown, stays on form
7. **Error (password mismatch)** → Inline error shown, stays on form

### 2.2 Login
1. Clicks "Login" in navbar
2. Lands on Login Page (`/login`)
3. Fills in: Email, Password
4. Clicks "Login"
5. **Success** → Redirected to Captain Dashboard or saved redirect URL
6. **Error (wrong credentials)** → Inline error shown, stays on form

### 2.3 Logout
1. Clicks username or "Logout" button in navbar
2. Session is cleared
3. → Redirected to Home Page (`/`)

### 2.4 Registering for a Tournament
1. Captain is logged in and on Tournament Detail Page (`/tournaments/[id]`)
2. Tournament status must be **Open** for CTA to be visible
3. Clicks "Register Your Team"
4. → Redirected to Registration Form (`/tournaments/[id]/register`)
5. Fills in:
   - Team Name
   - Player names (1 to max players for that game)
   - In-game nicknames per player
   - Uploads payment proof image
   - Reviews payment instructions block
6. Clicks "Submit Registration"
7. **Success** → Success state: "Registration submitted. Pending payment approval."
8. Registration appears in Captain Dashboard with status: **Pending**
9. **Error (already registered)** → "Your team is already registered for this tournament"
10. **Error (tournament full)** → "This tournament has reached max team capacity"
11. **Error (missing fields)** → Inline validation on each required field

### 2.5 Viewing Registration Status
1. Captain logs in and lands on Dashboard (`/dashboard`)
2. Sees "My Registrations" table with all submitted registrations
3. Each row shows: Tournament Name, Game, Entry Fee,
   Payment Status, Tournament Status
4. **Payment Status flow:** Pending → Approved or Rejected
5. If Rejected → Captain sees "Rejected" badge.
   No resubmission in MVP.
6. Clicks "View Tournament" to go back to tournament detail page
7. **Empty state:** No registrations → message + "Browse Tournaments" button

### 2.6 Viewing the Bracket
1. Captain navigates to Tournament Detail Page
2. Clicks "Bracket" tab
3. **Before tournament starts** → "Bracket will be available once
   the tournament begins"
4. **After bracket generated** → Full Single Elimination bracket
   visible, updating as admin enters results

---

## 3. Admin Flows

### 3.1 Admin Login
1. Navigates to `/admin/login`
2. Enters admin Email and Password
3. **Success** → Redirected to Admin Dashboard (`/admin`)
4. **Error** → Inline error: "Invalid credentials"
5. Note: Admin login is completely separate from captain login

### 3.2 Adding a New Game
1. Navigates to Games Management (`/admin/games`)
2. Clicks "Add New Game"
3. Add/Edit Game Modal opens
4. Fills in: Game Name, Game Image, Max Players per Team,
   Status (Active)
5. Clicks "Save"
6. Game appears in table and is immediately available
   in tournament creation dropdown

### 3.3 Creating a Tournament
1. Navigates to Tournaments Management (`/admin/tournaments`)
2. Clicks "Create Tournament"
3. Fills in all fields: Name, Game, Description/Rules, Max Teams,
   Entry Fee, Prize Pool, Prize Distribution, Registration Deadline,
   Start Date, Payment Instructions, Status: Draft
4. Clicks "Save" → saved as Draft, not visible to public
5. Admin edits tournament, changes Status to **Open**
6. Tournament is now live on public Tournaments Page

### 3.4 Reviewing Team Registrations
1. Navigates to Registrations Management (`/admin/registrations`)
2. Filters by Tournament and Status: Pending
3. Clicks "View Proof" to open uploaded payment image
4. Verifies payment manually
5. **Confirmed** → Clicks "Approve"
   - Status → Approved
   - Team appears in Teams tab on tournament detail page
   - Captain dashboard shows Approved
6. **Not confirmed** → Clicks "Reject"
   - Status → Rejected
   - Captain dashboard shows Rejected

### 3.5 Managing Tournament Lifecycle

Tournament moves through these statuses — all managed by admin:
Draft → Open → Ongoing → Completed


- **Draft** — created, not visible to public
- **Open** — visible, registration active
- **Ongoing** — registration closed, bracket active
- **Completed** — final result locked, winner displayed

Admin changes status manually from the Edit Tournament form.

### 3.6 Generating and Managing the Bracket
1. Admin confirms all approved teams, changes status to **Ongoing**
2. Navigates to Bracket Manager (`/admin/tournaments/[id]/bracket`)
3. Clicks "Generate Bracket"
   - System randomly seeds approved teams into Single Elimination bracket
   - Bracket becomes visible to public
4. For each match:
   - Admin enters scores for both teams
   - Clicks "Set Winner"
   - Clicks "Lock Match" → winner advances to next round
5. After Final is locked → "Tournament Complete" button appears
6. Admin clicks "Tournament Complete"
   - Status → Completed
   - Winner displayed on tournament page
   - Result appears in Home Page Recent Results

### 3.7 Managing Users
1. Navigates to Users Management (`/admin/users`)
2. Views all registered captains
3. Ban → user can no longer log in
4. Unban → access restored

---

## 4. Decision Points & Edge Cases

| Scenario | Behavior |
|---|---|
| Guest clicks "Register Your Team" | Redirected to `/login` with redirect back saved |
| Captain registers for a full tournament | Error: "Tournament has reached max team capacity" |
| Captain registers for same tournament twice | Error: "Your team is already registered" |
| Captain accesses `/dashboard` without login | Redirected to `/login` |
| Odd number of teams at bracket generation | Admin must ensure even team count — no auto-bye in MVP |
| Tournament deadline passes | Admin manually changes status from Open to Ongoing |
| No tournaments exist | Empty state: "No tournaments yet. Check back soon." |
| No registrations in dashboard | Empty state with "Browse Tournaments" CTA |
| Payment proof upload fails | Inline error: "Upload failed. Please try again." |
| Admin deletes game with active tournaments | Delete button disabled — not allowed |

---
