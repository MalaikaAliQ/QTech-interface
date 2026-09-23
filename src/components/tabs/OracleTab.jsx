import React, { useState, useEffect, useRef } from 'react';

const aNames = ['Equal Superposition', 'Oracle Phase Inversion', 'Diffusion Reflection', 'Second Iteration'];

const aVals = [
  () => Array(16).fill(0.25),
  () => {
    const a = Array(16).fill(0.25);
    a[7] = -0.25;
    return a;
  },
  () => {
    const a = Array(16).fill(0.1875);
    a[7] = 0.6875;
    return a;
  },
  () => {
    const a = Array(16).fill(0.08);
    a[7] = 0.95;
    return a;
  }
];

const aDescriptions = [
  'Uniform state: every candidate has amplitude α_i = +0.25, probability = 6.25%.',
  'Target state receives phase kickback: α_target -> -0.25. Total probability profile is identical.',
  'Diffusion reflects all amplitudes about the average (μ ≈ 0.218), growing the target amplitude.',
  'Second iteration optimizes amplitude to > 0.95 for near-deterministic readout.'
];

export default function OracleTab() {
  const [stage, setStage] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const autoIntervalRef = useRef(null);

  const handleNext = () => {
    setStage((prev) => (prev + 1) % 4);
  };

  const handleReset = () => {
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
    }
    setIsAuto(false);
    setStage(0);
  };

  const handleAutoCycle = () => {
    if (isAuto) {
      if (autoIntervalRef.current) clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
      setIsAuto(false);
    } else {
      setIsAuto(true);
      autoIntervalRef.current = setInterval(() => {
        setStage((prev) => (prev + 1) % 4);
      }, 1300);
    }
  };

  useEffect(() => {
    return () => {
      if (autoIntervalRef.current) clearInterval(autoIntervalRef.current);
    };
  }, []);

  const amps = aVals[stage]();

  return (
    <section className="active">
      <div className="card">
        <h2>Oracle Phase Mark & Diffusion Operator</h2>
        <p className="muted">
          The Oracle operator <span className="math"><b>U</b><sub>ω</sub> = <b>I</b> − 2|ω⟩⟨ω|</span> flips the target amplitude's sign. The Diffusion operator <span className="math">2|ψ⟩⟨ψ| − <b>I</b></span> reflects all amplitudes about the average.
        </p>
        <div className="controls">
          <button className="btn primary" onClick={handleNext}>Next Step</button>
          <button className={`btn ${isAuto ? 'warn' : ''}`} onClick={handleAutoCycle}>
            {isAuto ? 'Stop Auto' : 'Auto Cycle'}
          </button>
          <button className="btn warn" onClick={handleReset}>Reset</button>
          <div className="stat" style={{ padding: '6px 14px' }}>
            <div className="label">Stage</div>
            <div className="value" style={{ fontSize: '1rem' }}>
              {aNames[stage]}
            </div>
          </div>
        </div>
      </div>

      <div className="grid two" style={{ marginTop: '16px' }}>
        <div className="card">
          <h3>Amplitude Distribution (16 Basis States)</h3>
          <div className="amps">
            {amps.map((v, i) => {
              const height = Math.max(4, Math.abs(v) * 140);
              const isNeg = v < 0;
              const isMarked = i === 7;
              return (
                <div key={i} className="acol">
                  <div
                    className={`bar ${isNeg ? 'neg' : ''}`}
                    style={{
                      height: `${height}px`,
                      outline: isMarked ? '2px solid var(--gold)' : 'none'
                    }}
                  />
                  <div className="alabel">{i + 1}</div>
                </div>
              );
            })}
          </div>
          <p className="muted" style={{ marginTop: '12px' }}>
            {aDescriptions[stage]}
          </p>
        </div>

        <div className="card">
          <h3>Mathematical Progression</h3>
          <p>
            1. <b>Uniform State:</b> <span className="math">|ψ⟩ = <b>H</b><sup>⊗4</sup>|0000⟩</span>, where each basis state amplitude is <span className="math">α<sub>i</sub> = +0.25</span>.
          </p>
          <p style={{ marginTop: '8px' }}>
            2. <b>Phase Inversion:</b> <span className="math"><b>U</b><sub>ω</sub>|target⟩ = −0.25|target⟩</span>. Amplitudes change sign; measurement probabilities remain temporarily identical.
          </p>
          <p style={{ marginTop: '8px' }}>
            3. <b>Inversion About the Mean:</b> <span className="math">α<sub>i</sub>′ = 2⟨α⟩ − α<sub>i</sub></span>. The negative target amplitude gets boosted far above the non-marked baseline.
          </p>
          <p className="note" style={{ marginTop: '12px' }}>
            After <span className="math">≈ (π/4)√N</span> iterations, the target amplitude approaches 1, producing near-deterministic measurement success.
          </p>
        </div>
      </div>
    </section>
  );
}
