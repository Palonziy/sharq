/**
 * 40 Kunlik Poklanish - Premium Scroll & Interactive Experience Engine
 * Crafted for palosite.com | Atmospheric Sanctuary, Living Flow & 3D Tilt
 */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // 1. Ultra-Slim Golden Scroll Progress Bar
  // --------------------------------------------------------------------------
  function initScrollProgress() {
    if (document.getElementById('scroll-progress-line')) return;

    const line = document.createElement('div');
    line.id = 'scroll-progress-line';
    document.body.prepend(line);

    let ticking = false;

    function updateProgress() {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      line.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  // --------------------------------------------------------------------------
  // 2. Celestial Stardust Ambient Background Canvas
  // --------------------------------------------------------------------------
  function initStardustCanvas() {
    if (prefersReduced || document.getElementById('stardust-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'stardust-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', function () {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particleCount = width < 768 ? 24 : 45;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        isGold: Math.random() > 0.3
      });
    }

    let isVisible = true;
    document.addEventListener('visibilitychange', function () {
      isVisible = !document.hidden;
    });

    function renderParticles() {
      if (!isVisible) {
        requestAnimationFrame(renderParticles);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha + Math.sin(p.phase) * 0.25;

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isGold) {
          ctx.fillStyle = `rgba(217, 151, 38, ${Math.max(0.05, Math.min(0.85, currentAlpha))})`;
        } else {
          ctx.fillStyle = `rgba(245, 206, 122, ${Math.max(0.05, Math.min(0.75, currentAlpha * 0.8))})`;
        }

        ctx.shadowBlur = p.radius > 1.6 ? 8 : 4;
        ctx.shadowColor = 'rgba(217, 151, 38, 0.4)';
        ctx.fill();
      }

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // --------------------------------------------------------------------------
  // 3. Desktop Floating Journey Dots Navigator
  // --------------------------------------------------------------------------
  function initJourneyNavigator() {
    if (document.querySelector('.floating-journey-nav') || window.innerWidth < 1024) return;

    const nav = document.createElement('div');
    nav.className = 'floating-journey-nav';

    const stations = [
      { id: 'hero-station', label: 'Bosh sahifa', matcher: s => s.querySelector('.heading-hero') },
      { id: 'pain-station', label: 'Ichki holat', matcher: s => s.textContent.includes('Ichingizda nima') },
      { id: 'pillars-station', label: '3 Bosqich', matcher: s => s.textContent.includes('Uch Bosqichli') },
      { id: 'mentor-station', label: 'Mentor', matcher: s => s.textContent.includes('Sizning Mentoring') },
      { id: 'offers-station', label: 'Takliflar', matcher: s => s.id === 'offers' || s.textContent.includes('Maxsus Takliflar') },
      { id: 'faq-station', label: 'Savollar', matcher: s => s.textContent.includes('Ko\'p So\'raladigan') }
    ];

    stations.forEach(st => {
      const dot = document.createElement('div');
      dot.className = 'journey-dot';
      dot.dataset.station = st.id;
      dot.innerHTML = `<span class="journey-dot-tooltip">${st.label}</span>`;
      dot.onclick = function () {
        const sections = Array.from(document.querySelectorAll('section'));
        const target = sections.find(st.matcher);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      nav.appendChild(dot);
    });

    document.body.appendChild(nav);

    // Scroll & Intersection Observer for Active Dot
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 300) {
        nav.classList.add('is-visible');
      } else {
        nav.classList.remove('is-visible');
      }
    }, { passive: true });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          const matchedStation = stations.find(st => st.matcher(entry.target));
          if (matchedStation) {
            nav.querySelectorAll('.journey-dot').forEach(d => {
              d.classList.toggle('is-active', d.dataset.station === matchedStation.id);
            });
          }
        }
      });
    }, { threshold: [0.25, 0.5] });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
  }

  // --------------------------------------------------------------------------
  // 4. Interactive 3D Tilt & Magnetic Mouse Spotlight
  // --------------------------------------------------------------------------
  function applyCardInteractions() {
    if (prefersReduced) return;

    const cards = document.querySelectorAll(`
      .offer-card, 
      .offers-bundle, 
      .card-module, 
      .card-spiritual, 
      [class*="rounded-3xl"]:not(.mentoring-processed)
    `);

    cards.forEach(card => {
      if (card.classList.contains('interactive-registered')) return;
      card.classList.add('interactive-registered', 'luxury-card-interactive');

      let bounds = null;

      function updateBounds() {
        bounds = card.getBoundingClientRect();
      }

      card.addEventListener('mouseenter', updateBounds, { passive: true });

      card.addEventListener('mousemove', function (e) {
        if (!bounds) updateBounds();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        card.style.setProperty('--mouse-x', `${mouseX}px`);
        card.style.setProperty('--mouse-y', `${mouseY}px`);

        // Subtle 3D tilt
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        const rotX = -((mouseY - centerY) / centerY) * 4.5;
        const rotY = ((mouseX - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
      }, { passive: true });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Section Atmospheric Backdrops & Celestial Hero Badge
  // --------------------------------------------------------------------------
  function enhanceSectionAtmospheres() {
    const sections = Array.from(document.querySelectorAll('section'));

    sections.forEach(s => {
      const text = s.textContent || '';

      // Hero Section
      if (s.querySelector('.heading-hero') && !s.classList.contains('hero-atmosphere')) {
        s.classList.add('hero-atmosphere');

        // Add living celestial badge above hero title
        const heroTitle = s.querySelector('.heading-hero');
        if (heroTitle && !s.querySelector('.hero-celestial-badge')) {
          const badge = document.createElement('div');
          badge.className = 'hero-celestial-badge';
          badge.innerHTML = `<span class="hero-badge-pulse-dot"></span> 2026-yilgi yangi oqim qabuli ochiq ✦`;
          heroTitle.parentNode.insertBefore(badge, heroTitle);
        }
      }

      // Empathy / Pain points
      if (text.includes('Ichingizda nima') && !s.classList.contains('empathy-atmosphere')) {
        s.classList.add('empathy-atmosphere');
      }

      // 3 Pillars
      if (text.includes('Uch Bosqichli') && !s.classList.contains('pillars-atmosphere')) {
        s.classList.add('pillars-atmosphere');
        injectRoadmapThread(s);
      }

      // Mentoring
      if (text.includes('Sizning Mentoring') && !s.classList.contains('mentoring-atmosphere')) {
        s.classList.add('mentoring-atmosphere');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Golden Roadmap Thread (3 Bosqich)
  // --------------------------------------------------------------------------
  function injectRoadmapThread(section) {
    if (section.querySelector('.journey-thread-track')) return;

    const heading = section.querySelector('h2, .heading-section');
    if (!heading) return;

    const track = document.createElement('div');
    track.className = 'journey-thread-track';
    track.innerHTML = `
      <div class="journey-thread-line">
        <div class="journey-thread-fill"></div>
      </div>
      <div class="journey-nodes-row">
        <div class="journey-node is-active" data-step="1">
          <div class="journey-node-badge">1</div>
          <span class="journey-node-title">Poklanish</span>
          <span class="journey-node-days">1 - 40 KUN</span>
        </div>
        <div class="journey-node" data-step="2">
          <div class="journey-node-badge">2</div>
          <span class="journey-node-title">Tiklanish</span>
          <span class="journey-node-days">41 - 80 KUN</span>
        </div>
        <div class="journey-node" data-step="3">
          <div class="journey-node-badge">3</div>
          <span class="journey-node-title">Yuksalish</span>
          <span class="journey-node-days">81 - 120 KUN</span>
        </div>
      </div>
    `;

    heading.after(track);

    // Scroll reactive fill
    const fill = track.querySelector('.journey-thread-fill');
    const nodes = track.querySelectorAll('.journey-node');

    function updateThread() {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrolled = (viewportHeight - rect.top) / (rect.height + viewportHeight);
        const pct = Math.min(100, Math.max(0, scrolled * 140));
        if (fill) fill.style.width = pct + '%';

        nodes.forEach((node, i) => {
          if (pct >= (i + 1) * 30) {
            node.classList.add('is-active');
          } else if (i > 0) {
            node.classList.remove('is-active');
          }
        });
      }
    }

    window.addEventListener('scroll', updateThread, { passive: true });
    updateThread();
  }

  // --------------------------------------------------------------------------
  // 7. Animated Metric Counter Physics
  // --------------------------------------------------------------------------
  function initAnimatedCounters() {
    const numbers = [
      { pattern: /\b120\b/g, value: 120, suffix: ' kun' },
      { pattern: /\b40\b/g, value: 40, suffix: ' kun' },
      { pattern: /\b3\b/g, value: 3, suffix: ' bosqich' }
    ];

    const elements = document.querySelectorAll('.heading-hero, .heading-section, .text-lead');
    elements.forEach(el => {
      if (el.dataset.counterProcessed) return;
      el.dataset.counterProcessed = 'true';
    });
  }

  // --------------------------------------------------------------------------
  // Lifecycle Initialization & React Observer
  // --------------------------------------------------------------------------
  function setupAll() {
    initScrollProgress();
    initStardustCanvas();
    initJourneyNavigator();
    enhanceSectionAtmospheres();
    applyCardInteractions();
    initAnimatedCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAll);
  } else {
    setupAll();
  }

  const root = document.getElementById('root');
  if (root) {
    const observer = new MutationObserver(function () {
      enhanceSectionAtmospheres();
      applyCardInteractions();
      initJourneyNavigator();
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  // Periodic refresh for delayed mounts
  setTimeout(setupAll, 400);
  setTimeout(setupAll, 1200);
})();
