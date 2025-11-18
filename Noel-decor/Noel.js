/*Code trang trí Noel 4 góc + tuyết rơi + ông già Noel - Đã tối ưu*/
(function() {
  'use strict';
  
  // Kiểm tra thời gian: chỉ chạy từ 1/10 đến 30/12
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth() + 1; // getMonth() trả về 0-11, nên +1
  var currentDay = currentDate.getDate();
  
  // Chỉ chạy từ tháng 10, 11, 12 (và đến ngày 30/12)
  var isValidPeriod = (currentMonth === 10 || currentMonth === 11 || 
                       (currentMonth === 12 && currentDay <= 30));
  
  if (!isValidPeriod) {
    console.log('Trang trí Noel chỉ hiển thị từ 1/10 đến 30/12');
    return; // Dừng script nếu không trong khoảng thời gian
  }
  
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
    /* Nút điều khiển nhạc */
    #music-control-btn {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 100000;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-size: 20px;
      color: white;
    }
    #music-control-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    #music-control-btn:active {
      transform: scale(0.95);
    }
    #music-iframe {
      position: fixed;
      bottom: -500px;
      left: -500px;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
    }
    @media (max-width: 767px) {
      #music-control-btn {
        width: 45px;
        height: 45px;
        font-size: 18px;
        bottom: 15px;
        left: 15px;
      }
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
  
  // ===== PHẦN 4: Nhạc nền Background =====
  function initBackgroundMusic() {
    // DANH SÁCH VIDEO ID YOUTUBE - THAY ĐỔI Ở ĐÂY
    var youtubePlaylist = [
      'qqwRkhwrJek',  // Jingle Bells
      // Thêm các video ID khác vào đây
    ];
    
    // Chọn ngẫu nhiên 1 video từ playlist
    var randomIndex = Math.floor(Math.random() * youtubePlaylist.length);
    var videoId = youtubePlaylist[randomIndex];
    
    // Tạo iframe YouTube (ẩn)
    var musicFrame = document.createElement('iframe');
    musicFrame.id = 'music-iframe';
    musicFrame.allow = 'autoplay';
    musicFrame.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&loop=1&playlist=' + videoId + '&controls=0&showinfo=0&rel=0&modestbranding=1&volume=60';
    document.body.appendChild(musicFrame);
    
    // Tạo nút điều khiển
    var controlBtn = document.createElement('button');
    controlBtn.id = 'music-control-btn';
    controlBtn.innerHTML = '🔊';
    controlBtn.title = 'Tắt/Bật nhạc Noel';
    document.body.appendChild(controlBtn);
    
    var isMuted = false;
    var player = null;
    
    // Load YouTube IFrame API
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Callback khi API sẵn sàng
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player('music-iframe', {
        events: {
          'onReady': function(event) {
            event.target.setVolume(60); // Đặt âm lượng 60%
            event.target.playVideo();
          },
          'onStateChange': function(event) {
            // Tự động phát video tiếp theo khi kết thúc
            if (event.data === YT.PlayerState.ENDED) {
              randomIndex = Math.floor(Math.random() * youtubePlaylist.length);
              player.loadVideoById(youtubePlaylist[randomIndex]);
            }
          }
        }
      });
    };
    
    // Xử lý nút bấm
    controlBtn.addEventListener('click', function() {
      if (!player) return;
      
      if (isMuted) {
        player.unMute();
        player.setVolume(60);
        controlBtn.innerHTML = '🔊';
        controlBtn.title = 'Tắt nhạc';
        isMuted = false;
      } else {
        player.mute();
        controlBtn.innerHTML = '🔇';
        controlBtn.title = 'Bật nhạc';
        isMuted = true;
      }
    });
    
    // Lưu trạng thái mute
    var savedMuteState = localStorage.getItem('noelMusicMuted');
    if (savedMuteState === 'true') {
      setTimeout(function() {
        if (player && player.mute) {
          player.mute();
          controlBtn.innerHTML = '🔇';
          isMuted = true;
        }
      }, 1000);
    }
    
    // Lưu trạng thái khi thay đổi
    controlBtn.addEventListener('click', function() {
      setTimeout(function() {
        localStorage.setItem('noelMusicMuted', isMuted.toString());
      }, 100);
    });
  }
  
  // ===== KHỞI ĐỘNG =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      addDecorElements();
      initSnow();
      initSanta();
      initBackgroundMusic();
    });
  } else {
    addDecorElements();
    initSnow();
    initSanta();
    initBackgroundMusic();
  }
  
  // Cleanup khi trang bị đóng/reload
  window.addEventListener('beforeunload', function() {
    hideSnow();
  });
  
})();

