import React, { useState } from 'react';

const streamData = {
  qc: {
    title: 'Stream 1: Quantum Computing',
    desc: 'Applies coherent state vectors and unitary gate operations to achieve asymptotic speedups. The Beam Splitter serves as the foundational single-qubit Hadamard gate (H), while Grover search exemplifies quantum amplitude amplification.',
    lab: 'Search & Grover Tabs',
    hw: 'Superconducting Qubits / Trapped Ions',
    cross: 'Simulation & Quantum Networks',
    color: 'var(--blue)'
  },
  comm: {
    title: 'Stream 2: Quantum Communication & Cryptography',
    desc: 'Exploits the no-cloning theorem and projective measurement collapse. By preparing spatial or polarization qubits with beam splitters and recording photon detector clicks, Alice and Bob exchange information-theoretically secure keys (QKD) and true random seeds (QRNG).',
    lab: 'Beam Splitter & QRNG Tabs',
    hw: 'Single-Photon Detectors / Fiber Optics',
    cross: 'Quantum Networks & Sensing',
    color: 'var(--green)'
  },
  sense: {
    title: 'Stream 3: Quantum Sensing & Metrology',
    desc: 'Uses non-classical phase sensitivity to exceed the Standard Quantum Limit (SQL). Splitting and recombining coherent paths allows ultra-precise tracking of gravitational, magnetic, or inertial phase shifts.',
    lab: 'Wavefunction & Splitter Tabs',
    hw: 'Cold Atom Interferometers / NV Centers',
    cross: 'Communication & Computing',
    color: 'var(--orange)'
  },
  sim: {
    title: 'Stream 4: Quantum Simulation',
    desc: 'Directly models correlated quantum systems where classical computational memory fails exponentially. Employs programmable spatial lattices and Hamiltonian time evolution to design high-Tc superconductors and chemical catalysts.',
    lab: 'Wave Evolution Tab',
    hw: 'Neutral Atom Optical Tweezers / Photonics',
    cross: 'Computing & Materials Engineering',
    color: 'var(--purple)'
  },
  net: {
    title: 'Stream 5: Quantum Networks & Distributed Systems',
    desc: 'Interlinks independent quantum processors via optical links and quantum repeaters. Entanglement swapping protocols distribute coherent states over global baselines for distributed cloud computing and baseline telescope interferometry.',
    lab: 'Circuit & Splitter Tabs',
    hw: 'Quantum Memories / Frequency Converters',
    cross: 'Communication & Computing',
    color: 'var(--cyan)'
  }
};

export default function StreamsTab() {
  const [activeStream, setActiveStream] = useState('qc');
  const current = streamData[activeStream];

  return (
    <section className="active">
      <div className="card">
        <h2>The 5 Quantum Streams & Interdisciplinary Map</h2>
        <p className="muted">
          Select any branch below to view how the laboratory experiments directly map into each sector, and observe the shared technological foundation uniting all 5 disciplines.
        </p>
      </div>

      {/* Interactive Stream Nodes */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          marginTop: '16px'
        }}
      >
        <div
          className={`stream-node ${activeStream === 'qc' ? 'active' : ''}`}
          onClick={() => setActiveStream('qc')}
        >
          <span className="stream-badge" style={{ background: '#eff6ff', color: 'var(--blue)' }}>
            Stream 1
          </span>
          <h3 style={{ marginTop: '8px' }}>Quantum Computing</h3>
          <p className="muted" style={{ fontSize: '.82rem' }}>
            Algorithms, error mitigation, unitary registers.
          </p>
        </div>

        <div
          className={`stream-node ${activeStream === 'comm' ? 'active' : ''}`}
          onClick={() => setActiveStream('comm')}
        >
          <span className="stream-badge" style={{ background: '#ecfdf5', color: 'var(--green)' }}>
            Stream 2
          </span>
          <h3 style={{ marginTop: '8px' }}>Quantum Comm. & QKD</h3>
          <p className="muted" style={{ fontSize: '.82rem' }}>
            Single-photon BB84, beam splitting, no-cloning.
          </p>
        </div>

        <div
          className={`stream-node ${activeStream === 'sense' ? 'active' : ''}`}
          onClick={() => setActiveStream('sense')}
        >
          <span className="stream-badge" style={{ background: '#fff7ed', color: 'var(--orange)' }}>
            Stream 3
          </span>
          <h3 style={{ marginTop: '8px' }}>Sensing & Metrology</h3>
          <p className="muted" style={{ fontSize: '.82rem' }}>
            Interferometry, phase sensitivity beyond shot-noise.
          </p>
        </div>

        <div
          className={`stream-node ${activeStream === 'sim' ? 'active' : ''}`}
          onClick={() => setActiveStream('sim')}
        >
          <span className="stream-badge" style={{ background: '#f5f3ff', color: 'var(--purple)' }}>
            Stream 4
          </span>
          <h3 style={{ marginTop: '8px' }}>Quantum Simulation</h3>
          <p className="muted" style={{ fontSize: '.82rem' }}>
            Many-body physics, molecular orbitals, Hamiltonians.
          </p>
        </div>

        <div
          className={`stream-node ${activeStream === 'net' ? 'active' : ''}`}
          onClick={() => setActiveStream('net')}
        >
          <span className="stream-badge" style={{ background: '#ecfeff', color: 'var(--cyan)' }}>
            Stream 5
          </span>
          <h3 style={{ marginTop: '8px' }}>Quantum Networks</h3>
          <p className="muted" style={{ fontSize: '.82rem' }}>
            Entanglement repeaters, quantum memory buffers.
          </p>
        </div>
      </div>

      {/* Dynamic Flowchart SVG */}
      <div className="card" style={{ marginTop: '16px' }}>
        <h3>Interactive Architecture & Interconnection Flowchart</h3>
        <svg viewBox="0 0 960 480">
          <rect width="960" height="480" fill="#f8fafc" rx="14" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Top Lab Experiments Box */}
          <g transform="translate(40, 25)">
            <rect width="880" height="90" rx="10" fill="#fff" stroke="#cbd5e1" strokeDasharray="4,4" />
            <text x="20" y="25" fontSize="11" fontWeight="700" fill="#64748b" textTransform="uppercase">
              Lab Experiments (Demonstrated Above)
            </text>

            <rect x="30" y="38" width="180" height="38" rx="6" fill="#eff6ff" stroke="#93c5fd" />
            <text x="120" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb">
              Search & Grover Oracle
            </text>

            <rect x="250" y="38" width="180" height="38" rx="6" fill="#eff6ff" stroke="#93c5fd" />
            <text x="340" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb">
              50:50 Beam Splitter (H)
            </text>

            <rect x="470" y="38" width="180" height="38" rx="6" fill="#eff6ff" stroke="#93c5fd" />
            <text x="560" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb">
              Wave Packet Collapse
            </text>

            <rect x="690" y="38" width="160" height="38" rx="6" fill="#eff6ff" stroke="#93c5fd" />
            <text x="770" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb">
              QRNG Entropy & OTP
            </text>
          </g>

          {/* Connectors */}
          <g stroke="#94a3b8" strokeWidth="2" fill="none">
            <path d="M 160 115 L 130 200" />
            <path d="M 380 115 L 310 200" />
            <path d="M 380 115 L 490 200" />
            <path d="M 600 115 L 670 200" />
            <path d="M 810 115 L 310 200" />
            <path d="M 810 115 L 850 200" />
          </g>

          {/* 5 Streams Nodes */}
          <g transform="translate(0, 200)">
            <g transform="translate(45, 0)">
              <rect
                width="160"
                height="75"
                rx="8"
                fill="#fff"
                stroke="#2563eb"
                strokeWidth={activeStream === 'qc' ? '3.5' : '2'}
              />
              <text x="80" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
                1. Quantum Computing
              </text>
              <text x="80" y="52" textAnchor="middle" fontSize="10" fill="#64748b">
                Algorithms & Logic
              </text>
            </g>

            <g transform="translate(230, 0)">
              <rect
                width="160"
                height="75"
                rx="8"
                fill="#fff"
                stroke="#059669"
                strokeWidth={activeStream === 'comm' ? '3.5' : '2'}
              />
              <text x="80" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
                2. Quantum Comm.
              </text>
              <text x="80" y="52" textAnchor="middle" fontSize="10" fill="#64748b">
                QKD & Secure Keys
              </text>
            </g>

            <g transform="translate(415, 0)">
              <rect
                width="160"
                height="75"
                rx="8"
                fill="#fff"
                stroke="#ea580c"
                strokeWidth={activeStream === 'sense' ? '3.5' : '2'}
              />
              <text x="80" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
                3. Sensing & Metrology
              </text>
              <text x="80" y="52" textAnchor="middle" fontSize="10" fill="#64748b">
                Phase Estimation
              </text>
            </g>

            <g transform="translate(600, 0)">
              <rect
                width="160"
                height="75"
                rx="8"
                fill="#fff"
                stroke="#7c3aed"
                strokeWidth={activeStream === 'sim' ? '3.5' : '2'}
              />
              <text x="80" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
                4. Quantum Simulation
              </text>
              <text x="80" y="52" textAnchor="middle" fontSize="10" fill="#64748b">
                Materials & Chemistry
              </text>
            </g>

            <g transform="translate(775, 0)">
              <rect
                width="150"
                height="75"
                rx="8"
                fill="#fff"
                stroke="#0891b2"
                strokeWidth={activeStream === 'net' ? '3.5' : '2'}
              />
              <text x="75" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
                5. Quantum Networks
              </text>
              <text x="75" y="52" textAnchor="middle" fontSize="10" fill="#64748b">
                Distributed Entanglement
              </text>
            </g>
          </g>

          {/* Shared Bus */}
          <g stroke="#3b82f6" strokeWidth="1.8" strokeDasharray="3,3">
            <line x1="125" y1="290" x2="850" y2="290" />
            <line x1="125" y1="275" x2="125" y2="340" />
            <line x1="310" y1="275" x2="310" y2="340" />
            <line x1="495" y1="275" x2="495" y2="340" />
            <line x1="680" y1="275" x2="680" y2="340" />
            <line x1="850" y1="275" x2="850" y2="340" />
          </g>
          <text x="480" y="306" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b82f6">
            SHARED INTER-STREAM ENTANGLEMENT & INTERFERENCE BUS
          </text>

          {/* Bottom Foundation */}
          <g transform="translate(40, 350)">
            <rect width="880" height="95" rx="10" fill="#1e293b" />
            <text x="440" y="28" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f8fafc">
              Interdisciplinary Technology Foundation
            </text>
            <text x="440" y="52" textAnchor="middle" fontSize="11" fill="#94a3b8">
              Optics & Photonics • Low-Noise RF Electronics • Cryogenics & Ultra-High Vacuum • Materials Science • Information Theory
            </text>
            <text x="440" y="74" textAnchor="middle" fontSize="10" fill="#64748b">
              Advances in single-photon detectors (Optics) or FPGA pulse controllers (Electronics) benefit all 5 streams simultaneously.
            </text>
          </g>
        </svg>
      </div>

      {/* Dynamic Stream Details Card */}
      <div className="card" style={{ marginTop: '16px' }}>
        <h3 style={{ color: current.color }}>{current.title}</h3>
        <p>{current.desc}</p>
        <div className="grid three" style={{ marginTop: '12px' }}>
          <div className="stat">
            <div className="label">Lab Precursor</div>
            <div className="value" style={{ fontSize: '1rem' }}>
              {current.lab}
            </div>
          </div>
          <div className="stat">
            <div className="label">Core Hardware</div>
            <div className="value" style={{ fontSize: '1rem' }}>
              {current.hw}
            </div>
          </div>
          <div className="stat">
            <div className="label">Overlapping Stream</div>
            <div className="value" style={{ fontSize: '1rem' }}>
              {current.cross}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
