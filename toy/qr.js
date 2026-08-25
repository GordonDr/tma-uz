/* Генератор QR-кода. Своя реализация, без внешних библиотек.

   Зачем вообще. Печатное приглашение существует ради родни без телеграма. Без
   QR оно тупиковое: ссылку вида .../invite.html?t=k3n8x... руками не набирают,
   значит ответить такой гость не может, и счёт для тойханы снова неполный.

   Объём. Байтовый режим, уровень коррекции M, версии 1–10 (до 271 байта) —
   этого хватает на любую нашу ссылку с запасом. Кириллицу и латиницу кодируем
   в UTF-8, как требует спецификация для байтового режима.

   Проверка. Кодирование сверено с эталонными данными ISO/IEC 18004 в qr-test.js:
   те же входные строки должны давать ту же матрицу. */

/* ── Поле Галуа GF(256), примитивный многочлен 0x11D ─────────────────────── */
const QR_EXP = new Uint8Array(512);
const QR_LOG = new Uint8Array(256);
(function initGF(){
  let v = 1;
  for (let i = 0; i < 255; i++) {
    QR_EXP[i] = v;
    QR_LOG[v] = i;
    v <<= 1;
    if (v & 0x100) v ^= 0x11D;
  }
  for (let i = 255; i < 512; i++) QR_EXP[i] = QR_EXP[i - 255];
})();
const gfMul = (a, b) => (a === 0 || b === 0) ? 0 : QR_EXP[QR_LOG[a] + QR_LOG[b]];

/* Порождающий многочлен для n проверочных байтов */
function qrGenPoly(n){
  let poly = [1];
  for (let i = 0; i < n; i++) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], QR_EXP[i]);
    }
    poly = next;
  }
  return poly;
}
function qrEC(data, n){
  const gen = qrGenPoly(n);
  const rem = new Array(n).fill(0);
  for (const byte of data) {
    const factor = byte ^ rem[0];
    rem.shift(); rem.push(0);
    for (let j = 0; j < n; j++) rem[j] ^= gfMul(gen[j + 1], factor);
  }
  return rem;
}

/* ── Таблицы версий, уровень коррекции M ─────────────────────────────────────
   На версию: [всего кодовых слов данных, проверочных на блок, блоков группы 1,
   слов данных в блоке группы 1, блоков группы 2, слов данных в блоке группы 2] */
const QR_VER = {
  1:  [16,  10, 1, 16, 0, 0],
  2:  [28,  16, 1, 28, 0, 0],
  3:  [44,  26, 1, 44, 0, 0],
  4:  [64,  18, 2, 32, 0, 0],
  5:  [86,  24, 2, 43, 0, 0],
  6:  [108, 16, 4, 27, 0, 0],
  7:  [124, 18, 4, 31, 0, 0],
  8:  [154, 22, 2, 38, 2, 39],
  9:  [182, 22, 3, 36, 2, 37],
  10: [216, 26, 4, 43, 1, 44],
};
// Координаты центров выравнивающих узоров по версиям
const QR_ALIGN = {
  1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
  6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
};
// Заранее посчитанные строки формата для уровня M и масок 0–7 (15 бит)
const QR_FORMAT_M = [
  0x5412, 0x5125, 0x5E7C, 0x5B4B, 0x45F9, 0x40CE, 0x4F97, 0x4AA0,
];
// Строки версии для версий 7+ (18 бит)
const QR_VERSION_BITS = {
  7: 0x07C94, 8: 0x085BC, 9: 0x09A99, 10: 0x0A4D3,
};

function qrUtf8(str){
  const out = [];
  for (const ch of String(str)) {
    const cp = ch.codePointAt(0);
    if (cp < 0x80) out.push(cp);
    else if (cp < 0x800) out.push(0xC0 | (cp >> 6), 0x80 | (cp & 63));
    else if (cp < 0x10000) out.push(0xE0 | (cp >> 12), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
    else out.push(0xF0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
  }
  return out;
}

/* Возвращает матрицу size×size из 0/1. Бросает, если строка длиннее версии 10. */
function qrMatrix(text){
  const bytes = qrUtf8(text);
  // Заголовок: 4 бита режима + счётчик длины (8 бит для версий 1–9, 16 для 10+)
  let ver = 0;
  for (let v = 1; v <= 10; v++) {
    const cap = QR_VER[v][0] - 2 - (v >= 10 ? 1 : 0);
    if (bytes.length <= cap) { ver = v; break; }
  }
  if (!ver) throw new Error("qr: слишком длинная строка");

  const [totalData, ecPerBlock, g1, g1len, g2, g2len] = QR_VER[ver];
  const lenBits = ver >= 10 ? 16 : 8;

  const bits = [];
  const push = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >> i) & 1); };
  push(0b0100, 4);              // байтовый режим
  push(bytes.length, lenBits);
  for (const b of bytes) push(b, 8);
  // Терминатор и добивка до целых байтов
  for (let i = 0; i < 4 && bits.length < totalData * 8; i++) bits.push(0);
  while (bits.length % 8) bits.push(0);
  const data = [];
  for (let i = 0; i < bits.length; i += 8) {
    data.push(bits.slice(i, i + 8).reduce((a, b) => (a << 1) | b, 0));
  }
  const PAD = [0xEC, 0x11];
  for (let i = 0; data.length < totalData; i++) data.push(PAD[i % 2]);

  // Разбиение на блоки, коррекция, чередование
  const blocks = [], ecs = [];
  let at = 0;
  for (let i = 0; i < g1; i++) { blocks.push(data.slice(at, at + g1len)); at += g1len; }
  for (let i = 0; i < g2; i++) { blocks.push(data.slice(at, at + g2len)); at += g2len; }
  for (const b of blocks) ecs.push(qrEC(b, ecPerBlock));

  const stream = [];
  const maxLen = Math.max(...blocks.map(b => b.length));
  for (let i = 0; i < maxLen; i++) for (const b of blocks) if (i < b.length) stream.push(b[i]);
  for (let i = 0; i < ecPerBlock; i++) for (const e of ecs) stream.push(e[i]);

  // ── Раскладка матрицы ────────────────────────────────────────────────────
  const size = 17 + ver * 4;
  const m = Array.from({ length: size }, () => new Array(size).fill(null));
  const put = (r, c, v) => { if (r >= 0 && r < size && c >= 0 && c < size) m[r][c] = v; };

  const finder = (r, c) => {
    for (let dr = -1; dr <= 7; dr++) for (let dc = -1; dc <= 7; dc++) {
      const rr = r + dr, cc = c + dc;
      if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
      const inRing = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6 &&
        (dr === 0 || dr === 6 || dc === 0 || dc === 6 || (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4));
      put(rr, cc, inRing ? 1 : 0);
    }
  };
  finder(0, 0); finder(0, size - 7); finder(size - 7, 0);

  // Синхрополосы
  for (let i = 8; i < size - 8; i++) { put(6, i, i % 2 === 0 ? 1 : 0); put(i, 6, i % 2 === 0 ? 1 : 0); }

  // Выравнивающие узоры — кроме тех, что налезли бы на поисковые
  const al = QR_ALIGN[ver];
  for (const r of al) for (const c of al) {
    if ((r <= 8 && c <= 8) || (r <= 8 && c >= size - 9) || (r >= size - 9 && c <= 8)) continue;
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
      put(r + dr, c + dc, (Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0)) ? 1 : 0);
    }
  }
  put(size - 8, 8, 1);   // тёмный модуль, всегда

  // Резерв под строки формата и версии — чтобы данные туда не легли
  const reserve = [];
  for (let i = 0; i < 9; i++) { reserve.push([8, i], [i, 8]); }
  for (let i = 0; i < 8; i++) { reserve.push([8, size - 1 - i], [size - 1 - i, 8]); }
  for (const [r, c] of reserve) if (m[r][c] === null) m[r][c] = 0;
  if (ver >= 7) {
    for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) {
      if (m[i][size - 11 + j] === null) m[i][size - 11 + j] = 0;
      if (m[size - 11 + j][i] === null) m[size - 11 + j][i] = 0;
    }
  }

  // Данные идут снизу вверх зигзагом парами столбцов, столбец 6 пропускается
  let bi = 0, up = true;
  const dataBits = [];
  for (const byte of stream) for (let i = 7; i >= 0; i--) dataBits.push((byte >> i) & 1);
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    for (let k = 0; k < size; k++) {
      const row = up ? size - 1 - k : k;
      for (const c of [col, col - 1]) {
        if (m[row][c] !== null) continue;
        m[row][c] = bi < dataBits.length ? dataBits[bi] : 0;
        bi++;
      }
    }
    up = !up;
  }

  // Маска 0 — самая простая и всегда допустимая. Оценку восьми масок не делаем:
  // ссылка у нас каждый раз разная, но короткая, и сканеры читают её надёжно.
  const MASK = 0;
  const isFunc = (r, c) =>
    (r <= 8 && c <= 8) || (r <= 8 && c >= size - 8) || (r >= size - 8 && c <= 8) ||
    r === 6 || c === 6 ||
    (ver >= 7 && ((r < 6 && c >= size - 11) || (c < 6 && r >= size - 11))) ||
    al.some(ar => al.some(ac => {
      if ((ar <= 8 && ac <= 8) || (ar <= 8 && ac >= size - 9) || (ar >= size - 9 && ac <= 8)) return false;
      return Math.abs(r - ar) <= 2 && Math.abs(c - ac) <= 2;
    }));
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
    if (isFunc(r, c)) continue;
    if ((r + c) % 2 === MASK) m[r][c] ^= 1;
  }

  // Строка формата
  const fmt = QR_FORMAT_M[MASK];
  for (let i = 0; i < 15; i++) {
    const bit = (fmt >> i) & 1;
    if (i < 6) m[8][i] = bit;
    else if (i === 6) m[8][7] = bit;
    else if (i === 7) m[8][8] = bit;
    else if (i === 8) m[7][8] = bit;
    else m[14 - i][8] = bit;

    // Вторая копия — 7 бит по вертикали и 8 по горизонтали, не наоборот.
    // На 8+7 последний вертикальный бит ложился на (size-8, 8), а это тёмный
    // модуль, который обязан оставаться единицей.
    if (i < 7) m[size - 1 - i][8] = bit;
    else m[8][size - 15 + i] = bit;
  }
  // Строка версии (только 7+)
  if (ver >= 7) {
    const vb = QR_VERSION_BITS[ver];
    for (let i = 0; i < 18; i++) {
      const bit = (vb >> i) & 1;
      m[Math.floor(i / 3)][size - 11 + (i % 3)] = bit;
      m[size - 11 + (i % 3)][Math.floor(i / 3)] = bit;
    }
  }
  return m;
}

/* Рисует QR на canvas. quiet — обязательная белая зона в модулях: без неё
   сканеры не находят код, а «сэкономить» на ней тянет всех. */
function qrDraw(ctx, text, x0, y0, box, dark, light, quiet){
  const m = qrMatrix(text);
  const n = m.length;
  const q = quiet === undefined ? 4 : quiet;
  const px = box / (n + q * 2);
  if (light) { ctx.fillStyle = light; ctx.fillRect(x0, y0, box, box); }
  ctx.fillStyle = dark || "#000";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (!m[r][c]) continue;
    // Округляем края наружу: при дробном px между модулями появлялись щели.
    const sx = x0 + (c + q) * px, sy = y0 + (r + q) * px;
    ctx.fillRect(Math.floor(sx), Math.floor(sy), Math.ceil(px), Math.ceil(px));
  }
  return n;
}

if (typeof window !== "undefined") {
  // Таблицы наружу — их читает qr-test.html, чтобы разобрать матрицу обратно.
  window.QR_VER = QR_VER;
  window.QR_ALIGN = QR_ALIGN;
  window.qrEC = qrEC;
  window.qrMatrix = qrMatrix;
  window.qrDraw = qrDraw;
}
