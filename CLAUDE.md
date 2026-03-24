# CLAUDE.md

This file describes the structure, design system and rules for working with the landing page of the "Dobrolikar" medical center. Read it before making any changes to the files.

## Frontend Aesthetics

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. For common texts use the existing font Evolventa. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:

- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

## Project Overview

Static landing page for "Добролікар" medical clinic (Lviv, Ukraine). Single-page vanilla HTML/CSS/JS site with no build process or dependencies. Features responsive design with mobile hamburger menu and optional Google Sheets content management.

## Development

**Preview the site:**

- Open `index.html` directly in a browser, or
- Use a local server: `python -m http.server 8000` or `npx serve`

**No build process required** - changes to HTML/CSS/JS are immediately reflected on refresh.

## Architecture

### Content Management System

The site supports two content management approaches:

1. **Direct HTML editing** (current default)
   - Content hardcoded in `index.html` with semantic IDs
   - Immediate changes, no API dependencies

2. **Google Sheets integration** (optional)
   - Managed via `js/loadContent.js` (currently commented out in HTML line 420)
   - Non-technical users can update content via spreadsheet
   - 1-hour localStorage caching to minimize API calls
   - Setup instructions in `GOOGLE_SHEETS_SETUP.md`

**Content ID Mapping:**
All editable content elements in HTML have IDs that correspond to `field_id` values in the Google Sheets table (e.g., `id="hero-title"` → `hero_title` in sheet). When Google Sheets integration is active, `loadContent.js` fetches data and updates DOM elements by ID.

### File Structure

```
index.html          # Single-page layout with semantic HTML
styles.css          # Responsive CSS with custom Evolventa font
js/loadContent.js   # Google Sheets API integration (optional)
images/             # Clinic photos, team portraits, service images
fonts/              # Custom Evolventa font family (regular, bold, italic variants)
```

### Key Sections

- **Hero** (`#hero`) - Full-width banner with background image, eyebrow text, main title, description, CTA buttons, and stats cards
- **Services** (`#services`) - Responsive grid with service cards (Optyka, Ophthalmology, Hearing aids, Audiology, ENT, Allergology)
- **Team** (`#team`) - Banner with doctors' gallery; includes team-banner section and team-grid for individual doctor cards
- **Testimonials** (`#testimonials`) - Patient reviews with star ratings and images
- **FAQ** (`#faq`) - Sticky FAQ section on the left with expandable questions
- **Contact** (`#contact`) - Address, phone, hours, embedded map, booking link
- **Footer** - Navigation links and service list

### Responsive Breakpoints

- Desktop: 1400px max-width containers
- Tablet: 968px (sidebar nav, adjusted grids)
- Mobile: 640px (single column layouts, stacked bento grid)

### Navigation

- **Desktop**: Fixed horizontal navbar with logo, nav links (Послуги, Лікарі, Відгуки, FAQ, Контакти), booking button
- **Mobile**: Hidden by default; hamburger button (`#hamburger`) toggles `.mobile-menu` slide-out overlay on the right side
- **Features**:
  - Smooth scroll to anchor sections (hash links with `#`)
  - Nav background transitions on scroll: transparent → semi-transparent glassmorphic
  - Scroll offset handled by CSS (check section padding/margins)
  - Toggle functions: `toggleMenu()` and `closeMenu()` (inline in HTML)

## Google Sheets Integration

**Current Status:** Not enabled. Content is hardcoded in HTML.

**To enable (if needed in future):**

1. Follow `GOOGLE_SHEETS_SETUP.md` to create spreadsheet and get API credentials
2. Add `SHEET_ID` and `API_KEY` to `js/loadContent.js` (lines 2-3)
3. Add `<script src="js/loadContent.js"></script>` before closing `</body>` tag in `index.html`
4. Ensure HTML elements have matching IDs (e.g., `id="hero-title"` for spreadsheet `field_id="hero_title"`)

**Cache management:**
If enabled, cached content is stored in `localStorage` with key `dobrolikar_content`. To force fresh fetch, clear localStorage or wait 1 hour.

## Images

All images are in `/images/` directory:

- Team portraits: `chief-portrait.JPG`, `ophtalmologist-portrait.JPG`, etc.
- Service photos: `optika-2.jpg`, `ophtalmologist-1.JPG`, `hearing-aids-2.jpg`, etc.
- Clinic interiors: `interior-clinic-2.JPG`, `personal.JPG`, `personal_1.JPG`
- Hero background: `blur-hospital.jpg`

**Note:** Use `.JPG` extension for photos (uppercase) as per existing convention.

## Styling

- **CSS Variables** (`:root`):
  - Colors: `--teal` (#0a9e9e), `--teal-light` (#12d4c8), `--teal-glow` (#5de8e0), `--dark` (#0f2340), `--dark-mid` (#1a3a5c), `--muted` (#4a6a8a), `--light` (#e8eef4), `--white` (#ffffff)
  - Glass effects: `--glass-white` (rgba 0.55), `--glass-border` (rgba 0.7)
  - Shadows: `--shadow` (0 8px 40px), `--shadow-lg` (0 20px 60px)
- **Font family**: Custom "Evolventa" (Regular, Bold, Italic) with fallbacks to "Outfit" and system sans-serif
- **Color scheme**: Teal (#0a9e9e) accent with dark navy backgrounds (#0f2340), light background (#e8eef4)
- **Background**: Mesh gradient effect with fixed positioned `.bg-mesh` and noise overlay `.bg-noise`
- **Effects**: Glassmorphism (backdrop-filter blur), animated reveals on scroll (IntersectionObserver), smooth scroll behavior

## JavaScript

All JavaScript is inline in `index.html` at the bottom (no external JS files except optional `loadContent.js`):

- **Mobile menu toggle**: `toggleMenu()` and `closeMenu()` functions control `.mobile-menu` visibility
- **Scroll reveal animations**: IntersectionObserver watches elements with classes `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` and adds `.visible` class when they enter viewport (threshold: 0.06)
- **Navigation scroll effect**: On scroll, nav background transitions: `scrollY > 60` → semi-transparent, else transparent
- **Initialization**: Reveal effects run on DOMContentLoaded and window load to handle initial viewport visibility and image loading

## Git Workflow

Current branch: `redesign-v3`
Static site - no build process, immediate preview on file changes.
