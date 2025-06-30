//inspired from https://www.youtube.com/watch?v=17WoOqgXsRM
import { useEffect, useRef } from 'react';

export default function Starfield({ starColors = ['#ffffff'] }) {
  const canvasRef = useRef();
console.log('🌟 Starfield using colors:', starColors);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId;
    const stars = Array.from({ length: 800 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    function draw() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      for (let star of stars) {
        star.z -= 2;
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width;
          star.y = Math.random() * height;
        }

        const sx = (star.x - width / 2) * (width / star.z) + width / 2;
        const sy = (star.y - height / 2) * (height / star.z) + height / 2;
        const r = 1.2 + (2.5 - star.z / width * 2.5);

        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.arc(sx, sy, r, 0, 2 * Math.PI);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [starColors]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none',
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
