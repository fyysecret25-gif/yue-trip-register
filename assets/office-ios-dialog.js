/**
 * iOS 风格居中弹窗（替代浏览器 confirm / alert / prompt）
 */
(function () {
  const esc = typeof window.officeEscapeHtml === 'function'
    ? window.officeEscapeHtml
    : (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));

  let activeDialog = null;

  /** 关闭后短暂吞掉点穿，避免点遮罩关掉弹窗后点到下层「驳回/同意」 */
  function armClickThroughShield() {
    const shield = document.createElement('div');
    shield.setAttribute('aria-hidden', 'true');
    shield.style.cssText = 'position:fixed;inset:0;z-index:2600;background:transparent;';
    const kill = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    };
    shield.addEventListener('pointerdown', kill, true);
    shield.addEventListener('click', kill, true);
    document.body.appendChild(shield);
    setTimeout(() => shield.remove(), 350);
  }

  function closeDialog(result) {
    if (!activeDialog) return;
    const { el, resolve, onKeydown } = activeDialog;
    activeDialog = null;
    document.removeEventListener('keydown', onKeydown);
    el.remove();
    document.body.classList.remove('office-ios-dialog-open');
    armClickThroughShield();
    resolve(result);
  }

  function mountDialog(sheetHtml, opts = {}) {
    if (activeDialog) return Promise.resolve(null);

    return new Promise((resolve) => {
      const el = document.createElement('div');
      el.className = 'office-ios-dialog';
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-modal', 'true');
      el.innerHTML = `
        <div class="office-ios-dialog-backdrop" data-action="cancel" aria-hidden="true"></div>
        ${sheetHtml}
      `;

      const keyHandler = (e) => {
        if (opts.onKeydown?.(e, el) === true) return;
        if (e.key === 'Escape') closeDialog(null);
      };

      const dismissAsCancel = () => closeDialog(null);

      // 遮罩 / 弹窗外空白：一律取消，禁止当成确认
      el.addEventListener('pointerdown', (e) => {
        if (e.target === el || e.target.classList?.contains('office-ios-dialog-backdrop')) {
          e.preventDefault();
        }
      });

      el.addEventListener('click', (e) => {
        if (e.target === el || e.target.classList?.contains('office-ios-dialog-backdrop')) {
          e.preventDefault();
          e.stopPropagation();
          dismissAsCancel();
          return;
        }
        const node = e.target.closest('[data-action]');
        if (!node || !el.contains(node)) return;
        const action = node.getAttribute('data-action');
        if (action === 'confirm') {
          const value = typeof opts.getResultOnConfirm === 'function'
            ? opts.getResultOnConfirm(el)
            : true;
          closeDialog(value);
        } else if (action === 'cancel') {
          dismissAsCancel();
        }
      });

      document.body.appendChild(el);
      document.body.classList.add('office-ios-dialog-open');
      document.addEventListener('keydown', keyHandler);
      activeDialog = { el, resolve, onKeydown: keyHandler };

      const focusable = el.querySelector(
        'input, textarea, select, button[data-action="confirm"], button[data-action="cancel"]',
      );
      if (focusable) focusable.focus();
    });
  }

  /**
   * @param {{ title?: string, message?: string, confirmLabel?: string, cancelLabel?: string, destructive?: boolean }} opts
   * @returns {Promise<boolean>}
   */
  window.officeConfirm = function officeConfirm(opts = {}) {
    const title = opts.title || '确认';
    const message = opts.message || '';
    const confirmLabel = opts.confirmLabel || opts.confirmText || '确定';
    const cancelLabel = opts.cancelLabel || opts.cancelText || '取消';
    const destructive = !!opts.destructive;

    const sheet = `
      <div class="office-ios-dialog-sheet">
        <div class="office-ios-dialog-title" id="officeIosDialogTitle">${esc(title)}</div>
        ${message ? `<div class="office-ios-dialog-message">${esc(message)}</div>` : ''}
        <div class="office-ios-dialog-actions">
          <button type="button" class="office-ios-dialog-btn cancel" data-action="cancel">${esc(cancelLabel)}</button>
          <button type="button" class="office-ios-dialog-btn ${destructive ? 'destructive' : 'confirm'}" data-action="confirm">${esc(confirmLabel)}</button>
        </div>
      </div>`;

    return mountDialog(sheet).then((r) => r === true);
  };

  /**
   * @param {{ title?: string, message?: string, confirmLabel?: string }} opts
   * @returns {Promise<void>}
   */
  window.officeAlert = function officeAlert(opts = {}) {
    const title = opts.title || '提示';
    const message = opts.message || '';
    const confirmLabel = opts.confirmLabel || '好';

    const sheet = `
      <div class="office-ios-dialog-sheet">
        <div class="office-ios-dialog-title">${esc(title)}</div>
        ${message ? `<div class="office-ios-dialog-message">${esc(message)}</div>` : ''}
        <div class="office-ios-dialog-actions is-single">
          <button type="button" class="office-ios-dialog-btn confirm" data-action="confirm">${esc(confirmLabel)}</button>
        </div>
      </div>`;

    return mountDialog(sheet).then(() => {});
  };

  /**
   * @param {{ title?: string, message?: string, placeholder?: string, defaultValue?: string, confirmLabel?: string, cancelLabel?: string, multiline?: boolean }} opts
   * @returns {Promise<string|null>}
   */
  window.officePrompt = function officePrompt(opts = {}) {
    const title = opts.title || '请输入';
    const message = opts.message || '';
    const placeholder = opts.placeholder || '';
    const defaultValue = opts.defaultValue || '';
    const confirmLabel = opts.confirmLabel || '确定';
    const cancelLabel = opts.cancelLabel || '取消';
    const multiline = !!opts.multiline;
    const destructive = !!opts.destructive;
    const inputId = 'officeIosDialogInput';

    const field = multiline
      ? `<textarea class="office-ios-dialog-input" id="${inputId}" rows="3" placeholder="${esc(placeholder)}">${esc(defaultValue)}</textarea>`
      : `<input type="text" class="office-ios-dialog-input" id="${inputId}" value="${esc(defaultValue)}" placeholder="${esc(placeholder)}" autocomplete="off" />`;

    const sheet = `
      <div class="office-ios-dialog-sheet is-form">
        <div class="office-ios-dialog-title">${esc(title)}</div>
        ${message ? `<div class="office-ios-dialog-message">${esc(message)}</div>` : ''}
        <div class="office-ios-dialog-form">${field}</div>
        <div class="office-ios-dialog-actions">
          <button type="button" class="office-ios-dialog-btn cancel" data-action="cancel">${esc(cancelLabel)}</button>
          <button type="button" class="office-ios-dialog-btn ${destructive ? 'destructive' : 'confirm'}" data-action="confirm">${esc(confirmLabel)}</button>
        </div>
      </div>`;

    return mountDialog(sheet, {
      onKeydown: (e, el) => {
        if (e.key === 'Enter' && !multiline && !e.shiftKey) {
          e.preventDefault();
          const input = el.querySelector(`#${inputId}`);
          closeDialog(input ? String(input.value || '').trim() : '');
          return true;
        }
        return false;
      },
      getResultOnConfirm: (el) => {
        const input = el.querySelector(`#${inputId}`);
        return input ? String(input.value || '').trim() : '';
      },
    });
  };

  /**
   * 领用审批：多候选物资代码选择
   * @param {Array<{ index: number, name?: string, spec?: string, qty?: number, options?: Array<{ code: string, name?: string, spec?: string, available?: number, unit?: string }> }>} issues
   * @returns {Promise<Record<string, string>|null>}
   */
  window.officePickMaterialCodes = function officePickMaterialCodes(issues = []) {
    const rows = (issues || []).filter((x) => x.reason === 'multiple_codes' && x.options?.length);
    if (!rows.length) return Promise.resolve(null);

    const body = rows.map((row) => {
      const label = [row.name, row.spec].filter(Boolean).join(' · ') || `第 ${row.index + 1} 行`;
      const qty = row.qty != null ? ` × ${row.qty}` : '';
      const opts = row.options.map((o) => {
        const meta = [o.code, o.available != null ? `库存 ${o.available}${o.unit || ''}` : ''].filter(Boolean).join(' · ');
        return `<option value="${esc(o.code)}">${esc(meta)}</option>`;
      }).join('');
      return `<div class="office-ios-pick-row" data-index="${esc(row.index)}">
        <label class="office-ios-pick-label">${esc(label)}${esc(qty)}</label>
        <select class="office-ios-dialog-select" data-index="${esc(row.index)}">${opts}</select>
      </div>`;
    }).join('');

    const sheet = `
      <div class="office-ios-dialog-sheet is-form is-wide">
        <div class="office-ios-dialog-title">选择物资代码</div>
        <div class="office-ios-dialog-message">以下物资存在多个库存代码，请确认出库代码。</div>
        <div class="office-ios-dialog-form office-ios-pick-list">${body}</div>
        <div class="office-ios-dialog-actions">
          <button type="button" class="office-ios-dialog-btn cancel" data-action="cancel">取消</button>
          <button type="button" class="office-ios-dialog-btn confirm" data-action="confirm">确认出库</button>
        </div>
      </div>`;

    return mountDialog(sheet, {
      getResultOnConfirm: (el) => {
        const out = {};
        el.querySelectorAll('.office-ios-dialog-select').forEach((sel) => {
          const key = sel.dataset.index;
          if (key != null && sel.value) out[key] = sel.value;
        });
        return Object.keys(out).length ? out : null;
      },
    });
  };
})();
