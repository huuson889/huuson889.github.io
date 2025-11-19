/*Code trang trí Noel 4 góc + tuyết rơi + ông già Noel - Santa bay ngang*/
(function() {
  'use strict';
  
  // Kiểm tra thời gian: chỉ chạy từ 1/10 đến 30/12
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth() + 1;
  var currentDay = currentDate.getDate();
  
  var isValidPeriod = (currentMonth === 10 || currentMonth === 11 || 
                       (currentMonth === 12 && currentDay <= 30));
  
  if (!isValidPeriod) {
    console.log('Trang trí Noel chỉ hiển thị từ 1/10 đến 30/12');
    return;
  }
  
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
    #halo { 
      cursor: pointer; 
      position: fixed; 
      z-index: 99999; 
      height: 80px; 
      pointer-events: none;
      will-change: transform;
    }
    @media (max-width: 767px) {
      #halo { height: 50px; }
    }
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
  
  function addDecorElements() {
    var container = document.createElement('div');
    container.id = 'noel-decor-container';
    container.innerHTML = `
      <img id="e_tientv_left" src="https://huuson889.github.io/Noel-decor/topleft.png" alt="" draggable="false"/>
      <img id="e_tientv_right" src="https://huuson889.github.io/Noel-decor/topright.png" alt="" draggable="false"/>
      <div id="e_tientv_footer"></div>
      <img id="e_tientv_bottom_left" src="https://huuson889.github.io/Noel-decor/bottomleft.png" alt="" draggable="false"/>
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
  
  // ===== PHẦN 3: Ông già Noel bay ngang =====
  function initSanta() {
    var santa = document.createElement('img');
    santa.id = 'halo';
    santa.title = 'Happy Noel';
    santa.src = 'https://huuson889.github.io/Noel-decor/ong-gia.gif';
    santa.alt = 'Santa Claus';
    document.body.appendChild(santa);
    
    var santaData = {
      x: window.innerWidth,
      y: 0,
      targetY: 0,
      speed: 2,
      waveAmplitude: 30,
      waveSpeed: 0.03,
      wavePhase: 0
    };
    
    function animateSanta() {
      var santaSize = window.innerWidth <= 767 ? 50 : 80;
      var screenHeight = window.innerHeight;
      
      // Di chuyển từ phải sang trái
      santaData.x -= santaData.speed;
      
      // Tạo hiệu ứng lượn sóng
      santaData.wavePhase += santaData.waveSpeed;
      var waveOffset = Math.sin(santaData.wavePhase) * santaData.waveAmplitude;
      
      // Cập nhật vị trí Y với hiệu ứng lượn
      santaData.y = santaData.targetY + waveOffset;
      
      // Áp dụng vị trí
      santa.style.left = santaData.x + 'px';
      santa.style.top = santaData.y + 'px';
      
      // Khi Santa bay ra khỏi màn hình bên trái
      if (santaData.x < -santaSize) {
        // Đặt lại vị trí bên phải
        santaData.x = window.innerWidth + 20;
        // Random vị trí Y mới (ở giữa màn hình, tránh quá trên hoặc quá dưới)
        santaData.targetY = (screenHeight * 0.2) + Math.random() * (screenHeight * 0.6 - santaSize);
        // Random tốc độ bay
        santaData.speed = 0.5 + Math.random() * 0.5;
        // Random biên độ sóng
        santaData.waveAmplitude = 20 + Math.random() * 40;
        // Random tốc độ sóng
        santaData.waveSpeed = 0.02 + Math.random() * 0.03;
      }
      
      requestAnimationFrame(animateSanta);
    }
    
    // Bắt đầu animation
    animateSanta();
    
    // Cập nhật khi resize màn hình
    window.addEventListener('resize', function() {
      if (santaData.x < -100) {
        santaData.x = window.innerWidth + 20;
      }
    });
  }
  
  // ===== PHẦN 4: Nhạc nền Background =====
  function initBackgroundMusic() {
    var youtubePlaylist = [
      '3CWJNqyub3o',
    ];
    
    var randomIndex = Math.floor(Math.random() * youtubePlaylist.length);
    var videoId = youtubePlaylist[randomIndex];
    
    var controlBtn = document.createElement('button');
    controlBtn.id = 'music-control-btn';
    controlBtn.innerHTML = '🔊';
    controlBtn.title = 'Tắt/Bật nhạc Noel';
    document.body.appendChild(controlBtn);
    
    var isMuted = false;
    var player = null;
    var isPlayerReady = false;
    
    var musicFrame = document.createElement('div');
    musicFrame.id = 'music-iframe';
    document.body.appendChild(musicFrame);
    
    if (!window.YT) {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    
    function initPlayer() {
      if (window.YT && window.YT.Player) {
        player = new YT.Player('music-iframe', {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: videoId,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1
          },
          events: {
            'onReady': function(event) {
              isPlayerReady = true;
              event.target.setVolume(60);
              
              var savedMuteState = localStorage.getItem('noelMusicMuted');
              if (savedMuteState === 'true') {
                event.target.mute();
                controlBtn.innerHTML = '🔇';
                isMuted = true;
              } else {
                event.target.playVideo();
              }
            },
            'onStateChange': function(event) {
              if (event.data === YT.PlayerState.ENDED) {
                randomIndex = Math.floor(Math.random() * youtubePlaylist.length);
                player.loadVideoById(youtubePlaylist[randomIndex]);
              }
            }
          }
        });
      } else {
        setTimeout(initPlayer, 100);
      }
    }
    
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
    
    controlBtn.addEventListener('click', function() {
      if (!player || !isPlayerReady) {
        console.log('Player chưa sẵn sàng');
        return;
      }
      
      if (isMuted) {
        player.unMute();
        player.setVolume(60);
        player.playVideo();
        controlBtn.innerHTML = '🔊';
        controlBtn.title = 'Tắt nhạc';
        isMuted = false;
        localStorage.setItem('noelMusicMuted', 'false');
      } else {
        player.mute();
        controlBtn.innerHTML = '🔇';
        controlBtn.title = 'Bật nhạc';
        isMuted = true;
        localStorage.setItem('noelMusicMuted', 'true');
      }
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
  
  window.addEventListener('beforeunload', function() {
    hideSnow();
  });
  
})();



