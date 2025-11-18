

/*Code gốc trang trí ông già Noel tại (có dùng claude.ai chuyển đổi): https://www.tranbadat.com/2015/12/trang-tri-giang-sinh-voi-ong-gia-noel-cho-blogspot.html*/
// santa-animation.js
document.addEventListener('DOMContentLoaded', function() {
  document.body.innerHTML += '<img id="halo" title="Happy Noel" style="cursor:pointer;position:fixed;z-index:99999" height="80" src="https://huuson889.github.io/Noel-decor/ong-gia.gif"/>';
  
  var halo = document.getElementById('halo');
  
  setInterval(function() {
    var x = Math.ceil(Math.random() * window.innerWidth);
    var y = Math.ceil(Math.random() * window.innerHeight);
    halo.style.transition = 'all 5s';
    halo.style.left = x + 'px';
    halo.style.top = y + 'px';
  }, 5000);
});






