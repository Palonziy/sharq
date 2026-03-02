document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('root');
  if (!root) return;

  // Given a section element, collect meaningful child components to animate.
  function collectItems(section) {
    // Prefer explicitly marked elements
    let items = Array.from(section.querySelectorAll('[data-reveal], .reveal-item'));
    if (items.length) return items;

    // Reasonable defaults that match common component classes in this project
    const selectors = [
      '.p-8', '.card-module', '.rounded-3xl', '.grid > *', '.max-w-3xl > *',
      'h2', 'h3', 'p', 'ul', 'ol', 'figure', 'img'
    ];

    const found = [];
    const seen = new Set();
    selectors.forEach(sel => {
      section.querySelectorAll(sel).forEach(el => {
        if (!seen.has(el)) {
          seen.add(el);
          found.push(el);
        }
      });
    });

    // If nothing found, fallback to direct children inside the section's container
    if (found.length === 0) {
      const container = section.querySelector('.container') || section;
      Array.from(container.children).forEach(ch => {
        if (!seen.has(ch)) { seen.add(ch); found.push(ch); }
      });
    }

    // Limit to avoid animating too many tiny elements
    return found.slice(0, 12);
  }

  // If no IntersectionObserver, reveal immediately with stagger
  if (!('IntersectionObserver' in window)) {
    Array.from(root.querySelectorAll('section')).forEach(section => {
      const items = collectItems(section);
      items.forEach((it, i) => {
        it.classList.add('reveal-item');
        it.style.transitionDelay = `${i * 80}ms`;
        setTimeout(() => it.classList.add('is-visible'), i * 80 + 20);
      });
    });
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const items = collectItems(section);
        items.forEach((it, i) => {
          it.classList.add('reveal-item');
          // stagger by setting inline delay so CSS stays clean
          it.style.transitionDelay = `${i * 90}ms`;
          setTimeout(() => it.classList.add('is-visible'), i * 90 + 20);
        });
        io.unobserve(section);
      }
    });
  }, { threshold: 0.12 });

  // Observe existing sections
  Array.from(root.querySelectorAll('section')).forEach(sec => io.observe(sec));

  // Watch for dynamic additions (React mount) and observe new sections
  const mo = new MutationObserver(muts => {
    muts.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.tagName && node.tagName.toLowerCase() === 'section') {
          io.observe(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll('section').forEach(s => io.observe(s));
        }
      });
    });
  });

  mo.observe(root, { childList: true, subtree: true });
});
