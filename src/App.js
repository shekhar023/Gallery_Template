import React, { useState } from 'react';
import { useConfettiEffect, useGradientChange } from './customHooks';
import Gallery from './Gallery';
import './App.css';

const App = () => {
  const [showGallery, setShowGallery] = useState(false);
  const gradientIndex = useGradientChange(500);

  // Activate confetti effect and schedule gallery display
  useConfettiEffect(!showGallery, setShowGallery, 3000);

  const gradients = [
    'linear-gradient(to right, #a864fd, #29cdff)',
    'linear-gradient(to right, #78ff44, #ff718d)',
    'linear-gradient(to right, #fdff6a, #a864fd)',
  ];

  if (showGallery) {
    return <Gallery />;
  }

  return (
    <div className="birthday-container">
      <h1 className="birthday-text" style={{ backgroundImage: gradients[gradientIndex] }}>
        Shoutout to the Kanpuriya times!
      </h1>
    </div>
  );
};

export default App;
