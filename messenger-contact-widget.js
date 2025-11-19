/**
 * Messenger Contact Widget
 * File độc lập có thể tích hợp vào bất kỳ website nào
 * Sử dụng: <script src="messenger-contact.js"></script>
 */

(function() {
  'use strict';

  // Cấu hình mặc định
  const defaultConfig = {
    positions: 'bottom right',
    support: {
      staff: {
        name: 'Liên hệ ADMIN English VIP',
        image: 'https://blogger.googleusercontent.com/img/a/AVvXsEiTj0OhBleixiX0QB_FhwliH2XFx-UvxQdNjwk3bGERLcHxvmUvAQGErJjoJe_21Ps4pVkuCH1CeeqLbKvoD-xVQ7yRBZ7IFyf8tWFodUlg27adFs3qVJGaZMnZ4dHbHWGuxDV-uaaoEKuACwTEf-UUqeruMsg-t-KjvIGDoUnaLCR2wasYPsN-RAoGcIs',
        messages: 'Học khoá chính gốc nhắn tin Admin'
      }
    },
    buttons: {
      contact: {
        visible: 'false',
        id: 'https://www.thietkeblogspot.com/p/lien-he.html',
        messages: 'Liên hệ'
      },
      email: {
        visible: 'false',
        id: 'englishvip.mail@gmail.com',
        messages: 'Gửi Email'
      },
      call: {
        visible: 'false',
        id: '0900123456',
        messages: 'Gọi điện'
      },
      sms: {
        visible: 'false',
        id: '0900123456',
        messages: 'Nhắn tin'
      },
      viber: {
        visible: 'false',
        id: 'vhost.vn',
        messages: 'Chat Viber'
      },
      telegram: {
        visible: 'false',
        id: 'vHostbot',
        messages: 'Chat Telegram'
      },
      zalo: {
        visible: 'true',
        id: '0562209412',
        messages: 'Chat Zalo'
      },
      facebook: {
        visible: 'true',
        id: '106110582163260',
        messages: 'Chat Messenger'
      }
    }
  };

  // Merge config từ window._widget_settings nếu có
  const config = window._widget_settings ? 
    mergeDeep(defaultConfig, window._widget_settings) : 
    defaultConfig;

  // Hàm merge object sâu
  function mergeDeep(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = mergeDeep(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  // CSS Styles
  const styles = `
    .contact-widget-container {
      position: fixed;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    
    .contact-widget-container.bottom.right {
      bottom: 20px;
      right: 20px;
    }
    
    .contact-widget-container.bottom.left {
      bottom: 20px;
      left: 20px;
    }
    
    .contact-widget-container.top.right {
      top: 20px;
      right: 20px;
    }
    
    .contact-widget-container.top.left {
      top: 20px;
      left: 20px;
    }
    
    .contact-widget-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .contact-widget-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    }
    
    .contact-widget-toggle:active {
      transform: scale(0.95);
    }
    
    .contact-widget-toggle svg {
      width: 28px;
      height: 28px;
      fill: white;
      transition: transform 0.3s ease;
    }
    
    .contact-widget-toggle.active svg:first-child {
      transform: rotate(90deg) scale(0);
    }
    
    .contact-widget-toggle svg:last-child {
      position: absolute;
      transform: rotate(-90deg) scale(0);
    }
    
    .contact-widget-toggle.active svg:last-child {
      transform: rotate(0) scale(1);
    }
    
    .contact-widget-menu {
      position: absolute;
      bottom: 70px;
      right: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      padding: 16px;
      min-width: 280px;
      max-width: 320px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px) scale(0.9);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .contact-widget-menu.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    
    .contact-widget-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 16px;
    }
    
    .contact-widget-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #667eea;
    }
    
    .contact-widget-info h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
    }
    
    .contact-widget-info p {
      margin: 4px 0 0;
      font-size: 13px;
      color: #6b7280;
    }
    
    .contact-widget-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .contact-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border: none;
      border-radius: 8px;
      background: #f9fafb;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      color: inherit;
    }
    
    .contact-btn:hover {
      background: #f3f4f6;
      transform: translateX(4px);
    }
    
    .contact-btn-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .contact-btn-icon svg {
      width: 18px;
      height: 18px;
      fill: white;
    }
    
    .contact-btn-text {
      flex: 1;
      text-align: left;
    }
    
    .contact-btn-text strong {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 2px;
    }
    
    .contact-btn-text span {
      display: block;
      font-size: 12px;
      color: #6b7280;
    }
    
    .contact-btn.facebook .contact-btn-icon {
      background: #1877f2;
    }
    
    .contact-btn.zalo .contact-btn-icon {
      background: #0068ff;
    }
    
    .contact-btn.telegram .contact-btn-icon {
      background: #0088cc;
    }
    
    .contact-btn.viber .contact-btn-icon {
      background: #665cac;
    }
    
    .contact-btn.call .contact-btn-icon {
      background: #10b981;
    }
    
    .contact-btn.sms .contact-btn-icon {
      background: #f59e0b;
    }
    
    .contact-btn.email .contact-btn-icon {
      background: #ef4444;
    }
    
    .contact-btn.contact .contact-btn-icon {
      background: #8b5cf6;
    }
    
    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
      }
    }
    
    .contact-widget-toggle::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @media (max-width: 768px) {
      .contact-widget-container {
        bottom: 10px;
        right: 10px;
      }
      
      .contact-widget-menu {
        min-width: 260px;
        max-width: calc(100vw - 40px);
      }
    }
  `;

  // SVG Icons
  const icons = {
    menu: '<svg viewBox="0 0 24 24"><path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="white"/></svg>',
    zalo: '<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 13.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm-7 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm3.5-3c-.828 0-1.5-.672-1.5-1.5S11.172 9.5 12 9.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" fill="white"/></svg>',
    telegram: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.03-.74 4.04-1.76 6.73-2.92 8.08-3.49 3.85-1.61 4.65-1.89 5.17-1.9.11 0 .37.03.54.17.14.12.18.28.2.44.01.1.03.33.01.51z" fill="white"/></svg>',
    viber: '<svg viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12c0 1.89.525 3.66 1.438 5.168L2.546 20.2l3.155-.891A9.935 9.935 0 0012 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm4.5 13.5c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5zm-9 0c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5zm4.5-2c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5z" fill="white"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/></svg>',
    sms: '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="white"/></svg>',
    email: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="white"/></svg>',
    contact: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="white"/></svg>'
  };

  // Tạo HTML
  function createWidget() {
    // Inject CSS
    const styleTag = document.createElement('style');
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    // Tạo container
    const container = document.createElement('div');
    container.className = 'contact-widget-container';
    
    // Parse position
    const positions = config.positions.toLowerCase().split(' ');
    positions.forEach(pos => container.classList.add(pos));

    // Tạo toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'contact-widget-toggle';
    toggleBtn.innerHTML = icons.menu + icons.close;
    toggleBtn.setAttribute('aria-label', 'Toggle contact menu');

    // Tạo menu
    const menu = document.createElement('div');
    menu.className = 'contact-widget-menu';

    // Header
    const header = document.createElement('div');
    header.className = 'contact-widget-header';
    header.innerHTML = `
      <img src="${config.support.staff.image}" alt="${config.support.staff.name}" class="contact-widget-avatar">
      <div class="contact-widget-info">
        <h3>${config.support.staff.name}</h3>
        <p>${config.support.staff.messages}</p>
      </div>
    `;

    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'contact-widget-buttons';

    // Tạo buttons
    Object.keys(config.buttons).forEach(key => {
      const btn = config.buttons[key];
      if (btn.visible === 'true' || btn.visible === true) {
        const link = createContactButton(key, btn);
        buttonsContainer.appendChild(link);
      }
    });

    menu.appendChild(header);
    menu.appendChild(buttonsContainer);
    container.appendChild(toggleBtn);
    container.appendChild(menu);
    document.body.appendChild(container);

    // Event listeners
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      menu.classList.toggle('active');
    });

    // Close menu khi click outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        toggleBtn.classList.remove('active');
        menu.classList.remove('active');
      }
    });
  }

  function createContactButton(type, data) {
    const link = document.createElement('a');
    link.className = `contact-btn ${type}`;
    
    let href = '#';
    switch(type) {
      case 'facebook':
        href = `https://m.me/${data.id}`;
        break;
      case 'zalo':
        href = `https://zalo.me/${data.id}`;
        break;
      case 'telegram':
        href = `https://t.me/${data.id}`;
        break;
      case 'viber':
        href = `viber://chat?number=${data.id}`;
        break;
      case 'call':
        href = `tel:${data.id}`;
        break;
      case 'sms':
        href = `sms:${data.id}`;
        break;
      case 'email':
        href = `mailto:${data.id}`;
        break;
      case 'contact':
        href = data.id;
        break;
    }
    
    link.href = href;
    link.target = type === 'contact' ? '_self' : '_blank';
    link.rel = 'noopener noreferrer';
    
    const iconName = type === 'call' ? 'phone' : type;
    link.innerHTML = `
      <div class="contact-btn-icon">
        ${icons[iconName] || icons.contact}
      </div>
      <div class="contact-btn-text">
        <strong>${data.messages}</strong>
        <span>${type === 'facebook' ? 'Messenger' : type === 'zalo' ? 'Zalo' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </div>
    `;
    
    return link;
  }

  // Initialize khi DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }

  // Export API để có thể tùy chỉnh từ bên ngoài
  window.ContactWidget = {
    show: function() {
      const container = document.querySelector('.contact-widget-container');
      if (container) container.style.display = 'block';
    },
    hide: function() {
      const container = document.querySelector('.contact-widget-container');
      if (container) container.style.display = 'none';
    },
    toggle: function() {
      const btn = document.querySelector('.contact-widget-toggle');
      if (btn) btn.click();
    }
  };

})();
