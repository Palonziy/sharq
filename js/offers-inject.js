/**
 * Offers/Pricing Section Injection Script
 * Injects the "Maxsus takliflar" offers section into the page
 * before the FAQ ("Ko'p So'raladigan Savollar") section.
 */

(function () {
  'use strict';

  function createOffersElement() {
    const section = document.createElement('section');
    section.id = 'offers';
    section.setAttribute('data-aos', 'fade-up');
    section.innerHTML = `
      <div class="offers-wrapper">
        <div class="offers-header text-center">
          <div class="decorative-line mx-auto mb-6"></div>
          <h2 id="offers-heading" class="heading-section mb-4">
            🔥 Maxsus <span class="gradient-text">Takliflar</span>
          </h2>
          <p class="text-lead max-w-2xl mx-auto mb-12">
            Sizning ehtiyojingiz va imkoniyatingizga mos transformatsiya paketlari.
          </p>
        </div>

        <div class="offers-container">
          <div class="offers-grid">
            <!-- Module 1: Poklanish -->
            <div class="offer-card" data-aos="fade-up" data-aos-delay="100">
              <span class="offer-icon">🟢</span>
              <h3 class="offer-title">1-MODUL: POKLANISH</h3>
              <p class="offer-subtitle">(40 KUN)</p>
              
              <p class="offer-description">
                Bu modul — ichki tozalash bosqichi. Yillar davomida yig'ilgan og'riqlar, alamlar va ichki bloklardan xalos bo'lasiz.
              </p>
              
              <h4 class="offer-features-title">✨ Sizni nimalar kutmoqda?</h4>
              <ul class="offer-features">
                <li>Chuqur ruhiy poklanish</li>
                <li>Ilohiy kitobga asoslangan amaliy mashqlar</li>
                <li>Yurak va ongdagi salbiy yuklarni bo'shatish</li>
                <li>Bosilgan hissiyotlarni sog'lom tarzda chiqarish</li>
              </ul>
              
              <div class="offer-bonus">
                <strong>🎁 BONUS:</strong> Bolalik travmalari kursi
              </div>
              
              <div class="offer-price">
                500 000 <span class="offer-currency">so'm</span>
              </div>
              
              <a href="https://t.me/T_M_Manager" class="offer-cta btn-primary" target="_blank" rel="noopener noreferrer">
                Ro'yxatdan o'tish
              </a>
            </div>
            
            <!-- Module 2: Tiklanish -->
            <div class="offer-card" data-aos="fade-up" data-aos-delay="200">
              <span class="offer-icon">🟡</span>
              <h3 class="offer-title">2-MODUL: TIKLANISH</h3>
              <p class="offer-subtitle">(40 KUN)</p>
              
              <p class="offer-description">
                Poklangan qalb endi tiklanishga muhtoj. Bu modulda siz ichki muvozanatingizni qayta topasiz.
              </p>
              
              <h4 class="offer-features-title">✨ Modulda:</h4>
              <ul class="offer-features">
                <li>Ruhiy barqarorlikni tiklash</li>
                <li>Ichki xotirjamlikni his qilish</li>
                <li>O'z imkoniyatlaringizni kashf etish</li>
                <li>Hayotiy maqsadni aniqlash</li>
                <li>Asl "Men"ga qaytish</li>
              </ul>
              
              <div class="offer-bonus">
                <strong>🎁 BONUS:</strong> "Sevgida yashash" kursi
              </div>
              
              <div class="offer-price">
                400 000 <span class="offer-currency">so'm</span>
              </div>
              
              <a href="https://t.me/T_M_Manager" class="offer-cta btn-primary" target="_blank" rel="noopener noreferrer">
                Ro'yxatdan o'tish
              </a>
            </div>
            
            <!-- Module 3: Yuksalish -->
            <div class="offer-card" data-aos="fade-up" data-aos-delay="300">
              <span class="offer-icon">🌟</span>
              <h3 class="offer-title">3-MODUL: YUKSALISH</h3>
              <p class="offer-subtitle">40 KUNLIK FAROVONLIK MARAFONI</p>
              
              <p class="offer-description">
                Hayotingizga baraka, yengillik va farovonlikni jalb qilmoqchimisiz? Bu modul aynan siz uchun.
              </p>
              
              <h4 class="offer-features-title">✨ Marafonda siz:</h4>
              <ul class="offer-features">
                <li>Shajarashunoslik asosida darslar</li>
                <li>Nasliy dasturlarning boylik ongiga ta'siri</li>
                <li>Ajdodlardan kelayotgan bloklarni anglash va yechish</li>
                <li>Boylik haqidagi noto'g'ri e'tiqodlarni o'zgartirish</li>
                <li>Ong osti cheklovlarini yechish</li>
                <li>Asma'ul Husna zikrlari (abjad asosida)</li>
                <li>Har kungi zikrlar va affirmatsiyalar</li>
              </ul>
              
              <div class="offer-price">
                300 000 <span class="offer-currency">so'm</span>
              </div>
              
              <a href="https://t.me/T_M_Manager" class="offer-cta btn-primary" target="_blank" rel="noopener noreferrer">
                Ro'yxatdan o'tish
              </a>
            </div>
          
            <!-- MAXSUS TAKLIF (Bundle) - 4-chi karta -->
            <div class="offers-bundle offer-card" data-aos="fade-up" data-aos-delay="400">
              <span class="bundle-icon">🔥</span>
              <h3 class="bundle-title">MAXSUS TAKLIF (TO'LIQ BUNDLE)</h3>
              
              <p class="bundle-description">
                Agar 3 ta modulni alohida sotib olsangiz, 1 200 000 so'm to'lash kerak bo'ladi.<br>
                <strong>Ammo HOZIR to'liq kurs uchun maxsus imtiyozli taklif bor!</strong>
              </p>
              
              <div class="bundle-pricing">
                <div class="bundle-price-item">
                  <div class="bundle-price-label">Alohida narxlar jami:</div>
                  <div class="bundle-price-original">1 200 000 so'm</div>
                </div>
                <div class="bundle-price-item">
                  <div class="bundle-price-label">🎉 HOZIRGI TAKLIF:</div>
                  <div class="bundle-price-value">900 000 so'm</div>
                </div>
              </div>
              
              <div class="bundle-savings">
                <span class="bundle-savings-label">💸 Sof tejashingiz:</span>
                300 000 so'm
              </div>
              
              <p class="bundle-warning">
                📍 Joylar soni cheklangan — o'z joyingizni band qiling!
              </p>
              
              <a href="https://t.me/T_M_Manager" class="bundle-cta btn-primary" target="_blank" rel="noopener noreferrer">
                To'liq kursga ro'yxatdan o'tish ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  function findFAQSection() {
    const headings = document.querySelectorAll('h1, h2, h3, h4');
    for (let i = 0; i < headings.length; i++) {
      const text = (headings[i].textContent || '').toLowerCase();
      if (text.includes("ko'p so'raladigan") || text.includes("ko'p soraladigan") || text.includes('savollar')) {
        return headings[i].closest('section') || headings[i].parentElement;
      }
    }
    return null;
  }

  function injectOffers() {
    const root = document.getElementById('root');
    if (!root) return;

    let offersEl = document.getElementById('offers');
    const faqSection = findFAQSection();

    if (!offersEl) {
      offersEl = createOffersElement();
    }

    if (faqSection && faqSection.parentNode) {
      // If offers is not right before faqSection, place it there
      if (offersEl.nextElementSibling !== faqSection) {
        faqSection.parentNode.insertBefore(offersEl, faqSection);
      }
    } else if (!offersEl.parentNode) {
      // Append inside main if root contains main, else root
      const main = root.querySelector('main') || root;
      main.appendChild(offersEl);
    }

    if (window.AOS && typeof window.AOS.refresh === 'function') {
      window.AOS.refresh();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectOffers);
  } else {
    injectOffers();
  }

  // Observer to ensure placement right before FAQ as soon as React renders
  const root = document.getElementById('root');
  if (root) {
    const mo = new MutationObserver(function () {
      const faq = findFAQSection();
      const offers = document.getElementById('offers');
      if (faq && (!offers || offers.nextElementSibling !== faq)) {
        injectOffers();
      }
    });
    mo.observe(root, { childList: true, subtree: true });
  }

  setTimeout(injectOffers, 300);
  setTimeout(injectOffers, 1000);
})();
