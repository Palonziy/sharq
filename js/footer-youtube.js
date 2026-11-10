document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const youtubeUrl = 'https://youtube.com/@psixolog-surayyoaziz?si=SO_TJcaPo70im6zX';
  const telegramUrl = 'https://t.me/T_M_Manager';

  function setupUnifiedFooter() {
    const footer = document.getElementById('site-footer') || document.querySelector('footer#site-footer');
    if (!footer) return;

    if (footer.querySelector('.footer-unified-container')) return;

    footer.innerHTML = `
      <div class="footer-unified-container">
        <div class="footer-brand-column">
          <div class="footer-logo">
            <span class="footer-logo-sparkle">✦</span>
            <span class="footer-logo-text">40 Kunlik Poklanish</span>
          </div>
          <p class="footer-tagline">Ichki o'sish, ruhiy yangilanish va farovonlik yo'li.</p>
        </div>

        <div class="footer-links-column">
          <a href="${telegramUrl}" class="footer-social-btn footer-telegram-btn" target="_blank" rel="noopener noreferrer" aria-label="Telegram menejer bilan bog'lanish">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
            </svg>
            <span>Telegram: @T_M_Manager</span>
          </a>

          <a href="${youtubeUrl}" class="footer-social-btn footer-youtube-btn" target="_blank" rel="noopener noreferrer" aria-label="YouTube kanalimizga o'tish">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.38.58A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.56 20.5 12 20.5 12 20.5s7.44 0 9.38-.58A3 3 0 0 0 23.5 17.8 31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8z"/>
              <polygon points="10,15.5 16,12 10,8.5" fill="#FAF7F2"/>
            </svg>
            <span>YouTube: Surayyo Aziz</span>
          </a>
        </div>

        <div class="footer-bottom-row">
          <p class="footer-copyright">40 Kunlik Poklanish &copy; 2026. Barcha huquqlar himoyalangan.</p>
          <a href="https://palo.uz" target="_blank" rel="noopener noreferrer" class="footer-author">Crafted with care by <strong>palo.uz</strong></a>
        </div>
      </div>
    `;
  }

  setupUnifiedFooter();

  // Handle re-renders
  const root = document.getElementById('root');
  if (root) {
    const observer = new MutationObserver(function () {
      setupUnifiedFooter();
    });
    observer.observe(root, { childList: true });
  }
});
