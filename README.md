# John Harold Doton | Creative Developer Portfolio

A premium, interactive personal portfolio website designed with modern typography, glassmorphism aesthetics, responsive layouts, and interactive animations.

---

## 🚀 Key Features

* **Hero Sequential Typing**: Clean, sequential character typing sequence for title tags ("Hello, I'm" followed by "John Harold") that eliminates text layout duplications.
* **About Me Section**: Clean scroll-triggered de-blur sliding entries (BlurFade) with staggered delays for bio text and technical roles.
* **Technical Skills Proficiency**:
  * Proportional, absolute-positioned sliding indicator tab selector.
  * 3D rotating tag cloud sphere with tightened padding for compact layouts.
  * Wrapping glassmorphic tags cards (`Languages`, `AI & ML`, `Design`, `Tools`, `Frameworks`, `Databases`).
* **Unified Projects Grid**: Responsive single-grid project deck showcasing custom crop offsets, date scopes, category tag pills, and floating source/live badges.
* **Draggable Terminal Console**: 
  * Responsive, draggable terminal overlay shell.
  * Commands include `help`, `about`, `skills`, `projects`, `contact`, `clear`, `sudo`.
  * `cat` command: Displays an ASCII meow greeting and renders a custom photo of a cat companion.
  * `luna` command: Interactive mock Vtuber AI assistant chatbot mode responding to queries about streamers, Minecraft, development, and more.
* **Resume Download button**: Direct PDF download action featuring a custom red-glow hover button indicator.

---

## 🛠️ Tech Stack

* **Frontend**: React (v19) + Vite
* **Animations**: GSAP (GreenSock Animation Platform)
* **Styling**: Vanilla CSS Variables (Dark theme / responsive layout variables)
* **Interactions**: HTML5 Canvas (TagCanvas integration)

---

## ⚙️ Local Development Setup

To run this project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Haruuowo/Integrated-HAroldPortfolio-REACT.git
   cd Integrated-HAroldPortfolio-REACT
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## ☁️ Deployment on Vercel

The portfolio is set up to automatically deploy on Vercel:

1. **Auto-Publishing**: Every time you commit and push code (`git push origin main`), Vercel automatically catches the update, builds the assets, and deploys it live.
2. **Secure AI Endpoints (Optional)**: If you hook up a live LLM (like Groq) for the Luna AI Vtuber terminal command, add your secure Node.js backend handlers inside the `/api` directory (e.g. `api/chat.js`) to protect your private credentials. Add your keys securely under **Vercel Project Settings -> Environment Variables**.
