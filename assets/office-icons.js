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
  };

  const MODULE_KEYS = new Set(['workplan', 'material', 'vehicle', 'canteen', 'reimburse']);

  window.OfficeIcons = {
    module(key) {
      return PATHS[MODULE_KEYS.has(key) ? key : 'material'];
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
