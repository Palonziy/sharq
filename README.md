# 40 Kunlik Poklanish – Ichki O'sish va Yangilanish Yo'li

> 120 kunlik ruhiy va hissiy transformatsiya dasturi uchun zamonaviy, estetik va to'liq moslashuvchan (responsive) veb-platforma.

---

## 📖 Loyiha Haqida

**"40 Kunlik Poklanish"** — insonning o'tmish og'riqlari, ruhiy jarohatlari va ichki to'siqlaridan xalos bo'lib, xotirjamlik, muhabbat va moliyaviy farovonlikka erishishiga yo'naltirilgan uch bosqichli kompleks sayohat platformasi.

Ushbu platforma yuqori konversiyali Landing Page sifatida ishlab chiqilgan bo'lib, tashrif buyuruvchilarni bosqichma-bosqich dastur mohiyati bilan tanishtiradi, mentor bilan video-tanishuvni taqdim etadi va to'g'ridan-to'g'ri Telegram orqali ro'yxatdan o'tish imkonini beradi.

---

## ✨ Asosiy Xususiyatlar va Imkoniyatlar

1. **Uch Bosqichli Transformatsiya:**
   - **1-Modul: Poklanish (40 kun)** — Kechirish amaliyotlari, o'tmish yukidan xalos bo'lish va bolalik travmalarini davolash.
   - **2-Modul: Tiklanish (40 kun)** — Ruhiy barqarorlik, ichki xotirjamlik va asl "Men"ni kashf etish.
   - **3-Modul: Yuksalish (40 kun)** — Farovonlik marafoni, shajarashunoslik va nasliy dasturlar bilan ishlash, Asma'ul Husna zikrlari.
2. **Maxsus Takliflar va Chegirmalar (Pricing Module):**
   - Alohida modullar va umumiy **Bundle** (barcha 3 ta modul bittada, 300 000 so'm tejamkorlik bilan) kartalari.
3. **Mentor Video Taqdimoti:**
   - 3 ta oliy ma'lumotli mutaxassis, pedagog, psixolog va shajarashunos **Surayyo Aziz**ning vertikal (Shorts/Reels) formatdagi samimiy video murojaati (`poster` optimizatsiyasi bilan).
4. **Zamonaviy Tipografika va Dizayn Tizimi:**
   - Google Fonts orqali ulangan nafis **Cormorant Garamond** (serif) va toza **Inter** (sans-serif) shriftlari.
   - "Warm & Spiritual" ranglar palitrasi: yumshoq krem (`cream`), iliq oltin (`gold`), nozik pushti (`rose`) va yalpiz (`sage`).
5. **Scroll Animatsiyalari (AOS):**
   - Sayt bo'ylab silliq va tabiiy harakatlar (`fade-up`, `fade-right`, `fade-left`).
   - `prefers-reduced-motion` orqali inklyuzivlik va qulaylik ta'minlangan.
6. **Yagona va To'liq Footer:**
   - Brend nomi, shior, Telegram menejeriga tezkor havola (`@T_M_Manager`) va rasmiy YouTube kanali havolasi.

---

## 📁 Fayllar va Loyiha Tuzilishi

```
sharq/
├── index.html              # Asosiy HTML hujjati (SEO meta, OpenGraph, Fontlar)
├── README.md               # Loyiha hujjatlanishi
├── .vscode/settings.json   # Ishchi muhit sozlamalari
├── css/
│   ├── style.css           # Tailwind CSS va komponentlar bazaviy stillari
│   └── overrides.css       # Dizayn tizimi, video va takliflar maxsus stillari
├── js/
│   ├── script.js           # Asosiy React 18 SPA ilovasi (Landing page)
│   ├── offers-inject.js    # Maxsus takliflar va narxlar (Pricing) bloki
│   ├── mentoring-embed.js  # Mentor videosini joylashtiruvchi va boshqaruvchi skript
│   ├── footer-youtube.js   # Mukammal yagona footer (Telegram & YouTube)
│   ├── aos-setup.js        # Scroll animatsiyalarini (AOS) avtomatlashtirish
│   └── security.js         # Sayt yaxlitligi va himoyasi (anti-clickjacking, dev deterrent)
└── img/
    ├── aziza.mp4           # Mentor video murojaati (1080x1920)
    ├── poster.jpg          # Video uchun tezkor muqova surati (540x960)
    ├── favicon.svg         # Vektorli oltin nishon favicon
    ├── favicon.png         # Rasmli favicon
    └── og-image.png        # Ijtimoiy tarmoqlar uchun ulashish surati (1920x1080)
```

---

## 🚀 Ishga Tushirish va Test Qilish

Loyihani istalgan statik server orqali ishga tushirish mumkin:

### Python orqali:
```bash
# sharq papkasiga kiring
cd sharq

# 8080-portda serverni yoqing
python -m http.server 8080
```
Brauzerda: `http://localhost:8080/` yoki `http://localhost:8080/index.html`

### Node.js (npx serve / live-server) orqali:
```bash
cd sharq
npx serve .
```

---

## 🌐 Deploy (Serverga / Hostingga Joylash)

Loyiha to'liq statik (Zero Dependency at Runtime) bo'lib, quyidagi platformalarga 1 daqiqada joylanadi:

1. **GitHub Pages:**
   - Repozitoriy sozlamalaridan `Settings` -> `Pages` bo'limiga kiring.
   - `Branch: main` va `/ (root)` ni tanlang va saqlang.
   - Sayt avtomatik ravishda `https://<foydalanuvchi>.github.io/sharq/` manzilida ishlaydi (hech qanday 404 xatosi bo'lmaydi).
2. **Vercel / Netlify:**
   - Repozitoriyni ulang va `Deploy` tugmasini bosing (Build command talab etilmaydi).
3. **cPanel / Apache / Nginx:**
   - Barcha fayllarni `public_html` katalogiga yuklash kifoya.

---

## 👥 Mualliflik va Rahmatnomalar

- **Loyihani tayyorlagan:** **palo.uz** jamoasi (2026)
- **Muallif va mentor:** Surayyo Aziz
- **Texnik yo'nalish:** Ogabek Razzoqov ([@Palonziy](https://github.com/Palonziy))

*© 2026 palo.uz — Mukammallik, mehr va professionalizm bilan yaratildi.*
