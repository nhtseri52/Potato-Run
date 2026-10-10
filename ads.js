// File: ads.js - Quản lý quảng cáo Monetag & Smartlink cho Potato Run

const SMARTLINK_URL = 'https://uplcm.com/4/11997925';

// -------------------------------------------------------------
// 1. QUẢNG CÁO AFK (Không tương tác 20 giây thì hiện Vignette)
// -------------------------------------------------------------
let afkTimer = null;
let vignetteLoaded = false;

function resetAfkTimer() {
    if (vignetteLoaded) return;
    clearTimeout(afkTimer);
    afkTimer = setTimeout(() => {
        showVignetteAd();
    }, 20000); // 20 giây
}

function showVignetteAd() {
    vignetteLoaded = true;
    (function(s){
        s.dataset.zone = '11945340';
        s.src = 'https://n6wxm.com/vignette.min.js';
    })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
}

const userEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'touchend', 'scroll'];
userEvents.forEach(eventName => {
    window.addEventListener(eventName, resetAfkTimer, { passive: true });
});

// -------------------------------------------------------------
// 2. QUẢNG CÁO TỰ ĐỘNG THEO SỐ LẦN/SỐ TRẬN THUA
// -------------------------------------------------------------
// - 3 trận thua (Game Over) hiện 1 lần
// - Mở các màn hình Shop, BXH, Nhiệm vụ nhiều (35 lần) hiện 1 lần
let gameOverCount = 0;
let menuNavCount = 0;

function trackGameOverAd() {
    gameOverCount++;
    if (gameOverCount >= 3) {
        gameOverCount = 0;
        showVignetteAdDirect();
    }
}

function trackMenuNavAd() {
    menuNavCount++;
    if (menuNavCount >= 35) {
        menuNavCount = 0;
        showVignetteAdDirect();
    }
}

function showVignetteAdDirect() {
    (function(s){
        s.dataset.zone = '11945340';
        s.src = 'https://n6wxm.com/vignette.min.js';
    })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
}

// -------------------------------------------------------------
// 3. NÚT XEM SMARTLINK NHẬN 10 COIN (Cạnh Skin Shop, Cooldown 30s)
// -------------------------------------------------------------
let coinAdCooldown = false;

function initCoinAdButton() {
    // Tạo nút "Xem QC +10 Coin" nằm cạnh nút SKIN SHOP ở Lobby
    const skinBtn = document.getElementById('skinBtn');
    if (skinBtn && !document.getElementById('coinAdBtn')) {
        const coinBtn = document.createElement('button');
        coinBtn.id = 'coinAdBtn';
        coinBtn.className = 'btn secondary';
        coinBtn.style.background = 'var(--gold)';
        coinBtn.style.color = '#241a10';
        coinBtn.innerHTML = '🪙 +10 COIN (ADS)';

        // Chèn ngay bên cạnh nút Skin Shop
        skinBtn.parentNode.insertBefore(coinBtn, skinBtn.nextSibling);

        coinBtn.addEventListener('click', () => {
            if (coinAdCooldown) {
                alert('Vui lòng đợi 30 giây để tiếp tục xem quảng cáo nhận Coin!');
                return;
            }

            // Mở Smartlink
            window.open(SMARTLINK_URL, '_blank');

            // Cộng 10 coin trực tiếp
            if (window.store) {
                window.store.coins += 10;
                if (typeof window.saveLocal === 'function') window.saveLocal();
                if (typeof window.refreshCoinBadges === 'function') window.refreshCoinBadges();
            }

            alert('Bạn đã nhận được 10 Coin!');

            // Khóa nút trong 30s
            coinAdCooldown = true;
            let remaining = 30;
            coinBtn.disabled = true;
            coinBtn.style.opacity = '0.6';

            const timer = setInterval(() => {
                remaining--;
                coinBtn.innerHTML = `⏳ WAIT ${remaining}s`;
                if (remaining <= 0) {
                    clearInterval(timer);
                    coinAdCooldown = false;
                    coinBtn.disabled = false;
                    coinBtn.style.opacity = '1';
                    coinBtn.innerHTML = '🪙 +10 COIN (ADS)';
                }
            }, 1000);
        });
    }
}

// -------------------------------------------------------------
// 4. IN-PAGE PUSH AUTO LOAD
// -------------------------------------------------------------
(function(s){
    s.dataset.zone = '11945336';
    s.src = 'https://nap5k.com/tag.min.js';
})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));

document.addEventListener('DOMContentLoaded', () => {
    resetAfkTimer();
    initCoinAdButton();
});
