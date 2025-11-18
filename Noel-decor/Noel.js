/*Code trang trí Noel 4 góc + tuyết rơi + ông già Noel - Đã tối ưu*/
(function() {
  'use strict';
  
  // Kiểm tra xem đã chạy chưa để tránh duplicate
  if (window.noelDecorLoaded) return;
  window.noelDecorLoaded = true;
  
  // ===== PHẦN 1: Thêm CSS và HTML trang trí 4 góc =====
  var style = document.createElement('style');
  style.textContent = `
    body { padding-bottom: 20px; }
    #e_tientv_left { display: none; position: fixed; z-index: 9999; top: 0; left: 0; pointer-events: none; }
    #e_tientv_right { display: none; position: fixed; z-index: 9999; top: 0; right: 0; pointer-events: none; }
    #e_tientv_footer { display: none; position: fixed; z-index: 9999; bottom: -50px; left: 0; width: 100%; height: 104px; background: url(https://huuson889.github.io/Noel-decor/ft.png) repeat-x bottom left; pointer-events: none; }
    #e_tientv_bottom_left { display: none; position: fixed; z-index: 9999; bottom: 20px; left: 20px; pointer-events: none; }
    .snow-flake { position: absolute; z-index: 9998; visibility: visible; top: 15px; left: 15px; font-size: 18px; color: #d9d9d9; pointer-events: none; will-change: transform; }
    #halo { cursor: pointer; position: fixed; z-index: 99999; height: 80px; transition: all 5s ease-in-out; }
    /* Kích thước Santa trên mobile */
    @media (max-width: 767px) {
      #halo { height: 50px; } /* Thay đổi số này để điều chỉnh kích thước trên điện thoại */
    }
    @media (min-width: 992px) {
      #e_tientv_left, #e_tientv_right, #e_tientv_footer, #e_tientv_bottom_left { display: block; }
    }
  `;
  document.head.appendChild(style);
  
  // Thêm các element trang trí khi DOM ready
  function addDecorElements() {
    var container = document.createElement('div');
    container.innerHTML = `
      <img id="e_tientv_left" src="https://huuson889.github.io/Noel-decor/topleft.png" alt=""/>
      <img id="e_tientv_right" src="https://huuson889.github.io/Noel-decor/topright.png" alt=""/>
      <div id="e_tientv_footer"></div>
      <img id="e_tientv_bottom_left" src="https://huuson889.github.io/Noel-decor/bottomleft.png" alt=""/>
    `;
    document.body.appendChild(container);
  }
  
  // ===== PHẦN 2: Hiệu ứng tuyết rơi =====
  var snowConfig = {
    count: 20,
    hideTime: 0,
    distance: 'pageheight'
  };
  
  var snowFlakes = [];
  var snowTimer = null;
  
  function initSnow() {
    var docWidth = window.innerWidth || document.documentElement.clientWidth;
    var docHeight = window.innerHeight || document.documentElement.clientHeight;
    
    for (var i = 0; i < snowConfig.count; i++) {
      var flake = document.createElement('div');
      flake.className = 'snow-flake';
      flake.id = 'dot' + i;
      flake.innerHTML = '✽';
      flake.style.zIndex = 9998 + i;
      document.body.appendChild(flake);
      
      snowFlakes.push({
        element: flake,
        x: Math.random() * (docWidth - 50),
        y: Math.random() * docHeight,
        amplitude: Math.random() * 20,
        speedX: 0.02 + Math.random() / 10,
        speedY: 0.7 + Math.random(),
        drift: 0
      });
    }
    
    animateSnow();
    
    if (snowConfig.hideTime > 0) {
      setTimeout(hideSnow, snowConfig.hideTime * 1000);
    }
  }
  
  function animateSnow() {
    var docWidth = window.innerWidth - 10 || document.documentElement.clientWidth - 10;
    var docHeight = window.innerHeight || document.documentElement.clientHeight;
    
    if (snowConfig.distance === 'pageheight') {
      docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
    }
    
    for (var i = 0; i < snowFlakes.length; i++) {
      var flake = snowFlakes[i];
      flake.y += flake.speedY;
      
      if (flake.y > docHeight - 50) {
        flake.x = Math.random() * (docWidth - flake.amplitude - 30);
        flake.y = 0;
        flake.speedX = 0.02 + Math.random() / 10;
        flake.speedY = 0.7 + Math.random();
      }
      
      flake.drift += flake.speedX;
      flake.element.style.top = flake.y + 'px';
      flake.element.style.left = (flake.x + flake.amplitude * Math.sin(flake.drift)) + 'px';
    }
    
    snowTimer = requestAnimationFrame(animateSnow);
  }
  
  function hideSnow() {
    if (snowTimer) {
      cancelAnimationFrame(snowTimer);
    }
    snowFlakes.forEach(function(flake) {
      flake.element.style.visibility = 'hidden';
    });
  }
  
  // ===== PHẦN 3: Ông già Noel =====
  function initSanta() {
    var santa = document.createElement('img');
    santa.id = 'halo';
    santa.title = 'Happy Noel';
    santa.src = 'https://huuson889.github.io/Noel-decor/ong-gia.gif';
    santa.alt = 'Santa Claus';
    document.body.appendChild(santa);
    
    // Đặt vị trí ban đầu
    santa.style.left = '0px';
    santa.style.top = '0px';
    
    function moveSanta() {
      var santaSize = window.innerWidth <= 767 ? 50 : 80; // Kích thước Santa thay đổi theo màn hình
      var maxX = window.innerWidth - santaSize;
      var maxY = window.innerHeight - santaSize;
      var x = Math.floor(Math.random() * maxX);
      var y = Math.floor(Math.random() * maxY);
      santa.style.left = x + 'px';
      santa.style.top = y + 'px';
    }
    
    // Di chuyển lần đầu sau 1 giây
    setTimeout(moveSanta, 1000);
    
    // Di chuyển định kỳ mỗi 5 giây
    setInterval(moveSanta, 5000);
  }
  
  // ===== KHỞI ĐỘNG =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      addDecorElements();
      initSnow();
      initSanta();
    });
  } else {
    addDecorElements();
    initSnow();
    initSanta();
  }
  
  // Cleanup khi trang bị đóng/reload
  window.addEventListener('beforeunload', function() {
    hideSnow();
  });
  
})();
