"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HomepageReveal({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    let animation: Animation | undefined;

    function reveal() {
      if (!section) return;

      section.style.removeProperty("opacity");
      section.style.removeProperty("transform");
      animation = section.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 380,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      );
    }

    if (section.getBoundingClientRect().top <= window.innerHeight * 0.9) {
      reveal();
    } else {
      section.style.opacity = "0";
      section.style.transform = "translateY(14px)";
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer?.disconnect();
          reveal();
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
      );
      observer.observe(section);
    }

    return () => {
      observer?.disconnect();
      animation?.cancel();
      section.style.removeProperty("opacity");
      section.style.removeProperty("transform");
    };
  }, []);

  return (
    <section className={className} id={id} ref={sectionRef}>
      {children}
    </section>
  );
}
