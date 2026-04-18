# Crosspoint Rottweilers — Website System

## Overview
This is the complete website package for Crosspoint Rottweilers. It is a premium, responsive, static website built with clean HTML, CSS, and JavaScript. No frameworks or build tools are required.

---

## File Structure

```
website/
├── index.html          ← Homepage
├── dogs.html           ← Our Dogs listing page
├── dog-profile.html    ← Individual dog profile (template)
├── litters.html        ← Upcoming Litters listing page
├── litter-detail.html  ← Individual litter detail (template)
├── about.html          ← The Program / About page
├── contact.html        ← Contact & Inquiry page
├── style.css           ← Complete design system stylesheet
├── script.js           ← Navigation, animations, form handling
├── README.md           ← This file
└── images/             ← Create this folder for your photos
    ├── hero-home.jpg
    ├── hero-dogs.jpg
    ├── hero-litters.jpg
    ├── hero-about.jpg
    ├── hero-contact.jpg
    ├── cta-background.jpg
    ├── about-philosophy.jpg
    ├── about-structure.jpg
    ├── about-care.jpg
    ├── og-image.jpg
    └── dogs/
        ├── hercules-main.jpg
        ├── mila-main.jpg
        └── (additional dog photos)
```

---

## How to Preview Locally

1. Create the `images/` folder inside the `website/` folder
2. Add your photos (see the Image Guide section below)
3. Open `index.html` in your web browser by double-clicking it

That's it — no server, no install, no terminal commands needed. The site works directly from the files.

For a better local preview (optional):
- In VS Code: install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server"
- This gives you auto-refresh when you make changes

---

## Where to Replace Images

All images are referenced with placeholder paths. Search for `images/` or `img-placeholder` in the HTML files to find every image location.

### Required Images

| Image | Used On | Recommended Size | Notes |
|-------|---------|-----------------|-------|
| `hero-home.jpg` | Homepage hero | 1920×1080 | Dark, cinematic Rottweiler. This is the first thing visitors see. |
| `hero-dogs.jpg` | Dogs page hero | 1920×800 | Dogs in a powerful/premium setting |
| `hero-litters.jpg` | Litters page hero | 1920×800 | Dam with puppies or pairing-related |
| `hero-about.jpg` | About page hero | 1920×800 | Program/kennel environment |
| `hero-contact.jpg` | Contact page hero | 1920×800 | Professional, clean setting |
| `cta-background.jpg` | CTA banner sections | 1920×800 | Dramatic, dark Rottweiler image |
| `about-philosophy.jpg` | About page | 800×1000 | Portrait-oriented, program-related |
| `about-structure.jpg` | About page | 800×1000 | Structurally excellent dog |
| `about-care.jpg` | About page | 800×1000 | Care/development setting |
| `og-image.jpg` | Social media sharing | 1200×630 | Brand image for link previews |

### Dog Photos

Place individual dog photos in `images/dogs/`. Name them clearly:
- `hercules-main.jpg` — primary portrait
- `hercules-2.jpg`, `hercules-3.jpg` — gallery images
- `mila-main.jpg` — primary portrait
- etc.

### Image Editing Tips
- Keep all images dark and cinematic — match the site's premium tone
- Slightly darken, increase contrast, warm the highlights
- Avoid bright or overexposed photos
- See the Brand Guide for detailed editing direction

---

## Where to Update Text Content

### Dog Information
- **Dogs page** (`dogs.html`): Find the dog card blocks. Each card has `<!-- REPLACE -->` comments showing what to update.
- **Dog profile** (`dog-profile.html`): This is a template. Duplicate this file for each dog (e.g., `hercules.html`, `mila.html`, `rumpi.html`). Update the name, stats, description, health clearances, pedigree info, and gallery.

### Litter Information
- **Litters page** (`litters.html`): Find the litter card blocks. Update sire × dam names, dates, and descriptions.
- **Litter detail** (`litter-detail.html`): This is a template. Duplicate for each litter. Update the pairing details, rationale, and timeline.

### Contact Information
Search for `info@crosspointrottweilers.com` across all files and replace with your actual email. This appears in:
- `contact.html` — contact info section
- Every page footer

### Social Media Links
Search for `href="#"` with `aria-label="Instagram"` or `aria-label="Facebook"` and replace `#` with your actual profile URLs.

---

## How to Add New Dogs

1. Open `dogs.html`
2. Find the section for Males or Females
3. Copy an existing dog card block (between `<!-- REPLACE -->` comments)
4. Paste it in the same section
5. Update the dog name, description, tag (Male/Female), and image
6. Duplicate `dog-profile.html` and save as `[dog-name].html`
7. Update all sections in the new profile file
8. Update the `href` on the dog card to point to the new profile file

---

## How to Add New Litters

1. Open `litters.html`
2. Copy an existing litter card block
3. Paste it in either the "Current Litters" or "Planned Litters" section
4. Update the sire × dam names, date, description, and image
5. Duplicate `litter-detail.html` and save as `[sire]-x-[dam].html`
6. Update all sections in the new detail file
7. Update the `href` on the litter card to point to the new detail file
8. Update the litter dropdown options in the contact form (`contact.html`)

---

## How to Update Colors or Fonts

All colors and fonts are controlled through CSS custom properties at the top of `style.css`.

Open `style.css` and find the `:root` section (first ~20 lines):

```css
:root {
  --cp-black: #0B0B0D;
  --cp-charcoal: #1C1C1F;
  --cp-gunmetal: #2E2E33;
  --cp-tan: #8B5A2B;
  --cp-copper: #A45A2A;
  --cp-gold: #C8A44D;     /* Main accent color */
  --cp-ivory: #EAE2D6;    /* Main text color */
  --font-heading: 'Cinzel', serif;
  --font-body: 'Montserrat', sans-serif;
}
```

Change any hex value to update that color across the entire site. The gold (`--cp-gold`) is the primary accent — it controls buttons, links, eyebrow text, dividers, and hover states.

To change fonts, update the `--font-heading` or `--font-body` values AND update the Google Fonts link in each HTML file's `<head>` section.

---

## How to Connect the Contact Form

The contact form currently shows a confirmation message on submit (handled in `script.js`). To make it actually send emails, you have a few options:

### Option 1: Formspree (Easiest)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form ID
3. In `contact.html`, change the form's `action` attribute:
   ```html
   <form id="inquiry-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. In `script.js`, remove or comment out the form submit handler (the `contactForm.addEventListener('submit', ...)` block) so the form submits normally

### Option 2: Netlify Forms
If hosting on Netlify, just add `netlify` to the form tag:
```html
<form id="inquiry-form" name="inquiry" netlify>
```

### Option 3: Custom Backend
Point the form action to your own API endpoint and handle the POST data server-side.

---

## How to Publish

### Option 1: Netlify (Recommended — Free)
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up for a free account
3. Drag and drop the entire `website/` folder onto the Netlify dashboard
4. Your site will be live with a generated URL
5. Connect your domain (crosspointrottweilers.com) in Netlify settings

### Option 2: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files from the `website/` folder to the repository root
3. Go to Settings → Pages → select "main" branch
4. Your site will be live at `username.github.io/repo-name`

### Option 3: Traditional Web Hosting
1. Log into your hosting control panel (cPanel, etc.)
2. Open File Manager or use FTP
3. Upload all files from the `website/` folder to your `public_html` directory
4. The site will be live at your domain

### Option 4: Squarespace / WordPress Migration
The HTML structure and copy can be migrated into any CMS. The brand guide (`brand/crosspoint-brand-guide.md`) contains all the copy, style rules, and specifications needed for a designer or developer to rebuild this in any platform.

---

## Quick Reference: Search & Replace Checklist

Before going live, search these across all HTML files and update:

- [ ] `info@crosspointrottweilers.com` → your actual email
- [ ] `href="#"` on social links → your Instagram/Facebook URLs
- [ ] All `img-placeholder` elements → actual images
- [ ] All `<!-- REPLACE -->` comments → your actual content
- [ ] `<!-- TODO -->` comments → form handler setup
- [ ] `og:url` meta tag → your actual domain
- [ ] `og:image` meta tag → your actual OG image path
- [ ] Dog names, stats, descriptions → your actual dogs
- [ ] Litter pairings and dates → your actual litters
- [ ] Pedigree details → your actual pedigree data
- [ ] Health clearance results → your actual results
- [ ] Testimonials → your actual owner testimonials
- [ ] Contact form litter dropdown → your current litters

---

## Brand Guide

The complete brand strategy, copy system, visual direction, and future template specifications are in:

```
brand/crosspoint-brand-guide.md
```

This document contains everything needed to maintain brand consistency across the website, social media, print materials, and future design assets.
