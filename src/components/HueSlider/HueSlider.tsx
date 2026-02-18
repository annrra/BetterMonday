"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './hs.module.css';
import HueSliderKnob from './HueSliderKnob';
import { useTheme } from '@/src/context';
import classNames from 'classnames';

const HueSlider: React.FC = () => {
  const { hue, setHue } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState(
    window.innerWidth < 1000
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1000px)");

    const listener = () => setIsHorizontal(media.matches);

    listener();
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  const percentage = hue / 360;

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();

    if (isHorizontal) {
      const knobX = rect.width * percentage;
      setHovered(Math.abs(clientX - rect.left - knobX) < 50);
    } else {
      const knobY = rect.height * (1 - percentage);
      setHovered(Math.abs(clientY - rect.top - knobY) < 50);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => handlePointerMove(e.clientX, e.clientY);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    handlePointerMove(touch.clientX, touch.clientY);
  };

  return (
    <div
      ref={wrapperRef} 
      className={styles.sw}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={() => setHovered(false)}
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
        style={
          isHorizontal
            ? {
                left: `${percentage * 100}%`,
                transform: "translate(-50%, 0)",
              }
            : {
                bottom: `${percentage * 100}%`,
                transform: "translate(-50%, 50%)",
              }
        }
      >
        <HueSliderKnob hovered={hovered} />
      </div>
    </div>
  )
}

export default HueSlider;
