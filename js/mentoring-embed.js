document.addEventListener('DOMContentLoaded', function () {
  /**
   * Mentoring bo'limi: vertikal 9:16 formatdagi videoni
   * mobil va desktopda chiroyli ko'rsatish.
   */
  function setupMentoringVideo() {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, .heading-section'));
    let mentoringHeading = null;

    for (const h of headings) {
      const text = (h.textContent || '').trim();
      if (text.includes('Sizning') && text.includes('Mentoring')) {
        mentoringHeading = h;
        break;
      }
    }

    function buildMentoringHTML() {
      return `
        <div class="mentoring-video-wrapper">
          <video class="mentoring-video" controls playsinline preload="metadata" poster="img/poster.jpg">
            <source src="img/aziza.mp4" type="video/mp4">
            Brauzeringiz video formatini qo'llab-quvvatlamaydi.
          </video>
        </div>
      `;
    }

    if (!mentoringHeading) return;

    // Left column card inside the section
    const section = mentoringHeading.closest('section');
    const card = section ? section.querySelector('[class*="rounded-3xl"]') : null;

    if (!card || card.classList.contains('mentoring-processed')) return;
    card.classList.add('mentoring-processed');

    card.innerHTML = buildMentoringHTML();

    const videoEl = card.querySelector('video.mentoring-video');
    if (videoEl) {
      videoEl.setAttribute('playsinline', '');
      videoEl.setAttribute('webkit-playsinline', '');

      let fallbackShown = false;
      videoEl.addEventListener('error', function () {
        if (fallbackShown) return;
        fallbackShown = true;
        card.innerHTML = `<div class="mentoring-video-fallback">Video brauzeringizda o'ynatilmadi. <a href="img/aziza.mp4" download>Videoni yuklab oling</a></div>`;
      });
    }

    if (window.AOS && typeof window.AOS.refresh === 'function') {
      window.AOS.refresh();
    }
  }

  setupMentoringVideo();

  // Watch for React mounting via MutationObserver
  const root = document.getElementById('root');
  if (root) {
    const observer = new MutationObserver(function () {
      if (!document.querySelector('.mentoring-processed')) {
        setupMentoringVideo();
      }
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  setTimeout(setupMentoringVideo, 300);
  setTimeout(setupMentoringVideo, 1000);
});
