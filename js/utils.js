/* ═══════════════════════════════════════════════════════════════
   SOLARA — Utility Functions
   Helper functions for particles, progress tracking, etc.
   ═══════════════════════════════════════════════════════════════ */

const PARTICLE_CONFIG = {
  container: '#particles',
  creationInterval: 800, // ms between particle creation
  lifetime: 12000, // ms before particle is removed
};

const PARTICLE_SIZE_RANGE = { min: 2, max: 6 };
const PARTICLE_ANIMATION_RANGE = { min: 5, max: 11 };
const PARTICLE_DELAY_RANGE = { min: 0, max: 4 };

/**
 * Create animated floating particles in hero section
 * Generates particles at regular intervals until page unload
 */
export function createParticles() {
  const particleContainer = document.querySelector(PARTICLE_CONFIG.container);

  if (!particleContainer) {
    console.warn('Particle container not found');
    return;
  }

  /**
   * Generate a single particle element
   */
  function generateParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random size
    const size = Math.random() * (PARTICLE_SIZE_RANGE.max - PARTICLE_SIZE_RANGE.min) + PARTICLE_SIZE_RANGE.min;

    // Random positions and animations
    const positionX = Math.random() * 100;
    const animationDuration = Math.random() * (PARTICLE_ANIMATION_RANGE.max - PARTICLE_ANIMATION_RANGE.min) + PARTICLE_ANIMATION_RANGE.min;
    const animationDelay = Math.random() * (PARTICLE_DELAY_RANGE.max - PARTICLE_DELAY_RANGE.min);

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${positionX}%;
      bottom: 0;
      animation-duration: ${animationDuration}s;
      animation-delay: ${animationDelay}s;
      opacity: 0;
    `;

    particleContainer.appendChild(particle);

    // Remove particle after lifetime expires
    setTimeout(() => {
      particle.remove();
    }, PARTICLE_CONFIG.lifetime);
  }

  // Create particles at regular intervals
  setInterval(generateParticle, PARTICLE_CONFIG.creationInterval);
}

/**
 * Setup scroll progress bar
 * Fills progress bar proportionally to page scroll position
 */
export function setupScrollProgress() {
  const progressFill = document.getElementById('progressFill');
  const progressBar = document.querySelector('.progress-bar');

  if (!progressFill || !progressBar) {
    console.warn('Progress bar elements not found');
    return;
  }

  // Update progress on scroll using GSAP
  gsap.to(progressFill, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        // Update aria-valuenow for accessibility
        progressBar.setAttribute('aria-valuenow', Math.round(self.progress * 100));
      },
    },
  });
}

/**
 * Utility: Debounce function for event handlers
 * @param {Function} func - Function to debounce
 * @param {number} wait - Debounce delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Throttle function for performance-critical handlers
 * @param {Function} func - Function to throttle
 * @param {number} limit - Throttle interval in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;

  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Utility: Smooth scroll to element
 * @param {string} selector - CSS selector of target element
 * @param {number} offset - Offset from top in pixels (default: 80)
 */
export function smoothScrollTo(selector, offset = 80) {
  const element = document.querySelector(selector);

  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return;
  }

  const targetPosition = element.offsetTop - offset;

  gsap.to(window, {
    scrollTo: targetPosition,
    duration: 1,
    ease: 'power3.inOut',
  });
}

/**
 * Utility: Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} True if element is visible in viewport
 */
export function isInViewport(element) {
  if (!element) return false;

  const rect = element.getBoundingClientRect();

  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}

/**
 * Utility: Preload images
 * @param {string[]} urls - Array of image URLs to preload
 * @returns {Promise} Resolves when all images are loaded
 */
export function preloadImages(urls) {
  return Promise.all(
    urls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    })
  );
}
