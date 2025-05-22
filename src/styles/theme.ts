export const theme = {
  colors: {
    background: '#1a0033',
    text: '#ffffff',
    primary: '#ff6600', // Bitcoin orange
    secondary: '#ffaa00', // Gold
    accent: '#ff00ff', // Neon pink
    warning: '#ff0000',
    success: '#00ff00',
    dark: '#111111',
    light: '#eeeeee',
  },
  fonts: {
    primary: "'Impact', 'Arial Black', sans-serif",
    secondary: "'Arial', sans-serif",
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    wide: '1200px',
  },
  animations: {
    fast: '0.2s',
    medium: '0.5s',
    slow: '1s',
  },
  shadows: {
    text: '0 0 20px #ff6600, 0 0 40px #ff6600',
    box: '0 0 30px rgba(255, 102, 0, 0.5)',
    neon: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff6600, 0 0 20px #ff6600, 0 0 25px #ff6600',
  },
  gradients: {
    header: 'radial-gradient(circle, #ff6600, #cc3300, #000)',
    button: 'linear-gradient(45deg, #ff6600, #cc3300)',
    logo: 'radial-gradient(circle, #ff6600, #ffaa00)',
    progress: 'linear-gradient(90deg, #ff6600, #ffaa00, #ff0000)',
  }
};
