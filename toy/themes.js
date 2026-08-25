/* Оформления приглашения — единственный источник правды.
   Раньше список тем лежал в трёх местах (приглашение, кабинет, демо) и уже начал
   расходиться: кабинет предлагал выбрать то, чего в приглашении нет.

   Каждая тема задаёт не только цвет, но и сложение страницы — иначе десять тем
   были бы одной темой в десяти оттенках:
     vars   — палитра, шрифты, радиус
     orn    — орнамент над именами
     frame  — рамка обложки: double | corner | arch | band | none
     names  — как сложены имена: stack | rule | caps
     tier   — free или premium

   Кириллица обязательна: половина гостей читает приглашение на узбекской
   кириллице, и красивый шрифт без неё превращается в подстановку системного.
   Все шрифты ниже кириллицу покрывают — это проверялось при выборе. */

const TOY_FONTS =
  "https://fonts.googleapis.com/css2" +
  "?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400" +
  "&family=Manrope:wght@300;400;500;600;700" +
  "&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400" +
  "&family=Prata" +
  "&family=Forum" +
  "&family=Tenor+Sans" +
  "&family=Spectral:ital,wght@0,300;0,400;0,500;1,300" +
  "&family=Golos+Text:wght@400;500;600" +
  "&family=Unbounded:wght@300;400;600" +
  "&display=swap";

const TOY_ORN = {
  rings: `<svg class="orn" viewBox="0 0 112 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 13h34M76 13h34" stroke="currentColor" stroke-width="1" opacity=".6"/>
    <circle cx="50" cy="13" r="7.5" stroke="currentColor" stroke-width="1.3" fill="none"/>
    <circle cx="62" cy="13" r="7.5" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>`,
  diamond: `<svg class="orn" viewBox="0 0 112 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 13h38M72 13h38" stroke="currentColor" stroke-width="1" opacity=".55"/>
    <path d="M56 4c3.6 3.6 7.2 5.6 7.2 9s-3.6 5.4-7.2 9c-3.6-3.6-7.2-5.6-7.2-9s3.6-5.4 7.2-9z" stroke="currentColor" stroke-width="1.2" fill="none"/>
    <circle cx="43" cy="13" r="2" fill="currentColor"/><circle cx="69" cy="13" r="2" fill="currentColor"/></svg>`,
  ikat: `<svg class="orn" viewBox="0 0 112 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 13c4-7 8-7 12 0s8 7 12 0 8-7 12 0 8 7 12 0 8-7 12 0 8 7 12 0" stroke="currentColor" stroke-width="1.4" fill="none" opacity=".8"/>
    <circle cx="56" cy="4" r="1.6" fill="currentColor"/><circle cx="56" cy="22" r="1.6" fill="currentColor"/></svg>`,
  line: `<svg class="orn" viewBox="0 0 112 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M16 13h80" stroke="currentColor" stroke-width="1"/><circle cx="56" cy="13" r="2.5" fill="currentColor"/></svg>`,
  /* Гранат — плод, который на узбекской свадьбе кладут на дастархан как пожелание
     достатка и большого потомства. Знак читается без подписи. */
  anor: `<svg class="orn" viewBox="0 0 112 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 13h34M76 13h34" stroke="currentColor" stroke-width="1" opacity=".5"/>
    <path d="M56 6c4.2 0 7 3.2 7 7.4S59.8 21 56 21s-7-3.4-7-7.6S51.8 6 56 6z" stroke="currentColor" stroke-width="1.2" fill="none"/>
    <path d="M56 6V2.5M56 2.5l-2.4 1.8M56 2.5l2.4 1.8" stroke="currentColor" stroke-width="1.1"/>
    <circle cx="53.4" cy="13" r="1.15" fill="currentColor"/><circle cx="58.6" cy="13" r="1.15" fill="currentColor"/>
    <circle cx="56" cy="17" r="1.15" fill="currentColor"/></svg>`,
  /* Мотив сюзане: восьмилепестковая розетка «палак», центральный элемент вышивки. */
  palak: `<svg class="orn" viewBox="0 0 112 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 13h36M72 13h36" stroke="currentColor" stroke-width="1" opacity=".45"/>
    <g stroke="currentColor" stroke-width="1.15" fill="none">
      <circle cx="56" cy="13" r="3.2"/>
      <path d="M56 4.2c2.2 2.6 2.2 4.6 0 5.6-2.2-1-2.2-3 0-5.6zM56 21.8c-2.2-2.6-2.2-4.6 0-5.6 2.2 1 2.2 3 0 5.6z"/>
      <path d="M47.2 13c2.6-2.2 4.6-2.2 5.6 0-1 2.2-3 2.2-5.6 0zM64.8 13c-2.6 2.2-4.6 2.2-5.6 0 1-2.2 3-2.2 5.6 0z"/>
      <path d="M49.8 6.8c3.1.9 4.3 2.5 3.4 4.5-2 .9-3.6-.3-3.4-4.5zM62.2 19.2c-3.1-.9-4.3-2.5-3.4-4.5 2-.9 3.6.3 3.4 4.5z"/>
      <path d="M62.2 6.8c-.9 3.1-2.5 4.3-4.5 3.4-.9-2 .3-3.6 4.5-3.4zM49.8 19.2c.9-3.1 2.5-4.3 4.5-3.4.9 2-.3 3.6-4.5 3.4z"/>
    </g></svg>`,
  /* Стрельчатая арка — портал медресе; самая узнаваемая форма местной архитектуры. */
  arch: `<svg class="orn" viewBox="0 0 112 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 13h32M74 13h32" stroke="currentColor" stroke-width="1" opacity=".5"/>
    <path d="M48 22V14c0-5.4 3.6-9.4 8-11.6 4.4 2.2 8 6.2 8 11.6v8" stroke="currentColor" stroke-width="1.25" fill="none"/>
    <path d="M48 22h16" stroke="currentColor" stroke-width="1.25"/></svg>`,
  star: `<svg class="orn" viewBox="0 0 112 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 13h36M68 13h36" stroke="currentColor" stroke-width="1" opacity=".5"/>
    <path d="M56 3.5l2.1 6.6h6.9l-5.6 4 2.2 6.6-5.6-4.1-5.6 4.1 2.2-6.6-5.6-4h6.9L56 3.5z" stroke="currentColor" stroke-width="1.1" fill="none"/></svg>`,
  slash: `<svg class="orn" viewBox="0 0 112 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M30 20L46 6M52 20L68 6M74 20L90 6" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>`,
};

/* Повторяющаяся полоса сюзане для рамки band — рисуется как background-image,
   поэтому лежит готовым data-URI, а не разметкой. */
const TOY_BAND = (color) =>
  "url(\"data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="14" viewBox="0 0 42 14">
      <g fill="none" stroke="${color}" stroke-width="1.1">
        <path d="M0 7h6M36 7h6"/>
        <circle cx="21" cy="7" r="3.1"/>
        <path d="M21 1.4c1.9 2 1.9 3.4 0 4.2-1.9-.8-1.9-2.2 0-4.2zM21 12.6c-1.9-2-1.9-3.4 0-4.2 1.9.8 1.9 2.2 0 4.2z"/>
        <path d="M15.4 7c2-1.9 3.4-1.9 4.2 0-.8 1.9-2.2 1.9-4.2 0zM26.6 7c-2 1.9-3.4 1.9-4.2 0 .8-1.9 2.2-1.9 4.2 0z"/>
        <circle cx="8.5" cy="7" r="1.1"/><circle cx="33.5" cy="7" r="1.1"/>
      </g></svg>`) + "\")";

const TOY_THEMES = {
  /* ── Бесплатные ─────────────────────────────────────────────────────────── */
  zar: {
    tier:"free", orn:TOY_ORN.diamond, frame:"double", names:"stack",
    label:{ uz_latin:"Zar · tilla", uz_cyrillic:"Зар · тилла", ru:"Zar · золото" },
    sub:{ uz_latin:"klassik, iliq", uz_cyrillic:"классик, илиқ", ru:"классика, тёплое" },
    c:["#FBF7F2","#B08D3F","#7D1F38"],
    vars:{
      "--bg":"#FBF7F2","--card":"#FFFFFF","--ink":"#2A211C","--muted":"#7B6A5D",
      "--accent":"#B08D3F","--deep":"#7D1F38","--line":"#E6DBCD",
      "--shadow":"0 10px 40px rgba(90,60,25,.07)","--radius":"20px",
      "--display":'"Cormorant Garamond",Georgia,serif',"--body":"Manrope,system-ui,sans-serif",
      "--name-weight":"500","--name-tracking":"0","--name-size":"1"}},

  atlas: {
    tier:"free", orn:TOY_ORN.ikat, frame:"corner", names:"stack",
    label:{ uz_latin:"Atlas · milliy", uz_cyrillic:"Атлас · миллий", ru:"Atlas · национальное" },
    sub:{ uz_latin:"milliy, iliq", uz_cyrillic:"миллий, илиқ", ru:"национальное, тёплое" },
    c:["#FDF6EC","#C25E2A","#1F4E5F"],
    vars:{
      "--bg":"#FDF6EC","--card":"#FFFDF9","--ink":"#3A2318","--muted":"#8A6A52",
      "--accent":"#C25E2A","--deep":"#1F4E5F","--line":"#EBD9C2",
      "--shadow":"0 10px 40px rgba(120,70,30,.09)","--radius":"14px",
      "--display":'"Cormorant Garamond",Georgia,serif',"--body":"Manrope,system-ui,sans-serif",
      "--name-weight":"600","--name-tracking":"-.01em","--name-size":"1"}},

  oq: {
    tier:"free", orn:TOY_ORN.line, frame:"none", names:"caps",
    label:{ uz_latin:"Oq · minimal", uz_cyrillic:"Оқ · минимал", ru:"Oq · минимал" },
    sub:{ uz_latin:"minimal, yorug'", uz_cyrillic:"минимал, ёруғ", ru:"минимал, светлое" },
    c:["#FFFFFF","#141414","#8A8A8A"],
    vars:{
      "--bg":"#FFFFFF","--card":"#FFFFFF","--ink":"#141414","--muted":"#8A8A8A",
      "--accent":"#141414","--deep":"#141414","--line":"#E8E8E8",
      "--shadow":"none","--radius":"4px",
      "--display":'"Tenor Sans",system-ui,sans-serif',"--body":'"Golos Text",system-ui,sans-serif',
      "--name-weight":"400","--name-tracking":".14em","--name-size":".72"}},

  kecha: {
    tier:"free", orn:TOY_ORN.rings, frame:"double", names:"stack",
    label:{ uz_latin:"Kecha · kechki", uz_cyrillic:"Кеча · кечки", ru:"Kecha · вечернее" },
    sub:{ uz_latin:"to'q, bayramona", uz_cyrillic:"тўқ, байрамона", ru:"тёмное, праздничное" },
    c:["#12141C","#D9B45B","#F2EDE4"],
    vars:{
      "--bg":"#12141C","--card":"#1A1D28","--ink":"#F2EDE4","--muted":"#9A93A8",
      "--accent":"#D9B45B","--deep":"#D9B45B","--line":"#2C3040",
      "--shadow":"0 14px 46px rgba(0,0,0,.45)","--radius":"20px",
      "--display":'"Cormorant Garamond",Georgia,serif',"--body":"Manrope,system-ui,sans-serif",
      "--name-weight":"500","--name-tracking":"0","--name-size":"1"}},

  /* ── Premium ────────────────────────────────────────────────────────────── */
  anor: {
    tier:"premium", orn:TOY_ORN.anor, frame:"double", names:"caps",
    label:{ uz_latin:"Anor · anor rang", uz_cyrillic:"Анор · анор ранг", ru:"Anor · гранат" },
    sub:{ uz_latin:"to'q qizil, tantanali", uz_cyrillic:"тўқ қизил, тантанали", ru:"гранатовое, торжественное" },
    c:["#5E1220","#E8C77A","#F6E9D8"],
    vars:{
      "--bg":"#5E1220","--card":"#6B1626","--ink":"#F6E9D8","--muted":"#D2A08C",
      "--accent":"#E8C77A","--deep":"#E8C77A","--line":"#7E2233",
      "--shadow":"0 16px 50px rgba(0,0,0,.32)","--radius":"6px",
      "--display":"Forum,Georgia,serif","--body":'"Golos Text",system-ui,sans-serif',
      "--name-weight":"400","--name-tracking":".1em","--name-size":".8"}},

  zumrad: {
    tier:"premium", orn:TOY_ORN.star, frame:"double", names:"stack",
    label:{ uz_latin:"Zumrad · zumrad", uz_cyrillic:"Зумрад · зумрад", ru:"Zumrad · изумруд" },
    sub:{ uz_latin:"to'q yashil, qimmatbaho", uz_cyrillic:"тўқ яшил, қимматбаҳо", ru:"изумрудное, богатое" },
    c:["#0F3129","#D4B872","#EFE7D6"],
    vars:{
      "--bg":"#0F3129","--card":"#143A31","--ink":"#EFE7D6","--muted":"#9CB5A8",
      "--accent":"#D4B872","--deep":"#D4B872","--line":"#1F4C41",
      "--shadow":"0 16px 50px rgba(0,0,0,.35)","--radius":"3px",
      "--display":'"Playfair Display",Georgia,serif',"--body":"Manrope,system-ui,sans-serif",
      "--name-weight":"500","--name-tracking":".01em","--name-size":"1"}},

  marmar: {
    tier:"premium", orn:TOY_ORN.arch, frame:"arch", names:"stack",
    label:{ uz_latin:"Marmar · marmar", uz_cyrillic:"Мармар · мармар", ru:"Marmar · мрамор" },
    sub:{ uz_latin:"salqin, vazmin", uz_cyrillic:"салқин, вазмин", ru:"прохладное, сдержанное" },
    c:["#F2F3F5","#7C8AA0","#2B3240"],
    vars:{
      "--bg":"#F2F3F5","--card":"#FFFFFF","--ink":"#2B3240","--muted":"#7C8AA0",
      "--accent":"#7C8AA0","--deep":"#2B3240","--line":"#DEE2E8",
      "--shadow":"0 12px 44px rgba(43,50,64,.10)","--radius":"2px",
      "--display":"Prata,Georgia,serif","--body":'"Golos Text",system-ui,sans-serif',
      "--name-weight":"400","--name-tracking":".02em","--name-size":".94"}},

  shafaq: {
    tier:"premium", orn:TOY_ORN.diamond, frame:"corner", names:"stack",
    label:{ uz_latin:"Shafaq · shafaq", uz_cyrillic:"Шафақ · шафақ", ru:"Shafaq · закат" },
    sub:{ uz_latin:"iliq pushti, yumshoq", uz_cyrillic:"илиқ пушти, юмшоқ", ru:"закатное, мягкое" },
    c:["#FBEDE4","#C0674F","#6B3A46"],
    vars:{
      "--bg":"#FBEDE4","--card":"#FFF7F1","--ink":"#4A2A2E","--muted":"#9C6F65",
      "--accent":"#C0674F","--deep":"#6B3A46","--line":"#F0D8CB",
      "--shadow":"0 12px 44px rgba(150,80,60,.10)","--radius":"22px",
      "--display":"Spectral,Georgia,serif","--body":"Manrope,system-ui,sans-serif",
      "--name-weight":"400","--name-tracking":"0","--name-size":"1"}},

  suzani: {
    tier:"premium", orn:TOY_ORN.palak, frame:"band", names:"stack",
    label:{ uz_latin:"Suzani · so'zana", uz_cyrillic:"Сузани · сўзана", ru:"Suzani · сюзане" },
    sub:{ uz_latin:"naqshli, an'anaviy", uz_cyrillic:"нақшли, анъанавий", ru:"с узором, традиционное" },
    c:["#FAF3E4","#A8232B","#1D4E6B"],
    vars:{
      "--bg":"#FAF3E4","--card":"#FFFCF4","--ink":"#2C1E18","--muted":"#8A6A55",
      "--accent":"#A8232B","--deep":"#1D4E6B","--line":"#E9D9BC",
      "--shadow":"0 12px 44px rgba(120,70,30,.10)","--radius":"8px",
      "--display":"Forum,Georgia,serif","--body":"Manrope,system-ui,sans-serif",
      "--name-weight":"400","--name-tracking":".03em","--name-size":".92"}},

  zamon: {
    tier:"premium", orn:TOY_ORN.slash, frame:"none", names:"rule",
    label:{ uz_latin:"Zamon · zamonaviy", uz_cyrillic:"Замон · замонавий", ru:"Zamon · современное" },
    sub:{ uz_latin:"qat'iy, yoshlarcha", uz_cyrillic:"қатъий, ёшларча", ru:"строгое, молодёжное" },
    c:["#111111","#E8FF5A","#F5F5F0"],
    vars:{
      "--bg":"#111111","--card":"#171717","--ink":"#F5F5F0","--muted":"#8E8E85",
      "--accent":"#E8FF5A","--deep":"#E8FF5A","--line":"#2A2A26",
      "--shadow":"none","--radius":"0px",
      "--display":"Unbounded,system-ui,sans-serif","--body":'"Golos Text",system-ui,sans-serif',
      "--name-weight":"300","--name-tracking":"-.02em","--name-size":".66"}},
};

const TOY_THEME_ORDER = ["zar","atlas","oq","kecha","anor","zumrad","marmar","shafaq","suzani","zamon"];

function toyTheme(id){ return TOY_THEMES[id] || TOY_THEMES.zar; }
function toyThemeList(){ return TOY_THEME_ORDER.map(id => ({ id, ...TOY_THEMES[id] })); }
// Тариф решает не «показать ли тему», а «можно ли её сохранить»: посмотреть
// платное оформление должен уметь и тот, кто ещё не платил — иначе он не поймёт,
// за что просят деньги.
function toyThemeAllowed(id, tier){
  return toyTheme(id).tier === "free" || tier === "premium" || tier === "full";
}
function toyApplyTheme(id, root){
  const t = toyTheme(id);
  const el = root || document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => el.style.setProperty(k, v));
  el.setAttribute("data-frame", t.frame);
  el.setAttribute("data-names", t.names);
  if (t.frame === "band") el.style.setProperty("--band", TOY_BAND(t.vars["--accent"]));
  return t;
}

if (typeof window !== "undefined") {
  window.TOY_FONTS = TOY_FONTS;
  window.TOY_THEMES = TOY_THEMES;
  window.TOY_THEME_ORDER = TOY_THEME_ORDER;
  window.toyTheme = toyTheme;
  window.toyThemeList = toyThemeList;
  window.toyThemeAllowed = toyThemeAllowed;
  window.toyApplyTheme = toyApplyTheme;
}
