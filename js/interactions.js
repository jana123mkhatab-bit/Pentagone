/* ═══════════════════════════════════════════════════════════════
   SOLARA — Cursor & Interactive Elements
   Custom cursor tracking and interactive element behaviors
   ═══════════════════════════════════════════════════════════════ */

const CURSOR_SIZE = 6;
const CURSOR_RING_SIZE = 19;
const RING_SCALE_HOVER = 1.7;

/**
 * Initialize custom cursor tracking
 * Replaces default cursor with animated custom elements
 */
export function initializeCursor() {
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (!cursor || !cursorRing) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  /**
   * Track mouse position in real-time
   */
  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    // Update cursor position immediately
    gsap.set(cursor, {
      x: mouseX - CURSOR_SIZE,
      y: mouseY - CURSOR_SIZE,
    });
  });

  /**
   * Animate ring with smooth trailing effect
   * Uses requestAnimationFrame for smooth 60fps animation
   */
  function animateRing() {
    // Lerp ring position towards cursor position
    ringX += (mouseX - ringX - CURSOR_RING_SIZE) * 0.1;
    ringY += (mouseY - ringY - CURSOR_RING_SIZE) * 0.1;

    gsap.set(cursorRing, {
      x: ringX,
      y: ringY,
    });

    requestAnimationFrame(animateRing);
  }

  animateRing();
}

/**
 * Setup interactive element hover effects
 * Enlarges cursor ring on interactive elements
 */
export function setupInteractiveElements() {
  const interactiveElements = document.querySelectorAll('a, button');
  const cursorRing = document.getElementById('cursorRing');

  if (!cursorRing) return;

  interactiveElements.forEach((element) => {
    // Enlarge cursor ring on hover
    element.addEventListener('mouseenter', () => {
      gsap.to(cursorRing, {
        scale: RING_SCALE_HOVER,
        duration: 0.3,
        overwrite: 'auto',
      });
    });

    // Reset cursor ring on leave
    element.addEventListener('mouseleave', () => {
      gsap.to(cursorRing, {
        scale: 1,
        duration: 0.3,
        overwrite: 'auto',
      });
    });
  });
}

/**
 * Update navigation background on scroll
 * Adds frosted glass effect to nav when scrolled past hero
 */
export function setupNavScroll() {
  const nav = document.getElementById('mainNav');

  if (!nav) return;

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80px',
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });
}
