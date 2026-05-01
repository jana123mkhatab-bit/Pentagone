/* ═══════════════════════════════════════════════════════════════
   PENTA-GONE — Testimonials Module
   Manages testimonial carousel and rotation
   ═══════════════════════════════════════════════════════════════ */

const TESTIMONIAL_ROTATE_INTERVAL = 5000; // 5 seconds

/**
 * Testimonial data
 */
const testimonials = [
  {
    text: "An exceptional experience that exceeded all my expectations. PENTA-GONE has changed the way I think about premium quality.",
    author: "— Layla M., Dubai",
  },
  {
    text: "I've explored many options but nothing compares to the elegance and quality of PENTA-GONE.",
    author: "— Sara K., Cairo",
  },
  {
    text: "Innovative and genuinely impressive. PENTA-GONE delivers excellence in every detail.",
    author: "— Nour A., Beirut",
  },
];

let currentTestimonialIndex = 0;
let rotationInterval = null;

/**
 * Initialize testimonials module
 * Sets up carousel controls and auto-rotation
 */
export function initializeTestimonials() {
  const textElement = document.getElementById('tText');
  const authorElement = document.getElementById('tAuthor');
  const dots = document.querySelectorAll('.t-dot');

  if (!textElement || !authorElement || dots.length === 0) {
    console.warn('Testimonials elements not found');
    return;
  }

  // Setup manual dot controls
  setupDotControls(dots);

  // Start auto-rotation
  startAutoRotation();
}

/**
 * Setup manual navigation via dots
 * @param {NodeList} dots - Pagination dots
 */
function setupDotControls(dots) {
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const testimonialIndex = parseInt(dot.dataset.i, 10);
      switchTestimonial(testimonialIndex);

      // Reset auto-rotation when user interacts
      resetAutoRotation();
    });
  });
}

/**
 * Switch to a specific testimonial
 * @param {number} index - Index of testimonial to display
 */
function switchTestimonial(index) {
  if (index < 0 || index >= testimonials.length) {
    console.warn(`Invalid testimonial index: ${index}`);
    return;
  }

  currentTestimonialIndex = index;
  const testimonial = testimonials[index];

  const textElement = document.getElementById('tText');
  const authorElement = document.getElementById('tAuthor');
  const dots = document.querySelectorAll('.t-dot');

  if (!textElement || !authorElement) return;

  // Fade out current content
  gsap.to([textElement, authorElement], {
    y: -22,
    opacity: 0,
    duration: 0.28,
    ease: 'power2.in',
    onComplete: () => {
      // Update content
      textElement.textContent = testimonial.text;
      authorElement.textContent = testimonial.author;

      // Fade in new content
      gsap.fromTo(
        [textElement, authorElement],
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );

      // Update active dot
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    },
  });
}

/**
 * Start automatic testimonial rotation
 */
function startAutoRotation() {
  rotationInterval = setInterval(() => {
    const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
    switchTestimonial(nextIndex);
  }, TESTIMONIAL_ROTATE_INTERVAL);
}

/**
 * Reset auto-rotation after user interaction
 * Clears existing interval and starts fresh
 */
function resetAutoRotation() {
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }
  startAutoRotation();
}

/**
 * Stop automatic rotation (useful for cleanup)
 */
export function stopAutoRotation() {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
}
