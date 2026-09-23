import React from 'react';

const tabs = [
  { id: 'home', label: 'Overview' },
  { id: 'nature', label: '✦ Nature is Quantum (3D VR)', style: { color: 'var(--purple)', fontWeight: 700 } },
  { id: 'search', label: 'Search Puzzle' },
  { id: 'oracle', label: 'Oracle & Amplification' },
  { id: 'measure', label: 'Beam Splitter & Circuit' },
  { id: 'collapse', label: 'Wavefunction Collapse' },
  { id: 'bits', label: 'QRNG → OTP' },
  { id: 'streams', label: '5 Quantum Streams Flowchart' }
];

export default function HeaderNav({ activeTab, setActiveTab }) {
  return (
    <>
      <header className="hero">
        <div className="eyebrow">Interactive Quantum Laboratory</div>
        <h1>Quantum Technology Foundations & Cross-Discipline Mapper</h1>
        <p>
          Explore search algorithms, spatial-qubit measurement, probability collapse, and trace how each experiment feeds into the 5 primary branches of modern quantum technology.
        </p>
      </header>

      <nav className="sticky-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            style={tab.style}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </>
  );
}
