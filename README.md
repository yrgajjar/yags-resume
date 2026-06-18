# Yags Resume — Premium Digital Resume + Admin Panel

A modern, fast, fully responsive digital résumé (CV) with a glassmorphic UI, smooth
animations, dark mode, PDF export, and a complete **admin panel** for editing every
section, customizing the theme, and toggling/reordering sections — all backed by
**Firebase** (Firestore + Auth).

> The public résumé works out of the box with bundled seed data. Firebase is only
> needed to **persist edits** and enable **admin login**.

---

## ✨ Features

**Public résumé (no login)**
- Animated hero with name, role, tagline, highlight badges, and count-up stats
- About, Skills (animated proficiency bars), Experience (expandable timeline),
  Education, Certifications, Contact
- Scroll-reveal animations, hover effects, dark/light mode
- One-click **Download PDF** (native print-to-PDF, selectable text) and **Share link**
- SEO meta tags + JSON-LD `Person` structured data

**Admin panel (login required)**
- **Resume Editor** — edit every section, add/remove entries, rich-text editor
  (TipTap) for About + Experience
- **Theme Customizer** — primary/secondary color pickers, presets, light/dark,
  5 font choices — all preview live
- **Section Control** — toggle sections on/off and drag-and-drop to reorder
- **Interactive Controls** — animations on/off, counters on/off, custom highlight badges
- **Live Preview** — desktop/mobile preview that mirrors the public page in real time

---

## 🧱 Tech stack

React 18 · Vite · TypeScript · Tailwind CSS · Framer Motion · Firebase (Firestore +
Auth) · Zustand · TipTap · React Router · React Helmet Async.

---

## 🚀 Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

The site runs immediately with seed data. To enable saving + admin login, configure
Firebase below.

### Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Run ESLint                           |
| `npm run typecheck` | Type-check without emitting        |

---

## 🔥 Firebase setup

1. **Create a project** at the [Firebase Console](https://console.firebase.google.com/).
2. **Add a Web app** (Project settings → General → *Your apps* → Web). Copy the config.
3. **Enable Authentication** → *Sign-in method* → enable **Email/Password**.
4. **Create your admin user** under Authentication → *Users* → *Add user*
   (email + password). Note the user's **UID**.
5. **Create Firestore** (Build → Firestore Database → Create, production mode).
6. **Register the admin UID**: create a collection `admin`, add a document whose
   **Document ID = the admin UID** (any fields, e.g. `{ email: "you@example.com",
   role: "owner" }`). The security rules grant write access to UIDs present here.
7. **Configure env vars**: copy `.env.example` to `.env` and paste your config:

   ```bash
   cp .env.example .env
   ```

   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_FIREBASE_MEASUREMENT_ID=...   # optional
   ```

   > These are **public client values**, not secrets — they ship in the browser.
   > Security is enforced by the rules below, not by hiding them.

8. **Deploy the security rules** in [`firestore.rules`](./firestore.rules):

   ```bash
   npm i -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules
   ```

9. Restart `npm run dev`, go to **`/admin`**, sign in, edit, and click **Save**.
   Your content is written to `resume/main` and `settings/main` and now drives the
   public page for everyone.

### Firestore data model

```
resume/main      → { hero, about, skillCategories, experience,
                     education, certifications, contact, highlights }
settings/main    → { theme, sections (order + on/off), interactive }
admin/{uid}      → { email, role }   // registry of allowed editors
```

### Security rules summary

- `resume/*` and `settings/*` — **public read**, **admin-only write**
- `admin/*` — readable by signed-in users, not client-writable
- everything else denied

---

## 📦 Deployment

Any static host works (the app is a Vite SPA). Configs for SPA routing are
included: [`firebase.json`](./firebase.json) (Firebase Hosting) and
[`vercel.json`](./vercel.json) (Vercel). For other hosts, route all paths to
`index.html`.

```bash
npm run build
firebase deploy            # or: vercel / netlify / etc.
```

Remember to set the `VITE_FIREBASE_*` environment variables in your host's dashboard.

---

## 🗂️ Project structure

```
src/
  components/
    sections/      Public résumé sections (Hero, About, Skills, …)
    admin/         Admin shell, editors, rich-text editor, controls
    ui/            Reusable primitives (Reveal, GlassCard, Counter, Toaster, …)
  pages/           PublicResume, AdminLogin, AdminDashboard
  store/           Zustand stores (resume + settings, toasts)
  context/         Auth context + provider
  firebase/        config, auth, firestore data layer
  hooks/           useAuth, useApplyTheme
  utils/           color, fonts, pdf, share, sanitize, uid
  data/            bundled seed data
  types.ts         shared data model
```

---

## 📝 Notes

- The public page never blocks on Firebase — if it's unconfigured or offline, seed
  data renders and the admin panel explains how to enable it.
- Rich-text HTML is sanitized with DOMPurify before rendering.
- PDF export uses the browser's print dialog with dedicated `@media print` styles.
