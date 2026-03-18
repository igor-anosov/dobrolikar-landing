# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- **Hero** - Full-width banner with booking CTA (external link to bookon.ua)
- **Services** - 6-column responsive grid (Optyka, Ophthalmology, Hearing aids, Audiology, ENT, Allergology)
- **About** - Bento grid layout (added recently, check git history for implementation pattern)
- **Team** - 4 doctors with circular portrait images
- **Testimonials** - 3 patient reviews with star ratings
- **Contact** - Address, phone, hours, booking link
- **Footer** - Quick navigation and service list

### Responsive Breakpoints

- Desktop: 1400px max-width containers
- Tablet: 968px (sidebar nav, adjusted grids)
- Mobile: 640px (single column layouts, stacked bento grid)

### Navigation

- Desktop: Horizontal nav with smooth scroll anchors
- Mobile: Right-side slide-out menu with overlay (hamburger button)
- Smooth scroll to sections with 80px offset for fixed header

## Google Sheets Integration

**To enable:**

1. Follow `GOOGLE_SHEETS_SETUP.md` to create spreadsheet and get API credentials
2. Add `SHEET_ID` and `API_KEY` to `js/loadContent.js` (lines 2-3)
3. Uncomment `<script src="js/loadContent.js"></script>` in `index.html` (line 420)

**To disable:**
Keep the script tag commented out (current state). Content will use hardcoded HTML values.

**Cache management:**
Cached content is stored in `localStorage` with key `dobrolikar_content`. To force fresh fetch, clear localStorage or wait 1 hour.

## Images

All images are in `/images/` directory:

- Team portraits: `chief-portrait.JPG`, `ophtalmologist-portrait.JPG`, etc.
- Service photos: `optika-2.jpg`, `ophtalmologist-1.JPG`, `hearing-aids-2.jpg`, etc.
- Clinic interiors: `interior-clinic-2.JPG`, `personal.JPG`, `personal_1.JPG`
- Hero background: `blur-hospital.jpg`

**Note:** Use `.JPG` extension for photos (uppercase) as per existing convention.

## Styling

- CSS uses CSS custom properties (variables) for colors: `--primary-color`, `--secondary-color`, `--text-dark`, etc.
- Font family: Custom "Evolventa" with fallback to system fonts
- Gradients use primary (blue #1a5f7a) → secondary (green #2ecc71) color scheme
- Box shadows defined in variables: `--shadow`, `--shadow-hover`

## Git Workflow

Current branch: `main`
Recent work includes bento grid layout implementation and Google Sheets integration setup.
