/* ═══════════════════════════════════════════════════════════════
   PENTA-GONE — Scroll Animations
   All GSAP and ScrollTrigger animations organized by section
   ═══════════════════════════════════════════════════════════════ */

/**
 * Register all scroll-driven animations
 * Called after GSAP libraries are loaded
 */
export function registerAnimations() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Initialize all animation sections
  animateHero();
  animateMarquee();
  animateAbout();
  animateKineticBand();
  animateProducts();
  animateSlashDivider();
  animateIngredients();
  animateTestimonials();
  animateContact();
  setupNavScroll();
}

/**
 * ═══════════════════════════════════════════════════════════════
 * HERO ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 */

function animateHero() {
  const heroSun = document.getElementById('heroSun');
  const heroContent = document.getElementById('heroContent');

  if (!heroSun || !heroContent) return;

  // Parallax effect on sun
  gsap.to(heroSun, {
    y: -140,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    },
  });

  // Fade out content as user scrolls
  gsap.to(heroContent, {
    y: 120,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '50% top',
      scrub: 1,
    },
  });
}

/**
 * ═══════════════════════════════════════════════════════════════
 * MARQUEE ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 */

function animateMarquee() {
  const marqueeWrap = document.getElementById('marqueeWrap');

  if (!marqueeWrap) return;

  /**
   * Velocity-based skew effect
   * Creates dynamic distortion based on scroll speed (signature hsmkrt effect)
   */
  ScrollTrigger.create({
    onUpdate(self) {
      const velocity = self.getVelocity();
      const target = Math.max(-5, Math.min(5, velocity / 300));

      // Apply skew and animate back to neutral
      gsap.to(marqueeWrap, {
        skewX: target,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      });

      gsap.to(marqueeWrap, {
        skewX: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.4,
        overwrite: false,
      });
    },
  });
}

/**
 * ═══════════════════════════════════════════════════════════════
 * ABOUT SECTION ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 */

function animateAbout() {
  const aLabel = document.getElementById('aLabel');
  const aTitle = document.getElementById('aTitle');
  const aP1 = document.getElementById('aP1');
  const aP2 = document.getElementById('aP2');
  const aboutVisual = document.getElementById('aboutVisual');
  const aboutBigNum = document.querySelector('.about-big-num');
  const aboutInner = document.querySelector('.about-inner');

  if (!aTitle) return;

  // Animate decorative number
  gsap.fromTo(
    aboutBigNum,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 90%',
        end: 'center center',
        scrub: 1.5,
      },
    }
  );

  // Animate label
  if (aLabel) {
    gsap.from(aLabel, {
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  // Theatrical line reveal: each title line slides up from clip
  gsap.from(aTitle.querySelectorAll('.line-inner'), {
    y: '110%',
    duration: 1.15,
    stagger: 0.14,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 72%',
      toggleActions: 'play none none reverse',
    },
  });

  // Animate paragraphs
  gsap.from([aP1, aP2], {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  // Animate stats
  gsap.from('.stats-row .stat', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 55%',
      toggleActions: 'play none none reverse',
    },
  });

  // Animate visual from right
  if (aboutVisual) {
    gsap.from(aboutVisual, {
      x: 90,
      opacity: 0,
      scale: 0.97,
      duration: 1.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  /**
   * Velocity-based skewY on about inner container
   * Creates dynamic perspective distortion based on scroll speed
   */
  if (aboutInner) {
    let skewObject = { skewValue: 0 };

    ScrollTrigger.create({
      onUpdate(self) {
        const scrollVelocity = self.getVelocity();
        const skewAmount = Math.max(-2, Math.min(2, scrollVelocity / -600));

        skewObject.skewValue = skewAmount;

        gsap.to(skewObject, {
          skewValue: 0,
          duration: 1.1,
          ease: 'power3',
          onUpdate() {
            gsap.set(aboutInner, { skewY: skewObject.skewValue });
          },
        });
      },
    });
  }
}

/**
 * ═══════════════════════════════════════════════════════════════
 * KINETIC BAND ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 */

function animateKineticBand() {
  const kineticTrack = document.getElementById('kineticTrack');

  if (!kineticTrack) return;

  // Horizontal scroll as user scrolls down
  gsap.to(kineticTrack, {
    xPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#kineticBand',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
    },
  });
}

/**
 * ═══════════════════════════════════════════════════════════════
 * PRODUCTS SECTION ANIMATIONS (Horizontal Pin)
 * ═══════════════════════════════════════════════════════════════
 */

function animateProducts() {
  const pinWrap = document.getElementById('productsPinWrap');

  if (!pinWrap) return;

  /**
   * Calculate the distance to scroll horizontally
   */
  function getScrollDistance() {
    return pinWrap.scrollWidth - window.innerWidth;
  }

  // Pin the section and scroll horizontally
  gsap.to(pinWrap, {
    x: () => -getScrollDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: '#products',
      pin: true,
      anticipatePin: 1,
      start: 'top top',
      end: () => `+=${getScrollDistance()}`,
      scrub: 1.3,
      invalidateOnRefresh: true,
    },
  });

  // Stagger product cards in on section entry
  gsap.from(
    ['#pc1', '#pc2', '#pc3'],
    {
      y: 70,
      opacity: 0,
      duration: 0.85,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#products',
        start: 'top 45%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/**
 * ═══════════════════════════════════════════════════════════════
 * SLASH DIVIDER ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 */

function animateSlashDivider() {
  const divider = document.querySelector('.slash-divider');

  if (!divider) return;

  // Wipe effect from right to left
  gsap.from(divider, {
    scaleX: 0,
    transformOrigin: 'right center',
    duration: 1,
    ease: 'power3.inOut',
    scrollTrigger: {
      trigger: '.slash-divider',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}

/**
 * ═══════════════════════════════════════════════════════════════
 * INGREDIENTS SECTION ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 */

function animateIngredients() {
  const ingBgWord = document.getElementById('ingBgWord');
  const ingLabel = document.getElementById('ingLabel');
  const ingTitle = document.getElementById('ingTitle');
  const ingredientCards = document.querySelectorAll('.ingredient-card');
  const ingredientsInner = document.querySelector('.ingredients-inner');

  if (!ingTitle) return;

  // Background word parallax scroll
  if (ingBgWord) {
    gsap.fromTo(
      ingBgWord,
      { x: '-8vw' },
      {
        x: '10vw',
        ease: 'none',
        scrollTrigger: {
          trigger: '#ingredients',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      }
    );
  }

  // Label fade in
  if (ingLabel) {
    gsap.from(ingLabel, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#ingredients',
        start: 'top 76%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  // Title with skew
  gsap.from(ingTitle, {
    y: 70,
    opacity: 0,
    skewX: -3,
    duration: 1,
    ease: 'power3.out',
    clearProps: 'skewX',
    scrollTrigger: {
      trigger: '#ingredients',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  // Cards stagger with alternating skew
  ingredientCards.forEach((card, index) => {
    gsap.from(card, {
      y: 85,
      opacity: 0,
      skewY: index % 2 === 0 ? 4 : -4,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'skewY',
      scrollTrigger: {
        trigger: '#ingredients',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      delay: index * 0.08,
    });
  });

  /**
   * Velocity-based skewY on ingredients inner
   */
  if (ingredientsInner) {
    let skewObject = { skewValue: 0 };

    ScrollTrigger.create({
      onUpdate(self) {
        const scrollVelocity = self.getVelocity();
        const skewAmount = Math.max(-1.5, Math.min(1.5, scrollVelocity / -700));

        skewObject.skewValue = skewAmount;

        gsap.to(skewObject, {
          skewValue: 0,
          duration: 1,
          ease: 'power3',
          onUpdate() {
            gsap.set(ingredientsInner, { skewY: skewObject.skewValue });
          },
        });
      },
    });
  }
}

/**
 * ═══════════════════════════════════════════════════════════════
 * TESTIMONIALS SECTION ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 */

function animateTestimonials() {
  const quoteMark = document.getElementById('quoteMark');
  const tText = document.getElementById('tText');
  const tAuthor = document.getElementById('tAuthor');

  if (!tText) return;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#testimonials',
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      },
    })
    .from(quoteMark, {
      scale: 0.1,
      opacity: 0,
      duration: 0.75,
      ease: 'back.out(2.5)',
    })
    .from(
      tText,
      { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.25'
    )
    .from(
      tAuthor,
      { y: 25, opacity: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.45'
    )
    .from(
      '.t-dot',
      { scale: 0, opacity: 0, stagger: 0.1, duration: 0.4, ease: 'back.out(2)' },
      '-=0.3'
    );
}

/**
 * ═══════════════════════════════════════════════════════════════
 * CONTACT SECTION ANIMATIONS
 * ═══════════════════════════════════════════════════════════════
 */

function animateContact() {
  const cLabel = document.getElementById('cLabel');
  const cTitle = document.getElementById('cTitle');
  const cSub = document.getElementById('cSub');
  const cForm = document.getElementById('cForm');
  const contactGlow = document.querySelector('.contact-glow');
  const contactGlow2 = document.querySelector('.contact-glow2');

  if (!cTitle) return;

  // Orchestrated title reveal sequence
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      },
    })
    .from(cLabel, {
      y: 20,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
    })
    .from(
      cTitle,
      {
        y: 100,
        opacity: 0,
        skewX: -6,
        duration: 1.2,
        ease: 'power4.out',
        clearProps: 'skewX',
      },
      '-=0.15'
    )
    .from(cSub, { y: 38, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.55')
    .from(cForm, { y: 35, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.45');

  // Parallax glow effects
  if (contactGlow) {
    gsap.to(contactGlow, {
      y: -80,
      x: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }

  if (contactGlow2) {
    gsap.to(contactGlow2, {
      y: 60,
      x: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }
}

/**
 * ═══════════════════════════════════════════════════════════════
 * NAVIGATION SCROLL
 * ═══════════════════════════════════════════════════════════════
 */

function setupNavScroll() {
  const nav = document.getElementById('mainNav');

  if (!nav) return;

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80px',
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });
}
