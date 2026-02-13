# Frontend Development Guidelines

**Purpose:** Comprehensive instruction guide for frontend development including code standards, mobile-first design principles, quality assurance processes, and best practices for HTML/CSS/JavaScript, with considerations for future Node.js, React, and Next.js projects.

**Audience:** Development agent (GitHub Copilot) and frontend development teams.

**Status:** Active - Use this for all frontend projects.

---

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [HTML Standards](#html-standards)
3. [CSS Practices](#css-practices)
4. [JavaScript Standards](#javascript-standards)
5. [Mobile-First Design](#mobile-first-design)
6. [Accessibility (a11y)](#accessibility-a11y)
7. [Performance Guidelines](#performance-guidelines)
8. [Node.js & Tooling](#nodejs--tooling)
9. [Quality Check Checklist](#quality-check-checklist)
10. [Future Frameworks (React/Next.js)](#future-frameworks-reactnextjs)

---

## Quick Reference

### Core Principles (Read First)

- **Semantic HTML first** – Use proper tags (`<section>`, `<header>`, `<nav>`, `<article>`, etc.) before divs
- **Mobile-first CSS** – Write for small screens, progressively add complexity with media queries
- **Accessibility by default** – Alt text, semantic markup, keyboard navigation from the start
- **DRY code** – Reuse through CSS variables, functions, components; avoid repetition
- **Progressive enhancement** – Core features work without JavaScript; enhancements layer on top
- **Comments for complexity** – Explain _why_, not _what_; assume reader knows the language
- **No magic numbers** – Use named variables/CSS custom properties for all values
- **Test on device** – Browser dev tools ≠ real testing; verify on actual mobile devices
- **Lighthouse ≥ 80** – Performance, Accessibility, Best Practices, SEO (use Chrome DevTools)

### Quick Fixes Checklist

- [ ] Semantic HTML? Check structure with [W3C Validator](https://validator.w3.org/)
- [ ] Mobile responsive? Test at 640px, 768px, 1024px+ (see [breakpoints](#responsive-breakpoints))
- [ ] Lighthouse score ≥ 80? Run in Chrome DevTools Lighthouse tab
- [ ] WCAG level AA accessible? Check with [axe DevTools](https://www.deque.com/axe/devtools/)
- [ ] Images optimized? < 200KB per image, use WebP with fallback
- [ ] No console errors? Check browser console for errors/warnings
- [ ] Links, buttons, forms work without JS? Test with JavaScript disabled
- [ ] Git commit message clear? Follow [commit guidelines](#git--version-control)

---

## HTML Standards

### 1. Semantic Markup

**Rule:** Use semantic HTML5 tags to convey meaning, not presentation.

**Good:**

```html
<header>
  <nav>
    <a href="#home">Home</a>
    <a href="#services">Services</a>
  </nav>
</header>

<main>
  <section id="hero">
    <h1>Welcome</h1>
    <p>Main call-to-action...</p>
  </section>

  <section id="services">
    <h2>Our Services</h2>
    <article class="service-card">
      <h3>Service Name</h3>
      <p>Description</p>
    </article>
  </section>
</main>

<footer>
  <p>&copy; 2026. All rights reserved.</p>
</footer>
```

**Bad:**

```html
<div id="header">
  <div id="nav">
    <div class="link"><a href="#home">Home</a></div>
  </div>
</div>

<div id="content">
  <div class="section">...</div>
</div>
```

**Semantic Tags to Use:**

- `<header>` – Page or section header
- `<nav>` – Navigation links
- `<main>` – Primary content (one per page)
- `<section>` – Thematic grouping
- `<article>` – Self-contained content (cards, blog posts)
- `<aside>` – Tangential content (sidebar, related links)
- `<footer>` – Page or section footer
- `<h1>–<h6>` – Proper heading hierarchy
- `<button>` – Clickable actions (not `<div class="button">`)
- `<form>`, `<input>`, `<label>` – Form controls

### 2. Attributes Best Practices

**Language & Meta:**

```html
<html lang="en">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Brief page description for SEO" />
</html>
```

**Accessibility Attributes:**

```html
<!-- Link with descriptive text (good for semantic meaning) -->
<a href="/services">Learn more about our services</a>

<!-- Button with aria-label if icon-only -->
<button aria-label="Open mobile menu">☰</button>

<!-- Form labels explicitly linked -->
<label for="email">Email Address</label>
<input id="email" type="email" name="email" required />

<!-- Images with alt text (never leave blank) -->
<img src="team-photo.jpg" alt="Team members in office" />

<!-- Form field grouping with aria-required -->
<fieldset>
  <legend>Contact preferences</legend>
  <label><input type="checkbox" name="email" required /> Receive emails</label>
</fieldset>
```

### 3. Attribute Ordering

Order attributes for readability:

```html
<input
  type="email"
  id="email"
  name="email"
  class="form-input"
  placeholder="your@email.com"
  required
  aria-label="Email address"
/>
```

Order: type/id/name → class → data-\* → event handlers → ARIA

---

## CSS Practices

### 1. CSS Custom Properties (Variables)

**Rule:** Use CSS custom properties for all repeated values (colors, spacing, shadows, transitions).

**Good:**

```css
:root {
  /* Colors */
  --primary-color: #1a5f7a;
  --secondary-color: #2ecc71;
  --accent-color: #e74c3c;
  --text-dark: #2c3e50;
  --text-light: #95a5a6;
  --bg-light: #ecf0f1;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 10px 40px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.15);

  /* Transitions */
  --transition-fast: 0.15s ease-in-out;
  --transition-normal: 0.3s ease-in-out;
  --transition-slow: 0.5s ease-in-out;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

/* Usage */
.button {
  color: var(--primary-color);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.button:hover {
  box-shadow: var(--shadow-lg);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --text-dark: #ecf0f1;
    --text-light: #95a5a6;
    --bg-light: #2c3e50;
  }
}
```

**Benefits:**

- Single source of truth for design tokens
- Easy theme changes (colors, spacing)
- Reduced maintenance
- Scoped variables possible (`--component-color`)

### 2. BEM Naming Convention

**Rule:** Use BEM (Block, Element, Modifier) for class naming to avoid naming conflicts and clarify relationships.

**Pattern:** `.block__element--modifier`

**Good:**

```css
/* Block: main component */
.card {
  background: white;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

/* Element: part of block */
.card__title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

.card__body {
  font-size: 1rem;
  line-height: 1.6;
}

/* Modifier: variation of block or element */
.card--featured {
  border-left: 4px solid var(--secondary-color);
  background: var(--bg-light);
}

.card__title--small {
  font-size: 1.2rem;
}
```

**HTML Usage:**

```html
<div class="card card--featured">
  <h3 class="card__title card__title--small">Service</h3>
  <p class="card__body">Description here.</p>
</div>
```

**Alternative (when BEM feels heavy):** Simple component + modifier

```css
.button {
  padding: var(--spacing-md) var(--spacing-lg);
}

.button.primary {
  background: var(--primary-color);
  color: white;
}

.button.secondary {
  background: var(--bg-light);
  color: var(--primary-color);
}
```

### 3. Mobile-First CSS

**Rule:** Write base styles for mobile (smallest screen), add complexity with media queries.

**Anti-Pattern (Desktop-First):**

```css
/* DON'T DO THIS */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

**Good (Mobile-First):**

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 4. Responsive Breakpoints

**Rule:** Use consistent breakpoints across all projects.

**Standard Breakpoints (Current Project):**

```css
/* Mobile-first: no breakpoint needed for base styles */

/* Tablet and up */
@media (min-width: 640px) {
  /* Adjustments for tablets */
}

/* Larger tablets/small desktops */
@media (min-width: 768px) {
  /* Adjustments for larger screens */
}

/* Desktop and up */
@media (min-width: 1024px) {
  /* Desktop-specific adjustments */
}

/* Large desktop (optional) */
@media (min-width: 1280px) {
  /* Large screen enhancements */
}
```

**Also Consider:**

```css
/* High DPI screens (Retina, etc.) */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* Use higher-res images, thicker strokes */
}

/* Reduced motion (accessibility) */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  :root {
    --text-dark: #ecf0f1;
    /* ... other dark mode vars */
  }
}
```

### 5. Common Patterns

**Flexbox for Linear Layouts:**

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
}

.navbar__links {
  display: flex;
  gap: var(--spacing-lg);
  list-style: none;
}

@media (max-width: 640px) {
  .navbar__links {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}
```

**CSS Grid for Complex Layouts:**

```css
.page-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
  gap: 0;
}

@media (min-width: 1024px) {
  .page-layout {
    grid-template-columns: 250px 1fr;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
  }
}

.page-layout > header {
  grid-area: header;
}
.page-layout > nav {
  grid-area: sidebar;
}
.page-layout > main {
  grid-area: main;
}
.page-layout > footer {
  grid-area: footer;
}
```

**Aspect Ratio (Modern):**

```css
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: var(--radius-md);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## JavaScript Standards

### 1. File Organization

**Rule:** Organize JS into logical modules with clear responsibilities.

**Good Structure:**

```
js/
├── modules/
│   ├── navigation.js      # Mobile menu, nav interactions
│   ├── api.js             # API calls, data fetching
│   └── utils.js           # Helper functions
├── components/
│   ├── hero.js            # Hero section logic
│   └── form.js            # Form validation, submission
└── app.js                 # Main entry point, initialization
```

**Bad Structure:**

```
js/
├── app.js                 # 2000 lines of everything
└── helpers.js             # Unclear organization
```

### 2. Async/Await Pattern

**Rule:** Use async/await for promises; avoid callback hell.

**Good:**

```javascript
// Fetch with error handling
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    // User-friendly error message
    showNotification("Failed to load data. Please try again.", "error");
    return null;
  }
}

// Usage
async function initPage() {
  const content = await fetchData("/api/content");
  if (content) {
    renderContent(content);
  }
}

initPage();
```

**Bad:**

```javascript
// Callback hell / no error handling
fetch("/api/content")
  .then((resp) => resp.json())
  .then((data) => {
    // No error handling
    renderContent(data);
  });
```

### 3. DOM Manipulation Best Practices

**Rule:** Cache DOM queries, minimize reflows, use event delegation.

**Good:**

```javascript
// Cache DOM reference
const mobileMenuBtn = document.getElementById("mobile-menu-toggle");
const menu = document.getElementById("mobile-menu");

// Event delegation for dynamic elements
document.addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) {
    const itemId = e.target.closest(".item").dataset.id;
    deleteItem(itemId);
  }
});

// Batch DOM updates (use DocumentFragment)
const fragment = document.createDocumentFragment();
items.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item.name;
  fragment.appendChild(li);
});
document.getElementById("list").appendChild(fragment);

// Remove inline styles after animation
element.addEventListener(
  "transitionend",
  () => {
    element.style.transition = "";
  },
  { once: true },
);
```

**Bad:**

```javascript
// Requerying DOM repeatedly
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  const menu = document.getElementById("menu"); // Query every time
  menu.style.display = "none";
});

// Direct style manipulation for complex changes
document.getElementById("item").style.border = "1px solid red";
document.getElementById("item").style.padding = "10px";
document.getElementById("item").style.margin = "5px";
// Use classes or CSS variables instead!
```

### 4. Comments & Documentation

**Rule:** Comment _why_, not _what_. Code should be self-documenting.

**Good:**

```javascript
// Cache data for 1 hour (3600000ms) to reduce API calls
const CACHE_DURATION = 3600000;
const cacheKey = "user_settings";

function getSettings() {
  const cached = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(`${cacheKey}:time`);

  // Check if cache exists and is still valid
  if (cached && cachedTime && Date.now() - cachedTime < CACHE_DURATION) {
    return JSON.parse(cached);
  }

  return null;
}

// Purpose: Close menu when clicking outside (prevents accidental stays open)
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    closeMenu();
  }
});
```

**Bad:**

```javascript
// Get settings
function getSettings() {
  const c = localStorage.getItem("s");
  return c ? JSON.parse(c) : null; // What is 's'? How long does it cache?
}

// Handle click
document.addEventListener("click", (e) => {
  menu.style.display = "none"; // Why? What's the context?
});
```

### 5. No Magic Numbers / Named Constants

**Rule:** Extract magic numbers into named constants.

**Good:**

```javascript
const MOBILE_MENU_BREAKPOINT = 640; // CSS breakpoint in JS too
const DEBOUNCE_DELAY = 300; // For scroll/resize events
const MAX_RETRIES = 3;
const ANIMATION_DURATION = 300; // ms, matches CSS transition

const isSmallScreen = window.innerWidth < MOBILE_MENU_BREAKPOINT;
```

**Bad:**

```javascript
if (window.innerWidth < 640) {
  /* ... */
}
setTimeout(() => {
  /* ... */
}, 300);
if (retryCount > 3) {
  /* ... */
}
```

### 6. Error Handling

**Rule:** Always handle errors; never silently fail.

**Good:**

```javascript
async function loadContent(contentId) {
  try {
    const response = await fetch(`/api/content/${contentId}`);

    if (!response.ok) {
      throw new Error(`Failed to load: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Log for debugging
    console.error("Load error:", error);

    // Notify user
    showErrorModal("Could not load content. Please refresh and try again.");

    // Optional: send error to monitoring service
    reportError(error);

    return null;
  }
}
```

---

## Mobile-First Design

### 1. Design Approach

**Rule:** Always design and code for mobile first, then progressively add complexity.

**Benefits:**

- Forces focus on essential content
- Naturally responsive (mobile is smallest, easiest baseline)
- Desktop experience is enhancement, not fallback
- Better performance (less media query overrides)

### 2. Touch-Friendly Interactions

**Rule:** Buttons/links must be 44px+ (Apple) or 48px+ (Google) for touch targets.

**Good:**

```css
.button {
  min-height: 48px;
  min-width: 48px;
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 1rem;
  cursor: pointer;
  border-radius: var(--radius-md);
}

/* Adequate spacing for touch */
.link {
  padding: var(--spacing-sm);
  margin: var(--spacing-sm);
}
```

**Bad:**

```css
.button {
  padding: 4px 8px;
  font-size: 12px;
  /* Too small for reliable touch */
}
```

### 3. Responsive Images

**Rule:** Serve appropriately-sized images for device; use WebP with fallback.

**Good:**

```html
<picture>
  <source
    srcset="img-small.webp 640w, img-medium.webp 1024w, img-large.webp 1920w"
    type="image/webp"
  />
  <source
    srcset="img-small.jpg 640w, img-medium.jpg 1024w, img-large.jpg 1920w"
    type="image/jpeg"
  />
  <img src="img-large.jpg" alt="Descriptive text" loading="lazy" />
</picture>
```

**Acceptable (simpler):**

```html
<img
  src="image.jpg"
  srcset="image-small.jpg 640w, image-large.jpg 1920w"
  sizes="(max-width: 768px) 100vw, 80vw"
  alt="Description"
  loading="lazy"
/>
```

### 4. Viewport & Meta Tags

**Rule:** Always include viewport meta tag and appropriate device settings.

**Good:**

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>
<meta name="theme-color" content="#1a5f7a" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
/>
<meta name="apple-mobile-web-app-title" content="App Name" />
```

**Note:** Avoid `user-scalable=no` – breaks accessibility for zoom.

### 5. Testing on Real Devices

**Rule:** Always test on actual devices, not just browser DevTools.

**Checklist:**

- [ ] iPhone (iOS Safari)
- [ ] Android phone (Chrome)
- [ ] Tablet (iPad/Android tab)
- [ ] Test slow network (Chrome DevTools → Network tab → Slow 4G)
- [ ] Test with touch interactions (not just mouse hover)
- [ ] Test orientation changes (portrait ↔ landscape)
- [ ] Test with real data (long text, many items)

---

## Accessibility (a11y)

### 1. Semantic HTML

**Rule:** Proper HTML structure is the foundation of accessibility.

**Always Use:**

- `<h1>–<h6>` in hierarchy (not skipped)
- `<button>` for actions (not `<div role="button">`)
- `<a>` for navigation (not `<span>`)
- `<label>` linked to `<input>` (for="id")
- `<fieldset>` + `<legend>` for grouped form fields

**Example:**

```html
<!-- Good -->
<form>
  <fieldset>
    <legend>Shipping Address</legend>
    <label for="address">Street Address</label>
    <input id="address" name="address" type="text" required />

    <label for="zip">Zip Code</label>
    <input id="zip" name="zip" type="text" required />
  </fieldset>
</form>

<!-- Bad -->
<form>
  <div class="group">
    <span>Shipping Address</span>
    <span>Street Address</span>
    <input name="address" type="text" />
  </div>
</form>
```

### 2. Alt Text for Images

**Rule:** Every image needs descriptive alt text (or empty `alt=""` if decorative).

**Good:**

```html
<!-- Descriptive -->
<img
  src="team-photo.jpg"
  alt="Product team members working together in office"
/>

<!-- Decorative icon (empty alt) -->
<img src="bullet-point.svg" alt="" />

<!-- Linked image: describe the link, not the image -->
<a href="/products"><img src="product.jpg" alt="Browse our products" /></a>

<!-- Not: <a href...><img alt="Product image"></a> -->
```

**Bad:**

```html
<!-- No alt text -->
<img src="photo.jpg" />

<!-- Redundant, unhelpful -->
<img src="photo.jpg" alt="Image" />

<!-- Over-described -->
<img
  src="team.jpg"
  alt="Photo taken on 2026-02-13 showing John, Sarah, and Mike in the office kitchen at 10:30 AM"
/>
```

### 3. Keyboard Navigation

**Rule:** All interactive elements must be accessible via keyboard.

**Good:**

```html
<!-- Links, buttons, form inputs are naturally keyboard-accessible -->
<nav>
  <a href="#home">Home</a>
  <a href="#services">Services</a>
</nav>

<!-- For custom interactive elements, add tabindex="0" -->
<div class="custom-button" role="button" tabindex="0">Custom Action</div>

<script>
  const btn = document.querySelector(".custom-button");
  btn.addEventListener("keydown", (e) => {
    // Respond to Enter or Space
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      performAction();
    }
  });
  btn.addEventListener("click", performAction);
</script>
```

**Bad:**

```html
<!-- Not keyboard accessible -->
<div onclick="doSomething()">Click me</div>

<!-- tabindex > 0 breaks tab order (avoid) -->
<button tabindex="5">Button</button>
```

### 4. Color Contrast

**Rule:** Text must have sufficient contrast ratio (WCAG AA minimum).

**Contrast Requirements (WCAG AA):**

- **4.5:1** for normal text (< 18px)
- **3:1** for large text (18px+ or 14px+ bold)
- **3:1** for graphics/UI components

**Check:** Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Good:**

```css
/* Black text on white: 21:1 contrast ✓ */
.text-dark {
  color: #000;
  background: #fff;
}

/* Dark blue on light gray ✓ */
.text-primary {
  color: #1a5f7a;
  background: #ecf0f1;
}

/* Dark gray on white (check with tool, likely ~8:1) ✓ */
.text-secondary {
  color: #2c3e50;
  background: #fff;
}
```

**Bad:**

```css
/* Light gray on white: 1.1:1 ✗ (BAD) */
.text-muted {
  color: #ddd;
  background: #fff;
}

/* Blue text on light blue (very low contrast) ✗ */
.text-link {
  color: #0084d1;
  background: #b3d9ff;
}
```

### 5. ARIA Attributes (When Needed)

**Rule:** Use semantic HTML first; ARIA is for when HTML isn't sufficient.

**Common ARIA:**

```html
<!-- aria-label: text label for icon-only elements -->
<button aria-label="Close menu">×</button>

<!-- aria-expanded: state of collapsible element -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<div id="menu" hidden>
  <!-- ... -->
</div>

<!-- aria-live: notify screen reader of dynamic updates -->
<div aria-live="polite">
  <!-- Content updated dynamically -->
</div>

<!-- aria-required: required form fields -->
<input type="email" aria-required="true" required />

<!-- role: only when semantic HTML won't work -->
<div role="alert">This is an important alert</div>

<!-- aria-describedby: additional description -->
<input type="password" aria-describedby="pwd-hint" />
<span id="pwd-hint">Must be 8+ characters</span>
```

**Common Mistakes:**

```html
<!-- DON'T: aria-label on divs pretending to be buttons -->
<div aria-label="Submit" onclick="submit()">Send</div>

<!-- DO: use real buttons -->
<button>Send</button>

<!-- DON'T: aria-hidden="true" on visible content -->
<div aria-hidden="true">Important content</div>

<!-- DON'T: empty alt text on meaningful images -->
<img src="logo.png" alt="" />
```

---

## Performance Guidelines

### 1. Lighthouse Audit

**Rule:** Run Lighthouse in Chrome DevTools; maintain ≥ 80 score in all categories.

**How to Run:**

1. Open Chrome DevTools (F12)
2. Click "Lighthouse" tab
3. Select "Desktop" or "Mobile"
4. Click "Generate report"
5. Fix issues in this order: Performance → Accessibility → Best Practices → SEO

**Key Metrics:**

- **Largest Contentful Paint (LCP):** ≤ 2.5s (visual load time)
- **First Input Delay (FID):** ≤ 100ms (responsiveness)
- **Cumulative Layout Shift (CLS):** ≤ 0.1 (stability)

### 2. Image Optimization

**Rule:** All images < 200KB; use modern formats (WebP).

**Guidelines:**

```
PNG/JPG images:
- Desktop: max 1920px width
- Tablet: max 1024px width
- Mobile: max 640px width

Optimization tools:
- TinyPNG.com (PNG/JPG)
- Squoosh.app (WebP conversion)
- ImageOptim (Mac)
- FileZilla batch optimization (Windows)

File size targets:
- Hero image: < 200KB (WebP < 100KB)
- Card images: < 100KB (WebP < 50KB)
- Icons: < 10KB (SVG preferred)
- Favicons: < 20KB
```

**Good:**

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" decoding="async" />
</picture>
```

### 3. CSS & JavaScript Size

**Rule:** Keep CSS < 100KB; keep JS < 200KB (both gzipped).

**Tips:**

- Remove unused CSS (check with CSS Coverage in DevTools)
- Lazy-load JavaScript (e.g., non-critical features)
- Use CSS instead of JS when possible
- Minify before production (build tool)

### 4. Caching & Storage

**Rule:** Use `localStorage`/`sessionStorage` for frequently-accessed data; set expiration.

**Pattern (from current project):**

```javascript
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

function saveToCache(key, value, duration = CACHE_DURATION) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(`${key}:time`, Date.now().toString());
  } catch (e) {
    console.warn("Failed to cache:", e);
  }
}

function getFromCache(key, duration = CACHE_DURATION) {
  const cached = localStorage.getItem(key);
  const cachedTime = localStorage.getItem(`${key}:time`);

  if (!cached || !cachedTime) return null;

  if (Date.now() - parseInt(cachedTime) > duration) {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}:time`);
    return null;
  }

  return JSON.parse(cached);
}

// Usage
if (!getFromCache("content")) {
  fetchContent().then((data) => {
    saveToCache("content", data);
  });
}
```

### 5. Reduce Layout Thrashing

**Rule:** Batch DOM reads and writes to avoid reflows.

**Bad (causes multiple reflows):**

```javascript
el1.style.width = element.offsetWidth + 10 + "px"; // Read, Write, Reflow
el2.style.width = element.offsetWidth + 20 + "px"; // Read, Write, Reflow
el3.style.width = element.offsetWidth + 30 + "px"; // Read, Write, Reflow
```

**Good (batches operations):**

```javascript
const baseWidth = element.offsetWidth; // Read once
el1.style.width = baseWidth + 10 + "px";
el2.style.width = baseWidth + 20 + "px";
el3.style.width = baseWidth + 30 + "px";
// One reflow
```

---

## Node.js & Tooling

### 1. Project Setup with npm/Node.js

**Initialize Project:**

```bash
npm init -y
# Creates package.json with defaults
```

**Recommended `package.json` Template:**

```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "Project description",
  "private": true,
  "scripts": {
    "dev": "live-server . --port=3000",
    "build": "echo 'Add build script for your framework'",
    "start": "npm run dev",
    "format": "prettier --write .",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  },
  "keywords": ["frontend", "responsive"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {}
}
```

**Useful npm Packages:**

- `live-server` – Dev server with live reload
- `prettier` – Code formatter
- `eslint` – Linter for JavaScript
- `vite` – Modern build tool (for future projects)

### 2. Common npm Scripts

**Development Workflow:**

```json
{
  "scripts": {
    "dev": "live-server",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint .",
    "test": "jest",
    "build": "webpack",
    "serve": "http-server dist/"
  }
}
```

**Run Scripts:**

```bash
npm run dev          # Start development
npm run format       # Auto-format code
npm run lint         # Check for issues
npm run build        # Production build
npm test             # Run tests
```

### 3. .gitignore Template

**Always include (for any project):**

```
# Dependencies
node_modules/
bower_components/

# Build output
dist/
build/
*.min.js
*.min.css

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/settings.json
.idea/
*.swp
*.sublime-workspace

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*

# Cache
.cache/
.eslintcache

# Testing
coverage/
.nyc_output/
```

### 4. Basic ESLint Configuration

**Install:**

```bash
npm install --save-dev eslint prettier
npx eslint --init
```

**.eslintrc.json Template:**

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": ["warn", { "args": "none" }],
    "no-console": "off",
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "indent": ["error", 2]
  }
}
```

### 5. Prettier Configuration

**.prettierrc.json Template:**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always"
}
```

---

## Quality Check Checklist

**Use this before every commit or deploy.** Estimated time: 10 minutes.

### Code Quality

- [ ] **No console errors/warnings** – Check DevTools Console
- [ ] **ESLint passes** – Run `npm run lint` (if configured)
- [ ] **Code formatted** – Run `npm run format` (if configured)
- [ ] **No dead code** – Remove unused imports, functions, CSS
- [ ] **Comments explain why, not what** – Code is self-documenting
- [ ] **No magic numbers** – All values are named constants/variables
- [ ] **Consistent naming** – Variables, functions, classes follow convention
- [ ] **DRY principle** – No copy-paste code; use functions/components
- [ ] **Error handling** – All API calls have try/catch; users see errors
- [ ] **Comments for complexity** – Non-obvious logic has brief explanation

### HTML & Accessibility

- [ ] **Valid HTML** – Check with [W3C Validator](https://validator.w3.org/)
- [ ] **Semantic markup** – Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, etc.
- [ ] **Headings hierarchy** – No skipped levels (h1 → h2 → h3, not h1 → h3)
- [ ] **All images have alt text** – Even if empty (`alt=""`) for decorative images
- [ ] **Form labels linked** – `<label for="id">` matched to `<input id="id">`
- [ ] **Buttons are `<button>` tags** – Not `<div>` or `<a>` misused
- [ ] **Links have descriptive text** – Not "click here" or "read more"
- [ ] **Color contrast checked** – WCAG AA (4.5:1 minimum)
- [ ] **Keyboard navigation works** – Tab through all interactive elements
- [ ] **Focus indicators visible** – Outline or highlight on focused elements

### Responsiveness & Mobile

- [ ] **Viewport meta tag present** – `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] **Mobile layout tested** – 640px, 768px, 1024px breakpoints
- [ ] **No horizontal scroll** – Content fits without overflow on mobile
- [ ] **Touch targets ≥ 48px** – Buttons/links are touchable, not too small
- [ ] **Readable text on mobile** – Font size ≥ 16px base
- [ ] **Images responsive** – Use `srcset`, `<picture>`, or CSS `%` widths
- [ ] **Test on real device** – Not just DevTools simulator
- [ ] **Orientation changes work** – Portrait ↔ Landscape transitions smoothly
- [ ] **Mobile navigation works** – Menus, modals, drawers respond to touch

### Performance

- [ ] **Lighthouse score ≥ 80** – Run on both Desktop and Mobile
- [ ] **Images optimized** – < 200KB per image; use WebP with fallback
- [ ] **CSS < 100KB** (gzipped) – Check unused CSS
- [ ] **JS < 200KB** (gzipped) – Lazy-load non-critical features
- [ ] **LCP < 2.5s** – Largest content visible within 2.5 seconds
- [ ] **No layout shifts** – CLS < 0.1 (no sudden reflows)
- [ ] **Caching configured** – API responses, images cached appropriately
- [ ] **Fonts optimized** – Use system fonts or preload web fonts
- [ ] **Network tab clean** – No failed requests (404, 500 errors)
- [ ] **Slow 4G tested** – Site usable on slow networks

### Browser & Device Compatibility

- [ ] **Chrome (latest)** – Primary browser
- [ ] **Firefox (latest)** – Secondary browser
- [ ] **Safari (Latest 2 versions)** – Important for macOS/iOS
- [ ] **Edge (latest)** – Windows browser
- [ ] **iPhone iOS Safari** – Test on real device
- [ ] **Android Chrome** – Test on real device
- [ ] **No console errors** – All browsers, all devices
- [ ] **Print stylesheet** – If applicable, test print preview

### Security

- [ ] **HTTPS enforced** – For production sites
- [ ] **No hardcoded secrets** – API keys in `.env`, not code
- [ ] **Form inputs validated** – Both client-side and server-side
- [ ] **CSRF protection** – If submitting forms
- [ ] **Content Security Policy (CSP)** – For high-security sites
- [ ] **Dependencies up-to-date** – Run `npm audit`
- [ ] **No inline scripts** – External files or data attributes

### Deployment

- [ ] **All assets minified** – CSS, JS in production build
- [ ] **Source maps excluded** – Don't ship `.map` files to production
- [ ] **Environment variables correct** – Prod URLs, API keys
- [ ] **Git commit message clear** – Descriptive, follows format
- [ ] **No uncommitted changes** – `git status` clean
- [ ] **Branch up-to-date** – `git pull` latest

---

## Future Frameworks (React/Next.js)

### 1. React Best Practices

**Component Structure:**

```jsx
// Good: Functional component with hooks
import React, { useState, useEffect } from "react";

export function ServiceCard({ title, description }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Setup logic
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <article className="service-card">
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__body">{description}</p>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Less" : "More"}
      </button>
    </article>
  );
}
```

**Key Rules:**

- One component per file (or related components)
- Props over state when possible
- Use hooks (useState, useEffect, useContext) instead of classes
- Memoize expensive components with `React.memo`
- Lazy-load components: `React.lazy()` + `<Suspense>`

### 2. Next.js Best Practices

**File Structure:**

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── components/         # Reusable components
├── lib/                # Utilities, helpers
├── public/             # Static assets
└── api/                # API routes

```

**Key Rules:**

- Use App Router (next 13+) over Pages Router
- Server Components by default; Client Components when needed
- API Routes for backend logic instead of external server
- Image Optimization with `next/image`
- Dynamic imports for code splitting

### 3. TypeScript in React/Next.js

**Component Props Typing:**

```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: (id: string) => void;
}

export function ServiceCard({ title, description, icon, onClick }: ServiceCardProps) {
  return (
    <article className="service-card">
      {icon && <div>{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
```

### 4. Tailwind CSS (if used)

**Prefer Composition Over Utilities:**

```tsx
// Good: Component classes (reusable)
export function Button({ variant = "primary", children }) {
  const classMap = {
    primary: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
    secondary:
      "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300",
  };
  return <button className={classMap[variant]}>{children}</button>;
}

// Still good, but less reusable:
<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
  Click
</button>;
```

---

## Git & Version Control

### 1. Commit Message Format

**Rule:** Clear, concise commit messages for easy history reading.

**Format:**

```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

**Types:**

- `feat:` – New feature
- `fix:` – Bug fix
- `docs:` – Documentation
- `style:` – Code style (formatting, semicolons, etc.)
- `refactor:` – Code restructuring (no functional change)
- `test:` – Adding or updating tests
- `chore:` – Maintenance (deps, build, etc.)

**Examples:**

```
feat: add mobile menu hamburger icon

fix: resolve layout shift on image load

docs: update accessibility guidelines

refactor: extract button component from nav
```

**Bad:**

```
update stuff
fixed bugs
changes
did work
```

### 2. Branch Naming

**Pattern:** `<type>/<short-description>`

**Examples:**

```
feature/hero-section-redesign
fix/mobile-menu-breakpoint
docs/update-guidelines
```

### 3. Pull Request / Code Review

**Checklist Before Merging:**

- [ ] All checks pass (lint, tests, build)
- [ ] Code follows guidelines (this document)
- [ ] At least one review approval
- [ ] No merge conflicts
- [ ] Branch is up-to-date with main
- [ ] Descriptive PR title and description

---

## Common Pitfalls & How to Avoid

| Problem                     | Cause                                    | Solution                                         |
| --------------------------- | ---------------------------------------- | ------------------------------------------------ |
| Horizontal scroll on mobile | Fixed width containers, no viewport meta | Use `max-width: 100%`, include viewport meta tag |
| Buttons look but don't work | Using `<div>` instead of `<button>`      | Always use `<button>` for actions                |
| Images oversized            | No optimization or responsive images     | Use WebP, optimize with TinyPNG, use srcset      |
| Accessibility fails         | Missing alt text, no semantic HTML       | Every image needs alt text; use proper tags      |
| Lighthouse ≤ 60             | Large JS/CSS, unoptimized images         | Minify, lazy-load, optimize images               |
| Touch targets too small     | Padding ignored                          | Use min 48px height/width for buttons            |
| Layout shifts               | No fixed dimensions for images           | Use `aspect-ratio` or CSS `height`               |
| Color contrast fails        | Design uses light text on light bg       | Check with WCAG tool; 4.5:1+ ratio               |
| Keyboard navigation broken  | Only `<div>` for interactivity           | Use `<button>`, `<a>`, `<input>`, etc.           |
| Performance slow on 4G      | Large assets, no caching                 | Optimize images, cache, use CDN, minify          |

---

## Resources & References

### Official Standards

- [W3C HTML Specification](https://html.spec.whatwg.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Can I Use (Browser Support)](https://caniuse.com/)

### Tools

- [Chrome DevTools Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility Checker](https://wave.webaim.org/)
- [axe DevTools (a11y)](https://www.deque.com/axe/devtools/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Squoosh Image Optimizer](https://squoosh.app/)
- [TinyPNG/JPG Compressor](https://tinypng.com/)

### Learning

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
- [BEM Methodology](http://getbem.com/)
- [OOCSS Principles](http://oocss.org/)

### Frameworks (When Ready)

- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Document Metadata

- **Version:** 1.0.0
- **Last Updated:** 2026-02-13
- **Applicable To:** All frontend projects (vanilla, React, Next.js, Vue, etc.)
- **Audience:** Development team, AI agents, future team members
- **Review Frequency:** Quarterly or after major framework update

**Next Review:** 2026-05-13

---

## Changelog

### Version 1.0.0 (2026-02-13)

- Initial comprehensive guidelines document
- Covers vanilla HTML/CSS/JS, mobile-first, a11y, performance
- Includes quality checklist and future framework notes
- Added Node.js tooling section and git standards

---

**END OF FRONTEND GUIDELINES**

_Last generated: 2026-02-13_
