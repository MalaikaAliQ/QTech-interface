# ⚛️ Quantum Technology Interactive Laboratory (React + Vite)

A modern, highly accurate React implementation of the **Quantum Technology Foundations & Cross-Discipline Mapper** interactive laboratory.

## 🚀 Features

- **3D AR/VR Quantum Vacuum Simulation**: Real-time 3D Canvas rendering of zero-point field fluctuations, energy-time uncertainty ($ΔE · Δt ≥ ℏ/2$), and virtual particle-antiparticle ($e^+ / e^-$) creation & annihilation with interactive camera rotation and HUD telemetry.
- **Search Puzzle**: Side-by-side comparison of classical $O(N)$ linear scan vs. Grover $O(\sqrt{N})$ coherent register amplitude evolution across 16 basis states.
- **Oracle Phase & Diffusion**: Step-by-step interactive bar chart showing phase inversion and reflection about the mean.
- **Beam Splitter & Quantum Circuit**: Physical optical bench SVG with animated single photon packets, 50:50 beam splitter Hadamard gate ($H$), SPAD detectors, and equivalent quantum circuit diagram.
- **Wavefunction Collapse Visualizer**: Real component wave packet evolution $Re[\psi(x,t)]$, Born rule probability density distribution $|\psi(x)|^2$, single event collapse, and 100-sample scatter simulation.
- **QRNG & One-Time Pad**: Quantum hardware entropy bitstream sampler, 32-bit hex digest assembler, and unconditional 6-char OTP authentication key synthesis.
- **5 Quantum Streams Architecture Map**: Interactive flowchart mapping laboratory experiments to the 5 primary branches of quantum technology (Computing, Communication, Sensing, Simulation, Networks) backed by a shared entanglement bus.

---

## 🛠️ Local Setup & Running

```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Deploying to Vercel

This repository is pre-configured with `vercel.json` for one-click deployment to Vercel.

### Method 1: Vercel Web Dashboard (Recommended)
1. Push this project to your GitHub, GitLab, or Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Vercel will automatically detect **Vite** and use:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Method 2: Vercel CLI
```bash
# Install Vercel CLI globally if not already installed
npm install -g vercel

# Run vercel deployment from the project directory
vercel
```

---

## 📁 Project Structure

```
quantum-tech-lab/
├── vercel.json                 # Vercel deployment configuration & SPA routing rewrites
├── vite.config.js              # Vite bundler setup
├── package.json                # React 18, Vite & dependencies
├── index.html                  # HTML template with Google Fonts & SEO meta
├── src/
│   ├── main.jsx                # Entry point
│   ├── App.jsx                 # Main layout & tab router
│   ├── index.css               # Global CSS design system, responsive grid & animations
│   └── components/
│       ├── HeaderNav.jsx       # Hero header & sticky navigation bar
│       └── tabs/
│           ├── OverviewTab.jsx      # Lab summary & core principles
│           ├── NatureVRTab.jsx      # 3D Quantum Vacuum VR canvas & HUD
│           ├── SearchPuzzleTab.jsx  # Classical vs Grover search comparison
│           ├── OracleTab.jsx        # Amplitude phase mark & diffusion
│           ├── BeamSplitterTab.jsx  # Beam splitter bench & circuit model
│           ├── WavefunctionTab.jsx  # Wave evolution & Born rule collapse
│           ├── QRNGTab.jsx          # Quantum random bit harvester & OTP
│           └── StreamsTab.jsx       # 5 Quantum streams interactive flowchart
```
