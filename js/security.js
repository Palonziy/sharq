(function () {
    'use strict';

    /**
     * LIGHTWEIGHT CLIENT PROTECTION & INTEGRITY
     * Designed for 40 Kunlik Poklanish
     */

    // 1. Clickjacking protection: ensure page is not framed maliciously
    try {
        if (window.top !== window.self) {
            window.top.location = window.self.location;
        }
    } catch (e) {
        // Sandboxed iframe protection
    }

    // 2. Protect sensitive media (videos and branding images) from casual direct saving
    document.addEventListener('contextmenu', function (e) {
        if (e.target && (e.target.tagName === 'VIDEO' || e.target.tagName === 'IMG' || e.target.closest('video, .mentoring-video-wrapper'))) {
            e.preventDefault();
        }
    }, false);

    // 3. Prevent casual source viewing and dev shortcuts using modern standards
    document.addEventListener('keydown', function (e) {
        // Check for F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // Ctrl/Cmd + Shift + I/J/C
        const isMod = e.ctrlKey || e.metaKey;
        if (isMod && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
            return false;
        }

        // Ctrl/Cmd + U (View Source)
        if (isMod && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
            return false;
        }

        // Ctrl/Cmd + S (Save Page)
        if (isMod && (e.key === 'S' || e.key === 's')) {
            e.preventDefault();
            return false;
        }
    }, false);

    // 4. Console greeting & brand attribution
    if (typeof console !== 'undefined' && console.log) {
        console.log(
            '%c40 Kunlik Poklanish %c| palo.uz © 2026',
            'background: #D99726; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
            'color: #888; font-weight: 500;'
        );
    }
})();
