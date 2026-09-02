/**
 * SF Symbols 风格 SVG 图标（内联、无外链）
 */
(function () {
  const NS = 'http://www.w3.org/2000/svg';

  function mk(pathInner, size = 22, sw = 1.65) {
    return `<svg xmlns="${NS}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${pathInner}</svg>`;
  }

  const PATHS = {
    workplan: mk('<path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M9 16l2 2 4-4"/>'),
    material: mk('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7l8.7 5 8.7-5M12 22V12"/>'),
    vehicle: mk('<path d="M19 17h2c.6 0 1-.4 1-1v-3l-2-5H5L3 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 13h14"/>'),
    canteen: mk('<path d="M12 3c-4 6-6 9-6 12a6 6 0 0 0 12 0c0-3-2-6-6-12z"/><path d="M12 15v6"/>'),
    reimburse: mk('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>'),
    urgent: mk('<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>', 18, 1.75),
    chevron: mk('<path d="M9 6l6 6-6 6"/>', 12, 2.2),
    chevronLeft: mk('<path d="M15 6l-6 6 6 6"/>', 13, 2.15),
    // Hub 小组件专用
    overview: mk('<path d="M4 20V10M10 20V4M16 20v-7M22 20V7"/>', 20, 1.75),
    approval: mk('<path d="M12 3l7 4v5c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V7l7-4z"/><path d="M9 12l2 2 4-4"/>', 20, 1.7),
    register: mk('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>', 20, 1.7),
    archive: mk('<path d="M4 20h16a2 2 0 0 0 2-2V8l-7-4H5a2 2 0 0 0-2 2v12z"/><path d="M10 12h4"/>', 20, 1.7),
    staff: mk('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', 20, 1.65),
    host: mk('<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>', 20, 1.65),
    utility: mk('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>', 20, 1.7),
    repair: mk('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>', 20, 1.65),
    'fixed-consume': mk('<path d="M10 2h4v3l1.5 2.5V20a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V7.5L10 5V2z"/><path d="M10 12h4"/>', 20, 1.65),
    menu: mk('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h3M8 18h8"/>', 20, 1.65),
    'working-fund': mk('<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M16 12h.01"/><path d="M2 10h20"/>', 20, 1.65),
    invoice: mk('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>', 20, 1.65),
    advance: mk('<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 6v2M12 16v2"/>', 20, 1.65),
    stock: mk('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7l8.7 5 8.7-5M12 22V12"/>', 20, 1.65),
    plan: mk('<path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>', 20, 1.65),
    inbound: mk('<path d="M12 3v14"/><path d="m8 11 4 4 4-4"/><path d="M4 21h16"/>', 20, 1.7),
    outbound: mk('<path d="M12 21V7"/><path d="m8 11 4-4 4 4"/><path d="M4 3h16"/>', 20, 1.7),
    catalog: mk('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', 20, 1.7),
    winetea: mk('<path d="M8 3h8l-1 8a5 5 0 0 1-10 0L8 3z"/><path d="M12 16v5M8 21h8"/>', 20, 1.7),
    request: mk('<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-1.42-1.42a2 2 0 0 1 2.83-2.83l.79.79"/>', 20, 1.55),
  };

  const MODULE_KEYS = new Set(['workplan', 'material', 'vehicle', 'canteen', 'reimburse']);
  const HUB_KEYS = new Set([
    'overview', 'approval', 'register', 'archive', 'staff', 'host', 'utility', 'repair',
    'invoice', 'advance', 'stock', 'plan', 'inbound', 'outbound', 'catalog', 'winetea', 'request',
    'fixed-consume', 'menu', 'working-fund',
  ]);

  window.OfficeIcons = {
    module(key) {
      return PATHS[MODULE_KEYS.has(key) ? key : 'material'];
    },
    hub(key) {
      return PATHS[HUB_KEYS.has(key) ? key : 'overview'];
    },
    chevron() {
      return PATHS.chevron;
    },
    chevronLeft() {
      return PATHS.chevronLeft;
    },
    backChevron(className = 'chrome-back-icon') {
      return `<span class="office-icon ${className}" aria-hidden="true">${PATHS.chevronLeft}</span>`;
    },
    urgent() {
      return PATHS.urgent;
    },
    wrap(inner, className = '') {
      return `<span class="office-icon ${className}">${inner}</span>`;
    },
    moduleIcon(key) {
      return this.wrap(this.module(key), 'office-icon-module');
    },
    hubIconWrap(key) {
      return this.wrap(this.hub(key), 'office-icon-hub');
    },
    footAction(label = '进入') {
      const I = window.OfficeIcons;
      return `<span class="ios-widget-foot-action">${label}<span class="office-icon office-icon-chevron">${I.chevron()}</span></span>`;
    },
    linkChevron(label) {
      const I = window.OfficeIcons;
      return `${label}<span class="office-icon office-icon-chevron">${I.chevron()}</span>`;
    },
  };
})();
