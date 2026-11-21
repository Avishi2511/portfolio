import { useEffect, useRef, type ElementType, type ReactNode } from "react";

// Fades and lifts its content in the first time it scrolls into view.
export default function Reveal({ children, as: Tag = "div", className = "" }: { children: ReactNode; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}
