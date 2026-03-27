# MD3_Brand_Guidelines.md
**Project:** Game404 — Armenian Cybersport Tournament Platform
**Version:** 1.0
**Last Updated:** March 2026

---

## 1. Brand Identity

- **Platform Name:** Game404
- **Tagline:** "Where Armenian Esports Compete"
- **Tone & Mood:** Dark, aggressive, energetic, competitive
- **Personality:** Bold, direct, powerful — like a gaming arena at night
- **Target Audience:** Armenian esports players aged 16–30

---

## 2. Color Palette

### Primary Colors
| Name | Hex | Usage |
|---|---|---|
| Neon Green | `#00FF87` | Primary accent, CTAs, highlights, active badges |
| Deep Black | `#0A0A0A` | Main background |
| Dark Surface | `#111111` | Card backgrounds, sidebar |
| Elevated Surface | `#1A1A1A` | Modals, inputs, elevated cards |

### Secondary Colors
| Name | Hex | Usage |
|---|---|---|
| Neon Green Dim | `#00CC6A` | Hover states on primary CTA |
| Border Gray | `#2A2A2A` | Card borders, dividers, input borders |
| Muted Gray | `#3A3A3A` | Disabled states, inactive elements |

### Text Colors
| Name | Hex | Usage |
|---|---|---|
| White | `#FFFFFF` | Primary headings, important text |
| Light Gray | `#CCCCCC` | Body text, descriptions |
| Muted Text | `#888888` | Captions, placeholders, meta info |
| Neon Green | `#00FF87` | Accent text, links, labels |

### Status Colors
| Name | Hex | Usage |
|---|---|---|
| Success Green | `#00FF87` | Approved status, success messages |
| Warning Amber | `#FFB800` | Pending status, warnings |
| Danger Red | `#FF3B3B` | Rejected status, errors, delete actions |
| Info Blue | `#3B82F6` | Informational messages, ongoing badge |

---

## 3. Typography

### Font Families
| Role | Font | Fallback |
|---|---|---|
| Headings | `Barlow Condensed` | `Impact`, `sans-serif` |
| Body | `Inter` | `system-ui`, `sans-serif` |
| Monospace (scores, IDs) | `JetBrains Mono` | `monospace` |

> Load via Google Fonts:
> Barlow Condensed (weights 600, 700, 800)
> Inter (weights 400, 500, 600)
> JetBrains Mono (weight 400)

### Font Size & Weight Hierarchy
| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| H1 — Page Hero | Barlow Condensed | 56px / 3.5rem | 800 | `#FFFFFF` |
| H2 — Section Title | Barlow Condensed | 40px / 2.5rem | 700 | `#FFFFFF` |
| H3 — Card Title | Barlow Condensed | 24px / 1.5rem | 600 | `#FFFFFF` |
| H4 — Sub-section | Inter | 18px / 1.125rem | 600 | `#FFFFFF` |
| Body Large | Inter | 16px / 1rem | 400 | `#CCCCCC` |
| Body Small | Inter | 14px / 0.875rem | 400 | `#CCCCCC` |
| Caption / Meta | Inter | 12px / 0.75rem | 400 | `#888888` |
| Button Label | Inter | 14px / 0.875rem | 600 | depends on button type |
| Score / ID | JetBrains Mono | 14px / 0.875rem | 400 | `#00FF87` |

---

## 4. Spacing System

Base unit: `4px`

| Token | Value | Usage |
|---|---|---|
| xs | 4px | Icon gaps, tight padding |
| sm | 8px | Inner padding small elements |
| md | 16px | Standard component padding |
| lg | 24px | Card padding, section gaps |
| xl | 32px | Section padding |
| 2xl | 48px | Large section spacing |
| 3xl | 64px | Hero section padding |

---

## 5. Border Radius

| Element | Radius |
|---|---|
| Buttons | `8px` |
| Cards | `12px` |
| Modals | `16px` |
| Input fields | `8px` |
| Badges / Tags | `4px` |
| Game image thumbnails | `8px` |
| Avatar / icons | `50%` (full circle) |

---

## 6. Button Styles

### Primary Button
- Background: `#00FF87`
- Text: `#0A0A0A` (black)
- Font: Inter 600, 14px
- Padding: `12px 24px`
- Border Radius: `8px`
- Hover: background `#00CC6A`, scale `1.02`
- Active: scale `0.98`

### Secondary Button
- Background: transparent
- Border: `1.5px solid #00FF87`
- Text: `#00FF87`
- Font: Inter 600, 14px
- Padding: `12px 24px`
- Border Radius: `8px`
- Hover: background `#00FF8715`

### Ghost Button
- Background: transparent
- Border: `1.5px solid #2A2A2A`
- Text: `#CCCCCC`
- Font: Inter 500, 14px
- Padding: `12px 24px`
- Border Radius: `8px`
- Hover: border `#888888`, text `#FFFFFF`

### Danger Button
- Background: `#FF3B3B`
- Text: `#FFFFFF`
- Font: Inter 600, 14px
- Padding: `12px 24px`
- Border Radius: `8px`
- Hover: background `#CC2E2E`

### Icon Button (Admin actions)
- Background: `#1A1A1A`
- Border: `1.5px solid #2A2A2A`
- Icon color: `#CCCCCC`
- Size: `36px × 36px`
- Border Radius: `8px`
- Hover: border `#00FF87`, icon `#00FF87`

---

## 7. Input Field Styles

- Background: `#1A1A1A`
- Border: `1.5px solid #2A2A2A`
- Border Radius: `8px`
- Text color: `#FFFFFF`
- Placeholder color: `#888888`
- Padding: `12px 16px`
- Font: Inter 400, 14px
- Focus: border `#00FF87`, glow `0 0 0 2px #00FF8730`
- Error: border `#FF3B3B`, error message below in `#FF3B3B` 12px

---

## 8. Card Styles

- Background: `#111111`
- Border: `1.5px solid #2A2A2A`
- Border Radius: `12px`
- Padding: `24px`
- Hover (interactive): border `#00FF87`, lift `translateY(-2px)`
- Shadow: `0 4px 24px rgba(0,0,0,0.4)`

---

## 9. Status Badges

| Status | Background | Text | Border |
|---|---|---|---|
| Open | `#00FF8720` | `#00FF87` | `1px solid #00FF87` |
| Ongoing | `#3B82F620` | `#3B82F6` | `1px solid #3B82F6` |
| Completed | `#88888820` | `#888888` | `1px solid #888888` |
| Pending | `#FFB80020` | `#FFB800` | `1px solid #FFB800` |
| Approved | `#00FF8720` | `#00FF87` | `1px solid #00FF87` |
| Rejected | `#FF3B3B20` | `#FF3B3B` | `1px solid #FF3B3B` |

Badge style: `4px` border radius, `6px 10px` padding,
Inter 600 12px uppercase letters

---

## 10. Icon Style

- **Style:** Outlined (stroke-based), not filled
- **Library:** Lucide React
- **Default size:** `20px`
- **Default color:** `#CCCCCC`
- **Accent icons:** `#00FF87` when next to neon elements

---

## 11. Logo

- **Type:** Text-based for MVP
- **Text:** `GAME404`
- **Font:** Barlow Condensed 800
- **Rendering:** "GAME" in `#FFFFFF`, "404" in `#00FF87`
- **Navbar size:** 28px
- **Footer size:** 24px

---

## 12. Navbar Style

- Background: `#0A0A0A`
- Bottom border: `1px solid #2A2A2A`
- Height: `64px`
- Position: sticky on scroll
- Backdrop blur: `blur(12px)` with slight transparency on scroll

---

## 13. Hero Section Style

- Background: `#0A0A0A` with subtle dark radial gradient
- Neon glow accent: low opacity radial in background
- Full viewport width, min height `560px`
- Text left-aligned on desktop, centered on mobile

---

## 14. Gradient Usage

- Use gradients **sparingly** — hero backgrounds and major dividers only
- Approved gradient: `linear-gradient(135deg, #0A0A0A 0%, #111111 100%)`
- Neon accent glow: `radial-gradient(ellipse at top left, #00FF8710 0%, transparent 60%)`
- Never use bright multi-color gradients

---
