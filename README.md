# John Harold Doton — Creative Developer Portfolio

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

An interactive, dual-mode personal portfolio showcasing autonomous AI systems, machine learning engineering, and full-stack web applications. Built with modern glassmorphism aesthetics, responsive layouts, live CRT/VHS shaders, and an interactive Virtual Windows XP environment.

---

## 🌟 Key Features

### 🖥️ Dual Experience Mode (Modern Web & Virtual Windows XP)
* **Modern Web Portfolio**: A sleek, dark-mode glassmorphic single-page experience featuring smooth scroll animations, VHS tape scanline overlays, glowing CRT headings, and tailored mobile layouts.
* **Virtual Windows XP Mode**: A fully interactive, nostalgia-fueled operating system simulation inside the browser:
  * Draggable, resizable, minimizable, and maximizable windows.
  * Functional **Minesweeper** game with authentic gameplay and timers.
  * **Internet Explorer** browser frame for project viewing.
  * **Notepad** text editor and **XP File Explorer**.
  * Authentic retro Windows XP taskbar, start menu, sounds, and wallpaper toggles.

### 🌐 Interactive 3D Tech Cloud Sphere
* Powered by `react-icon-cloud` (TagCanvas) on HTML5 Canvas.
* Smoothly rotates through technologies (`Python`, `React`, `PyTorch`, `AWS`, `Flutter`, `PostgreSQL`, `Docker`, `OpenAI`).
* Fully touch-enabled (`touch-action: pan-y`) and responsively scaled for fluid dragging on both mobile and desktop.

### 💻 Interactive Developer Terminal Shell
* Accessible via floating trigger or shortcut drawer.
* Built-in interactive CLI with commands:
  * `help`, `about`, `skills`, `projects`, `contact`, `clear`, `sudo`
  * `matrix`: Toggles a real-time falling green digital rain canvas animation.
  * `luna`: Chats with a simulated Luna AI Vtuber assistant.
  * `cat`: Displays ASCII art and secret companion photos.

### 🎨 Dynamic Multi-Theme System
* Hand-crafted CSS variable tokens for instant palette switching:
  * **Sunset Glow** (Default dark amber aesthetic)
  * **Deep Dark** (High-contrast obsidian)
  * **CRT Matrix** (Retro phosphor monochrome green)
  * **Clean Light** (Crisp high-readability daylight mode)

### 📱 Responsive & Mobile-Engineered
* Tailored mobile hero layout with centered visual hierarchy and unobscured portrait framing.
* Smooth touch micro-interactions (`:active` press scaling).
* Full glassmorphism blur and ambient animations preserved at 60+ FPS on mobile GPUs.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Core Framework** | [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| **Animations** | [GSAP](https://greensock.com/gsap/) & Vanilla CSS Keyframes |
| **3D Graphics** | [React Icon Cloud](https://github.com/dlarroder/react-icon-cloud) (HTML5 Canvas) |
| **Icons** | [Lucide React](https://lucide.dev/) & Devicon SVGs |
| **Styling** | Pure Vanilla CSS (CSS Variables, Glassmorphism, Responsive Grid/Flexbox) |
| **Audio & SFX** | Web Audio API / HTML5 Audio (XP boot, click, error, chimes) |

---

## 📂 Project Structure

```
my-portfolio/
├── public/
│   ├── assets/             # Photography, project captures, and PDF resumes
│   │   ├── Harold_Resume.pdf
│   │   └── HAROLDPHOTO1.jpg
│   └── favicon.ico
├── src/
│   ├── components/         # Modern portfolio sections
│   │   ├── About.jsx       # Bio, education (HAU), and personal background
│   │   ├── BootScreen.jsx  # Retro CRT terminal boot loader
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx     # Interactive contact form & socials
│   │   ├── CustomCursor.jsx# Hardware-accelerated custom cursor
│   │   ├── Experience.jsx  # Chronological timeline & milestones
│   │   ├── Footer.jsx
│   │   ├── Header.jsx      # Navigation, theme picker, Virtual PC toggle
│   │   ├── Hero.jsx        # Headline, portrait, and quick CTA buttons
│   │   ├── Projects.jsx    # Project showcase deck
│   │   ├── Skills.jsx      # 3D TagCloud sphere & categorized badges
│   │   └── Terminal.jsx    # Quake-style matrix terminal drawer
│   ├── retro/              # Virtual Windows XP desktop environment
│   │   ├── RetroDesktop.jsx
│   │   ├── XPExplorer.jsx
│   │   ├── XPIE.jsx
│   │   └── MinesweeperApp.jsx
│   ├── data/               # Structured data sources
│   │   ├── projectsData.js
│   │   ├── skillsData.js
│   │   ├── xpData.js
│   │   └── resumeData.js
│   ├── styles/
│   │   └── index.css       # Complete CSS design tokens & animations
│   ├── App.jsx             # Top-level state (Modern mode vs XP mode)
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Local Development Setup

To run this project locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Haruuowo/Integrated-HAroldPortfolio-REACT.git
   cd Integrated-HAroldPortfolio-REACT
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 👤 Author

**John Harold Doton**
* **Degree**: BS Computer Science — Holy Angel University
* **Role**: Lead Organizer / Internal Relations — Google Developer Groups (GDG) on Campus HAU
* **GitHub**: [@Haruuowo](https://github.com/Haruuowo)
* **LinkedIn**: [linkedin.com/in/harold-doton-606b18317](https://linkedin.com/in/harold-doton-606b18317)
* **Email**: [harolddoton@gmail.com](mailto:harolddoton@gmail.com)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
