document.addEventListener('DOMContentLoaded', function () {
  const youtubeUrl = 'https://youtube.com/@psixolog-surayyoaziz?si=SO_TJcaPo70im6zX';

  function setupFooterYoutube() {
    // Footer konteynerini topish
    const footer = document.querySelector('footer, .site-footer, .footer, [role="contentinfo"], #footer');
    if (!footer) return;

    // Agar havola allaqachon mavjud bo'lsa, qayta yaratmaslik
    if (document.querySelector('.footer-youtube-link')) return;

    // Markaziy konteyner yaratish
    const centerContainer = document.createElement('div');
    centerContainer.className = 'footer-center';

    // YouTube tugmasini yaratish
    const youtubeLink = document.createElement('a');
    youtubeLink.className = 'footer-youtube-link';
    youtubeLink.href = youtubeUrl;
    youtubeLink.target = '_blank';
    youtubeLink.rel = 'noopener noreferrer';
    youtubeLink.setAttribute('aria-label', "YouTube kanalimizga o'tish");

    youtubeLink.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.38.58A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.56 20.5 12 20.5 12 20.5s7.44 0 9.38-.58A3 3 0 0 0 23.5 17.8 31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8z" fill="#FF0000"/>
        <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#fff"/>
      </svg>
      <span>YouTube</span>
    `;

    centerContainer.appendChild(youtubeLink);
    
    // Footerning oxiriga qo'shish
    footer.appendChild(centerContainer);
  }

  setupFooterYoutube();
});
