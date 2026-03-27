# MD4_Content_Texts.md
**Project:** Game404 — Armenian Cybersport Tournament Platform
**Version:** 1.0
**Last Updated:** March 2026

---

## 1. Tone of Writing

- **Style:** Bold, direct, energetic, competitive
- **Voice:** Confident and motivating — speaks to serious gamers
- **Rules:**
  - Never use placeholder or dummy text anywhere
  - Keep headings short and punchy
  - CTAs must be action-driven (start with a verb)
  - Avoid corporate or overly formal language

---

## 2. Navbar

| Element | Text |
|---|---|
| Logo | `GAME404` |
| Nav Link 1 | `Tournaments` |
| Nav Link 2 | `Games` |
| Nav Link 3 | `About` |
| Login Button | `Login` |
| Register Button | `Register` |
| Logged-in label | `Hey, {name}` |
| Logout Button | `Logout` |
| Dashboard Link | `My Dashboard` |

---

## 3. Home Page (`/`)

### Hero Section
| Element | Text |
|---|---|
| Headline | `Armenia's #1 Esports Arena` |
| Subheadline | `Register your team, compete in tournaments, and claim your prize.` |
| CTA Button 1 | `Browse Tournaments` |
| CTA Button 2 | `Register Your Team` |

### Active Tournaments Strip
| Element | Text |
|---|---|
| Section Title | `Live & Open Tournaments` |
| Empty State | `No active tournaments right now. Check back soon.` |

### Featured Games Section
| Element | Text |
|---|---|
| Section Title | `Games We Play` |
| Section Subtitle | `Compete in your favorite titles on Game404` |
| Card CTA | `View Tournaments` |

### How It Works Section
| Element | Text |
|---|---|
| Section Title | `How It Works` |
| Step 1 Title | `Create Your Account` |
| Step 1 Description | `Sign up as a team captain and set up your profile in seconds.` |
| Step 2 Title | `Join a Tournament` |
| Step 2 Description | `Browse open tournaments, register your team, and complete your entry fee payment.` |
| Step 3 Title | `Compete & Win` |
| Step 3 Description | `Play your matches, track results on the live bracket, and take home the prize.` |

### Recent Results Section
| Element | Text |
|---|---|
| Section Title | `Recent Results` |
| Section Subtitle | `Latest completed tournaments on Game404` |
| Empty State | `No completed tournaments yet. Be the first to compete.` |
| View Bracket Link | `View Bracket` |

### Footer
| Element | Text |
|---|---|
| Tagline | `Where Armenian Esports Compete` |
| Nav Link 1 | `Tournaments` |
| Nav Link 2 | `Games` |
| Nav Link 3 | `About` |
| Nav Link 4 | `Admin` |
| Copyright | `© 2026 Game404. All rights reserved.` |

---

## 4. Tournaments Page (`/tournaments`)

| Element | Text |
|---|---|
| Page Title | `Tournaments` |
| Page Subtitle | `Find your next competition and register your team` |
| Filter — Game | `Game` |
| Filter — Status | `Status` |
| Filter — All Games | `All Games` |
| Filter — All Statuses | `All Statuses` |
| Filter — Open | `Open` |
| Filter — Ongoing | `Ongoing` |
| Filter — Completed | `Completed` |
| Sort Label | `Sort by` |
| Sort — Newest | `Newest` |
| Sort — Prize | `Prize Pool` |
| Sort — Deadline | `Deadline` |
| Card CTA | `View Details` |
| Empty State Title | `No tournaments found` |
| Empty State Description | `Try adjusting your filters or check back later for new tournaments.` |

---

## 5. Tournament Detail Page (`/tournaments/[id]`)

### Tournament Header
| Element | Text |
|---|---|
| Prize Pool Label | `Prize Pool` |
| Entry Fee Label | `Entry Fee` |
| Start Date Label | `Starts` |
| Status Label | `Status` |

### Info Cards Row
| Element | Text |
|---|---|
| Format Label | `Format` |
| Format Value | `Single Elimination` |
| Total Slots Label | `Total Slots` |
| Registered Teams Label | `Registered Teams` |
| Prize Distribution Label | `Prize Distribution` |

### Tabs
| Element | Text |
|---|---|
| Tab 1 | `Overview` |
| Tab 2 | `Teams` |
| Tab 3 | `Bracket` |

### Overview Tab
| Element | Text |
|---|---|
| Rules Subtitle | `Tournament Rules` |
| Schedule Subtitle | `Schedule` |
| Payment Subtitle | `How to Pay Entry Fee` |

### Teams Tab
| Element | Text |
|---|---|
| Column 1 | `Team Name` |
| Column 2 | `Captain` |
| Empty State | `No teams registered yet. Be the first to join.` |

### Bracket Tab
| Element | Text |
|---|---|
| Not Started State | `The bracket will be published once the tournament begins. Stay tuned.` |

### Registration CTA Block
| Element | Text |
|---|---|
| CTA Heading | `Ready to Compete?` |
| CTA Description | `Register your team before the deadline and secure your spot.` |
| CTA Button | `Register Your Team` |
| Closed State | `Registration for this tournament is closed.` |
| Full State | `This tournament has reached maximum capacity.` |

---

## 6. Games Page (`/games`)

| Element | Text |
|---|---|
| Page Title | `Games` |
| Page Subtitle | `Choose your game and find your next tournament` |
| Card CTA | `View Tournaments` |
| Active Tournaments Label | `Active Tournaments` |
| Empty State | `No games available yet. Check back soon.` |

---

## 7. About Page (`/about`)

| Element | Text |
|---|---|
| Hero Title | `About Game404` |
| Hero Subtitle | `Built for Armenian Esports` |
| Paragraph 1 | `Game404 is Armenia's dedicated esports tournament platform — built to give local players, teams, and organizers a professional home to compete, connect, and grow.` |
| Paragraph 2 | `We run tournaments across the most popular competitive titles including CS2, Mobile Legends, and Rocket League. Every tournament on Game404 is organized, verified, and rewarded with real prize pools.` |
| Paragraph 3 | `Whether you're a seasoned competitor or just getting started, Game404 is where Armenian esports happens.` |
| Contact Title | `Get in Touch` |
| Contact Email Label | `Email` |
| Contact Email Value | `contact@game404.am` |
| Social Title | `Follow Us` |

---

## 8. Auth Pages

### Login Page (`/login`)
| Element | Text |
|---|---|
| Page Title | `Welcome Back` |
| Page Subtitle | `Login to your Game404 account` |
| Email Label | `Email Address` |
| Email Placeholder | `Enter your email` |
| Password Label | `Password` |
| Password Placeholder | `Enter your password` |
| Submit Button | `Login` |
| Register Link | `Don't have an account? Register` |
| Forgot Password Link | `Forgot password?` |
| Error — Wrong Credentials | `Invalid email or password. Please try again.` |

### Register Page (`/register`)
| Element | Text |
|---|---|
| Page Title | `Join Game404` |
| Page Subtitle | `Create your captain account and start competing` |
| Full Name Label | `Full Name` |
| Full Name Placeholder | `Enter your full name` |
| Email Label | `Email Address` |
| Email Placeholder | `Enter your email` |
| Password Label | `Password` |
| Password Placeholder | `Create a password` |
| Confirm Password Label | `Confirm Password` |
| Confirm Password Placeholder | `Repeat your password` |
| Submit Button | `Create Account` |
| Login Link | `Already have an account? Login` |
| Error — Email Taken | `This email is already registered.` |
| Error — Password Mismatch | `Passwords do not match.` |

---

## 9. Captain Dashboard (`/dashboard`)

| Element | Text |
|---|---|
| Page Title | `My Dashboard` |
| Welcome Message | `Hey, {name}. Here are your tournament registrations.` |
| Table — Tournament | `Tournament` |
| Table — Game | `Game` |
| Table — Entry Fee | `Entry Fee` |
| Table — Payment | `Payment Status` |
| Table — Status | `Tournament Status` |
| Table — Action | `Action` |
| Action Button | `View Tournament` |
| Empty State Title | `No registrations yet` |
| Empty State Description | `You haven't joined any tournaments. Find one and register your team.` |
| Empty State CTA | `Browse Tournaments` |

---

## 10. Tournament Registration Form (`/tournaments/[id]/register`)

| Element | Text |
|---|---|
| Page Title | `Register Your Team` |
| Form Subtitle | `Complete the form below and submit your payment proof to secure your spot.` |
| Tournament Label | `Tournament` |
| Team Name Label | `Team Name` |
| Team Name Placeholder | `Enter your team name` |
| Player Name Label | `Player {n} — Full Name` |
| Player Name Placeholder | `Enter full name` |
| Nickname Label | `Player {n} — In-Game Nickname` |
| Nickname Placeholder | `Enter in-game nickname` |
| Payment Proof Label | `Payment Proof` |
| Payment Proof Description | `Upload a screenshot or photo of your payment confirmation.` |
| Payment Instructions Title | `Payment Instructions` |
| Submit Button | `Submit Registration` |
| Cancel Link | `Cancel` |
| Success Title | `Registration Submitted!` |
| Success Description | `Your team registration is pending payment verification. We will review your payment and approve your registration within 24 hours.` |
| Error — Already Registered | `Your team is already registered for this tournament.` |
| Error — Tournament Full | `This tournament has reached maximum team capacity.` |
| Error — Upload Failed | `File upload failed. Please try again.` |

---

## 11. Admin Panel

### Admin Login (`/admin/login`)
| Element | Text |
|---|---|
| Page Title | `Admin Panel` |
| Page Subtitle | `Game404 Administration` |
| Email Label | `Email` |
| Password Label | `Password` |
| Submit Button | `Login` |
| Error | `Invalid credentials.` |

### Admin Dashboard (`/admin`)
| Element | Text |
|---|---|
| Page Title | `Dashboard` |
| Stat Card 1 | `Total Tournaments` |
| Stat Card 2 | `Active Tournaments` |
| Stat Card 3 | `Pending Registrations` |
| Stat Card 4 | `Total Registered Teams` |
| Pending Block Title | `Pending Approvals` |
| Pending Empty | `No pending registrations.` |
| Review Button | `Review` |
| Activity Title | `Recent Activity` |

### Sidebar Navigation
| Element | Text |
|---|---|
| Link 1 | `Dashboard` |
| Link 2 | `Games` |
| Link 3 | `Tournaments` |
| Link 4 | `Registrations` |
| Link 5 | `Bracket Manager` |
| Link 6 | `Users` |
| Logout | `Logout` |

### Games Management (`/admin/games`)
| Element | Text |
|---|---|
| Page Title | `Games` |
| Add Button | `Add New Game` |
| Table — Name | `Game Name` |
| Table — Tournaments | `Active Tournaments` |
| Table — Status | `Status` |
| Table — Actions | `Actions` |
| Modal Title Add | `Add New Game` |
| Modal Title Edit | `Edit Game` |
| Game Name Label | `Game Name` |
| Game Name Placeholder | `e.g. CS2, Valorant` |
| Image Label | `Game Image` |
| Max Players Label | `Max Players per Team` |
| Status Label | `Status` |
| Save Button | `Save Game` |
| Cancel Button | `Cancel` |
| Delete Confirm | `Are you sure you want to delete this game?` |
| Delete Blocked | `Cannot delete a game with active tournaments.` |

### Tournaments Management (`/admin/tournaments`)
| Element | Text |
|---|---|
| Page Title | `Tournaments` |
| Create Button | `Create Tournament` |
| Table — Name | `Tournament Name` |
| Table — Game | `Game` |
| Table — Status | `Status` |
| Table — Prize | `Prize Pool` |
| Table — Fee | `Entry Fee` |
| Table — Teams | `Teams` |
| Table — Date | `Start Date` |
| Table — Actions | `Actions` |
| Edit Button | `Edit` |
| Manage Button | `Manage` |
| Delete Confirm | `Are you sure you want to delete this tournament?` |

### Create / Edit Tournament
| Element | Text |
|---|---|
| Page Title Create | `Create Tournament` |
| Page Title Edit | `Edit Tournament` |
| Name Label | `Tournament Name` |
| Name Placeholder | `Enter tournament name` |
| Game Label | `Game` |
| Game Placeholder | `Select a game` |
| Description Label | `Description & Rules` |
| Description Placeholder | `Enter tournament description and rules...` |
| Max Teams Label | `Max Teams` |
| Entry Fee Label | `Entry Fee (AMD)` |
| Entry Fee Placeholder | `e.g. 5000` |
| Prize Pool Label | `Total Prize Pool (AMD)` |
| Prize Distribution Label | `Prize Distribution` |
| Prize Distribution Placeholder | `e.g. 1st place: 70%, 2nd place: 30%` |
| Deadline Label | `Registration Deadline` |
| Start Date Label | `Tournament Start Date` |
| Payment Instructions Label | `Payment Instructions` |
| Payment Instructions Placeholder | `Enter bank transfer details and instructions for teams...` |
| Status Label | `Status` |
| Save Button | `Save Tournament` |
| Cancel Button | `Cancel` |

### Registrations Management (`/admin/registrations`)
| Element | Text |
|---|---|
| Page Title | `Registrations` |
| Filter — Tournament | `Filter by Tournament` |
| Filter — Status | `Filter by Status` |
| Table — Team | `Team Name` |
| Table — Tournament | `Tournament` |
| Table — Captain | `Captain` |
| Table — Date | `Submitted` |
| Table — Proof | `Payment Proof` |
| Table — Status | `Status` |
| Table — Actions | `Actions` |
| View Proof Button | `View Proof` |
| Approve Button | `Approve` |
| Reject Button | `Reject` |
| Confirm Approve | `Approve this team registration?` |
| Confirm Reject | `Reject this team registration?` |

### Bracket Manager (`/admin/tournaments/[id]/bracket`)
| Element | Text |
|---|---|
| Page Title | `Bracket Manager` |
| Generate Button | `Generate Bracket` |
| Generate Confirm | `Generate the bracket? This will randomly seed all approved teams and cannot be undone.` |
| Set Winner Button | `Set Winner` |
| Lock Match Button | `Lock Match` |
| Complete Button | `Mark Tournament as Complete` |
| Complete Confirm | `Mark this tournament as completed? This action cannot be undone.` |

### Users Management (`/admin/users`)
| Element | Text |
|---|---|
| Page Title | `Users` |
| Table — Name | `Full Name` |
| Table — Email | `Email` |
| Table — Joined | `Joined` |
| Table — Registrations | `Registrations` |
| Table — Status | `Status` |
| Table — Actions | `Actions` |
| Ban Button | `Ban` |
| Unban Button | `Unban` |
| Ban Confirm | `Ban this user? They will no longer be able to log in.` |
| Unban Confirm | `Restore access for this user?` |

---

## 12. Global UI Texts

| Element | Text |
|---|---|
| Loading State | `Loading...` |
| Save Success | `Changes saved successfully.` |
| Delete Success | `Deleted successfully.` |
| Generic Error | `Something went wrong. Please try again.` |
| 404 Title | `Page Not Found` |
| 404 Description | `The page you're looking for doesn't exist.` |
| 404 CTA | `Back to Home` |
| Unauthorized Title | `Access Denied` |
| Unauthorized Description | `You don't have permission to view this page.` |

---
