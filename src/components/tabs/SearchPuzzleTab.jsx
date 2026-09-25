import React, { useState, useEffect, useRef } from 'react';

export default function SearchPuzzleTab() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 16));

  // Classical Search State
  const [classicalIndex, setClassicalIndex] = useState(-1);
  const [classicalSteps, setClassicalSteps] = useState(0);
  const [classicalStatus, setClassicalStatus] = useState('Ready.');
  const [classicalFound, setClassicalFound] = useState(false);
  const classicalTimerRef = useRef(null);

  // Quantum Search State
  const [quantumAmplitudes, setQuantumAmplitudes] = useState(() => Array(16).fill(0.25));
  const [quantumSteps, setQuantumSteps] = useState('0');
  const [quantumTime, setQuantumTime] = useState('0.00');
  const [quantumStatus, setQuantumStatus] = useState('Initialized: uniform state |ψ⟩ = 1/4 Σ |x⟩.');
  const [quantumHit, setQuantumHit] = useState(false);
  const quantumTimeoutsRef = useRef([]);

  // Reset function
  const resetSearch = (newTargetVal) => {
    if (classicalTimerRef.current) clearInterval(classicalTimerRef.current);
    classicalTimerRef.current = null;

    quantumTimeoutsRef.current.forEach(clearTimeout);
    quantumTimeoutsRef.current = [];

    setClassicalIndex(-1);
    setClassicalSteps(0);
    setClassicalStatus('Ready.');
    setClassicalFound(false);

    setQuantumAmplitudes(Array(16).fill(0.25));
    setQuantumSteps('0');
    setQuantumTime('0.00');
    setQuantumStatus('Initialized: uniform state |ψ⟩ = 1/4 Σ |x⟩.');
    setQuantumHit(false);

    if (typeof newTargetVal === 'number') {
      setTarget(newTargetVal);
    }
  };

  // Run Classical Linear Search
  const runClassical = () => {
    if (classicalTimerRef.current || classicalFound) return;
    let idx = 0;
    classicalTimerRef.current = setInterval(() => {
      setClassicalIndex(idx);
      setClassicalSteps(idx + 1);

      if (idx === target) {
        setClassicalFound(true);
        setClassicalStatus(`Target state |${idx + 1}⟩ located after ${idx + 1} steps.`);
        clearInterval(classicalTimerRef.current);
        classicalTimerRef.current = null;
      } else {
        idx++;
      }
    }, 240);
  };

  // Run Quantum Evolution
  const runQuantum = () => {
    if (quantumTimeoutsRef.current.length > 0 || quantumHit) return;

    const equal = Array(16).fill(0.25);
    const marked = [...equal];
    marked[target] = -0.25;

    const diff = Array(16).fill(0.1875);
    diff[target] = 0.6875;

    const finalAmps = Array(16).fill(0.08);
    finalAmps[target] = 0.95;

    setQuantumAmplitudes(equal);

    const t1 = setTimeout(() => {
      setQuantumSteps('1 (Oracle)');
      setQuantumTime('0.15');
      setQuantumAmplitudes(marked);
      setQuantumStatus('Oracle applied: negative phase on |target⟩. Probabilities remain 6.25%.');
    }, 600);

    const t2 = setTimeout(() => {
      setQuantumSteps('1 (Diffusion)');
      setQuantumTime('0.30');
      setQuantumAmplitudes(diff);
      setQuantumStatus('Diffusion complete: constructive interference elevates marked state.');
    }, 1300);

    const t3 = setTimeout(() => {
      setQuantumSteps('2 (Final Amplification)');
      setQuantumTime('0.50');
      setQuantumAmplitudes(finalAmps);
      setQuantumHit(true);
      setQuantumStatus('Target state probability reaches ~90%. Ready for single measurement.');
      quantumTimeoutsRef.current = [];
    }, 2000);

    quantumTimeoutsRef.current = [t1, t2, t3];
  };

  const handleNewTarget = () => {
    const newT = Math.floor(Math.random() * 16);
    resetSearch(newT);
  };

  useEffect(() => {
    return () => {
      if (classicalTimerRef.current) clearInterval(classicalTimerRef.current);
      quantumTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const targetProbPct = (quantumAmplitudes[target] ** 2 * 100).toFixed(1);

  return (
    <section className="active">
      <div className="card">
        <h2>Search Puzzle: Classical Sequential vs. Grover Coherence</h2>
        <p className="muted">
          Compare sequential searching across 16 elements against a 4-qubit register evolving all 16 amplitudes simultaneously.
        </p>
        <div className="controls">
          <button className="btn" onClick={handleNewTarget}>New Target</button>
          <button className="btn primary" onClick={runClassical}>Run Classical Search</button>
          <button className="btn primary" onClick={runQuantum}>Run Quantum Evolution</button>
          <button className="btn warn" onClick={() => resetSearch()}>Reset</button>
        </div>
      </div>

      <div className="grid two" style={{ marginTop: '16px' }}>
        {/* Classical Scan */}
        <div className="card">
          <h3>Classical: Linear Scan</h3>
          <p className="muted">{classicalStatus}</p>
          <div className="boxes">
            {Array.from({ length: 16 }, (_, i) => {
              const isChecked = i === classicalIndex;
              const isHit = isChecked && i === target;
              return (
                <div
                  key={i}
                  className={`box ${isHit ? 'hit target' : ''}`}
                  style={{ background: isChecked && !isHit ? '#eff6ff' : '#fff' }}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
          <div className="grid two" style={{ marginTop: '14px' }}>
            <div className="stat">
              <div className="label">Elements Checked</div>
              <div className="value">{classicalSteps}</div>
            </div>
            <div className="stat">
              <div className="label">Time (Illustrative)</div>
              <div className="value">{(classicalSteps * 0.25).toFixed(2)} s</div>
            </div>
          </div>
        </div>

        {/* Quantum Coherent Register */}
        <div className="card">
          <h3>Quantum: Coherent Register</h3>
          <p className="muted">{quantumStatus}</p>
          <div className="boxes">
            {Array.from({ length: 16 }, (_, i) => {
              const a = quantumAmplitudes[i];
              const pct = (a * a * 100).toFixed(1);
              const isTargetBox = i === target && (quantumSteps !== '0' || quantumHit);
              const isHitBox = i === target && quantumHit;
              const barWidth = Math.min(100, Math.max(4, Math.abs(a) * 100));
              const barBg = a < 0 ? '#dc2626' : '#2563eb';

              return (
                <div
                  key={i}
                  className={`box super ${isTargetBox ? 'target' : ''} ${isHitBox ? 'hit' : ''}`}
                >
                  {i + 1}
                  <div className="qprob">{pct}%</div>
                  <div className="qamp">
                    <span style={{ width: `${barWidth}%`, background: barBg }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid three" style={{ marginTop: '14px' }}>
            <div className="stat">
              <div className="label">Grover Iterations</div>
              <div className="value">{quantumSteps}</div>
            </div>
            <div className="stat">
              <div className="label">Time (Illustrative)</div>
              <div className="value">{quantumTime} s</div>
            </div>
            <div className="stat">
              <div className="label">Target Probability |α|²</div>
              <div className="value">{targetProbPct}%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
