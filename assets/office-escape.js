/** 共享 HTML 转义（文本与属性值） */
(function (global) {
  function officeEscapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }
  global.officeEscapeHtml = officeEscapeHtml;
})(typeof window !== 'undefined' ? window : globalThis);
