import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import OverviewTab from './components/tabs/OverviewTab';
import NatureVRTab from './components/tabs/NatureVRTab';
import SearchPuzzleTab from './components/tabs/SearchPuzzleTab';
import OracleTab from './components/tabs/OracleTab';
import BeamSplitterTab from './components/tabs/BeamSplitterTab';
import WavefunctionTab from './components/tabs/WavefunctionTab';
import QRNGTab from './components/tabs/QRNGTab';
import StreamsTab from './components/tabs/StreamsTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [qrngBits, setQrngBits] = useState([]);

  const handleBitGenerated = (bit) => {
    setQrngBits((prev) => (prev.length >= 32 ? [bit] : [...prev, bit]));
  };

  return (
    <div className="wrap">
      <HeaderNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === 'home' && <OverviewTab />}
        {activeTab === 'nature' && <NatureVRTab />}
        {activeTab === 'search' && <SearchPuzzleTab />}
        {activeTab === 'oracle' && <OracleTab />}
        {activeTab === 'measure' && (
          <BeamSplitterTab
            qrngBits={qrngBits}
            onBitGenerated={handleBitGenerated}
            onNavigateToBits={() => setActiveTab('bits')}
          />
        )}
        {activeTab === 'collapse' && <WavefunctionTab />}
        {activeTab === 'bits' && (
          <QRNGTab qrngBits={qrngBits} setQrngBits={setQrngBits} />
        )}
        {activeTab === 'streams' && <StreamsTab />}
      </main>
    </div>
  );
}
