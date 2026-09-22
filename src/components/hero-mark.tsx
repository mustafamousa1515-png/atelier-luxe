import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/hurriamo-mark.png.asset.json";
import { Button } from "@/components/ui/button";

export function HeroMark() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const update = () => { const r = el.getBoundingClientRect(); const p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height))); el.style.setProperty("--scroll", String(p)); };
    update(); addEventListener("scroll", update, { passive: true }); return () => removeEventListener("scroll", update);
  }, []);
  return <section ref={ref} className="hero-stage bg-foreground text-background">
    <div className="hero-sticky">
      <div className="absolute inset-x-5 top-28 flex justify-between text-[10px] uppercase tracking-[0.22em] text-background/55 md:inset-x-10"><span>Private fashion house</span><span>By appointment</span></div>
      <div className="hero-mark-wrap" aria-hidden="true"><div className="hero-mark-edge"/><img src={logo.url} alt="" className="hero-mark" /></div>
      <div className="absolute inset-x-5 bottom-10 grid items-end gap-6 md:inset-x-10 md:grid-cols-[1fr_auto_1fr]"><p className="max-w-xs text-sm leading-6 text-background/60">Created in private. Considered in every line.</p><h1 className="font-display text-5xl tracking-normal md:text-7xl">HURRIAMO</h1><Button asChild className="justify-self-start rounded-none bg-background text-foreground hover:bg-background/85 md:justify-self-end"><Link to="/appointment">Book an appointment</Link></Button></div>
    </div>
  </section>;
}
