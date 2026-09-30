import Lenis from "lenis";

let lenis = null;

export function initLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({ autoRaf: true, lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 });
  return lenis;
}

export function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: -88, duration: 1.4 });
  else target.scrollIntoView({ behavior: "smooth" });
}

export function lockScroll(locked) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
