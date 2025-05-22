import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      accent: string;
      warning: string;
      success: string;
      dark: string;
      light: string;
      [key: string]: string;
    };
    fonts: {
      primary: string;
      secondary: string;
      [key: string]: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
      [key: string]: string;
    };
    animations: {
      fast: string;
      medium: string;
      slow: string;
      [key: string]: string;
    };
    shadows: {
      text: string;
      box: string;
      neon: string;
      [key: string]: string;
    };
    gradients: {
      header: string;
      button: string;
      logo: string;
      progress: string;
      [key: string]: string;
    };
    [key: string]: any;
  }
}
