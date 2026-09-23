import React from 'react';

export default function OverviewTab() {
  return (
    <section className="active">
      <div className="grid two">
        <div className="card">
          <h2>Laboratory Modules</h2>
          <p>This lab demonstrates the direct bridge from single-qubit quantum states to practical computing, cryptography, and sensing.</p>
          <div className="grid three" style={{ marginTop: '14px' }}>
            <div className="stat">
              <div className="label">Algorithms</div>
              <div className="value">
                <i>O</i>(√<i>N</i>)
              </div>
              <small className="muted">Interference & Oracle inversion</small>
            </div>
            <div className="stat">
              <div className="label">Optics</div>
              <div className="value">50:50 Splitter</div>
              <small className="muted">Hadamard unitary gate</small>
            </div>
            <div className="stat">
              <div className="label">Entropy</div>
              <div className="value">True Random</div>
              <small className="muted">Born rule projection</small>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Core Principles Demonstrated</h2>
          <p className="note">
            <b>1. Superposition is not classical parallel checking.</b> A quantum register maintains probability amplitudes that constructively and destructively interfere before detection.
          </p>
          <p className="note" style={{ marginTop: '8px' }}>
            <b>2. Measurement is non-deterministic and projective.</b> A single photon in coherent superposition across two spatial modes will only trigger one detector, yielding exactly one classical bit.
          </p>
        </div>
      </div>
    </section>
  );
}
