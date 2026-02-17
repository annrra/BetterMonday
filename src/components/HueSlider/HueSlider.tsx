"use client";
import React, { useEffect, useState } from 'react';
import styles from './hs.module.css';
import HueSliderKnob from './HueSliderKnob';
import { useTheme } from '@/src/context';

const HueSlider: React.FC = () => {
  const { hue, setHue } = useTheme();

  const percentage = hue / 360;

  return (
    <div className={styles.sw}>
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
        className={styles.hue}
      />
      <div
        className={styles.shell}
        style={{
          bottom: `${percentage * 100}%`,
          transform: "translate(-50%, 50%)",
        }}
      >
        <HueSliderKnob />
      </div>
    </div>
  )
}

export default HueSlider;
