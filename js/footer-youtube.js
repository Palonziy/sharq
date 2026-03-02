document.addEventListener('DOMContentLoaded', function () {
  const youtubeUrl = 'https://youtube.com/@psixolog-surayyoaziz?si=SO_TJcaPo70im6zX';

  function setupFooterYoutube() {
    // Footer konteynerini topish - avval biz yaratgan #site-footer ni tekshiramiz
    const footer = document.getElementById('site-footer') || document.querySelector('footer, .site-footer, .footer, [role="contentinfo"], #footer');
    if (!footer) return;

    // Agar havola allaqachon mavjud bo'lsa, qayta yaratmaslik
    if (document.querySelector('.footer-youtube-link')) return;

    // Unified Row Container
    const footerRow = document.createElement('div');
    footerRow.className = 'footer-row';

    // YouTube Content
    const youtubeLink = document.createElement('a');
    youtubeLink.className = 'footer-youtube-link';
    youtubeLink.href = youtubeUrl;
    youtubeLink.target = '_blank';
    youtubeLink.rel = 'noopener noreferrer';
    youtubeLink.setAttribute('aria-label', "YouTube kanalimizga o'tish");

    youtubeLink.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.38.58A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.56 20.5 12 20.5 12 20.5s7.44 0 9.38-.58A3 3 0 0 0 23.5 17.8 31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8z" fill="#fff"/>
        <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="red"/>
      </svg>
      <span>YouTube</span>
    `;

    // Branding Content
    const branding = document.createElement('span');
    branding.className = 'footer-copy';
    branding.innerHTML = `palo.uz &copy; 2026`;

    footerRow.appendChild(youtubeLink);
    footerRow.appendChild(branding);

    // Add to footer
    footer.appendChild(footerRow);
  }

  setupFooterYoutube();
});
