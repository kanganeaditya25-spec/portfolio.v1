# 🌐 Aditya Kangane — Developer Portfolio

[![License](https://img.shields.io/badge/License-Proprietary%20%C2%A9%20Aditya%20Kangane-red.svg)](./LICENSE)
[![Built with HTML](https://img.shields.io/badge/Built%20with-HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Styled with CSS](https://img.shields.io/badge/Styled%20with-CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel&logoColor=white)](https://vercel.com)

A **modern, fully responsive developer portfolio website** for Alex Carter — an enthusiastic web developer. Built entirely with semantic HTML5, vanilla CSS3, and vanilla JavaScript. No frameworks. No bloat. Pure craft.

---

## 🖥️ Live Demo

> **[🔗 View Live on Vercel →][https://aditya-portfolio-dev.vercel.app/]**

---

## ✨ Features

- 🌑 **Dark / Light Theme** — Togglable with persistent `localStorage` memory and smooth transitions
- 🖱️ **Custom Magnetic Cursor** — Dot + ring follower with smooth lerp physics
- 🔵 **Interactive Particle Mesh** — Canvas-rendered node network reacting to mouse movement
- 🖥️ **CLI Terminal Simulator** — Typing animation mimicking a real developer shell session
- 🃏 **Project Cards + Modal** — Filterable grid with animated detail modals
- 🗓️ **Experience Timeline** — Scroll-triggered slide-in reveal animations
- 📬 **Contact Form** — Real-time inline validation with success state
- 📱 **Fully Responsive** — Mobile-first layouts with hamburger nav menu
- ⚡ **Zero Dependencies** — No npm packages, no build step, instant load

---

## 📁 Project Structure

```
portfolio.v1/
│
├── index.html           # Main HTML structure (semantic, SEO-ready)
├── css/
│   └── style.css        # Full design system (CSS Variables, dark/light themes)
├── js/
│   ├── main.js          # Interactive logic (cursor, modals, filters, forms)
│   └── particles.js     # Canvas particle network background
├── assets/
│   └── profile.png      # Developer profile illustration
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🎨 Design System

| Token | Dark Mode | Light Mode |
|---|---|---|
| Background | `#080B11` | `#F8FAFC` |
| Surface | `#0F1524` | `#FFFFFF` |
| Accent Primary | `#10B981` (Emerald) | `#059669` |
| Accent Secondary | `#6366F1` (Indigo) | `#4F46E5` |
| Text Primary | `#F3F4F6` | `#0F172A` |
| Text Secondary | `#9CA3AF` | `#475569` |

**Fonts:** `Outfit` (headings) · `Plus Jakarta Sans` (body) · `JetBrains Mono` (code/CLI)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (Semantic) |
| Styling | Vanilla CSS3 (Custom Properties, Grid, Flexbox) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Background FX | HTML5 Canvas API |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts |
| Hosting | Vercel |

---

## 🚀 Running Locally

No build step needed. Simply serve the files over HTTP:

**Using Node.js:**
```bash
npx http-server -p 8080
```

Then open **[http://localhost:8080](http://localhost:8080)** in your browser.

---

## 📦 Deploying to Vercel

1. Fork or clone this repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import this repository
4. Leave all settings as default (auto-detects static site)
5. Click **Deploy** ✅

Every `git push` to `main` will trigger an automatic redeployment.

---

## 🙋 Sections Overview

| Section | Description |
|---|---|
| **Hero** | Animated intro with CLI terminal mockup and interactive particle canvas |
| **About** | Biography, profile image, and achievement stats |
| **Skills** | Categorized skill tags (Frontend, Backend, Tools) |
| **Projects** | Filterable card gallery with detail modals |
| **Experience** | Scroll-animated vertical timeline |
| **Contact** | Validated contact form + social links |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to adapt this for your own portfolio:

1. Fork the repo
2. Customize content in `index.html`
3. Adjust colors/fonts in `css/style.css` (just edit the CSS variables in `:root`)
4. Push and deploy

---

<p align="center">Made with ❤️ by <strong>Alex Carter</strong> — Designing performance, one commit at a time.</p>
