/**
 * Premium Mentoring Video Player Component
 * Robust playback, custom luxury controls, full buffering, and zero-crash fallback.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const youtubeUrl = 'https://youtube.com/@psixolog-surayyoaziz?si=SO_TJcaPo70im6zX';

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

    if (!mentoringHeading) return;

    const section = mentoringHeading.closest('section');
    const card = section ? section.querySelector('[class*="rounded-3xl"]') : null;

    if (!card || card.classList.contains('mentoring-processed')) return;
    card.classList.add('mentoring-processed');

    card.innerHTML = `
      <div class="mentoring-video-wrapper">
        <video 
          class="mentoring-video" 
          src="img/aziza.mp4" 
          poster="img/poster.jpg" 
          preload="auto" 
          playsinline 
          webkit-playsinline 
          controls
        >
          <source src="img/aziza.mp4" type="video/mp4">
        </video>

        <!-- Luxury Centered Play Button Overlay -->
        <button type="button" class="video-play-overlay" aria-label="Videoni ijro etish">
          <span class="video-play-pulse"></span>
          <span class="video-play-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6,3 20,12 6,21"/>
            </svg>
          </span>
          <span class="video-play-label">Videoni tomosha qilish</span>
        </button>

        <!-- Subtle YouTube Watch Link -->
        <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" class="video-yt-chip" title="YouTube'da ochish">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.38.58A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.56 20.5 12 20.5 12 20.5s7.44 0 9.38-.58A3 3 0 0 0 23.5 17.8 31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8z"/>
            <polygon points="10,15.5 16,12 10,8.5" fill="#fff"/>
          </svg>
          <span>YouTube</span>
        </a>
      </div>
    `;

    const wrapper = card.querySelector('.mentoring-video-wrapper');
    const video = card.querySelector('video.mentoring-video');
    const playBtn = card.querySelector('.video-play-overlay');

    if (video && playBtn) {
      function startPlayback() {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              playBtn.classList.add('is-playing');
            })
            .catch(() => {
              // Autoplay with sound may be blocked by browser policy: play muted and allow user to unmute
              video.muted = true;
              video.play().then(() => {
                playBtn.classList.add('is-playing');
                // Show unmute hint
                showUnmuteHint();
              }).catch(() => {
                // If still prevented, keep play button visible
                playBtn.classList.remove('is-playing');
              });
            });
        }
      }

      function showUnmuteHint() {
        if (wrapper.querySelector('.video-unmute-hint')) return;
        const hint = document.createElement('button');
        hint.type = 'button';
        hint.className = 'video-unmute-hint';
        hint.innerHTML = '🔊 Ovozni yoqish';
        hint.onclick = function (e) {
          e.stopPropagation();
          video.muted = false;
          hint.remove();
        };
        wrapper.appendChild(hint);
      }

      playBtn.addEventListener('click', function (e) {
        e.preventDefault();
        startPlayback();
      });

      video.addEventListener('play', function () {
        playBtn.classList.add('is-playing');
      });

      video.addEventListener('pause', function () {
        if (!video.seeking) {
          playBtn.classList.remove('is-playing');
        }
      });

      video.addEventListener('ended', function () {
        playBtn.classList.remove('is-playing');
        video.currentTime = 0;
      });

      // Graceful error handling: NEVER destroy the video player!
      video.addEventListener('error', function () {
        console.warn('Video playback encountered an error, falling back smoothly.');
        // Show friendly retry without wiping the card
        if (!wrapper.querySelector('.video-retry-banner')) {
          const banner = document.createElement('div');
          banner.className = 'video-retry-banner';
          banner.innerHTML = `
            <p>Video ijrosida to'xtalish bo'ldi.</p>
            <div class="video-retry-actions">
              <button type="button" class="video-retry-btn">Qayta urinish</button>
              <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" class="video-retry-yt">YouTube'da ko'rish</a>
            </div>
          `;
          banner.querySelector('.video-retry-btn').onclick = function () {
            banner.remove();
            video.load();
            video.play();
          };
          wrapper.appendChild(banner);
        }
      });
    }

    if (window.AOS && typeof window.AOS.refresh === 'function') {
      window.AOS.refresh();
    }
  }

  setupMentoringVideo();

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
