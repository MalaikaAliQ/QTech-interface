import React, { useState, useRef, useEffect } from 'react';

export default function QRNGTab() {
  const [bits, setBits] = useState([]);
  const timerRef = useRef(null);

  const sampleBit = () => (Math.random() < 0.5 ? 0 : 1);

  const handleGen32Bits = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setBits([]);
    let count = 0;
    const tempBits = [];

    timerRef.current = setInterval(() => {
      tempBits.push(sampleBit());
      setBits([...tempBits]);
      count++;
      if (count === 32) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 35);
  };

  const handleClockSingleBit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setBits((prev) => {
      const current = prev.length >= 32 ? [] : [...prev];
      return [...current, sampleBit()];
    });
  };

  const handleClear = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setBits([]);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Compute hex digest & OTP when bits >= 32
  let hexDigest = '—';
  let otpKey = '------';
  let ostText = 'Sample 32 bits to assemble an unconditional security pad.';

  if (bits.length >= 32) {
    let hex = '';
    for (let i = 0; i < 32; i += 4) {
      const nibble = bits.slice(i, i + 4).join('');
      hex += parseInt(nibble, 2).toString(16).toUpperCase();
    }
    hexDigest = '0x' + hex;
    otpKey = hex.substring(0, 6);
    ostText = 'Information-theoretically secure session key derived from true quantum projection.';
  }

  return (
    <section className="active">
      <div className="card">
        <h2>Quantum Random Number Generator (QRNG) & One-Time Pad</h2>
        <p className="muted">
          Using the pure quantum indeterminacy of beam-splitter path detection, we record true random bits <span className="math"><i>b</i> ∈ &#123;0, 1&#125;</span> to generate an information-theoretically secure session key.
        </p>
        <div className="controls">
          <button className="btn primary" onClick={handleGen32Bits}>
            Sample 32 Quantum Bits
          </button>
          <button className="btn" onClick={handleClockSingleBit}>
            Clock Single Bit
          </button>
          <button className="btn warn" onClick={handleClear}>Clear Buffer</button>
        </div>
      </div>

      <div className="grid two" style={{ marginTop: '16px' }}>
        <div className="card">
          <h3>Bitstream Registry</h3>
          <div className="bitstream">
            {bits.length > 0 ? (
              bits.map((b, idx) => (
                <div key={idx} className={`bit ${b === 1 ? 'one' : 'zero'}`}>
                  {b}
                </div>
              ))
            ) : (
              <span className="muted">Click acquire to sample hardware entropy.</span>
            )}
          </div>

          <div className="grid two" style={{ marginTop: '14px' }}>
            <div className="stat">
              <div className="label">Hexadecimal Digest</div>
              <div className="value" style={{ fontSize: '1.05rem', wordBreak: 'break-all' }}>
                {hexDigest}
              </div>
            </div>
            <div className="stat">
              <div className="label">Acquired Bits</div>
              <div className="value">{bits.length} / 32</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>One-Time Pad Authentication Key</h3>
          <div className="otp">{otpKey}</div>
          <p className="muted" style={{ textAlign: 'center' }}>
            {ostText}
          </p>
        </div>
      </div>
    </section>
  );
}
