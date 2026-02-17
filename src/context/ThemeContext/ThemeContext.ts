import { createContext } from 'react';

export type ThemeContextType = {
  hue: number;
  setHue: (value: number) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
