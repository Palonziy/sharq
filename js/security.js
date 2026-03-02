(function () {
    'use strict';

    /**
     * SITE PROTECTION & ANTI-INSPECTION
     * Designed for Poklanish Website
     */

    // 1. Disable Right Click
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);

    // 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, etc.)
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (Inspect)
        // Ctrl+Shift+J (Console)
        // Ctrl+Shift+C (Elements)
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
    }, false);

    // 3. Anti-DevTools Debugger Loop
    // This helps trigger a breakpoint if DevTools is open, making inspection annoying
    function startDebuggerLoop() {
        try {
            (function () {
                (function d(i) {
                    if (("" + i / i).length !== 1 || i % 20 === 0) {
                        (function () { }).constructor("debugger")();
                    } else {
                        debugger;
                    }
                    d(++i);
                })(0);
            })();
        } catch (e) {
            setTimeout(startDebuggerLoop, 1000);
        }
    }

    // Only run if not locally hosted to avoid development headaches
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        startDebuggerLoop();
    }

    // 4. Basic CLI Bot Deterrent
    // Blocks common command-line scrapers
    const botList = ['wget', 'curl', 'python', 'go-http-client', 'postman', 'insomnia'];
    const userAgent = navigator.userAgent.toLowerCase();
    if (botList.some(bot => userAgent.includes(bot))) {
        window.stop();
        document.documentElement.innerHTML = "<h1>Kirish taqiqlangan</h1><p>Avtomatlashtirilgan so'rovlar qabul qilinmaydi.</p>";
    }

})();
