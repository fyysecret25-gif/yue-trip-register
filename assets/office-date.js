/** 综合办公室 · 日期显示与解析（X年X月X日） */
(function () {
  function parseDateParts(v) {
    if (v == null || v === '') return null;
    if (v instanceof Date && !Number.isNaN(v.getTime())) {
      return { y: v.getFullYear(), m: v.getMonth() + 1, d: v.getDate() };
    }
    const s = String(v).trim();
    if (!s) return null;

    let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return { y: +m[1], m: +m[2], d: +m[3] };

    m = s.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (m) return { y: +m[1], m: +m[2], d: +m[3] };

    const digits = s.replace(/\D/g, '');
    if (/^\d{8}$/.test(digits)) {
      return {
        y: +digits.slice(0, 4),
        m: +digits.slice(4, 6),
        d: +digits.slice(6, 8),
      };
    }

    const n = Number(s);
    if (Number.isFinite(n) && n >= 19000101 && n <= 29991231) {
      const ds = String(Math.round(n));
      return { y: +ds.slice(0, 4), m: +ds.slice(4, 6), d: +ds.slice(6, 8) };
    }

    const d = new Date(s);
    if (!Number.isNaN(d.getTime())) {
      return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() };
    }
    return null;
  }

  function formatDateZh(v) {
    const p = parseDateParts(v);
    if (!p) return String(v ?? '').trim();
    return `${p.y}年${p.m}月${p.d}日`;
  }

  function formatDateTimeZh(v) {
    if (!v) return '';
    const d = v instanceof Date ? v : new Date(v);
    if (!Number.isNaN(d.getTime())) {
      const date = formatDateZh(d);
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      return `${date} ${hh}:${mm}:${ss}`;
    }
    const p = parseDateParts(v);
    if (p) return formatDateZh(v);
    return String(v);
  }

  function toIsoDate(v) {
    const p = parseDateParts(v);
    if (!p) return String(v ?? '').trim();
    return `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`;
  }

  function isDateCol(col, dateCols) {
    return Array.isArray(dateCols) && dateCols.includes(col);
  }

  window.officeFormatDateZh = formatDateZh;
  window.officeFormatDateTimeZh = formatDateTimeZh;
  window.officeToIsoDate = toIsoDate;
  window.officeParseDateParts = parseDateParts;
  window.officeIsDateCol = isDateCol;
})();
