"use client";
import React, { useState, useRef } from 'react';
import styles from './hs.module.css';
import HueSliderKnob from './HueSliderKnob';
import { useTheme } from '@/src/context';
import classNames from 'classnames';

const HueSlider: React.FC = () => {
  const { hue, setHue } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const percentage = hue / 360;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const knobY = rect.height * (1 - percentage); // vertical-lr, bottom = 0
    const pointerY = e.clientY - rect.top;

    // hover within ±50px
    setHovered(Math.abs(pointerY - knobY) < 50);
  };

  return (
    <div
      ref={wrapperRef} 
      className={styles.sw}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
        className={styles.slide}
      />
      <div
        className={classNames(styles.knob, { [styles.hover]: hovered }, { [styles.drag]: dragging })}
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
