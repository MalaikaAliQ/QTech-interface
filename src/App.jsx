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

  return (
    <div className="wrap">
      <HeaderNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === 'home' && <OverviewTab />}
        {activeTab === 'nature' && <NatureVRTab />}
        {activeTab === 'search' && <SearchPuzzleTab />}
        {activeTab === 'oracle' && <OracleTab />}
        {activeTab === 'measure' && <BeamSplitterTab />}
        {activeTab === 'collapse' && <WavefunctionTab />}
        {activeTab === 'bits' && <QRNGTab />}
        {activeTab === 'streams' && <StreamsTab />}
      </main>
    </div>
  );
}
