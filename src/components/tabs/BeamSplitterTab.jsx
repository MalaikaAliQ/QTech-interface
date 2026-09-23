import React, { useState } from 'react';

export default function BeamSplitterTab({ qrngBits = [], onBitGenerated, onNavigateToBits }) {
  const [photonFired, setPhotonFired] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [outcome, setOutcome] = useState(null); // 0 or 1

  const handleEmitPhoton = () => {
    setPhotonFired(true);
    setCollapsed(false);
    setOutcome(null);
  };

  const handleTriggerDetectors = () => {
    if (!photonFired || collapsed) return;
    const result = Math.random() < 0.5 ? 0 : 1;
    setOutcome(result);
    setCollapsed(true);

    // Feed generated quantum bit directly into QRNG OTP entropy pool
    if (onBitGenerated) {
      onBitGenerated(result);
    }
  };

  const handleReset = () => {
    setPhotonFired(false);
    setCollapsed(false);
    setOutcome(null);
  };

  // SVG parameters based on state
  let packetCX = 62;
  let split0Opacity = 0;
  let split1Opacity = 0;
  let split0CX = 280;
  let split0CY = 160;
  let split1CX = 280;
  let split1CY = 160;
  let d0FlashOpacity = 0;
  let d1FlashOpacity = 0;

  let stateMathText = 'State: |ψ⟩ = |0⟩';
  let amplDisplayText = 'α = 1.0, β = 0.0';
  let detectorEventText = '—';
  let cBitOutText = '—';
  let classicalOutText = 'c = ?';

  if (photonFired && !collapsed) {
    packetCX = 280;
    split0Opacity = 0.8;
    split1Opacity = 0.8;
    split0CX = 480;
    split0CY = 65;
    split1CX = 480;
    split1CY = 255;
    stateMathText = 'State: |ψ⟩ = (|0⟩ + |1⟩) / √2';
    amplDisplayText = 'α = 1/√2, β = 1/√2';
    detectorEventText = 'In Superposition…';
    cBitOutText = 'Superposed';
    classicalOutText = 'c = ?';
  } else if (photonFired && collapsed) {
    packetCX = 280;
    split0CX = 480;
    split0CY = 65;
    split1CX = 480;
    split1CY = 255;

    if (outcome === 0) {
      split0Opacity = 1;
      split1Opacity = 0;
      d0FlashOpacity = 1;
      d1FlashOpacity = 0;
      detectorEventText = 'Detector 0 Triggered';
      cBitOutText = '0';
      classicalOutText = 'c = 0';
      stateMathText = 'Collapsed State: |ψ⟩ = |0⟩';
      amplDisplayText = 'α = 1.0, β = 0.0';
    } else {
      split0Opacity = 0;
      split1Opacity = 1;
      d0FlashOpacity = 0;
      d1FlashOpacity = 1;
      detectorEventText = 'Detector 1 Triggered';
      cBitOutText = '1';
      classicalOutText = 'c = 1';
      stateMathText = 'Collapsed State: |ψ⟩ = |1⟩';
      amplDisplayText = 'α = 0.0, β = 1.0';
    }
  }

  return (
    <section className="active">
      <div className="card">
        <h2>Spatial Qubit: 50:50 Beam Splitter & Circuit Representation</h2>
        <p className="muted">
          An attenuated single-photon source outputs mode <span className="math">|0⟩</span>. The 50:50 square beam splitter cube implements a Hadamard unitary transform <span className="math"><b>H</b></span>, creating an equal spatial superposition. Single-Photon Avalanche Detectors (SPADs) force a projective measurement, feeding bits directly into the <b>QRNG One-Time Pad (OTP) key generator</b>.
        </p>
        <div className="controls">
          <button className="btn primary" onClick={handleEmitPhoton}>
            1. Fire Single Photon (|0⟩)
          </button>
          <button
            className={`btn green ${!photonFired || collapsed ? 'disabled' : ''}`}
            onClick={handleTriggerDetectors}
            disabled={!photonFired || collapsed}
            style={{ opacity: !photonFired || collapsed ? 0.6 : 1 }}
          >
            2. Trigger Detectors (Collapse & Push Bit to QRNG)
          </button>
          <button className="btn warn" onClick={handleReset}>Reset Bench</button>
          {onNavigateToBits && (
            <button
              className="btn"
              onClick={onNavigateToBits}
              style={{ marginLeft: 'auto', background: '#f5f3ff', borderColor: '#c4b5fd', color: 'var(--purple)' }}
            >
              View QRNG & OTP Key ({qrngBits.length}/32 bits) →
            </button>
          )}
        </div>

        {collapsed && outcome !== null && (
          <div className="note" style={{ marginTop: '10px', background: '#f0fdf4', borderColor: '#4ade80', color: '#166534' }}>
            <b>✓ QRNG Entropy Registered:</b> Single photon measurement yielded bit <b>{outcome}</b>, automatically recorded into the QRNG registry ({qrngBits.length}/32 bits acquired for OTP generation).
          </div>
        )}
      </div>

      <div className="grid two" style={{ marginTop: '16px' }}>
        {/* Physical Optical Bench */}
        <div className="card">
          <h3>Physical Implementation: Optical Bench</h3>
          <svg viewBox="0 0 600 320">
            <rect x="10" y="10" width="580" height="300" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="50" y1="160" x2="280" y2="160" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4,4" />

            {/* Square 50:50 Beam Splitter Cube */}
            <g transform="translate(250, 130)">
              {/* Outer Square Cube Body */}
              <rect x="0" y="0" width="60" height="60" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
              {/* Internal Semi-Reflective Beam Splitting Coating Interface */}
              <line x1="0" y1="60" x2="60" y2="0" stroke="#0369a1" strokeWidth="2" strokeDasharray="3,2" />
              {/* Corner Glare Highlights for glass cube appearance */}
              <path d="M 6 6 L 18 6 L 6 18 Z" fill="rgba(255,255,255,0.6)" />
            </g>
            <text x="280" y="225" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="700">
              50:50 Beam Splitter Cube (BS)
            </text>

            {/* Paths to D0 and D1 */}
            <line x1="280" y1="160" x2="480" y2="65" stroke="#c4b5fd" strokeWidth="3" strokeDasharray="4,4" />
            <line x1="280" y1="160" x2="480" y2="255" stroke="#99f6e4" strokeWidth="3" strokeDasharray="4,4" />

            {/* Single Photon Source */}
            <rect x="35" y="135" width="55" height="50" rx="8" fill="#1e293b" />
            <text x="62" y="162" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
              Source
            </text>
            <text x="62" y="176" textAnchor="middle" fill="#94a3b8" fontSize="9">
              |0⟩ Input
            </text>

            {/* Detector 0 */}
            <rect x="480" y="40" width="65" height="50" rx="8" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
            <text x="512" y="65" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">
              Detector 0
            </text>
            <text x="512" y="80" textAnchor="middle" fontSize="10" fill="#64748b">
              Mode |0⟩
            </text>

            {/* Detector 1 */}
            <rect x="480" y="230" width="65" height="50" rx="8" fill="#fff" stroke="#0891b2" strokeWidth="2" />
            <text x="512" y="255" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0891b2">
              Detector 1
            </text>
            <text x="512" y="270" textAnchor="middle" fontSize="10" fill="#64748b">
              Mode |1⟩
            </text>

            {/* Click Flash Indicators */}
            <circle cx="512" cy="65" r="22" fill="#10b981" opacity={d0FlashOpacity} style={{ transition: 'opacity 0.2s ease' }} />
            <circle cx="512" cy="255" r="22" fill="#10b981" opacity={d1FlashOpacity} style={{ transition: 'opacity 0.2s ease' }} />

            {/* Photon Packets */}
            <circle cx={packetCX} cy="160" r="8" fill="#ea580c" style={{ transition: 'all 0.4s ease' }} />
            <circle cx={split0CX} cy={split0CY} r="6" fill="#7c3aed" opacity={split0Opacity} style={{ transition: 'all 0.4s ease' }} />
            <circle cx={split1CX} cy={split1CY} r="6" fill="#0891b2" opacity={split1Opacity} style={{ transition: 'all 0.4s ease' }} />
          </svg>
        </div>

        {/* Quantum Circuit Diagram */}
        <div className="card">
          <h3>Quantum Circuit Model Equivalent</h3>
          <svg viewBox="0 0 600 320">
            <rect x="10" y="10" width="580" height="300" rx="12" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />

            <line x1="80" y1="110" x2="350" y2="110" stroke="#334155" strokeWidth="3" />
            <text x="50" y="116" fontSize="18" fontWeight="800" fill="#0f172a">
              |0⟩
            </text>

            {/* Hadamard Gate */}
            <rect x="170" y="75" width="70" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
            <text x="205" y="118" textAnchor="middle" fontSize="22" fontWeight="800" fill="#2563eb">
              H
            </text>
            <text x="205" y="165" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
              Hadamard (BS)
            </text>

            {/* Measurement Meter */}
            <rect x="350" y="75" width="70" height="70" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="2.5" />
            <path d="M 365 130 A 25 25 0 0 1 405 130" fill="none" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="385" y1="130" x2="400" y2="95" stroke="#dc2626" strokeWidth="2.5" />
            <text x="385" y="165" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
              Measurement
            </text>

            {/* Classical Output Lines */}
            <line x1="420" y1="105" x2="510" y2="105" stroke="#64748b" strokeWidth="2" />
            <line x1="420" y1="115" x2="510" y2="115" stroke="#64748b" strokeWidth="2" />
            <text x="530" y="115" fontSize="16" fontWeight="800" fill="#2563eb">
              {classicalOutText}
            </text>

            {/* Math state description */}
            <g transform="translate(30, 220)">
              <rect width="540" height="50" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
              <text x="270" y="31" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">
                {stateMathText}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <div className="grid three" style={{ marginTop: '16px' }}>
        <div className="stat">
          <div className="label">Superposition Vector</div>
          <div className="value" style={{ fontSize: '1.05rem' }}>
            {amplDisplayText}
          </div>
        </div>
        <div className="stat">
          <div className="label">Detection Event</div>
          <div className="value">{detectorEventText}</div>
        </div>
        <div className="stat">
          <div className="label">Output Classical Bit</div>
          <div className="value">{cBitOutText}</div>
        </div>
      </div>
    </section>
  );
}
