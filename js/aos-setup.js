// Minimal setup: assign data-aos attributes to common elements and init AOS
(function () {
  function applyAOS() {
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Helper to set attribute if element exists
    function setAOS(el, name, delay) {
      if (!el) return;
      el.setAttribute('data-aos', name);
      if (typeof delay === 'number') el.setAttribute('data-aos-delay', String(delay));
    }

    // Hero: title, subtitle, CTA
    var heroTitle = document.querySelector('.heading-hero');
    var heroSection = heroTitle && heroTitle.closest('section');
    if (heroTitle) setAOS(heroTitle, 'fade-up');
    if (heroSection) {
      // subtitle and lead inside hero
      var heroLead = heroSection.querySelector('.text-lead');
      var heroCTA = heroSection.querySelector('.btn-primary');
      if (heroLead) setAOS(heroLead, 'fade-up', 80);
      if (heroCTA) setAOS(heroCTA, 'fade-up', 140);
    }

    // Section titles and text blocks
    document.querySelectorAll('.heading-section').forEach(function (h) { setAOS(h, 'fade-up'); });
    document.querySelectorAll('.container .text-lead, .container .text-body, .container p').forEach(function (p) {
      // only set if not a heading
      if (p.closest('.heading-section')) return;
      setAOS(p, 'fade-up');
    });

    // CTA buttons site-wide
    document.querySelectorAll('.btn-primary').forEach(function (b) { setAOS(b, 'fade-up'); });

    // Cards in 3-step journey: target .card-module (first, second, third)
    var journeyCards = Array.from(document.querySelectorAll('.card-module'));
    if (journeyCards.length >= 3) {
      setAOS(journeyCards[0], 'fade-right');
      setAOS(journeyCards[1], 'fade-up');
      setAOS(journeyCards[2], 'fade-left');
    } else if (journeyCards.length > 0) {
      // Fallback: assign sequential directions
      journeyCards.forEach(function (c, i) {
        var name = i === 0 ? 'fade-right' : i === 1 ? 'fade-up' : 'fade-left';
        setAOS(c, name, i * 80);
      });
    }

    // Benefits & bonus cards: pick likely card containers
    var benefitSelectors = ['.card-spiritual', '.bg-card', '.card-module', '.p-8.rounded-3xl'];
    var benefits = [];
    benefitSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { benefits.push(el); });
    });
    // Remove duplicates
    benefits = Array.from(new Set(benefits));
    benefits.forEach(function (el, i) { setAOS(el, 'fade-up', i * 60); });

    // FAQ items: target accordion items — common class patterns used in markup
    document.querySelectorAll('.space-y-4 > *').forEach(function (el, i) {
      // small safeguard: only target items that look like FAQ cards (have padding/border)
      var s = window.getComputedStyle(el);
      if (parseFloat(s.paddingTop) > 0 || parseFloat(s.borderTopWidth) > 0) setAOS(el, 'fade-up', i * 50);
    });

    // Respect prefers-reduced-motion: disable AOS if user requested reduced motion
    // We'll initialize AOS with disable option below too.

    // Initialize AOS if available
    function initAOS() {
      if (window.AOS && typeof window.AOS.init === 'function') {
        window.AOS.init({
          duration: 600,
          easing: 'ease-out',
          once: true,
          offset: 120,
          // disable if prefers-reduced-motion
          disable: function () {
            return prefersReduced;
          }
        });
      }
    }

    // If AOS already loaded, init immediately, otherwise wait for it
    if (window.AOS) initAOS();
    else {
      // observe for script load
      var check = function () {
        if (window.AOS) { initAOS(); }
        else setTimeout(check, 50);
      };
      check();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyAOS);
  else applyAOS();
})();
