/*Code gốc trang trí Noel 4 góc + tuyết rơi tại: https://tientv.com/web-design/code-trang-tri-noel-chuc-mung-nam-moi-cho-website.html*/
document.write('<style>body{padding-bottom:20px}#e_tientv_left{display:none;position:fixed;z-index:9999;top:0;left:0}#e_tientv_right{display:none;position:fixed;z-index:9999;top:0;right:0}#e_tientv_footer{display:none;position:fixed;z-index:9999;bottom:-50px;left:0;width:100%;height:104px;background:url(https://huuson889.github.io/Noel-decor/ft.png) repeat-x bottom left}#e_tientv_bottom_left{display:none;position:fixed;z-index:9999;bottom:20px;left:20px}@media (min-width: 992px){#e_tientv_left,#e_tientv_right,#e_tientv_footer,#e_tientv_bottom_left{display:block}}</style><img id="e_tientv_left" src="https://huuson889.github.io/Noel-decor/topleft.png"/><img id="e_tientv_right" src="https://huuson889.github.io/Noel-decor/topright.png"/><div id="e_tientv_footer"></div><img id="e_tientv_bottom_left" src="https://huuson889.github.io/Noel-decor/bottomleft.png"/>');
var no=20;var hidesnowtime=0;var snowdistance='pageheight';var ie4up=(document.all)?1:0;var ns6up=(document.getElementById&&!document.all)?1:0;function iecompattest(){return(document.compatMode&&document.compatMode!='BackCompat')?document.documentElement:document.body}var dx,xp,yp;var am,stx,sty;var i,doc_width=800,doc_height=600;if(ns6up){doc_width=self.innerWidth;doc_height=self.innerHeight}else if(ie4up){doc_width=iecompattest().clientWidth;doc_height=iecompattest().clientHeight}dx=new Array();xp=new Array();yp=new Array();am=new Array();stx=new Array();sty=new Array();for(i=0;i<no;++i){dx[i]=0;xp[i]=Math.random()*(doc_width-50);yp[i]=Math.random()*doc_height;am[i]=Math.random()*20;stx[i]=0.02+Math.random()/10; sty[i]=0.7+Math.random();if(ie4up||ns6up){document.write('<div id="dot'+i+'" style="POSITION:absolute;Z-INDEX:'+i+';VISIBILITY:visible;TOP:15px;LEFT:15px;"><span style="font-size:18px;color:#fff">✽</span></div>')}}function snowIE_NS6(){doc_width=ns6up?window.innerWidth-10:iecompattest().clientWidth-10;doc_height=(window.innerHeight&&snowdistance=='windowheight')?window.innerHeight:(ie4up&&snowdistance=='windowheight')?iecompattest().clientHeight:(ie4up&&!window.opera&&snowdistance=='pageheight')?iecompattest().scrollHeight:iecompattest().offsetHeight;for(i=0;i<no;++i){yp[i]+=sty[i];if(yp[i]>doc_height-50){xp[i]=Math.random()*(doc_width-am[i]-30);yp[i]=0;stx[i]=0.02+Math.random()/10;sty[i]=0.7+Math.random()}dx[i]+=stx[i];document.getElementById('dot'+i).style.top=yp[i]+'px';document.getElementById('dot'+i).style.left=xp[i]+am[i]*Math.sin(dx[i])+'px'}snowtimer=setTimeout('snowIE_NS6()',10)}function hidesnow(){if(window.snowtimer){clearTimeout(snowtimer)}for(i=0;i<no;i++)document.getElementById('dot'+i).style.visibility='hidden'}if(ie4up||ns6up){snowIE_NS6();if(hidesnowtime>0)setTimeout('hidesnow()',hidesnowtime*1000)}



// santa-animation.js
(function() {
  'use strict';

  // Hàm khởi tạo animation
  function initSantaAnimation() {
    // Tạo img element
    const haloImg = document.createElement('img');
    haloImg.id = 'halo';
    haloImg.title = 'Happy Noel';
    haloImg.style.cssText = 'cursor:pointer;position:fixed;z-index:99999';
    haloImg.height = 120;
    haloImg.src = 'https://lh3.ggpht.com/-LSDhJFNSG-E/VnQh0rSGAHI/AAAAAAAADoo/3FdK8o-hZ6A/s1600/tuan_loc_cho_qua_cua_ong_gia_noel_anh.gif';
    
    // Thêm vào body
    document.body.appendChild(haloImg);

    // Hàm animate đơn giản (thay thế jQuery animate)
    function animateElement(element, targetX, targetY, duration) {
      const startX = parseInt(element.style.left) || 0;
      const startY = parseInt(element.style.top) || 0;
      const startTime = performance.now();

      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-in-out)
        const easeProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        element.style.left = (startX + (targetX - startX) * easeProgress) + 'px';
        element.style.top = (startY + (targetY - startY) * easeProgress) + 'px';

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }

    // Hàm di chuyển ngẫu nhiên
    function moveRandomly() {
      const maxX = window.innerWidth - haloImg.width;
      const maxY = window.innerHeight - haloImg.height;
      const randomX = Math.ceil(Math.random() * maxX);
      const randomY = Math.ceil(Math.random() * maxY);
      
      animateElement(haloImg, randomX, randomY, 5000);
    }

    // Bắt đầu animation sau mỗi 5 giây
    setInterval(moveRandomly, 5000);
    
    // Chạy lần đầu tiên ngay lập tức
    moveRandomly();

    // Xử lý sự kiện click
    haloImg.addEventListener('click', function() {
      window.open('https://lh3.ggpht.com/-LSDhJFNSG-E/VnQh0rSGAHI/AAAAAAAADoo/3FdK8o-hZ6A/s1600/tuan_loc_cho_qua_cua_ong_gia_noel_anh.gif', '_blank');
    });
  }

  // Khởi chạy khi DOM đã sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSantaAnimation);
  } else {
    initSantaAnimation();
  }

})();
