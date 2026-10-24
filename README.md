# John Harold Doton — Portfolio

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

An interactive, dual-mode personal portfolio showcasing autonomous AI systems, machine learning pipelines, and full-stack web applications. Built with modern glassmorphism aesthetics, responsive layouts, live CRT/VHS shaders, and an integrated Virtual Windows XP desktop environment.

---

## Overview

This repository houses the personal portfolio of John Harold Doton. The application provides two distinct viewing experiences:

1. **Modern Portfolio Experience**: A responsive, dark-mode single-page application featuring smooth scroll animations, VHS tape scanline overlays, glowing CRT typography, and tailored mobile layouts.
2. **Virtual Windows XP Environment**: A browser-based operating system simulation complete with authentic UI components, sound effects, window management, and retro utilities.

---

## Architecture & Features

### Dual Experience Mode
* **Modern Web Portfolio**: Single-page architecture featuring section navigation, dynamic scroll fades, custom cursor tracking, and hardware-accelerated animations.
* **Virtual Windows XP**: An authentic retro operating system interface featuring:
  * Draggable, resizable, minimizable, and maximizable windows.
  * **Minesweeper**: Fully playable game with customizable grid and authentic timer/flag mechanics.
  * **Internet Explorer**: Integrated web frame for previewing live links.
  * **Notepad & XP Explorer**: Interactive file tree and text editing sandbox.
  * Authentic retro taskbar, start menu, system chimes, and wallpaper toggles.

### Interactive 3D Tech Cloud Sphere
* Powered by `react-icon-cloud` (TagCanvas) on HTML5 Canvas.
* Renders interactive rotating technology nodes (`Python`, `React`, `PyTorch`, `AWS`, `Flutter`, `Supabase`, `PostgreSQL`, `REST APIs`, `OpenAI`).
* Fully touch-enabled (`touch-action: pan-y`) and responsively scaled for fluid dragging on both mobile and desktop.

### Interactive Developer Terminal Shell
* Quake-style slide-out developer terminal accessible via floating toggle or keyboard shortcuts.
* Built-in CLI commands:
  * System: `help`, `about`, `skills`, `projects`, `contact`, `clear`, `sudo`
  * Matrix Mode (`matrix`): Toggles real-time digital rain animation on an overlay canvas.
  * Luna AI (`luna`): Conversational mock Vtuber AI assistant chatbot.
  * Companion (`cat`): Renders ASCII art and companion photos.

### Dynamic Theme Engine
* Pure Vanilla CSS custom properties enabling real-time palette transitions:
  * **Sunset Glow**: Warm dark amber aesthetic (Default).
  * **Deep Dark**: High-contrast obsidian slate.
  * **CRT Matrix**: Monochrome phosphor green retro terminal.
  * **Clean Light**: High-readability daylight mode.

### Responsive Mobile Engineering
* Centered visual hierarchy with unobscured portrait framing.
* Touch-first active press feedback (`:active` micro-scaling).
* Preserved GPU-accelerated glassmorphism blur and ambient scanlines across mobile viewports.

---

## Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Core Framework** | [React 19](https://react.dev/) | Component architecture, state hooks, and portals |
| **Bundler & Build Tool** | [Vite 6](https://vitejs.dev/) | Fast HMR and optimized production bundling |
| **Motion & Animation** | [GSAP 3](https://greensock.com/gsap/) | High-performance timeline and scroll triggers |
| **3D Sphere** | [React Icon Cloud](https://github.com/dlarroder/react-icon-cloud) | Canvas-based spherical tag cloud |
| **Iconography** | [Lucide React](https://lucide.dev/) + Devicon | Clean interface icons and technology marks |
| **Styling** | Vanilla CSS3 | CSS Variables, Glassmorphism, Flexbox, CSS Grid |
| **Audio Engine** | Web Audio API / HTML5 Audio | Authentic retro OS sound effects and chimes |

---

## Project Structure

```
my-portfolio/
├── public/
│   ├── assets/             # Photography, project media, and PDF resume
│   │   ├── Harold_Resume.pdf
│   │   └── HAROLDPHOTO1.jpg
│   └── favicon.ico
├── src/
│   ├── components/         # Modern portfolio components
│   │   ├── About.jsx       # Biography, background, and academic details
│   │   ├── BootScreen.jsx  # Retro CRT terminal boot loader
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx     # Contact form and social links
│   │   ├── CustomCursor.jsx# Hardware-accelerated cursor follower
│   │   ├── Experience.jsx  # Career and leadership timeline
│   │   ├── Footer.jsx
│   │   ├── Header.jsx      # Navigation bar, theme selector, Virtual PC trigger
│   │   ├── Hero.jsx        # Headline, framed portrait, and primary CTAs
│   │   ├── Projects.jsx    # Unified projects deck
│   │   ├── Skills.jsx      # 3D TagCloud sphere and categorized skill pills
│   │   └── Terminal.jsx    # Draggable Matrix terminal drawer
│   ├── retro/              # Virtual Windows XP environment
│   │   ├── RetroDesktop.jsx# XP desktop shell, taskbar, and window manager
│   │   ├── XPExplorer.jsx  # File explorer application
│   │   ├── XPIE.jsx        # Internet Explorer frame
│   │   └── MinesweeperApp.jsx # Functional Minesweeper game
│   ├── data/               # Static dataset definitions
│   │   ├── projectsData.js
│   │   ├── skillsData.js
│   │   ├── xpData.js
│   │   └── resumeData.js
│   ├── styles/
│   │   └── index.css       # Global design system, themes, and animations
│   ├── App.jsx             # Top-level state coordinator
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
* [npm](https://www.npmjs.com/) (version 9.0 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Haruuowo/Integrated-HAroldPortfolio-REACT.git
   cd Integrated-HAroldPortfolio-REACT
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   Compiled production artifacts are output to the `dist/` directory.

5. **Preview production bundle**:
   ```bash
   npm run preview
   ```

---

## Author

**John Harold Doton**
* **Institution**: Holy Angel University — BS Computer Science
* **Role**: Lead Organizer / Internal Relations — Google Developer Groups (GDG) on Campus HAU
* **GitHub**: [@Haruuowo](https://github.com/Haruuowo)
* **LinkedIn**: [linkedin.com/in/harold-doton-606b18317](https://linkedin.com/in/harold-doton-606b18317)
* **Email**: [harolddoton@gmail.com](mailto:harolddoton@gmail.com)

---

## License

This project is licensed under the [MIT License](LICENSE).
