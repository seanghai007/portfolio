# sxanghai — Creative Studio Portfolio & Studio Manager

A clean, premium, responsive portfolio website with an integrated **Studio Manager Dashboard** for **sxanghai**, multidisciplinary creative specializing in **Graphic Design (Main Focus)**, **Video Editing**, and **Photography**, based in **Phnom Penh City**.

---

## ⚡ Live Preview & Studio Dashboard Links

- **Public Portfolio**: [http://localhost:8080](http://localhost:8080) (or open [`index.html`](file:///c:/Users/h.seanghai/Desktop/Portapolio/index.html))
- **Studio Manager Dashboard**: [http://localhost:8080/admin.html](http://localhost:8080/admin.html) (or click the **"Studio ⚙️"** button in the header)

---

## 🚀 How to Upload & Drag to Reorder Your Work

You now have a **Studio Manager Dashboard** (`admin.html`) that gives you creator permissions to upload, edit, and drag-and-drop your projects like a visual dashboard!

### 1. Unlocking Permission
1. Click **"Studio ⚙️"** in the top navigation or go to `http://localhost:8080/admin.html`.
2. Enter your passcode: **`sxanghai`** (Default).
3. Click **"Unlock Dashboard"**. You stay authenticated during your browser session.

### 2. Drag & Drop Artwork Upload
- **Drop Zone**: Drag any JPG, PNG, WebP, or SVG file from your computer and drop it into the designated box.
- The image will instantly convert and display as your project cover artwork.
- Fill out the details:
  - **Project Title** (e.g. *Kroma Exhibition Posters*)
  - **Category**: Graphic Design *(Main Point)*, Video Editing, or Photography
  - **Subcategory / Tag** (e.g. *Brand Identity*, *Editorial*, *Commercial*)
  - **Year** (e.g. *2026*)
  - **Your Role**, **Project Overview**, and **Creative Approach**
  - **Deliverables** (e.g. *Logomark, Stationery, Brand Guidelines*)
- Click **"Save to Portfolio Archive"** — it instantly appears at the top of your portfolio!

### 3. Drag to Reorder Your Portfolio
On the right side of the dashboard, you will see your **"Drag to Reorder Portfolio"** list:
- **Click and hold** any project card (grab by the `⠿` icon or anywhere on the card).
- **Drag it up or down** to the exact position you want.
- The project sequence (#1, #2, #3...) updates automatically and saves immediately to `localStorage`.
- Your public portfolio at [`index.html`](http://localhost:8080) automatically syncs in real time!

### 4. Edit or Delete Projects
- Click **"Edit"** on any project in the list to load its information into the form, change its text or image, and click "Update Project".
- Click **"Delete"** to remove any project from your portfolio.

### 5. Keeping Changes Permanent (Export `data.js`)
Changes are automatically saved in your browser's `localStorage`. Whenever you want to make your changes permanent in code (e.g. before deploying to GitHub Pages, Netlify, or Vercel):
1. In the Studio Dashboard header, click **"Export data.js ⬇"**.
2. Save the downloaded `data.js` file into your [`js/data.js`](file:///c:/Users/h.seanghai/Desktop/Portapolio/js/data.js) directory.
3. Your new work and ordering are now permanent in the codebase!

---

## 🎨 Visual Direction & Design System

- **Studio Aesthetic**: Minimal, modern, confident, focused on the work.
- **Palette**: Off-white background (`#f7f7f5`), rich charcoal text (`#18181b`), and restrained deep-black accents (`#09090b`).
- **Typography**: Editorial pairings featuring **Syne** for bold headlines, **Plus Jakarta Sans** for body copy, and **JetBrains Mono** for technical indices and metadata.
- **Whitespace & Rhythm**: Generous margins, architectural borders, and uncluttered breathing room.
- **Micro-interactions**: Subtle hover scaling (`1.03x`), smooth tab transitions, accessible modal dialogs, and image lightbox.

---

## 📂 Project Structure

```text
Portapolio/
├── index.html                   # Public portfolio website (work, videos, photos, about, services, contact)
├── admin.html                   # Studio Manager Dashboard (upload, drag-to-reorder, settings)
├── css/
│   └── styles.css               # Design system, CSS tokens, responsive layout, animations
├── js/
│   ├── data.js                  # Central data store & LocalStorage persistence layer
│   ├── main.js                  # Filtering, modals, lightbox, video embeds, form handler
│   └── admin.js                 # Admin authentication, drag & drop uploader, drag-to-reorder logic
├── assets/                      # Offline fallback SVGs & placeholders
│   ├── placeholder-work.svg     # Graphic design fallback visual
│   ├── placeholder-video.svg    # Video showcase fallback visual
│   ├── placeholder-photo.svg    # Photography fallback visual
│   └── portrait-placeholder.svg # Profile portrait fallback visual
└── README.md                    # Documentation & user guide
```

---

## 🔒 Passcode Management
You can change your access passcode anytime under the **"Studio Settings"** tab inside `admin.html`.

---

## 📄 License
© 2026 sxanghai. All rights reserved.
