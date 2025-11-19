/**
 * Contact Button Widget - Optimized Version
 * Tối ưu hóa: Độc lập, không phụ thuộc jQuery, lazy load
 * Cách sử dụng: <script src="messenger-contact-widget.js"></script>
 */

(function() {
  'use strict';

  // Cấu hình mặc định - có thể override từ bên ngoài
  window.MessengerContactWidget = window.MessengerContactWidget || {};
  
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

  // Merge settings
  const settings = Object.assign({}, defaultSettings, window._widget_settings || {});

  let isLoaded = false;
  let isInitialized = false;

  // Utility: Load CSS
  function loadCSS(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  // Utility: Create widget HTML
  function createWidgetHTML() {
    const positionClass = settings.positions.replace(' ', '-');
    
    const html = `
      <div class="contact-widget ${positionClass}" id="contactWidget">
        <div class="contact-button" id="contactButton">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
          </div>
        </div>
        <div class="contact-list" id="contactList" style="display: none;">
          ${createButtonsList()}
        </div>
      </div>
    `;
    
    return html;
  }

  // Create buttons list
  function createButtonsList() {
    let buttonsHTML = '';
    
    // Support staff info
    if (settings.support && settings.support.staff) {
      const staff = settings.support.staff;
      buttonsHTML += `
        <div class="contact-staff">
          <img src="${staff.image}" alt="${staff.name}" class="staff-avatar">
          <div class="staff-info">
            <div class="staff-name">${staff.name}</div>
            <div class="staff-message">${staff.messages}</div>
          </div>
        </div>
      `;
    }

    // Buttons
    const buttons = settings.buttons;
    
    if (buttons.facebook && buttons.facebook.visible) {
      buttonsHTML += `
        <a href="https://m.me/${buttons.facebook.id}" target="_blank" class="contact-item facebook">
          <span class="icon">📘</span>
          <span class="text">${buttons.facebook.messages}</span>
        </a>
      `;
    }

    if (buttons.zalo && buttons.zalo.visible) {
      buttonsHTML += `
        <a href="https://zalo.me/${buttons.zalo.id}" target="_blank" class="contact-item zalo">
          <span class="icon">💬</span>
          <span class="text">${buttons.zalo.messages}</span>
        </a>
      `;
    }

    if (buttons.telegram && buttons.telegram.visible) {
      buttonsHTML += `
        <a href="https://t.me/${buttons.telegram.id}" target="_blank" class="contact-item telegram">
          <span class="icon">✈️</span>
          <span class="text">${buttons.telegram.messages}</span>
        </a>
      `;
    }

    if (buttons.viber && buttons.viber.visible) {
      buttonsHTML += `
        <a href="viber://chat?number=${buttons.viber.id}" target="_blank" class="contact-item viber">
          <span class="icon">📞</span>
          <span class="text">${buttons.viber.messages}</span>
        </a>
      `;
    }

    if (buttons.call && buttons.call.visible) {
      buttonsHTML += `
        <a href="tel:${buttons.call.id}" class="contact-item call">
          <span class="icon">📱</span>
          <span class="text">${buttons.call.messages}</span>
        </a>
      `;
    }

    if (buttons.sms && buttons.sms.visible) {
      buttonsHTML += `
        <a href="sms:${buttons.sms.id}" class="contact-item sms">
          <span class="icon">💬</span>
          <span class="text">${buttons.sms.messages}</span>
        </a>
      `;
    }

    if (buttons.email && buttons.email.visible) {
      buttonsHTML += `
        <a href="mailto:${buttons.email.id}" class="contact-item email">
          <span class="icon">✉️</span>
          <span class="text">${buttons.email.messages}</span>
        </a>
      `;
    }

    if (buttons.contact && buttons.contact.visible) {
      buttonsHTML += `
        <a href="${buttons.contact.id}" target="_blank" class="contact-item contact">
          <span class="icon">🌐</span>
          <span class="text">${buttons.contact.messages}</span>
        </a>
      `;
    }

    return buttonsHTML;
  }

  // Inject inline CSS
  function injectCSS() {
    if (document.getElementById('contactWidgetCSS')) return;

    const css = `
      .contact-widget {
        position: fixed;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .contact-widget.bottom-right {
        bottom: 20px;
        right: 20px;
      }
      .contact-widget.bottom-left {
        bottom: 20px;
        left: 20px;
      }
      .contact-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
      }
      .contact-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
      }
      .contact-button .contact-icon {
        width: 30px;
        height: 30px;
        color: white;
      }
      @keyframes pulse {
        0%, 100% { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        50% { box-shadow: 0 4px 20px rgba(102,126,234,0.4); }
      }
      .contact-list {
        position: absolute;
        bottom: 75px;
        right: 0;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        min-width: 280px;
        max-width: 320px;
        overflow: hidden;
        transform-origin: bottom right;
        animation: slideUp 0.3s ease;
      }
      .contact-widget.bottom-left .contact-list {
        left: 0;
        right: auto;
        transform-origin: bottom left;
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(10px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      .contact-staff {
        display: flex;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
        background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
      }
      .staff-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 12px;
        object-fit: cover;
      }
      .staff-info {
        flex: 1;
      }
      .staff-name {
        font-weight: 600;
        font-size: 14px;
        color: #333;
        margin-bottom: 4px;
      }
      .staff-message {
        font-size: 12px;
        color: #666;
      }
      .contact-item {
        display: flex;
        align-items: center;
        padding: 14px 16px;
        text-decoration: none;
        color: #333;
        transition: background 0.2s ease;
        border-bottom: 1px solid #f5f5f5;
      }
      .contact-item:last-child {
        border-bottom: none;
      }
      .contact-item:hover {
        background: #f8f9fa;
      }
      .contact-item .icon {
        font-size: 24px;
        margin-right: 12px;
        width: 32px;
        text-align: center;
      }
      .contact-item .text {
        font-size: 14px;
        font-weight: 500;
      }
      .contact-item.facebook { border-left: 3px solid #1877f2; }
      .contact-item.zalo { border-left: 3px solid #0068ff; }
      .contact-item.telegram { border-left: 3px solid #0088cc; }
      .contact-item.viber { border-left: 3px solid #7360f2; }
      .contact-item.call { border-left: 3px solid #34a853; }
      .contact-item.sms { border-left: 3px solid #fbbc04; }
      .contact-item.email { border-left: 3px solid #ea4335; }
      .contact-item.contact { border-left: 3px solid #667eea; }
      
      @media (max-width: 768px) {
        .contact-widget {
          bottom: 15px;
          right: 15px;
        }
        .contact-button {
          width: 56px;
          height: 56px;
        }
        .contact-list {
          min-width: 260px;
        }
      }
    `;

    const style = document.createElement('style');
    style.id = 'contactWidgetCSS';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Initialize widget
  function initWidget() {
    if (isInitialized) return;
    isInitialized = true;

    // Inject CSS
    injectCSS();

    // Create widget
    const container = document.createElement('div');
    container.innerHTML = createWidgetHTML();
    document.body.appendChild(container.firstElementChild);

    // Add event listeners
    const button = document.getElementById('contactButton');
    const list = document.getElementById('contactList');
    
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const isVisible = list.style.display !== 'none';
      list.style.display = isVisible ? 'none' : 'block';
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.contact-widget')) {
        list.style.display = 'none';
      }
    });
  }

  // Lazy load trigger
  function lazyLoad() {
    if (isLoaded) return;
    isLoaded = true;
    
    requestAnimationFrame(() => {
      initWidget();
    });
  }

  // Auto init on user interaction or after timeout
  let interactionEvents = ['scroll', 'mousemove', 'touchstart', 'click'];
  interactionEvents.forEach(event => {
    window.addEventListener(event, lazyLoad, { once: true, passive: true });
  });

  // Fallback: load after 3 seconds
  setTimeout(lazyLoad, 3000);

  // Public API để gọi từ bên ngoài
  window.MessengerContactWidget.init = function(customSettings) {
    if (customSettings) {
      Object.assign(settings, customSettings);
    }
    lazyLoad();
  };

  window.MessengerContactWidget.destroy = function() {
    const widget = document.getElementById('contactWidget');
    if (widget) {
      widget.remove();
    }
    isInitialized = false;
    isLoaded = false;
  };

  window.MessengerContactWidget.toggle = function() {
    const list = document.getElementById('contactList');
    if (list) {
      list.style.display = list.style.display === 'none' ? 'block' : 'none';
    }
  };

  window.MessengerContactWidget.show = function() {
    const list = document.getElementById('contactList');
    if (list) {
      list.style.display = 'block';
    }
  };

  window.MessengerContactWidget.hide = function() {
    const list = document.getElementById('contactList');
    if (list) {
      list.style.display = 'none';
    }
  };

})();
