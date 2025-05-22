import React, { createContext, useState, useContext, useEffect } from 'react';
import { Howl } from 'howler';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  isPlaying: boolean;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playBackgroundMusic: () => {},
  stopBackgroundMusic: () => {},
  isPlaying: false,
});

export const useSoundContext = () => useContext(SoundContext);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState<Howl | null>(null);

  // Initialize background music
  useEffect(() => {
    const music = new Howl({
      src: ['/Crypto Frenzy.mp3'],
      loop: true,
      volume: 0.5,
      autoplay: false,
      preload: true,
      onend: () => {
        console.log('Background music ended');
      },
      onloaderror: (id, error) => {
        console.error('Error loading background music:', error);
      },
      onplayerror: (id, error) => {
        console.error('Error playing background music:', error);
      }
    });

    setBackgroundMusic(music);

    // Cleanup on unmount
    return () => {
      if (music) {
        music.stop();
      }
    };
  }, []);

  // Update music volume when mute state changes
  useEffect(() => {
    if (backgroundMusic) {
      backgroundMusic.volume(isMuted ? 0 : 0.5);
    }
  }, [isMuted, backgroundMusic]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const playBackgroundMusic = () => {
    console.log("playBackgroundMusic called, backgroundMusic:", !!backgroundMusic, "isPlaying:", isPlaying);
    if (backgroundMusic && !isPlaying) {
      try {
        backgroundMusic.play();
        console.log("Background music play() called");
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing background music:", error);
      }
    } else {
      console.log("Not playing music because:", !backgroundMusic ? "no music loaded" : "already playing");
    }
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusic && isPlaying) {
      backgroundMusic.stop();
      setIsPlaying(false);
    }
  };

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playBackgroundMusic,
        stopBackgroundMusic,
        isPlaying
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContext;
