/**
 * Contact Button Widget - Version giống code gốc thietkeblogspot
 * Author: Optimized from Việt Designer
 * Tương thích 100% với giao diện và hiệu ứng gốc
 */

(function() {
  'use strict';

  // Cấu hình mặc định
  const defaultSettings = {
    positions: 'bottom right',
    support: {
      staff: {
        name: 'Liên hệ ADMIN English VIP',
        image: 'https://blogger.googleusercontent.com/img/a/AVvXsEiTj0OhBleixiX0QB_FhwliH2XFx-UvxQdNjwk3bGERLcHxvmUvAQGErJjoJe_21Ps4pVkuCH1CeeqLbKvoD-xVQ7yRBZ7IFyf8tWFodUlg27adFs3qVJGaZMnZ4dHbHWGuxDV-uaaoEKuACwTEf-UUqeruMsg-t-KjvIGDoUnaLCR2wasYPsN-RAoGcIs',
        messages: 'Học khoá chính gốc nhắn tin Admin'
      }
    },
    buttons: {
      contact: { visible: false, id: 'https://www.thietkeblogspot.com/p/lien-he.html', messages: 'Liên hệ' },
      email: { visible: false, id: 'englishvip.mail@gmail.com', messages: 'Gửi Email' },
      call: { visible: false, id: '0900123456', messages: 'Gọi điện' },
      sms: { visible: false, id: '0900123456', messages: 'Nhắn tin' },
      viber: { visible: false, id: 'vhost.vn', messages: 'Chat Viber' },
      telegram: { visible: false, id: 'vHostbot', messages: 'Chat Telegram' },
      zalo: { visible: true, id: '0562209412', messages: 'Chat Zalo' },
      facebook: { visible: true, id: '106110582163260', messages: 'Chat Messenger' }
    }
  };

  // Merge với settings từ window._widget_settings
  const settings = Object.assign({}, defaultSettings, window._widget_settings || {});

  let isLoaded = false;
  let isInitialized = false;

  // Inject CSS giống code gốc
  function injectCSS() {
    if (document.getElementById('contactWidgetCSS')) return;

    const css = `
      /* Contact Widget Buttons - Style gốc thietkeblogspot */
      .vn-contact-widget {
        position: fixed;
        z-index: 999999;
        bottom: 20px;
        transition: all 0.3s ease;
      }
      
      .vn-contact-widget.vn-left {
        left: 20px;
      }
      
      .vn-contact-widget.vn-right {
        right: 20px;
      }

      /* Button chính */
      .vn-contact-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4285f4, #34a853);
        box-shadow: 0 4px 16px rgba(66, 133, 244, 0.4);
        cursor: pointer;
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .vn-contact-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 24px rgba(66, 133, 244, 0.6);
      }

      /* Hiệu ứng pulse giống gốc */
      .vn-contact-button::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: inherit;
        animation: vn-pulse 2s ease-out infinite;
      }

      @keyframes vn-pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.3);
          opacity: 0.5;
        }
        100% {
          transform: scale(1.5);
          opacity: 0;
        }
      }

      /* Icon SVG */
      .vn-contact-icon {
        width: 30px;
        height: 30px;
        position: relative;
        z-index: 1;
      }

      .vn-contact-icon svg {
        width: 100%;
        height: 100%;
        fill: #fff;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
      }

      /* Menu dropdown */
      .vn-contact-menu {
        position: absolute;
        bottom: 75px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        min-width: 300px;
        max-width: 320px;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px) scale(0.9);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: bottom;
      }

      .vn-contact-widget.vn-right .vn-contact-menu {
        right: 0;
        transform-origin: bottom right;
      }

      .vn-contact-widget.vn-left .vn-contact-menu {
        left: 0;
        transform-origin: bottom left;
      }

      .vn-contact-menu.vn-show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }

      /* Staff info giống gốc */
      .vn-staff-info {
        display: flex;
        align-items: center;
        padding: 20px;
        background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
        border-bottom: 1px solid #e0e6ed;
      }

      .vn-staff-avatar {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        margin-right: 14px;
        object-fit: cover;
        border: 3px solid #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .vn-staff-details {
        flex: 1;
      }

      .vn-staff-name {
        font-weight: 600;
        font-size: 15px;
        color: #1a1a1a;
        margin-bottom: 4px;
        line-height: 1.3;
      }

      .vn-staff-message {
        font-size: 13px;
        color: #5f6368;
        line-height: 1.4;
      }

      /* Contact items */
      .vn-contact-item {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        text-decoration: none;
        color: #202124;
        transition: all 0.2s ease;
        border-left: 4px solid transparent;
        position: relative;
      }

      .vn-contact-item:not(:last-child) {
        border-bottom: 1px solid #f0f3f5;
      }

      .vn-contact-item:hover {
        background: linear-gradient(90deg, rgba(66, 133, 244, 0.08) 0%, rgba(66, 133, 244, 0.02) 100%);
        border-left-color: currentColor;
        padding-left: 24px;
      }

      .vn-contact-item-icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 14px;
        font-size: 20px;
        flex-shrink: 0;
        transition: all 0.3s ease;
      }

      .vn-contact-item:hover .vn-contact-item-icon {
        transform: scale(1.1) rotate(5deg);
      }

      .vn-contact-item-text {
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.2px;
      }

      /* Colors cho từng nền tảng */
      .vn-item-facebook .vn-contact-item-icon {
        background: linear-gradient(135deg, #1877f2, #0c63d4);
        color: #fff;
      }
      .vn-item-facebook { border-left-color: #1877f2; }

      .vn-item-zalo .vn-contact-item-icon {
        background: linear-gradient(135deg, #0068ff, #0052cc);
        color: #fff;
      }
      .vn-item-zalo { border-left-color: #0068ff; }

      .vn-item-telegram .vn-contact-item-icon {
        background: linear-gradient(135deg, #0088cc, #0077b5);
        color: #fff;
      }
      .vn-item-telegram { border-left-color: #0088cc; }

      .vn-item-viber .vn-contact-item-icon {
        background: linear-gradient(135deg, #7360f2, #5b4cdb);
        color: #fff;
      }
      .vn-item-viber { border-left-color: #7360f2; }

      .vn-item-call .vn-contact-item-icon {
        background: linear-gradient(135deg, #34a853, #2d8e47);
        color: #fff;
      }
      .vn-item-call { border-left-color: #34a853; }

      .vn-item-sms .vn-contact-item-icon {
        background: linear-gradient(135deg, #fbbc04, #f9ab00);
        color: #fff;
      }
      .vn-item-sms { border-left-color: #fbbc04; }

      .vn-item-email .vn-contact-item-icon {
        background: linear-gradient(135deg, #ea4335, #d33426);
        color: #fff;
      }
      .vn-item-email { border-left-color: #ea4335; }

      .vn-item-contact .vn-contact-item-icon {
        background: linear-gradient(135deg, #667eea, #5568d3);
        color: #fff;
      }
      .vn-item-contact { border-left-color: #667eea; }

      /* Responsive */
      @media (max-width: 768px) {
        .vn-contact-widget {
          bottom: 15px;
        }
        
        .vn-contact-widget.vn-right {
          right: 15px;
        }
        
        .vn-contact-widget.vn-left {
          left: 15px;
        }

        .vn-contact-button {
          width: 56px;
          height: 56px;
        }

        .vn-contact-icon {
          width: 26px;
          height: 26px;
        }

        .vn-contact-menu {
          min-width: 280px;
          max-width: calc(100vw - 30px);
        }

        .vn-contact-item {
          padding: 14px 16px;
        }

        .vn-staff-info {
          padding: 16px;
        }
      }

      /* Animation load */
      .vn-contact-widget {
        animation: vn-slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes vn-slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;

    const style = document.createElement('style');
    style.id = 'contactWidgetCSS';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Tạo HTML widget
  function createWidgetHTML() {
    const posClass = settings.positions.includes('left') ? 'vn-left' : 'vn-right';
    
    let html = `
      <div class="vn-contact-widget ${posClass}" id="vnContactWidget">
        <div class="vn-contact-button" id="vnContactButton">
          <div class="vn-contact-icon">
            <svg viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>
        </div>
        <div class="vn-contact-menu" id="vnContactMenu">
    `;

    // Staff info
    if (settings.support && settings.support.staff) {
      const staff = settings.support.staff;
      html += `
        <div class="vn-staff-info">
          <img src="${staff.image}" alt="${staff.name}" class="vn-staff-avatar">
          <div class="vn-staff-details">
            <div class="vn-staff-name">${staff.name}</div>
            <div class="vn-staff-message">${staff.messages}</div>
          </div>
        </div>
      `;
    }

    // Buttons
    const btns = settings.buttons;
    
    if (btns.facebook && btns.facebook.visible) {
      html += `
        <a href="https://m.me/${btns.facebook.id}" target="_blank" class="vn-contact-item vn-item-facebook">
          <div class="vn-contact-item-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </div>
          <span class="vn-contact-item-text">${btns.facebook.messages}</span>
        </a>
      `;
    }

    if (btns.zalo && btns.zalo.visible) {
      html += `
        <a href="https://zalo.me/${btns.zalo.id}" target="_blank" class="vn-contact-item vn-item-zalo">
          <div class="vn-contact-item-icon">💬</div>
          <span class="vn-contact-item-text">${btns.zalo.messages}</span>
        </a>
      `;
    }

    if (btns.telegram && btns.telegram.visible) {
      html += `
        <a href="https://t.me/${btns.telegram.id}" target="_blank" class="vn-contact-item vn-item-telegram">
          <div class="vn-contact-item-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 4-1.74 6.68-2.88 8.03-3.44 3.82-1.59 4.62-1.87 5.14-1.88.11 0 .37.03.54.17.14.11.18.26.2.37.01.06.03.24.01.38z"/>
            </svg>
          </div>
          <span class="vn-contact-item-text">${btns.telegram.messages}</span>
        </a>
      `;
    }

    if (btns.viber && btns.viber.visible) {
      html += `
        <a href="viber://chat?number=${btns.viber.id}" target="_blank" class="vn-contact-item vn-item-viber">
          <div class="vn-contact-item-icon">📞</div>
          <span class="vn-contact-item-text">${btns.viber.messages}</span>
        </a>
      `;
    }

    if (btns.call && btns.call.visible) {
      html += `
        <a href="tel:${btns.call.id}" class="vn-contact-item vn-item-call">
          <div class="vn-contact-item-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </div>
          <span class="vn-contact-item-text">${btns.call.messages}</span>
        </a>
      `;
    }

    if (btns.sms && btns.sms.visible) {
      html += `
        <a href="sms:${btns.sms.id}" class="vn-contact-item vn-item-sms">
          <div class="vn-contact-item-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
            </svg>
          </div>
          <span class="vn-contact-item-text">${btns.sms.messages}</span>
        </a>
      `;
    }

    if (btns.email && btns.email.visible) {
      html += `
        <a href="mailto:${btns.email.id}" class="vn-contact-item vn-item-email">
          <div class="vn-contact-item-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <span class="vn-contact-item-text">${btns.email.messages}</span>
        </a>
      `;
    }

    if (btns.contact && btns.contact.visible) {
      html += `
        <a href="${btns.contact.id}" target="_blank" class="vn-contact-item vn-item-contact">
          <div class="vn-contact-item-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <span class="vn-contact-item-text">${btns.contact.messages}</span>
        </a>
      `;
    }

    html += `
        </div>
      </div>
    `;

    return html;
  }

  // Khởi tạo widget
  function initWidget() {
    if (isInitialized) return;
    isInitialized = true;

    injectCSS();

    const container = document.createElement('div');
    container.innerHTML = createWidgetHTML();
    document.body.appendChild(container.firstElementChild);

    const button = document.getElementById('vnContactButton');
    const menu = document.getElementById('vnContactMenu');
    
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.toggle('vn-show');
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.vn-contact-widget')) {
        menu.classList.remove('vn-show');
      }
    });
  }

  // Lazy load
  function lazyLoad() {
    if (isLoaded) return;
    isLoaded = true;
    
    requestAnimationFrame(() => {
      initWidget();
    });
  }

  // Auto init
  const events = ['scroll', 'mousemove', 'touchstart', 'click'];
  events.forEach(event => {
    window.addEventListener(event, lazyLoad, { once: true, passive: true });
  });

  setTimeout(lazyLoad, 3000);

  // Public API
  window.MessengerContactWidget = window.MessengerContactWidget || {};
  
  window.MessengerContactWidget.init = function(customSettings) {
    if (customSettings) {
      Object.assign(settings, customSettings);
    }
    lazyLoad();
  };

  window.MessengerContactWidget.destroy = function() {
    const widget = document.getElementById('vnContactWidget');
    if (widget) widget.remove();
    isInitialized = false;
    isLoaded = false;
  };

  window.MessengerContactWidget.toggle = function() {
    const menu = document.getElementById('vnContactMenu');
    if (menu) menu.classList.toggle('vn-show');
  };

  window.MessengerContactWidget.show = function() {
    const menu = document.getElementById('vnContactMenu');
    if (menu) menu.classList.add('vn-show');
  };

  window.MessengerContactWidget.hide = function() {
    const menu = document.getElementById('vnContactMenu');
    if (menu) menu.classList.remove('vn-show');
  };

})();
