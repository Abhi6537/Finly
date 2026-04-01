import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatFn?: (value: number) => string;
  className?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const CountUpNumber = ({
  end,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
  formatFn,
  className = "",
}: CountUpProps) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      setValue(easedProgress * end);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration]);

  const display = formatFn
    ? formatFn(value)
    : `${prefix}${value.toFixed(decimals)}${suffix}`;

  return <span className={`font-mono ${className}`}>{display}</span>;
};

export default CountUpNumber;
