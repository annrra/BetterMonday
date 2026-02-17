"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ThemeContext, ThemeContextType } from "./ThemeContext";

const basePrimaryHue = 32;
const baseSecondaryHue = 76;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [hue, setHue] = useState(basePrimaryHue);

  useEffect(() => {
    const shift = hue - basePrimaryHue;

    const normalizeHue = (value: number) =>
      ((value % 360) + 360) % 360;

    const primaryHue = normalizeHue(hue);
    const secondaryHue = normalizeHue(baseSecondaryHue + shift);

    console.log('Updating hues:', { primaryHue, secondaryHue, hue });

    document.documentElement.style.setProperty(
      "--tone-primary-h",
      primaryHue.toString()
    );

    document.documentElement.style.setProperty(
      "--tone-secondary-h",
      secondaryHue.toString()
    );
  }, [hue]);

  return (
    <ThemeContext.Provider value={{ hue, setHue }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}