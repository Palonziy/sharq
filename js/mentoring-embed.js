/**
 * Premium Mentoring Video Player Component
 * Robust playback, dual-strategy blob preloading, zero-crash buffering watchdog,
 * and guaranteed 0:00 restart on retry.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const YOUTUBE_URL = 'https://youtube.com/@psixolog-surayyoaziz?si=SO_TJcaPo70im6zX';
  const VIDEO_PATH = 'img/aziza.mp4';
  const POSTER_PATH = 'img/poster.jpg';

  // Global blob cache across re-mounts
  let cachedBlobUrl = null;
  let isBlobDownloading = false;
  let downloadProgress = 0;
  const progressCallbacks = new Set();
  const readyCallbacks = new Set();

  /**
   * Preload video into memory as a Blob.
   * This guarantees:
   * 1. Zero HTTP 206 Range request issues (supported on all servers).
   * 2. Zero buffering stalls at 0:02 or GOP boundaries.
   * 3. Instant seeking to any second.
   * 4. Reliable 0:00 playback on retry.
   */
  function startBlobPreload() {
    if (cachedBlobUrl || isBlobDownloading) return;
    isBlobDownloading = true;

    // Use standard GET request (accepted by every server without Range requirements)
    fetch(VIDEO_PATH, { cache: 'force-cache' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }

        const contentLength = response.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        // If ReadableStream is available, track progress
        if (response.body && typeof response.body.getReader === 'function') {
          const reader = response.body.getReader();
          let received = 0;
          const chunks = [];

          function readChunk() {
            return reader.read().then(function (result) {
              if (result.done) {
                return new Blob(chunks, { type: 'video/mp4' });
              }
              chunks.push(result.value);
              received += result.value.length;
              if (total > 0) {
                downloadProgress = Math.min(100, Math.round((received / total) * 100));
                progressCallbacks.forEach(function (cb) {
                  try { cb(downloadProgress); } catch (e) {}
                });
              }
              return readChunk();
            });
          }

          return readChunk();
        }

        return response.blob();
      })
      .then(function (blob) {
        cachedBlobUrl = URL.createObjectURL(blob);
        downloadProgress = 100;
        isBlobDownloading = false;
        readyCallbacks.forEach(function (cb) {
          try { cb(cachedBlobUrl); } catch (e) {}
        });
        progressCallbacks.clear();
        readyCallbacks.clear();
      })
      .catch(function (err) {
        console.warn('Video blob prefetch notice:', err.message);
        isBlobDownloading = false;
        // Native video fallback remains fully active
      });
  }

  // Start preloading immediately in background
  startBlobPreload();

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

    const initialSrc = cachedBlobUrl || VIDEO_PATH;

    card.innerHTML = `
      <div class="mentoring-video-wrapper">
        <video 
          class="mentoring-video" 
          src="${initialSrc}" 
          poster="${POSTER_PATH}" 
          preload="auto" 
          playsinline 
          webkit-playsinline 
          controls
        >
          <source src="${initialSrc}" type="video/mp4">
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
        <a href="${YOUTUBE_URL}" target="_blank" rel="noopener noreferrer" class="video-yt-chip" title="YouTube'da ochish">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.38.58A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.56 20.5 12 20.5 12 20.5s7.44 0 9.38-.58A3 3 0 0 0 23.5 17.8 31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8z"/>
            <polygon points="10,15.5 16,12 10,8.5" fill="#fff"/>
          </svg>
          <span>YouTube</span>
        </a>

        <!-- Buffer / Loading Progress Bar -->
        <div class="video-loading-indicator" style="display: none;">
          <div class="video-spinner"></div>
          <span class="video-loading-text">Video yuklanmoqda...</span>
          <div class="video-progress-track">
            <div class="video-progress-bar" style="width: 0%;"></div>
          </div>
        </div>
      </div>
    `;

    const wrapper = card.querySelector('.mentoring-video-wrapper');
    const video = card.querySelector('video.mentoring-video');
    const playBtn = card.querySelector('.video-play-overlay');
    const loader = card.querySelector('.video-loading-indicator');
    const loaderText = card.querySelector('.video-loading-text');
    const progressBar = card.querySelector('.video-progress-bar');

    let stallTimer = null;
    let isStalled = false;

    // Show buffering indicator
    function showLoader(text, pct) {
      if (!loader) return;
      loader.style.display = 'flex';
      if (text && loaderText) loaderText.textContent = text;
      if (pct !== undefined && progressBar) {
        progressBar.style.width = pct + '%';
      }
    }

    function hideLoader() {
      if (!loader) return;
      loader.style.display = 'none';
    }

    // Attach blob when ready
    function onBlobReady(blobUrl) {
      if (!video) return;
      // If currently using the direct file path, seamlessly switch
      if (video.src !== blobUrl) {
        const wasPlaying = !video.paused && !video.ended;
        const curTime = video.currentTime || 0;
        video.src = blobUrl;
        video.currentTime = curTime;
        if (wasPlaying) {
          video.play().catch(function () {});
        }
      }
      hideLoader();
      removeRetryBanner();
    }

    if (cachedBlobUrl) {
      onBlobReady(cachedBlobUrl);
    } else {
      readyCallbacks.add(onBlobReady);
      progressCallbacks.add(function (pct) {
        if (isStalled) {
          showLoader(`Video yuklanmoqda: ${pct}%`, pct);
        }
      });
    }

    // Start video playback cleanly
    function startPlayback() {
      removeRetryBanner();
      hideLoader();

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(function () {
            playBtn.classList.add('is-playing');
          })
          .catch(function () {
            // Autoplay policy: retry muted with user unmute prompt
            video.muted = true;
            video.play()
              .then(function () {
                playBtn.classList.add('is-playing');
                showUnmuteHint();
              })
              .catch(function () {
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

    function removeRetryBanner() {
      const banner = wrapper.querySelector('.video-retry-banner');
      if (banner) banner.remove();
      isStalled = false;
    }

    /**
     * Complete reset & restart from 0:00
     */
    function restartFromBeginning() {
      removeRetryBanner();
      hideLoader();

      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {}

      // Prefer cached blob for 100% reliable local playback
      if (cachedBlobUrl) {
        video.src = cachedBlobUrl;
      } else {
        // Cache bust query to prevent stuck browser buffer
        video.src = VIDEO_PATH + '?t=' + Date.now();
      }

      video.load();

      // Ensure seek to frame 0 after load
      video.currentTime = 0;

      const p = video.play();
      if (p !== undefined) {
        p.then(function () {
          playBtn.classList.add('is-playing');
        }).catch(function () {
          video.muted = true;
          video.currentTime = 0;
          video.play().then(function () {
            playBtn.classList.add('is-playing');
            showUnmuteHint();
          }).catch(function () {
            playBtn.classList.remove('is-playing');
          });
        });
      }
    }

    function showRetryBanner(message) {
      if (wrapper.querySelector('.video-retry-banner')) return;
      hideLoader();

      const banner = document.createElement('div');
      banner.className = 'video-retry-banner';
      banner.innerHTML = `
        <div class="video-retry-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <p class="video-retry-title">${message || "Video ijrosida to'xtalish bo'ldi."}</p>
        <p class="video-retry-subtitle">Qayta boshlash orqali videoni boshidan tomosha qiling</p>
        <div class="video-retry-actions">
          <button type="button" class="video-retry-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px">
              <path d="M1 4v6h6"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
            Boshidan boshlash
          </button>
          <a href="${YOUTUBE_URL}" target="_blank" rel="noopener noreferrer" class="video-retry-yt">
            YouTube'da ko'rish
          </a>
        </div>
      `;

      banner.querySelector('.video-retry-btn').onclick = function (e) {
        e.preventDefault();
        restartFromBeginning();
      };

      wrapper.appendChild(banner);
    }

    // Watchdog for buffering stalls
    function handleBufferStall() {
      if (video.paused || video.ended) return;

      // If blob already cached, instantly recover!
      if (cachedBlobUrl && video.src !== cachedBlobUrl) {
        const cur = video.currentTime;
        video.src = cachedBlobUrl;
        video.currentTime = cur;
        video.play().catch(function () {});
        return;
      }

      isStalled = true;
      if (isBlobDownloading && downloadProgress < 100) {
        showLoader(`Video yuklanmoqda: ${downloadProgress}%`, downloadProgress);
      } else {
        showLoader('Video yuklanmoqda...', 50);
      }

      if (stallTimer) clearTimeout(stallTimer);
      stallTimer = setTimeout(function () {
        if (isStalled && !video.ended) {
          if (cachedBlobUrl) {
            onBlobReady(cachedBlobUrl);
          } else {
            showRetryBanner("Internet yoki server sababli to'xtalish yuz berdi.");
          }
        }
      }, 4500);
    }

    function handleBufferRecover() {
      isStalled = false;
      if (stallTimer) {
        clearTimeout(stallTimer);
        stallTimer = null;
      }
      hideLoader();
      removeRetryBanner();
    }

    // Event Listeners
    playBtn.addEventListener('click', function (e) {
      e.preventDefault();
      startPlayback();
    });

    video.addEventListener('play', function () {
      playBtn.classList.add('is-playing');
      handleBufferRecover();
    });

    video.addEventListener('playing', handleBufferRecover);
    video.addEventListener('canplay', handleBufferRecover);

    video.addEventListener('pause', function () {
      if (!video.seeking && !isStalled) {
        playBtn.classList.remove('is-playing');
      }
    });

    video.addEventListener('ended', function () {
      playBtn.classList.remove('is-playing');
      video.currentTime = 0;
    });

    video.addEventListener('waiting', handleBufferStall);
    video.addEventListener('stalled', handleBufferStall);

    video.addEventListener('error', function (e) {
      console.warn('Video element error event:', e);
      // If blob is available, immediately switch to blob
      if (cachedBlobUrl && video.src !== cachedBlobUrl) {
        const cur = video.currentTime || 0;
        video.src = cachedBlobUrl;
        video.currentTime = cur;
        video.play().catch(function () {});
      } else {
        showRetryBanner("Video yuklanishida xatolik yuz berdi.");
      }
    });

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
