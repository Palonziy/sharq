/**
 * Floating Premium Navbar & Sticky Conversion Controls
 * Provides glassmorphic navigation, smooth scrolling, and mobile floating CTA.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const telegramUrl = 'https://t.me/T_M_Manager';

  function createNavbar() {
    if (document.getElementById('site-navbar')) return;

    const nav = document.createElement('nav');
    nav.id = 'site-navbar';
    nav.className = 'site-navbar';
    nav.innerHTML = `
      <div class="navbar-container">
        <!-- Brand Logo -->
        <a href="#" class="navbar-logo" aria-label="Bosh sahifaga qaytish">
          <span class="navbar-sparkle">✦</span>
          <span class="navbar-title">40 Kunlik Poklanish</span>
        </a>

        <!-- Desktop Navigation Links -->
        <ul class="navbar-links">
          <li><a href="#dastur-link" class="nav-item">Dastur</a></li>
          <li><a href="#mentor-link" class="nav-item">Mentor</a></li>
          <li><a href="#offers" class="nav-item">Takliflar</a></li>
          <li><a href="#faq-link" class="nav-item">Savollar</a></li>
        </ul>

        <!-- Header CTA -->
        <div class="navbar-actions">
          <a href="${telegramUrl}" class="navbar-cta btn-primary" target="_blank" rel="noopener noreferrer">
            <span>Ro'yxatdan o'tish</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `;

    document.body.prepend(nav);

    // Floating Telegram Action Button on mobile / scroll
    const floatBtn = document.createElement('a');
    floatBtn.id = 'floating-telegram-cta';
    floatBtn.className = 'floating-telegram-cta';
    floatBtn.href = telegramUrl;
    floatBtn.target = '_blank';
    floatBtn.rel = 'noopener noreferrer';
    floatBtn.setAttribute('aria-label', "Telegram orqali bog'lanish");
    floatBtn.innerHTML = `
      <span class="floating-cta-pulse"></span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
      </svg>
      <span class="floating-cta-text">Menejer bilan bog'lanish</span>
    `;
    document.body.appendChild(floatBtn);

    // Scroll listeners for Navbar shadow & Floating button visibility
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }

      if (scrollY > 400) {
        floatBtn.classList.add('is-visible');
      } else {
        floatBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    // Handle smooth scrolling for anchor links
    nav.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetAttr = this.getAttribute('href');

        let targetEl = null;
        if (targetAttr === '#offers') {
          targetEl = document.getElementById('offers');
        } else if (targetAttr === '#dastur-link') {
          // Find "Har Bir Bosqichda Sizni Nima Kutmoqda" or "Uch Bosqichli"
          targetEl = findSectionByText("Uch Bosqichli");
        } else if (targetAttr === '#mentor-link') {
          targetEl = findSectionByText("Sizning Mentoring");
        } else if (targetAttr === '#faq-link') {
          targetEl = findSectionByText("Ko'p So'raladigan");
        }

        if (targetEl) {
          const navHeight = nav.offsetHeight || 70;
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    function findSectionByText(text) {
      const headings = document.querySelectorAll('h1, h2, h3');
      for (let h of headings) {
        if ((h.textContent || '').includes(text)) {
          return h.closest('section') || h.parentElement;
        }
      }
      return null;
    }
  }

  createNavbar();
});
