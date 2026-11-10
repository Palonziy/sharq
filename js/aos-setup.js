// Professional AOS (Animate On Scroll) Setup
(function () {
  'use strict';

  function applyAOS() {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    function setAOS(el, name, delay) {
      if (!el || el.hasAttribute('data-aos')) return;
      el.setAttribute('data-aos', name);
      if (typeof delay === 'number') el.setAttribute('data-aos-delay', String(delay));
    }

    // Hero section
    const heroTitle = document.querySelector('.heading-hero');
    const heroSection = heroTitle && heroTitle.closest('section');
    if (heroTitle) setAOS(heroTitle, 'fade-up', 50);
    if (heroSection) {
      const heroLead = heroSection.querySelector('.text-lead');
      const heroCTA = heroSection.querySelector('.btn-primary');
      if (heroLead) setAOS(heroLead, 'fade-up', 100);
      if (heroCTA) setAOS(heroCTA, 'fade-up', 150);
    }

    // Section headings
    document.querySelectorAll('.heading-section').forEach(function (h) {
      setAOS(h, 'fade-up', 50);
    });

    // Journey cards: on mobile use vertical fade-up to avoid horizontal overflow
    const journeyCards = Array.from(document.querySelectorAll('.card-module'));
    if (!isMobile && journeyCards.length >= 3) {
      setAOS(journeyCards[0], 'fade-right', 100);
      setAOS(journeyCards[1], 'fade-up', 200);
      setAOS(journeyCards[2], 'fade-left', 300);
    } else {
      journeyCards.forEach(function (c, i) {
        setAOS(c, 'fade-up', (i % 3) * 100);
      });
    }

    // Spiritual / Benefit cards
    const benefitCards = document.querySelectorAll('.card-spiritual, .bg-card, .p-8.rounded-3xl');
    benefitCards.forEach(function (el, i) {
      setAOS(el, 'fade-up', (i % 3) * 100);
    });

    // FAQ items
    document.querySelectorAll('.space-y-4 > *').forEach(function (el, i) {
      setAOS(el, 'fade-up', (i % 4) * 80);
    });

    // Init AOS
    function initAOS() {
      if (window.AOS && typeof window.AOS.init === 'function') {
        window.AOS.init({
          duration: 650,
          easing: 'ease-out-cubic',
          once: true,
          offset: 80,
          disableMutationObserver: false,
          disable: function () {
            return prefersReduced;
          }
        });
      }
    }

    if (window.AOS) {
      initAOS();
    } else {
      let checkAttempts = 0;
      const interval = setInterval(function () {
        checkAttempts++;
        if (window.AOS) {
          clearInterval(interval);
          initAOS();
        } else if (checkAttempts > 50) {
          clearInterval(interval);
        }
      }, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAOS);
  } else {
    applyAOS();
  }

  // Observe React additions
  const root = document.getElementById('root');
  if (root) {
    const mo = new MutationObserver(function () {
      applyAOS();
      if (window.AOS && typeof window.AOS.refresh === 'function') {
        window.AOS.refresh();
      }
    });
    mo.observe(root, { childList: true, subtree: true });
  }
})();
