import { useState, useCallback, useEffect } from 'react';

export const useAudio = () => {
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement | null>(null);
  const [hitSound, setHitSound] = useState<HTMLAudioElement | null>(null);
  const [successSound, setSuccessSound] = useState<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false); // Start with sound enabled for better interactivity
  
  const initializeAudio = useCallback(() => {
    try {
      // Initialize background music
      const bgMusic = new Audio('/sounds/background.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0.2;
      setBackgroundMusic(bgMusic);
      
      // Initialize sound effects
      const hit = new Audio('/sounds/hit.mp3');
      hit.volume = 0.3;
      setHitSound(hit);
      
      const success = new Audio('/sounds/success.mp3');
      success.volume = 0.4;
      setSuccessSound(success);
      
      console.log("Audio initialized successfully");
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
  }, []);
  
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);
  
  const playBackgroundMusic = useCallback(() => {
    if (backgroundMusic && !isMuted) {
      backgroundMusic.play().catch(error => {
        console.log("Background music play prevented:", error);
      });
    }
  }, [backgroundMusic, isMuted]);
  
  const playHover = useCallback(() => {
    if (hitSound && !isMuted) {
      // Clone the sound to allow overlapping playback
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.2;
      soundClone.play().catch(error => {
        console.log("Hover sound play prevented:", error);
      });
    }
  }, [hitSound, isMuted]);
  
  const playClick = useCallback(() => {
    if (hitSound && !isMuted) {
      // Clone the sound to allow overlapping playback
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(error => {
        console.log("Click sound play prevented:", error);
      });
    }
  }, [hitSound, isMuted]);
  
  const playSuccess = useCallback(() => {
    if (successSound && !isMuted) {
      successSound.currentTime = 0;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  }, [successSound, isMuted]);
  
  useEffect(() => {
    // Enable sound on user interaction
    const enableSound = () => {
      setIsMuted(false);
      if (backgroundMusic) {
        backgroundMusic.play().catch(error => {
          console.log("Background music play prevented:", error);
        });
      }
      document.removeEventListener('click', enableSound);
    };
    
    document.addEventListener('click', enableSound);
    
    return () => {
      document.removeEventListener('click', enableSound);
    };
  }, [backgroundMusic]);
  
  return {
    isMuted,
    initializeAudio,
    toggleMute,
    playBackgroundMusic,
    playHover,
    playClick,
    playSuccess,
  };
};
