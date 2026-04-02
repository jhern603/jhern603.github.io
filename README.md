# Jose Hernandez — Portfolio

Personal portfolio site built with React + Vite + Tailwind CSS + Framer Motion.

**Live:** [josehernandez.dev](https://josehernandez.dev)

---

## Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI |
| [Vite 5](https://vitejs.dev) | Build / dev server |
| [Tailwind CSS 3](https://tailwindcss.com) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Scroll animations |
| [Lucide React](https://lucide.dev) | Icons |

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

---

## Project Structure

```
portfolio/
├── public/
│   ├── avatar.jpg        ← drop your headshot here
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── content.js    ← all site content lives here
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Ticker.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Stack.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

---

## Customizing Content

**All text, data, and links are in one place:** `src/data/content.js`

### Sections

| Export | Controls |
|---|---|
| `hero` | Name, tagline, code snippet, stat counters |
| `about` | Bio paragraphs, highlighted phrases, location |
| `experience` | Job entries — company, role, period, bullets |
| `projects` | Project cards — title, description, tags, featured flag |
| `stack` | Tech categories and items |
| `education` | School, degree, period |
| `contact` | Email, GitHub URL, LinkedIn URL |
| `ticker` | Scrolling marquee items |
| `nav` | Navigation link labels (must match section IDs) |

### Adding a project

```js
// src/data/content.js → projects array
{
  title: 'My Project',
  description: 'What it does and why it matters.',
  tags: ['Python', 'OCI', 'MCP'],
  featured: true,   // true = large card in top row, false = smaller card below
}
```

### Adding an experience entry

```js
// src/data/content.js → experience array (newest first)
{
  company: 'Company Name',
  role: 'Your Title',
  period: 'Jan 2025 – Present',
  location: 'City, ST',
  bullets: [
    'Achievement one.',
    'Achievement two.',
  ],
},
```

---

## Design Tokens

Defined in `tailwind.config.js`:

| Token | Value | Usage |
|---|---|---|
| `bg-light` | `#243448` | Page background |
| `bg-dark` | `#1A2838` | Deeper background variant |
| `surface-light` | `#1C2D3E` | Cards, panels |
| `primary-light` | `#E8EDF2` | Body text, headings |
| `accent` | `#5BB8D4` | Links, highlights, icons |
| `muted-light` | `#7A95AB` | Secondary text, labels |
| `border` | `#3A5170` | Card borders, dividers |

### Gradient text

Applied via the `.gradient-text` CSS class (`src/index.css`). Animates over 30s between:

```
#5BB8D4 → #2A7BA0 → #1A6FA5 → #2A7BA0 → #5BB8D4
```

Used on: `HERNANDEZ`, section heading callouts (`intersection`, `worked`, `work`, `Arsenal`, `TALK`), and inline bio highlights.

---

## Adding Your Photo

Drop a headshot at `public/avatar.jpg`. The About section displays it automatically. If the file is missing, it falls back to "JH" initials.

Recommended: square crop, at least 800×800px, face near top of frame (the image uses `object-top`).

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Point your custom domain (`josehernandez.dev`) in the Vercel dashboard under **Domains**.

### Netlify

```bash
npm run build
# drag-and-drop the dist/ folder at app.netlify.com/drop
```

Or connect the GitHub repo for automatic deploys on push.

---

## Key Files Reference

| File | What to touch |
|---|---|
| `src/data/content.js` | All copy, links, and data |
| `src/index.css` | Gradient, ticker, scrollbar styles |
| `tailwind.config.js` | Color tokens, font, animation config |
| `public/avatar.jpg` | Your headshot |
| `public/favicon.svg` | Browser tab icon |
| `index.html` | Page title and meta description |
