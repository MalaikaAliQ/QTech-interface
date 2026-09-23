import React, { useEffect, useRef, useState } from 'react';

export default function NatureVRTab() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [intensity, setIntensity] = useState(5);
  const [pairRate, setPairRate] = useState(4);
  const [activePairsCount, setActivePairsCount] = useState(0);
  const [camRotDisplay, setCamRotDisplay] = useState('CAM ROT: [0.25, -0.35]');

  // Animation & Camera mutable state refs
  const stateRef = useRef({
    camRotX: 0.25,
    camRotY: -0.35,
    camDist: 400,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    vrTime: 0,
    virtualPairs: [],
    foamGrid: []
  });

  // Initialize Quantum Foam Grid Points
  useEffect(() => {
    const GRID_SIZE = 13;
    const SPACING = 30;
    const grid = [];
    for (let x = -(GRID_SIZE - 1) / 2; x <= (GRID_SIZE - 1) / 2; x++) {
      for (let z = -(GRID_SIZE - 1) / 2; z <= (GRID_SIZE - 1) / 2; z++) {
        grid.push({
          x: x * SPACING,
          y: 0,
          z: z * SPACING,
          basePhase: Math.random() * Math.PI * 2
        });
      }
    }
    stateRef.current.foamGrid = grid;
  }, []);

  // Recenter Camera Handler
  const handleRecenter = () => {
    stateRef.current.camRotX = 0.25;
    stateRef.current.camRotY = -0.35;
    setCamRotDisplay('CAM ROT: [0.25, -0.35]');
  };

  // Mouse & Touch Drag Handlers
  const handleMouseDown = (e) => {
    stateRef.current.isDragging = true;
    stateRef.current.lastMouseX = e.clientX;
    stateRef.current.lastMouseY = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!stateRef.current.isDragging) return;
    const dx = e.clientX - stateRef.current.lastMouseX;
    const dy = e.clientY - stateRef.current.lastMouseY;
    stateRef.current.camRotY += dx * 0.006;
    stateRef.current.camRotX += dy * 0.006;
    stateRef.current.camRotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, stateRef.current.camRotX));
    stateRef.current.lastMouseX = e.clientX;
    stateRef.current.lastMouseY = e.clientY;
    setCamRotDisplay(`CAM ROT: [${stateRef.current.camRotX.toFixed(2)}, ${stateRef.current.camRotY.toFixed(2)}]`);
  };

  const handleMouseUp = () => {
    stateRef.current.isDragging = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      stateRef.current.isDragging = true;
      stateRef.current.lastMouseX = e.touches[0].clientX;
      stateRef.current.lastMouseY = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (!stateRef.current.isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - stateRef.current.lastMouseX;
    const dy = e.touches[0].clientY - stateRef.current.lastMouseY;
    stateRef.current.camRotY += dx * 0.007;
    stateRef.current.camRotX += dy * 0.007;
    stateRef.current.lastMouseX = e.touches[0].clientX;
    stateRef.current.lastMouseY = e.touches[0].clientY;
    setCamRotDisplay(`CAM ROT: [${stateRef.current.camRotX.toFixed(2)}, ${stateRef.current.camRotY.toFixed(2)}]`);
  };

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const spawnVirtualPair = () => {
      const range = 140;
      const originX = (Math.random() - 0.5) * range * 2;
      const originY = (Math.random() - 0.5) * range * 1.5;
      const originZ = (Math.random() - 0.5) * range * 2;
      const maxLife = 50 + Math.random() * 45;
      const sepSpeed = 1.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      stateRef.current.virtualPairs.push({
        x: originX,
        y: originY,
        z: originZ,
        vx: Math.cos(theta) * Math.cos(phi) * sepSpeed,
        vy: Math.sin(phi) * sepSpeed,
        vz: Math.sin(theta) * Math.cos(phi) * sepSpeed,
        age: 0,
        maxLife,
        colorPos: '#38bdf8',
        colorNeg: '#f43f5e'
      });
    };

    const project3D = (x, y, z, cW, cH) => {
      const { camRotX, camRotY, camDist } = stateRef.current;
      const cosY = Math.cos(camRotY), sinY = Math.sin(camRotY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const cosX = Math.cos(camRotX), sinX = Math.sin(camRotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const fov = 520;
      const zEff = z2 + camDist;
      if (zEff <= 20) return null;
      const scale = fov / zEff;
      return {
        x: cW / 2 + x1 * scale,
        y: cH / 2 + y2 * scale,
        scale,
        depth: zEff
      };
    };

    const render = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;

      const cW = (canvas.width = container.clientWidth);
      const cH = (canvas.height = container.clientHeight);

      ctx.fillStyle = '#05070e';
      ctx.fillRect(0, 0, cW, cH);

      stateRef.current.vrTime += 0.04;
      const currentIntensity = intensity;
      const currentPairRate = pairRate;

      // Spawn Virtual Pairs based on rate
      if (Math.random() < currentPairRate * 0.08 && stateRef.current.virtualPairs.length < 35) {
        spawnVirtualPair();
      }

      // Render Foam Grid
      const projectedFoam = [];
      const SPACING = 30;
      stateRef.current.foamGrid.forEach((pt) => {
        const yWave =
          Math.sin(pt.x * 0.04 + stateRef.current.vrTime * 1.8 + pt.basePhase) *
          Math.cos(pt.z * 0.04 - stateRef.current.vrTime * 1.5) *
          currentIntensity *
          5.5;
        const proj = project3D(pt.x, pt.y + yWave, pt.z, cW, cH);
        if (proj) projectedFoam.push({ ...proj, ox: pt.x, oz: pt.z, waveVal: yWave });
      });

      // Draw Grid Points & Lines
      ctx.lineWidth = 1;
      for (let i = 0; i < projectedFoam.length; i++) {
        const p1 = projectedFoam[i];
        const alpha = Math.min(1, Math.max(0.1, 1.8 - p1.depth / 500));
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, Math.max(1, 2.5 * p1.scale), 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < projectedFoam.length; j++) {
          const p2 = projectedFoam[j];
          const distSq = (p1.ox - p2.ox) ** 2 + (p1.oz - p2.oz) ** 2;
          if (distSq <= (SPACING + 2) ** 2) {
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Render Virtual Particle Pairs
      const pairs = stateRef.current.virtualPairs;
      for (let i = pairs.length - 1; i >= 0; i--) {
        const vp = pairs[i];
        vp.age++;
        const progress = vp.age / vp.maxLife;
        const radius = Math.sin(progress * Math.PI) * 28;

        const p1 = project3D(
          vp.x + vp.vx * radius * 0.1,
          vp.y + vp.vy * radius * 0.1,
          vp.z + vp.vz * radius * 0.1,
          cW,
          cH
        );
        const p2 = project3D(
          vp.x - vp.vx * radius * 0.1,
          vp.y - vp.vy * radius * 0.1,
          vp.z - vp.vz * radius * 0.1,
          cW,
          cH
        );

        if (p1 && p2) {
          const alpha = Math.sin(progress * Math.PI);

          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Positron
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8 * p1.scale;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, Math.max(2, 4 * p1.scale), 0, Math.PI * 2);
          ctx.fill();

          // Electron
          ctx.fillStyle = `rgba(244, 63, 94, ${alpha})`;
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 8 * p2.scale;
          ctx.beginPath();
          ctx.arc(p2.x, p2.y, Math.max(2, 4 * p2.scale), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (vp.age >= vp.maxLife) {
          pairs.splice(i, 1);
        }
      }

      setActivePairsCount(pairs.length);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, pairRate]);

  return (
    <section className="active">
      <div className="card">
        <h2>The Quantum Vacuum: Space is Never Empty</h2>
        <p className="muted">
          Classical physics assumed the vacuum was complete void. Quantum Field Theory reveals that nature fundamentally fluctuates. Because of the Heisenberg Energy-Time Uncertainty Principle (<span className="math">Δ<i>E</i> · Δ<i>t</i> ≥ ℏ / 2</span>), virtual particle-antiparticle pairs constantly burst into existence and annihilate before violating conservation laws. <b>Drag with your mouse or finger to move inside the 3D quantum foam.</b>
        </p>
      </div>

      <div className="card" style={{ marginTop: '16px', padding: 0, overflow: 'hidden', border: 'none' }}>
        <div
          className="vr-container"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <canvas ref={canvasRef} id="quantumCanvas" />

          {/* Augmented Reality HUD Overlay */}
          <div className="vr-hud">
            <h4>// QUANTUM VACUUM SIMULATION HUD</h4>
            <div>UNCERTAINTY: ΔE · Δt ≥ ℏ/2</div>
            <div>ZERO-POINT ENERGY: E₀ = ½∑ℏω</div>
            <div>SPATIAL GRID: QUANTUM FOAM LATTICE</div>
            <div>VIRTUAL PAIRS IN FLIGHT: {activePairsCount}</div>
            <div>{camRotDisplay}</div>
          </div>

          <div className="reticle" />

          <div className="vr-controls">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <label style={{ fontSize: '.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span>Fluctuation Intensity:</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(parseFloat(e.target.value))}
                  style={{ accentColor: 'var(--cyan)' }}
                />
              </label>
              <label style={{ fontSize: '.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span>Pair Creation Rate:</span>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={pairRate}
                  onChange={(e) => setPairRate(parseInt(e.target.value, 10))}
                  style={{ accentColor: 'var(--purple)' }}
                />
              </label>
            </div>
            <div>
              <button
                className="btn"
                onClick={handleRecenter}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.3)',
                  fontSize: '.8rem',
                  padding: '6px 12px'
                }}
              >
                Recenter View
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid three" style={{ marginTop: '16px' }}>
        <div className="card">
          <h3>1. The Zero-Point Field (<span className="math">E₀ = ½ℏω</span>)</h3>
          <p className="muted">
            Even at absolute zero (0 Kelvin) with all matter removed, the electromagnetic field retains irreducible ground-state energy. Every spatial mode acts as a quantum harmonic oscillator that never comes to rest.
          </p>
        </div>
        <div className="card">
          <h3>2. Energy-Time Uncertainty</h3>
          <p className="muted">
            Heisenberg uncertainty allows energy <span className="math">Δ<i>E</i></span> to be borrowed from the vacuum as long as it is paid back within time <span className="math">Δ<i>t</i> ≈ ℏ / (2Δ<i>E</i>)</span>. This drives continuous virtual pair production (<span class="math">e⁺ + e⁻</span>).
          </p>
        </div>
        <div className="card">
          <h3>3. Observable Macroscopic Effects</h3>
          <p className="muted">
            Vacuum fluctuations are directly verified in laboratories via the <b>Casimir Effect</b> (attractive force between uncharged plates), the <b>Lamb Shift</b> in atomic hydrogen spectra, and spontaneous emission in lasers.
          </p>
        </div>
      </div>
    </section>
  );
}
