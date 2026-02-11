const scrambleText = (
  from: string,
  to: string,
  onUpdate: (value: string) => void,
  duration = 600,
  scrambleIntensity = 0.25
) => {
  const start = performance.now();
  const maxLength = Math.max(from.length, to.length);
  const scrambleChars = "!<>-_\\/[]{}—=+*^?#";

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);

    let output = "";

    for (let i = 0; i < maxLength; i++) {
      const revealPoint = i / maxLength;

      if (progress > revealPoint) {
        output += to[i] || "";
      } else if (progress > revealPoint - scrambleIntensity) {
        output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      } else {
        output += from[i] || "";
      }
    }

    onUpdate(output);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

export default scrambleText;