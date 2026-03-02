document.addEventListener('DOMContentLoaded', function () {
  /**
   * Mentoring bo'limini topish va YouTube videoni vertikal (Shorts) 
   * formatga moslab, mobil va desktopda chiroyli ko'rsatish.
   */
  function setupMentoringVideo() {
    // Try to find an existing "Sizning Mentoring" heading on the page
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, .heading-section'));
    let mentoringHeading = null;

    for (const h of headings) {
      const text = (h.textContent || '').trim();
      if (text.includes('Sizning') && text.includes('Mentoring')) {
        mentoringHeading = h;
        break;
      }
    }

    // Helper to build simple video-only markup
    function buildMentoringHTML() {
      return `
        <div class="mentoring-video-wrapper">
          <video class="mentoring-video" controls playsinline preload="metadata">
            <source src="img/aziza.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      `;
    }

    if (!mentoringHeading) {
      if (document.querySelector('.mentoring-section')) return;
      // If no heading found, append a new mentoring card to the main root as a fallback
      const root = document.getElementById('root') || document.body;
      const wrapper = document.createElement('section');
      wrapper.className = 'mentoring-section';
      wrapper.innerHTML = `<div class="rounded-3xl mentoring-processed">${buildMentoringHTML()}</div>`;
      root.appendChild(wrapper);
      if (window.AOS && typeof window.AOS.refresh === 'function') window.AOS.refresh();
      return;
    }

    // Find the nearest card/container for the heading (if present)
    const card = mentoringHeading.closest('[class*="rounded-3xl"]') || mentoringHeading.closest('section')?.querySelector('[class*="rounded-3xl"]') || mentoringHeading.parentElement;

    if (!card || card.classList.contains('mentoring-processed')) return;
    card.classList.add('mentoring-processed');

    // Sanitize existing content: remove iframe/video nodes and keep textual content for the right column
    const originalContent = card.innerHTML;
    const tmp = document.createElement('div');
    tmp.innerHTML = originalContent;
    tmp.querySelectorAll('iframe, video').forEach(n => n.remove());
    const sanitizedContent = tmp.innerHTML.trim();

    // Replace the card content with only the video
    card.innerHTML = buildMentoringHTML();

    // After injecting, enhance the video element for wider compatibility and add fallbacks
    const videoEl = card.querySelector('video.mentoring-video');
    if (videoEl) {
      // Helpful attributes for mobile and iOS
      videoEl.setAttribute('playsinline', '');
      videoEl.setAttribute('webkit-playsinline', '');
      videoEl.setAttribute('preload', 'metadata');
      // Ensure controls show
      videoEl.setAttribute('controls', '');

      // If browser cannot play MP4, show a friendly fallback with download link
      let fallbackShown = false;
      videoEl.addEventListener('error', function () {
        if (fallbackShown) return;
        fallbackShown = true;
        card.innerHTML = `<div class="mentoring-video-fallback">Video brauzeringizda to'g'ri o'ynatib bo'lmadi. <a href="img/aziza.mp4" download>Tugmani bosib yuklab oling</a> yoki boshqa brauzerni sinab ko'ring.</div>`;
      });

      // Try to detect support quickly
      try {
        if (typeof videoEl.canPlayType === 'function') {
          const canPlay = videoEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
          if (canPlay === '' || canPlay === 'no') {
            // Not a strong signal of support; keep video but prepare fallback on error
          }
        }
      } catch (e) {
        // ignore
      }
    }

    // Refresh AOS if present so animations work after DOM injection
    if (window.AOS && typeof window.AOS.refresh === 'function') window.AOS.refresh();
  }

  // Sahifa yuklanganda ishga tushirish
  setupMentoringVideo();

  // React render bo'lishini kutish uchun bir necha marta qayta tekshirish
  setTimeout(setupMentoringVideo, 500);
  setTimeout(setupMentoringVideo, 1500);
});
