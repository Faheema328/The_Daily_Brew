# The Daily Brew — Premium Specialty Coffeehouse

A responsive, high-end café website developed for the **TIE Club Website Development Internship Selection Task**.

---

## ☕ Technology Stack
- **HTML5**: Semantic, accessible markup.
- **CSS3**: Modern layouts (CSS Grid, Flexbox), custom CSS variables, elegant typography, fluid responsiveness.
- **Vanilla JavaScript**: Pure JS for smooth interactivity and zero runtime dependencies.
- **No external frameworks or libraries** (strict adherence to project requirements).

---

## 📁 Project Structure

```text
The-Daily-Brew/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── 01_alternate_hero_banner.jpg
│       ├── 02_alternate_cappuccino.jpg
│       ├── 03_alternate_iced_coffee.jpg
│       ├── 04_alternate_sandwich.jpg
│       ├── 05_alternate_brownie.jpg
│       └── 06_alternate_logo.jpg
└── README.md
```

---

## 🎨 Global Design System & Palette (The Coffee Atelier)
- **Velvet Espresso** (`#1A110D` / `#2B1D17`) — Primary brand foundation, deep typography, and footer background.
- **Dark Espresso Borders** (`#4B2E24`, `#5A382A`, `#6B4635`) — Prominent, clearly visible dark-brown artisan borders on all containers, cards, dialogs, and controls, replacing pale outlines.
- **Rich Roast Brown** (`#432A20`) — Secondary dark accents, headings, and high-contrast labels.
- **Froth Cream & Warm Cream** (`#FAF6F0`, `#F8F3EA`) — Warm, inviting canvas and card background.
- **Soft Oat** (`#E8DCCB`) — Subtle dividers and background accents.
- **Caramel Gold** (`#C18A55`, `#DFA874`) — Warm interactive highlights, active badges, and focus rings.
- **Typography**: 
  - Headings: `Playfair Display, Georgia, serif`
  - Body: `Plus Jakarta Sans, sans-serif`
- **Layout & Rhythm**: Mobile-first architecture, generous spacing, prominent dark-brown framing, smooth transitions, and high-contrast accessibility (WCAG AAA).

---

## 🏛️ Website Sections (Coffee Atelier Architecture)

### 1. Site Header & Navigation
- Sticky navigation bar with `backdrop-filter: blur(12px)` and subtle espresso border.
- Clickable brand logo frame navigating to `#home` featuring the official emblem (`06_alternate_logo.jpg`) with dark-brown border and zero white fringe.
- Clean 6-item navigation: **Home** (`#home`), **About** (`#about`), **Bestsellers** (`#bestsellers`), **Menu** (`#menu`), **Experience** (`#experience`), and **Contact** (`#contact`).
- Shopping bag icon button with live item-count badge and slide-out cart drawer.
- Mobile hamburger navigation toggle with morphing icon animation and responsive drawer.

### 2. Homepage Hero (`#home`)
- Showcases the official panoramic hero banner (`01_alternate_hero_banner.jpg`) within a prominent dark-brown border frame (`#4B2E24`) and subtle scale transform for edge-to-edge coverage.
- Editorial typography with exact copy: *"Your Everyday Coffee Destination."*
- Primary CTA button *"Explore Our Menu"* navigating smoothly to `#menu`.
- Secondary CTA button *"View Bestsellers"* navigating to `#bestsellers`.
- Atelier feature highlight pills: *Artisanal Specialty Brews*, *Fresh Daily Bakes*, and *Welcoming Space*.

### 3. About Us (`#about`)
- Editorial brand story framed with a rich dark-brown border container (`#4B2E24`) on an ivory/cream canvas.
- Exact 24-word copy preserved verbatim: *"At The Daily Brew, we believe every great day starts with a good cup of coffee. Enjoy freshly brewed beverages, delicious food and a welcoming atmosphere."*
- Large decorative quotation marks (`“` and `”`) in caramel-gold.
- Distinct philosophy cards framed with dark-brown borders (`#5A382A`) and numbered badges (`01`, `02`, `03`):
  1. *Calibrated Roasts*
  2. *Artisanal Precision*
  3. *A Space to Pause*

### 4. Bestsellers (`#bestsellers`)
- Highlights **exactly TWO** signature bestsellers in a balanced 2-column grid:
  1. **Cappuccino** — `₹150` (`02_alternate_cappuccino.jpg`)
  2. **Cold Coffee** — `₹180` (`03_alternate_iced_coffee.jpg`)
- Rich dark-brown card borders (`#5A382A`), feature badges, flavor notes, and integrated *"Customize & Order"* buttons.

### 5. Our Menu (`#menu`)
- Exactly 4 featured product cards with prominent dark-brown borders (`#5A382A`), consistent `1:1` aspect-ratio imagery, and edge-to-edge coverage:
  1. **Cappuccino** — `₹150` (`02_alternate_cappuccino.jpg`)
  2. **Cold Coffee** — `₹180` (`03_alternate_iced_coffee.jpg`)
  3. **Classic Sandwich** — `₹120` (`04_alternate_sandwich.jpg`)
  4. **Chocolate Brownie** — `₹100` (`05_alternate_brownie.jpg`)
- Category tags (*Hot Specialty*, *Iced Specialty*, *Savory Kitchen*, *Sweet Bakery*) and descriptions.
- Dedicated *"Customize"* action buttons opening the product customization modal.

### 6. Our Experience (`#experience`)
- Highlights the coffeehouse atmosphere with prominent dark-brown card borders (`#5A382A`) and standard WhatsApp emoji characters inside circular dark-brown bordered badges:
  - *Artisanal Brew Craft* — `☕`
  - *A Space for Mindful Pauses* — `🛋️`
  - *Fresh Daily Kitchen* — `🥪`
- Atelier highlight stats strip framed with dark-brown border (*4 Signature Offerings*, *100% Fresh Daily Bakes*, *Chennai Local Sanctuary*, *Dine-In & Counter Pickup*).

### 7. Special Offers (`#offers`)
- Sample demonstration pairings bundling beverages and kitchen items with dark-brown borders:
  - *Morning Atelier Pairing (Sample Demo Offer)*: Cappuccino & Classic Sandwich (₹230, Save 15%)
  - *Afternoon Sweet Retreat (Sample Demo Offer)*: Cold Coffee & Chocolate Brownie (₹240)
- Clearly labeled as demonstration offers with promotional disclaimers.

### 8. Made for Every Moment (`#moments`)
- Cute, aesthetic coffeehouse moments section featuring **prominent visual emoji circular badges** with dark-brown borders:
  - *Morning Ritual* / *Morning Start* — `🌅`
  - *Midday Pause* / *Afternoon Recharge* — `☀️`
  - *Evening Solace* / *Evening Unwind* — `🌙`
- Warm gradient cards with rich dark-brown borders (`#5A382A`) and subtle hover lifts.

### 9. Patron Reflections (`#testimonials`)
- Guest impressions with 5 golden star ratings and sample guest feedback framed with rich dark-brown borders (`#5A382A`).
- Clearly identified as demonstration content.
- Respects strict authenticity rules (no invented awards or certifications).

### 10. Contact Section (`#contact`)
- Two-column layout with dark-brown card borders:
  - **Email**: Clickable `mailto:hello@thedailybrew.example`
  - **Phone**: Clickable `tel:+919876543210`
  - **Location**: `Chennai`
  - **Café Hours Card**: Lightened to a medium coffee-brown/espresso gradient (`#5A382A` to `#4B2E24`) with warm cream typography and menu CTA.

### 11. Semantic Footer
- Displays the official café logo (`06_alternate_logo.jpg`) with dark-brown border frame (`#5A382A`), dark espresso backing, and scaled coverage removing white fringes.
- Navigation links matching active sections (Home, About, Bestsellers, Menu, Experience, Contact).
- Exact copyright notice: `© 2026 The Daily Brew. All rights reserved.`

---

## 🖼️ Official Asset Registry
All 6 official TIE Club supplied images remain intact with original filenames and bytes:
1. `assets/images/01_alternate_hero_banner.jpg` (Hero Banner: 1672x545)
2. `assets/images/02_alternate_cappuccino.jpg` (Cappuccino: 309x354)
3. `assets/images/03_alternate_iced_coffee.jpg` (Iced Coffee: 306x354)
4. `assets/images/04_alternate_sandwich.jpg` (Artisanal Sandwich: 336x354)
5. `assets/images/05_alternate_brownie.jpg` (Chocolate Brownie: 308x354)
6. `assets/images/06_alternate_logo.jpg` (Brand Logo: 335x354)


---

## 🚀 Instructions for Running the Website Locally

The website is constructed entirely using pure HTML5, CSS3, and Vanilla JavaScript with zero external frameworks, dependencies, or build tools. You can run and inspect it locally using any of the following methods:

### Option 1: Direct File Opening
Simply double-click `index.html` in your file explorer, or open it directly from the terminal in your default browser:
```powershell
Start-Process "index.html"
```

### Option 2: Python Built-in HTTP Server
Run the standard local HTTP server included with Python:
```bash
python -m http.server 8000
```
Then open your web browser and navigate to:
```text
http://localhost:8000
```

### Option 3: Node.js Local Server
If Node.js is installed on your machine:
```bash
npx serve .
```
or with Python 3 / VS Code Live Server extension.
