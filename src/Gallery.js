import React, { useState, useEffect } from "react";
import { images } from './images'; // Make sure this exports an array
import { videoList } from './videos'; // Make sure this exports an array
import CloseIcon from '@mui/icons-material/Close';

const Gallery = () => {
  const [shuffledMedia, setShuffledMedia] = useState([]);
  const [openMedia, setOpenMedia] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    // Safely combine images and videos into one array and shuffle
    const allMedia = [...(images || []).map(src => ({ src, type: 'image' })), ...(videoList || []).map(src => ({ src, type: 'video' }))];

    setShuffledMedia(shuffleArray(allMedia));

    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh' }}>
      <h1 style={{
        fontSize: '48px',
        textAlign: 'center',
        color: 'transparent',
        background: '-webkit-linear-gradient(45deg, #ff6ec4, #7873f5)',
        WebkitBackgroundClip: 'text',
        marginBottom: '40px',
      }}>
        To the memories of Now, Then, and Future
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {shuffledMedia.map((media, index) => (
          <div key={index} onClick={() => setOpenMedia(media)} style={{ cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }}>
            {media.type === 'image' ? (
              <img src={media.src} alt={`Media ${index}`} style={{ width: '100%', height: 'auto' }} />
            ) : (
              <video controls autoPlay muted style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }}>
                <source src={media.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
      {openMedia && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 1000 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: isMobile ? '100%' : '90%', height: isMobile ? '100%' : '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {openMedia.type === 'image' ? (
                  <img src={openMedia.src} alt="Opened Media" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              ) : (
                  <video controls autoPlay muted style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}>
                    <source src={openMedia.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
              )}
            </div>
            <CloseIcon onClick={() => setOpenMedia(null)} style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', color: '#FFF', fontSize: '30px', zIndex: 1050 }}/>
        </div>
      )}
    </div>
  );
};

export default Gallery;
