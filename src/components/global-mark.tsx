import { useEffect, useRef } from "react";
import mark from "@/assets/hurriamo-mark-transparent.png";

export function GlobalMark() {
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = markRef.current;
    if (!element) return;

    let frame = 0;
    const update = (event?: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event ? event.clientX / window.innerWidth - 0.5 : 0;
        const y = event ? event.clientY / window.innerHeight - 0.5 : 0;
        element.style.setProperty("--mark-x", x.toFixed(3));
        element.style.setProperty("--mark-y", y.toFixed(3));
        element.style.setProperty("--page-scroll", String(window.scrollY));
      });
    };

    update();
    const onPointerMove = (event: PointerEvent) => update(event);
    const onScroll = () => update();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="global-mark-scene" aria-hidden="true">
      <div ref={markRef} className="global-mark-motion">
        <img src={mark} alt="" className="global-mark-image" />
      </div>
    </div>
  );
}