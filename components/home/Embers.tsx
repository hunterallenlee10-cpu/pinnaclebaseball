"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/** Sparks drifting up from the bottom of the Velocity365 section. Runs only while visible. */
export function Embers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = w < 640 ? 22 : 42;
    const spawn = (initial = false) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.35 + Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 0.4,
      life: 0.4 + Math.random() * 0.6,
      hue: Math.random() < 0.7 ? 18 : 38,
    });
    const sparks = Array.from({ length: count }, () => spawn(true));

    let raf = 0;
    let running = false;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of sparks) {
        s.y -= s.vy;
        s.x += s.drift + Math.sin(s.y * 0.02) * 0.25;
        const fade = Math.max(0, Math.min(1, s.y / h)) * s.life;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 95%, 60%, ${fade})`;
        ctx.shadowColor = `hsla(${s.hue}, 95%, 55%, ${fade})`;
        ctx.shadowBlur = 8;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.y < -10) Object.assign(s, spawn());
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
