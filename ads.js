// File: ads.js - Tự động tải quảng cáo Monetag cho Potato Run

// 1. Tải In-Page Push Ads (Zone: 11945336)
(function(s){
    s.dataset.zone = '11945336';
    s.src = 'https://nap5k.com/tag.min.js';
})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));

// 2. Tải Vignette Banner Ads (Zone: 11945340)
(function(s){
    s.dataset.zone = '11945340';
    s.src = 'https://n6wxm.com/vignette.min.js';
})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));

// 3. Hàm mở Smartlink / Direct Link (Zone: 11945352) khi người chơi bấm nút nhận thưởng
function showMonetagAd() {
    window.open('https://omg10.com/4/11945352', '_blank');
}

// 4. Tự động gán sự kiện cho nút quảng cáo trong game (nếu có id="ad-btn")
document.addEventListener('DOMContentLoaded', () => {
    const adBtn = document.getElementById('ad-btn');
    if (adBtn) {
        adBtn.addEventListener('click', () => {
            showMonetagAd();
        });
    }
});
