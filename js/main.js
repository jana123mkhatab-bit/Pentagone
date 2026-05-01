/* ═══════════════════════════════════════════════════════════════
   SOLARA — Main Application Entry Point
   Initializes all modules and coordinates functionality
   ═══════════════════════════════════════════════════════════════ */

import { initializeCursor, setupInteractiveElements } from './interactions.js';
import { registerAnimations } from './animations.js';
import { initializeTestimonials } from './testimonials.js';
import { createParticles, setupScrollProgress } from './utils.js';

/**
 * Initialize the entire application
 * Runs after DOM is fully loaded
 */
function initialize() {
  console.log('Initializing SOLARA application...');

  // Initialize custom cursor
  initializeCursor();

  // Setup interactive element behaviors
  setupInteractiveElements();

  // Register all scroll-driven animations
  registerAnimations();

  // Initialize testimonial carousel
  initializeTestimonials();

  // Create animated particles
  createParticles();

  // Setup scroll progress indicator
  setupScrollProgress();

  console.log('✓ SOLARA application initialized successfully');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
