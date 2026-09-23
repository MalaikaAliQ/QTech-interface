import React, { useState, useEffect, useRef } from 'react';

export default function WavefunctionTab() {
  const [wPhase, setWPhase] = useState(0);
  const [wRun, setWRun] = useState(false);
  const [singleCollapsePos, setSingleCollapsePos] = useState(null); // x coordinate or null
  const [scatterPoints, setScatterPoints] = useState([]); // array of { cx, cy }

  const animFrameRef = useRef(null);

  // Gaussian sample generator
  const sampleGaussian = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return Math.min(0.95, Math.max(0.05, 0.5 + num * 0.12));
  };

  // Continuous Wave Evolution Loop
  useEffect(() => {
    let animationId;
    if (wRun) {
      const loop = () => {
        setWPhase((prev) => prev + 0.08);
        animationId = requestAnimationFrame(loop);
      };
      animationId = requestAnimationFrame(loop);
    }
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [wRun]);

  // Compute SVG Paths based on wPhase
  let wD = '';
  let pD = 'M 30 180 ';
  for (let i = 0; i <= 200; i++) {
    const u = i / 200;
    const x = 30 + 660 * u;
    const g = Math.exp(-0.5 * ((u - 0.5) / 0.12) ** 2);
    const yWave = 110 - 45 * g * Math.cos(36 * u - wPhase);
    const yProb = 180 - 120 * g * g;
    wD += (i ? 'L ' : 'M ') + x.toFixed(1) + ' ' + yWave.toFixed(1) + ' ';
    pD += 'L ' + x.toFixed(1) + ' ' + yProb.toFixed(1) + ' ';
  }
  pD += 'L 690 180 Z';

  const handleToggleEvolution = () => {
    setWRun((prev) => !prev);
  };

  const handleSingleMeasurement = () => {
    setWRun(false);
    const pos = sampleGaussian();
    const x = 30 + 660 * pos;
    setSingleCollapsePos(x);
  };

  const handleSample100 = () => {
    const dots = [];
    for (let i = 0; i < 100; i++) {
      const px = 30 + 660 * sampleGaussian();
      const py = 176 - Math.random() * 8;
      dots.push({ cx: px, cy: py });
    }
    setScatterPoints(dots);
  };

  const handleReset = () => {
    setWRun(false);
    setWPhase(0);
    setSingleCollapsePos(null);
    setScatterPoints([]);
  };

  return (
    <section className="active">
      <div className="card">
        <h2>Continuous Wavefunction Evolution vs. Projective Collapse</h2>
        <p className="muted">
          Born's Rule states that spatial probability density is given by <span className="math"><i>P</i>(<i>x</i>) = |ψ(<i>x</i>)|²</span>. Continuous wave packets spread smoothly under Schrödinger evolution, but resolve to single localized coordinates upon detection.
        </p>
        <div className="controls">
          <button className="btn primary" onClick={handleToggleEvolution}>
            {wRun ? 'Pause Wave Evolution' : 'Toggle Wave Evolution'}
          </button>
          <button className="btn green" onClick={handleSingleMeasurement}>
            Single Detection Event
          </button>
          <button className="btn" onClick={handleSample100}>
            Sample 100 Coordinates
          </button>
          <button className="btn warn" onClick={handleReset}>Reset Wave</button>
        </div>
      </div>

      <div className="grid two" style={{ marginTop: '16px' }}>
        {/* Real Component */}
        <div className="card">
          <h3>Wavefunction Real Component Re[ψ(x, t)]</h3>
          <svg viewBox="0 0 720 220">
            <line x1="30" y1="110" x2="690" y2="110" stroke="#cbd5e1" strokeWidth="2" />
            <path d={wD} fill="none" stroke="#2563eb" strokeWidth="3" />
            {singleCollapsePos !== null && (
              <circle cx={singleCollapsePos} cy="110" r="7" fill="#ea580c" opacity="1" />
            )}
          </svg>
        </div>

        {/* Probability Density */}
        <div className="card">
          <h3>Probability Density Distribution |ψ(x)|²</h3>
          <svg viewBox="0 0 720 220">
            <line x1="30" y1="180" x2="690" y2="180" stroke="#cbd5e1" strokeWidth="2" />
            <path d={pD} fill="#93c5fd33" stroke="#2563eb" strokeWidth="3" />

            {/* Collapse line indicator */}
            {singleCollapsePos !== null && (
              <line
                x1={singleCollapsePos}
                y1="20"
                x2={singleCollapsePos}
                y2="180"
                stroke="#dc2626"
                strokeWidth="3"
                opacity="1"
              />
            )}

            {/* Scatter dots */}
            {scatterPoints.map((pt, idx) => (
              <circle key={idx} cx={pt.cx} cy={pt.cy} r="2" fill="#2563eb" opacity="0.6" />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
