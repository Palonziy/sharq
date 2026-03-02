/**
 * Offers/Pricing Section Injection Script
 * This script injects the "Maxsus takliflar" offers section into the page
 * with all 4 packages: Module 1 (Poklanish), Module 2 (Tiklanish), 
 * Module 3 (Yuksalish), and Bundle (MAXSUS TAKLIF)
 */

(function() {
  function injectOffersSection() {
    // Check if offers section already exists
    if (document.getElementById('offers')) {
      return;
    }

    // Get the root element
    const root = document.getElementById('root');
    if (!root) {
      setTimeout(injectOffersSection, 100);
      return;
    }

    // Create the complete offers section HTML
    const offersHTML = `
    <section id="offers" data-aos="fade-up">
      <h2 id="offers-heading">🔥 Maxsus takliflar</h2>
      <div class="offers-container">
        <div class="offers-grid">
          <!-- Module 1: Poklanish -->
          <div class="offer-card" data-aos="fade-up" data-aos-delay="100">
            <span class="offer-icon">🟢</span>
            <h3 class="offer-title">1-MODUL: POKLANISH</h3>
            <p class="offer-subtitle">(40 KUN)</p>
            
            <p class="offer-description">
              Bu modul — ichki tozalash bosqichi.<br>
              Yillar davomida yig'ilgan og'riqlar, alamlar va ichki bloklardan xalos bo'lasiz.
            </p>
            
            <h4 style="color: hsl(var(--foreground)); font-weight: 600; margin-top: 1rem; margin-bottom: 1rem;">✨ Sizni nimalar kutmoqda?</h4>
            <ul class="offer-features" style>
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
            
            <a href="https://t.me/T_M_Manager" class="offer-cta" target="_blank" rel="noopener noreferrer">
              Ro'yxatdan o'tish
            </a>

          </div>
          
          <!-- Module 2: Tiklanish (FEATURED) -->
          <div class="offer-card" data-aos="fade-up" data-aos-delay="200">
            <span class="offer-icon">🟡</span>
            <h3 class="offer-title">2-MODUL: TIKLANISH</h3>
            <p class="offer-subtitle">(40 KUN)</p>
            
            <p class="offer-description">
              Poklangan qalb endi tiklanishga muhtoj.<br>
              Bu modulda siz ichki muvozanatingizni qayta topasiz.
            </p>
            
            <h4 style="color: hsl(var(--foreground)); font-weight: 600; margin-top: 1rem; margin-bottom: 1rem;">✨ Modulda:</h4>
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
            
            <a href="https://t.me/T_M_Manager" class="offer-cta" target="_blank" rel="noopener noreferrer">
              Ro'yxatdan o'tish
            </a>
            
          </div>
          
          <!-- Module 3: Yuksalish -->
          <div class="offer-card" data-aos="fade-up" data-aos-delay="300">
            <span class="offer-icon">🌟</span>
            <h3 class="offer-title">3-MODUL: YUKSALISH</h3>
            <p class="offer-subtitle">40 KUNLIK FAROVONLIK MARAFONI</p>
            
            <p class="offer-description">
              Hayotingizga baraka, yengillik va farovonlikni jalb qilmoqchimisiz?<br>
              Bu modul aynan siz uchun.
            </p>
            
            <h4 style="color: hsl(var(--foreground)); font-weight: 600; margin-top: 1rem; margin-bottom: 1rem;">✨ Marafonda siz:</h4>
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
            
            <a href="https://t.me/T_M_Manager" class="offer-cta" target="_blank" rel="noopener noreferrer">
              Ro'yxatdan o'tish
            </a>
          </div>
        
          <!-- MAXSUS TAKLIF (Bundle) - 4-chi karta -->
          <div class="offers-bundle offer-card" data-aos="fade-up" data-aos-delay="400">
          <span class="bundle-icon">🔥</span>
          <h2 class="bundle-title">MAXSUS TAKLIF (BUNDLE)</h2>
          
          <p class="bundle-description">
            Agar 3 ta modulni alohida sotib olsangiz, 1 200 000 so'm to'lash kerak bo'ladi.<br>
            <strong>Ammo HOZIR maxsus taklif bor!</strong>
          </p>
          
          <div class="bundle-pricing">
            <div class="bundle-price-item">
              <div class="bundle-price-label">Agar alohida sotib olsangiz:</div>
              <div class="bundle-price-value">1 200 000 so'm</div>
            </div>
            <div class="bundle-price-item">
              <div class="bundle-price-label">🎉 HOZIR TAKLIF:</div>
              <div class="bundle-price-value">900 000 so'm</div>
            </div>
          </div>
          
          <div class="bundle-savings">
            <span class="bundle-savings-label">💸 Tejashingiz:</span>
            300 000 so'm
          </div>
          
          <p class="bundle-warning">
            📍 Joylar soni cheklangan
          </p>
          
          <p class="bundle-description" style="margin-top: 1.5rem; color: hsl(var(--foreground)); font-weight: 600;">
            👉 Hayotingizga investitsiya qiling — yutishda bo'ling!
          </p>
          
          <a href="https://t.me/T_M_Manager" class="bundle-cta" target="_blank" rel="noopener noreferrer">
            Ro'yxatdan o'tish ↗
          </a>
          </div>
        </div>
      </div>
    </section>
    `;

    // Create a temporary container and insert the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = offersHTML;
    const offersSection = tempDiv.firstElementChild;

    // Try to insert the offers section before the FAQ ("Ko'p So'raladigan Savollar") if present,
    // otherwise append at the end of root.
    (function insertBeforeFAQ() {
      try {
        var headings = document.querySelectorAll('h1,h2,h3,h4');
        var faqHeading = null;
        for (var i = 0; i < headings.length; i++) {
          var t = headings[i].textContent || headings[i].innerText || '';
          if (t && t.toLowerCase().indexOf("ko'p so'raladigan") !== -1 || t.toLowerCase().indexOf("ko'p soraladigan") !== -1 || t.toLowerCase().indexOf("ko'p so'raladigan savollar") !== -1 || t.toLowerCase().indexOf("ko'p soraladigan savollar") !== -1) {
            faqHeading = headings[i];
            break;
          }
        }

        if (faqHeading) {
          var faqSection = faqHeading.closest('section') || faqHeading.parentElement;
          if (faqSection && faqSection.parentNode) {
            faqSection.parentNode.insertBefore(offersSection, faqSection);
            return;
          }
        }
      } catch (e) {
        // ignore and append below
      }

      root.appendChild(offersSection);
    })();

    // Refresh AOS animations if available
    if (window.AOS) {
      setTimeout(() => window.AOS.refresh(), 100);
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectOffersSection);
  } else {
    // DOM is already ready, but content might still be loading
    setTimeout(injectOffersSection, 300);
  }

  // Try again after a longer delay to ensure React has rendered
  setTimeout(injectOffersSection, 1000);
})();
