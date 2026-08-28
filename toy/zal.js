/* ============================================================================
 * zal.js — то, за что платят: счёт для тойханы, рассадка и список для печати.
 *
 * ЗАЧЕМ ЭТОТ ФАЙЛ ПОЯВИЛСЯ. Всё это жило внутри organizer.html, за замком
 * тарифа, — то есть человек не мог увидеть ни строчки из того, за что просят
 * деньги, пока не заплатит. Свод по портфелю назвал это главным: «ничего
 * из того, за что платят, человек не видит до денег».
 *
 * Образец (obrazec.html) показывает эти же документы на выдуманном тое.
 * И вот здесь важное: образец обязан рисовать НАСТОЯЩИЙ документ, а не
 * похожий. Если бы он собирал свою копию разметки, у продукта стало бы
 * два счёта для зала — один для тех, кто заплатил, другой для витрины, —
 * и они разъехались бы с первой же правкой. Поэтому код переехал сюда,
 * а кабинет и образец оба зовут одни и те же функции.
 *
 * Функции чистые: ни S, ни L(), ни DOM. Всё, что нужно, приходит доводами —
 * иначе образцу пришлось бы подделывать состояние кабинета.
 * ==========================================================================*/

/* Сколько мест держит семья. Ответившая «придём вчетвером» держит четыре;
   молчащая держит столько, на сколько её пригласили, — тойхона считает так же. */
function toyFamSeats(f){
  const n = f.rsvp_status==="yes" ? f.rsvp_count : f.invited_count;
  return Math.max(0, n|0);
}
const toyFamSide = f => (f.side==="kelin" ? "kelin" : "kuyov");
// Сравнение кортежей: без него выбор стола превращается в нечитаемое условие.
function toyLessKey(a,b){ for(let i=0;i<a.length;i++){ if(a[i]!==b[i]) return a[i]<b[i]; } return false; }

function toyPlanSeating(fams, tables){
  const T = (tables||[]).map(x=>({ id:x.id, num:x.num|0, cap:Math.max(0,x.capacity|0), used:0, side:null, mixed:false }));
  const byId = new Map(T.map(x=>[x.id,x]));
  // Занятое место и «чей это стол» считаем по уже рассаженным: двигать мы их
  // не будем, но место они держат и сторону столу задают тоже они.
  for(const f of (fams||[])){
    if(f.table_id==null) continue;
    const tb = byId.get(f.table_id); if(!tb) continue;
    tb.used += toyFamSeats(f);
    const sd = toyFamSide(f);
    if(tb.side===null) tb.side = sd; else if(tb.side!==sd) tb.mixed = true;
  }
  // Отказавшимся место не нужно. Семья с нулём мест — тоже не задача рассадки.
  const pool = (fams||[]).filter(f => f.table_id==null && f.rsvp_status!=="no" && toyFamSeats(f)>0);
  pool.sort((a,b)=> toyFamSeats(b)-toyFamSeats(a)
    || (toyFamSide(a)==="kelin"?0:1)-(toyFamSide(b)==="kelin"?0:1)
    || (a.id-b.id));

  const plan=[], left=[];
  for(const f of pool){
    const s = toyFamSeats(f), sd = toyFamSide(f);
    let best=null, bk=null;
    for(const tb of T){
      const slack = tb.cap - tb.used - s;
      if(slack < 0) continue;             // семью не режем: стол просто не подходит
      // 0 — стол уже занят своей стороной, 1 — пустой, 2 — смешанный, 3 — чужая сторона.
      const rank = tb.used===0 ? 1 : (tb.mixed ? 2 : (tb.side===sd ? 0 : 3));
      // Келин заполняет ряд с начала, куёв — с конца: так стороны сидят группами.
      const k = [rank, slack, sd==="kelin" ? tb.num : -tb.num, tb.id];
      if(!bk || toyLessKey(k,bk)){ best=tb; bk=k; }
    }
    if(!best){ left.push(f); continue; }
    best.used += s;
    if(best.side===null) best.side = sd; else if(best.side!==sd) best.mixed = true;
    plan.push({ family_id:f.id, table_id:best.id, seats:s });
  }
  return { plan, seats: plan.reduce((acc,p)=>acc+p.seats,0), left,
           leftSeats: left.reduce((acc,f)=>acc+toyFamSeats(f),0),
           tables: new Set(plan.map(p=>p.table_id)).size };
}

/* ---------- дата словами ----------
 * Месяц пишем сами, а не через toLocaleDateString. Локаль uz-UZ на дату тоя
 * отдаёт «2026 M10 18», а на день с месяцем — «M10 18».
 *
 * Продукт про это знал и чинил это дважды: в приглашении (invite.html) и
 * в строке про махаллю. Но счёт для тойханы и список для печати — то есть оба
 * документа, которые получает заплативший, — форматировали дату через Intl,
 * и узбекоязычный организатор нёс администратору зала бумагу с «2026 M10 18».
 * Нашлось при сборке образца: до него посмотреть на узбекский счёт мог только
 * тот, кто за него заплатил.
 *
 * Русскую форму тоже собираем руками: Intl добавляет « г.», и следом за ней
 * в предложении вставала вторая точка.
 *
 * Полдень по Ташкенту берём нарочно: от календарной даты нас интересует
 * именно дата, и с полудня ни переход через месяц, ни часовой пояс её
 * не сдвигают.
 *
 * Третья копия таблицы месяцев осталась в invite.html — там нужна ещё
 * и узбекская кириллица, которой в кабинете нет вовсе. */
const TOY_MONTHS = {
  ru: ["января","февраля","марта","апреля","мая","июня",
       "июля","августа","сентября","октября","ноября","декабря"],
  uz: ["yanvar","fevral","mart","aprel","may","iyun",
       "iyul","avgust","sentabr","oktabr","noyabr","dekabr"],
};
/* iso — «2026-10-18». shiftDays — сдвиг в сутках (для срока уведомления
   махалли он равен −7). year:false отдаёт день и месяц без года. */
function toyDateLong(iso, lang, opt){
  opt = opt || {};
  const ms = Date.parse(`${String(iso||"")}T12:00:00+05:00`);
  if(isNaN(ms)) return "";
  const d = new Date(ms + (opt.shiftDays||0) * 864e5);
  const part = k => new Intl.DateTimeFormat("en-GB", { timeZone:"Asia/Tashkent", [k]:"numeric" }).format(d);
  const list = TOY_MONTHS[lang === "uz" ? "uz" : "ru"];
  const s = `${Number(part("day"))} ${list[Number(part("month")) - 1]}`;
  return opt.year === false ? s : `${s} ${part("year")}`;
}

/* ---------- рисование ---------- */

function toyWrapText(ctx, text, maxW){
  const words=String(text||"").split(/\s+/).filter(Boolean); const lines=[]; let line="";
  for(const w of words){
    const probe=line?line+" "+w:w;
    if(ctx.measureText(probe).width>maxW && line){ lines.push(line); line=w; } else line=probe;
  }
  if(line) lines.push(line);
  return lines.length?lines:[""];
}
function toyFitFont(ctx, text, maxW, family, start, min){
  let size=start;
  while(size>min){ ctx.font=`600 ${size}px ${family}`; if(ctx.measureText(text).width<=maxW) break; size-=2; }
  ctx.font=`600 ${size}px ${family}`;
  return size;
}

/* Счёт для тойханы одной картинкой. Возвращает canvas — кто его показывает
   и как сохраняет, решает вызывающий: в кабинете это оверлей с длинным
   нажатием, в образце — обычная <img> на странице.
 *
 * o = { couple, dateStr, time, venue, est, yes, pendInv, no, kuyov, kelin,
 *       answered, total, tables, cap, today, t } */
function toyZalPng(o){
  const t = o.t;
  const W=1080, H=1440, cv=document.createElement("canvas");
  cv.width=W; cv.height=H;
  const x=cv.getContext("2d");
  const SERIF='"Cormorant Garamond", Georgia, serif', SANS='Manrope, system-ui, sans-serif';
  const CREAM="#FBF7F2", INK="#2A211C", MUTED="#8B7A6C", GOLD="#B08D3F", OK="#2E7D4F", WARN="#A86B00";

  x.fillStyle=CREAM; x.fillRect(0,0,W,H);
  x.strokeStyle=GOLD; x.lineWidth=3; x.strokeRect(30,30,W-60,H-60);
  x.lineWidth=1; x.strokeRect(44,44,W-88,H-88);

  x.textAlign="center"; x.fillStyle=MUTED;
  x.font=`600 26px ${SANS}`;
  x.fillText(t.zPngEyebrow.toUpperCase(), W/2, 132);

  x.fillStyle=INK;
  toyFitFont(x, o.couple||"", W-200, SERIF, 80, 40);
  x.fillText(o.couple||"", W/2, 232);

  x.fillStyle=MUTED; x.font=`500 30px ${SANS}`;
  x.fillText([o.dateStr,o.time].filter(Boolean).join(" · "), W/2, 290);
  let y=334;
  if(o.venue){
    toyWrapText(x,o.venue,W-220).slice(0,2).forEach(l=>{ x.fillText(l,W/2,y); y+=38; });
  }

  // Все цифры рисуем сансом. У Cormorant старостильные цифры: «21» читается как «2I»,
  // а картинка существует ровно ради того, чтобы число прочли с первого взгляда.
  x.fillStyle=GOLD; x.font=`700 190px ${SANS}`;
  x.fillText(String(o.est), W/2, 600);
  x.fillStyle=INK; x.font=`700 36px ${SANS}`;
  x.fillText(t.zPngMain, W/2, 664);
  x.fillStyle=MUTED; x.font=`400 26px ${SANS}`;
  toyWrapText(x,t.zPngMainNote,W-280).slice(0,2).forEach((l,i)=>x.fillText(l,W/2,712+i*34));

  // Три колонки: подтвердили · ждём · отказались
  const col=[[String(o.yes),t.zYes,OK],[String(o.pendInv),t.zPngPending,WARN],[String(o.no),t.zPngNo,MUTED]];
  col.forEach(([v,label,color],i)=>{
    const cx=W/2+(i-1)*300;
    x.fillStyle=color; x.font=`700 82px ${SANS}`; x.fillText(v,cx,872);
    x.fillStyle=MUTED; x.font=`500 25px ${SANS}`; x.fillText(label,cx,918);
  });

  x.strokeStyle="#EADFD2"; x.lineWidth=1;
  x.beginPath(); x.moveTo(120,976); x.lineTo(W-120,976); x.stroke();

  const rows=[[t.zPngKuyov,String(o.kuyov)],[t.zPngKelin,String(o.kelin)],
    [t.zPngFamilies,`${o.answered} / ${o.total}`]];
  if(o.tables) rows.push([t.zPngTables,`${o.tables} × ${o.cap}`]);
  rows.forEach((r,i)=>{
    const ry=1046+i*60;
    x.font=`500 32px ${SANS}`;
    x.textAlign="left";  x.fillStyle=MUTED; x.fillText(r[0],140,ry);
    x.font=`600 32px ${SANS}`;
    x.textAlign="right"; x.fillStyle=INK;   x.fillText(r[1],W-140,ry);
    if(i<rows.length-1){ x.strokeStyle="#EDE2D4"; x.beginPath(); x.moveTo(140,ry+20); x.lineTo(W-140,ry+20); x.stroke(); }
  });

  x.textAlign="center"; x.fillStyle=MUTED; x.font=`400 24px ${SANS}`;
  x.fillText(t.zPngFooter(o.today), W/2, H-92);
  x.fillStyle=GOLD; x.font=`600 26px ${SANS}`;
  x.fillText("Toʻy-Daftar", W/2, H-54);

  return cv;
}

/* ---------- список для печати ---------- */

const toyEsc = s => String(s ?? "")
  .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

/* Список по столам: он же .doc для принтера, он же текст для вставки в Excel.
 * Возвращает { html, plain } — разметку документа и тот же документ строками.
 *
 * o = { couple, dateStr, venue, fams, tables, yes, pendFams, pendInv, est, mah, t } */
function toyZalDoc(o){
  const t = o.t;
  const byT={}; (o.fams||[]).forEach(f=>{const k=f.table_id||0;(byT[k]=byT[k]||[]).push(f);});
  const parts=Object.keys(byT).sort((a,b)=>a-b).map(k=>{
    const tb=(o.tables||[]).find(x=>x.id==k), title=tb?t.zDocTable(tb.num):t.zDocNoTable;
    const list=byT[k].filter(f=>f.rsvp_status!=="no");
    const tot=list.reduce((a,f)=>a+(f.rsvp_status==="yes"?f.rsvp_count:f.invited_count),0);
    return {title,list,tot};
  // Пустые блоки выкидываем. Отказавшиеся за столы не садятся, поэтому у тоя,
  // где рассажены все остальные, документ заканчивался разделом «Без стола —
  // 0 чел.» с одной шапкой таблицы и без единой строки. Нашлось при сборке
  // образца: на выдуманном тое этот блок оказался последним листом того,
  // что человек получает за деньги. В кабинете он был там же — просто
  // увидеть его было некому, потому что смотреть туда можно только заплатив.
  }).filter(b=>b.list.length);
  const seats=f=>f.rsvp_status==="yes"?f.rsvp_count:f.invited_count;
  const stat=f=>f.rsvp_status==="yes"?t.zDocStYes:t.zDocStPending;
  const blocks=parts.map(b=>`<h3>${t.zDocBlock(b.title,b.tot)}</h3><table><tr><th>${t.zThFamily}</th><th>${t.zThPeople}</th><th>${t.zThStatus}</th></tr>${
    b.list.map(f=>`<tr><td>${toyEsc(f.name)}</td><td>${seats(f)}</td><td>${stat(f)}</td></tr>`).join("")}</table>`).join("");
  // G-03. Строка про махаллю стоит в самом документе, а не только на экране:
  // документ — это то, что организатор пересылает и перечитывает, и именно
  // про уведомление он забывает. Ноль разработки, но это и отличает наш счёт
  // от таблицы, которую зал попросил бы сделать в Excel.
  const head=`<h1>${t.zDocH1(toyEsc(o.couple))}<br><span style="font-size:11pt">${o.dateStr} · ${toyEsc(o.venue||"")}</span></h1>
      <p>${t.zDocSummary(o.yes,o.pendFams,o.pendInv,o.est)}</p>${o.mah?`<p>${t.zMahDoc(o.mah)}</p>`:""}`;
  const strip=s=>String(s).replace(/<[^>]+>/g,"");
  // Текстом — тот же документ для вставки в Excel и Google Таблицы: колонки
  // разделены табуляцией, поэтому вставка раскладывается сама.
  const plain=[`${o.couple} · ${o.dateStr} · ${o.venue||""}`,
    strip(t.zDocSummary(o.yes,o.pendFams,o.pendInv,o.est))]
    .concat(o.mah?[strip(t.zMahDoc(o.mah))]:[], [""])
    .concat(...parts.map(b=>[`${t.zDocBlock(b.title,b.tot)}`,
      [t.zThFamily,t.zThPeople,t.zThStatus].join("\t")]
      .concat(b.list.map(f=>[f.name,seats(f),stat(f)].join("\t")), [""])))
    .join("\n");
  return { head, blocks, plain, parts,
    html:`<html><head><meta charset="utf-8"><style>body{font-family:'Times New Roman',serif;margin:1.5cm}h1{font-size:15pt;text-align:center}h3{font-size:12pt;margin:12pt 0 4pt}table{border-collapse:collapse;width:100%}td,th{border:1px solid #000;padding:4pt;font-size:11pt}</style></head><body>
      ${head}${blocks}</body></html>` };
}

if (typeof window !== "undefined") {
  window.toyFamSeats = toyFamSeats;
  window.toyFamSide = toyFamSide;
  window.toyPlanSeating = toyPlanSeating;
  window.toyWrapText = toyWrapText;
  window.toyFitFont = toyFitFont;
  window.toyZalPng = toyZalPng;
  window.toyZalDoc = toyZalDoc;
  window.toyEsc = toyEsc;
  window.toyDateLong = toyDateLong;
  window.TOY_MONTHS = TOY_MONTHS;
}
