// Двадцать вопросов демо-прогона. Это главная ценность страницы: калькулятор
// показывает, СКОЛЬКО стоит сертификат, а тест показывает, ГОТОВ ли человек.
//
// Три правила, по которым они написаны, — и почему:
//
// 1. Вопрос, на который можно ответить, не зная предмета, — брак. Поэтому здесь
//    нет «выбери педагогически красивый вариант»: почти в каждом задании нужно
//    посчитать, разобрать слово по составу или знать конкретную норму.
// 2. Дистракторы — не выдумка, а типовые ошибки: перепутать периметр с площадью,
//    приравнять число букв к числу звуков, ответить на «нечта ко'п» вместо
//    «неча марта ко'п». По разбору такого дистрактора учитель узнаёт СВОЮ ошибку.
// 3. Верный ответ распределён по позициям ровно 5/5/5/5. В черновике из
//    _otlozheno/ustoz-sertifikat верный вариант стоял вторым во всех двадцати
//    вопросах — такой тест проходится без чтения условия и меряет не знания.
//
// Статус контента: это СОБСТВЕННЫЕ вопросы по программе начальной школы, а не
// выдержки из экзамена — спецификация экзамена по ПКМ-411 на 26.08.2026 не
// опубликована (см. README). Перед платной версией банк вычитывает методист
// начальных классов; в бесплатном демо об этом сказано на странице прямым текстом.
//
// Язык — узбекская латиница: экзамен сдаётся на языке обучения, и предметный блок
// (ona tili) для школы с узбекским языком обучения переводом не делается.

const BLOKLAR = {
  "ona-tili":   "Ona tili va oʻqish savodxonligi",
  "matematika": "Matematika",
  "tabiiy":     "Tabiiy fanlar",
  "tarbiya":    "Tarbiya",
  "texnologiya":"Texnologiya",
  "metodika":   "Oʻqitish metodikasi",
};

const QUESTIONS = [
  {
    id: "q01", blok: "ona-tili",
    savol: "«Koʻk» soʻzi qaysi gapda ot soʻz turkumi vazifasida kelgan?",
    javoblar: [
      "Akam koʻk koʻylak kiydi.",
      "Koʻk choy tanaga foydali.",
      "Samolyot koʻkka koʻtarildi.",
      "Devor koʻk rangga boʻyaldi.",
    ],
    togri: 2,
    izoh: "«Qanday?» savoliga javob berganda «koʻk» sifat boʻladi: koʻk koʻylak, koʻk choy, koʻk rang. «Samolyot koʻkka koʻtarildi» gapida esa u «osmon» maʼnosini bildiradi, «qayerga?» savoliga javob beradi va joʻnalish kelishigi qoʻshimchasini oladi — demak, ot. Soʻz turkumi soʻzning oʻzida emas, uning gapdagi maʼnosi va vazifasida aniqlanadi.",
  },
  {
    id: "q02", blok: "ona-tili",
    savol: "«Shoshildi» soʻzida nechta harf va nechta tovush bor?",
    javoblar: [
      "9 harf, 7 tovush",
      "9 harf, 9 tovush",
      "7 harf, 7 tovush",
      "8 harf, 7 tovush",
    ],
    togri: 0,
    izoh: "«Sh» — ikki harf bilan yoziladigan bitta tovush. Soʻzda s-h-o-s-h-i-l-d-i — 9 ta harf, tovushlar esa sh, o, sh, i, l, d, i — 7 ta. «9 harf, 9 tovush» degan javob eng koʻp uchraydigan xato: unda sh, ch, ng birikmalari hisobga olinmaydi.",
  },
  {
    id: "q03", blok: "ona-tili",
    savol: "Quyidagi soʻzlardan qaysi birini satrdan satrga koʻchirib boʻlmaydi?",
    javoblar: ["daftar", "maktab", "oʻqituvchi", "aka"],
    togri: 3,
    izoh: "Koʻchirishda na eski satrda, na yangi satrda bitta harf yolgʻiz qolmasligi kerak. «Aka» soʻzi a-ka tarzida boʻgʻinlanadi, koʻchirilsa «a» yolgʻiz qoladi — shuning uchun bu soʻz koʻchirilmaydi. Qolgan uchtasi qoidaga toʻgʻri keladi: daf-tar, mak-tab, oʻqi-tuvchi.",
  },
  {
    id: "q04", blok: "ona-tili",
    savol: "«Dilnoza kitobni singlisiga berdi» gapida «singlisiga» soʻzi qaysi kelishikda?",
    javoblar: [
      "Tushum kelishigi",
      "Joʻnalish kelishigi",
      "Qaratqich kelishigi",
      "Oʻrin-payt kelishigi",
    ],
    togri: 1,
    izoh: "Joʻnalish kelishigi -ga (-ka, -qa) qoʻshimchasi bilan yasaladi va «kimga? nimaga? qayerga?» savollariga javob beradi — «singlisiga» aynan shunday. Tushum kelishigi -ni qoʻshimchasini oladi, bu gapda tushum kelishigidagi soʻz «kitobni»; oʻrin-payt kelishigi esa -da qoʻshimchasi bilan keladi.",
  },
  {
    id: "q05", blok: "ona-tili",
    savol: "«Kitoblarimizdan» soʻzining oʻzagi (asosi) qaysi?",
    javoblar: ["kitob", "kitoblar", "kitobla", "kitoblarimiz"],
    togri: 0,
    izoh: "Oʻzak — soʻzning maʼnoli, boshqa boʻlinmaydigan qismi: kitob. Undan keyingilari qoʻshimchalar: -lar (koʻplik), -imiz (egalik), -dan (chiqish kelishigi). «Kitoblar» oʻzak boʻla olmaydi, chunki unda allaqachon koʻplik qoʻshimchasi bor.",
  },

  {
    id: "q06", blok: "matematika",
    savol: "24 − 6 × 3 + 8 : 2 ifodaning qiymati nechaga teng?",
    javoblar: ["31", "2", "14", "10"],
    togri: 3,
    izoh: "Avval koʻpaytirish va boʻlish, keyin qoʻshish va ayirish bajariladi: 6×3=18, 8:2=4, soʻng 24−18+4=10. «31» — amallarni chapdan oʻngga ketma-ket bajarganda chiqadi (24−6=18, ×3=54, +8=62, :2=31) va bu eng keng tarqalgan xato. «2» — qoʻshishni ayirishdan oldin bajarganda: 24−(18+4).",
  },
  {
    id: "q07", blok: "matematika",
    savol: "Toʻgʻri toʻrtburchakning tomonlari 8 sm va 3 sm. Uning perimetri nechaga teng?",
    javoblar: ["24 sm", "22 sm", "11 sm", "48 sm"],
    togri: 1,
    izoh: "Perimetr — barcha tomonlar uzunligining yigʻindisi: (8+3)×2 = 22 sm. «24» — bu yuza (8×3=24 sm²): perimetr bilan yuzani almashtirish boshlangʻich sinfdagi eng tipik xato, uni son emas, oʻlchov birligi ham ochib beradi (sm va sm²). «11» — faqat (a+b), ikkiga koʻpaytirish unutilgan.",
  },
  {
    id: "q08", blok: "matematika",
    savol: "Anvarda 24 ta, Bobirda 6 ta daftar bor. Anvarda Bobirdan necha marta koʻp daftar bor?",
    javoblar: ["18 marta", "4 marta", "30 marta", "144 marta"],
    togri: 1,
    izoh: "«Necha marta koʻp?» savoliga boʻlish amali javob beradi: 24 : 6 = 4. «18» — «nechta koʻp?» savolining javobi, yaʼni ayirma (24−6). Bu ikki savolni chalkashtirish — matematikadagi eng koʻp uchraydigan tushunish xatosi, chunki bolalar savolni emas, sonlarni koʻradi.",
  },
  {
    id: "q09", blok: "matematika",
    savol: "507 sonining oʻnlar xonasida qaysi raqam turibdi?",
    javoblar: ["5", "7", "50", "0"],
    togri: 3,
    izoh: "Uch xonali sonda oʻngdan chapga: birlar (7), oʻnlar (0), yuzlar (5). 507 = 5 ta yuzlik, 0 ta oʻnlik, 7 ta birlik. Nol turgan xonani «yoʻq» deb hisoblab, oʻnlar oʻrniga yuzlardagi 5 ni aytish — xonalar bilan ishlashdagi tipik xato.",
  },
  {
    id: "q10", blok: "matematika",
    savol: "2 m 5 sm necha santimetrga teng?",
    javoblar: ["25 sm", "250 sm", "205 sm", "2005 sm"],
    togri: 2,
    izoh: "1 m = 100 sm, demak 2 m = 200 sm; 200 + 5 = 205 sm. «25» — raqamlarni shunchaki yonma-yon yozish natijasi. «250» esa 2 m 50 sm ga toʻgʻri keladi: bunda oʻquvchi birliklarni emas, oʻnliklarni qoʻshib yuboradi.",
  },

  {
    id: "q11", blok: "tabiiy",
    savol: "Yomgʻirdan keyin hovlidagi koʻlmak quyoshda asta-sekin yoʻq boʻldi. Bu qanday hodisa?",
    javoblar: ["Muzlash", "Bugʻlanish", "Erish", "Kondensatsiya"],
    togri: 1,
    izoh: "Isishdan suv suyuq holatdan gaz holatiga — suv bugʻiga aylanadi, bu bugʻlanish. Erish qattiq jismning suyuqlikka aylanishi (muz → suv), muzlash uning teskarisi, kondensatsiya esa bugʻning yana suvga aylanishi (deraza oynasidagi tomchilar).",
  },
  {
    id: "q12", blok: "tabiiy",
    savol: "Oʻsimlikning ildizi qanday vazifani bajaradi?",
    javoblar: [
      "Yorugʻlikda oziq modda hosil qiladi",
      "Urug' va meva hosil qiladi",
      "Suvni bugʻlatib, oʻsimlikni sovutadi",
      "Tuproqdan suv va mineral moddalarni shimib oladi",
    ],
    togri: 3,
    izoh: "Ildiz oʻsimlikni tuproqda mahkam ushlab turadi va undan suv bilan erigan mineral moddalarni shimib oladi. Yorugʻlikda oziq modda hosil qilish — bargning vazifasi (fotosintez), urug' va meva hosil qilish — gulning, suvni bugʻlatish esa yana bargning ishi.",
  },
  {
    id: "q13", blok: "tabiiy",
    savol: "Quyidagi hayvonlardan qaysi biri sut emizuvchilarga kiradi?",
    javoblar: ["Koʻrshapalak", "Timsoh", "Qurbaqa", "Tuyaqush"],
    togri: 0,
    izoh: "Koʻrshapalak ucha oladi, lekin qush emas: u bolalaydi va bolasini sut bilan boqadi — sut emizuvchi. Timsoh — sudralib yuruvchi, qurbaqa — suvda va quruqlikda yashovchi, tuyaqush — uchmaydigan qush. Demak, uchish yoki uchmaslik sinfni belgilamaydi.",
  },

  {
    id: "q14", blok: "tarbiya",
    savol: "Oʻzbekiston Respublikasi Davlat bayrogʻidagi oq rang nimani anglatadi?",
    javoblar: [
      "Tabiat va yangilanishni",
      "Osmon va suvni",
      "Tinchlik va poklikni",
      "Hayotiy kuchni",
    ],
    togri: 2,
    izoh: "Bayroqdagi oq yoʻl — tinchlik va poklik ramzi. Koʻk rang osmon va suvni, yashil rang tabiat va yangilanishni bildiradi, ingichka qizil yoʻllar esa tirik vujuddagi hayotiy kuch ramzi. Boshlangʻich sinfda bu mavzu davlat ramzlari boʻlimida oʻrganiladi.",
  },
  {
    id: "q15", blok: "tarbiya",
    savol: "Oʻzbekiston Respublikasi Konstitutsiyasi kuni qachon nishonlanadi?",
    javoblar: ["1-sentyabr", "21-mart", "14-yanvar", "8-dekabr"],
    togri: 3,
    izoh: "Konstitutsiya 1992-yil 8-dekabrda qabul qilingan, shu sana Konstitutsiya kuni sifatida nishonlanadi. 1-sentyabr — Mustaqillik kuni, 21-mart — Navroʻz, 14-yanvar — Vatan himoyachilari kuni. Toʻrttasi ham bayram, lekin faqat bittasi Konstitutsiyaga tegishli.",
  },

  {
    id: "q16", blok: "texnologiya",
    savol: "Texnologiya darsida oʻquvchi qaychini sinfdoshiga qanday uzatishi kerak?",
    javoblar: [
      "Yopiq holda, halqalarini oldinga qaratib",
      "Uchini oldinga qaratib",
      "Ochiq holda, oʻrtasidan ushlab",
      "Stol ustiga qoʻyib, oʻzi olsin deb",
    ],
    togri: 0,
    izoh: "Xavfsizlik qoidasiga koʻra qaychi yopilgan holda, halqalari (dastalari) oldinga qaratib uzatiladi — shunda oʻtkir uch uzatayotgan odam tomonda qoladi va olayotgan bola darhol dastadan ushlaydi. Uchini oldinga qaratish yoki ochiq holda uzatish — darsdagi jarohatning eng keng tarqalgan sababi.",
  },
  {
    id: "q17", blok: "texnologiya",
    savol: "Qogʻozdan kapalak kabi simmetrik shaklni qirqishning eng toʻgʻri usuli qaysi?",
    javoblar: [
      "Shaklni toʻliq chizib, ikki tomonini alohida qirqish",
      "Qogʻozni oʻrtasidan buklab, shaklning yarmini chizib qirqish",
      "Andozasiz, koʻz bilan chamalab qirqish",
      "Avval qirqib, keyin oʻlchab toʻgʻrilash",
    ],
    togri: 1,
    izoh: "Buklangan qogʻozning bukilish chizigʻi simmetriya oʻqi boʻlib xizmat qiladi: yarmi qirqilgach, ochilganda ikki tomon aynan bir xil chiqadi. Ikki tomonni alohida chizib qirqishda qoʻl harakati bir xil boʻlmaydi va shakl nosimmetrik chiqadi — bu vazifaning asosiy maqsadini yoʻqqa chiqaradi.",
  },

  {
    id: "q18", blok: "metodika",
    savol: "1-sinfda savod oʻrgatish hozirgi dasturga koʻra qaysi metod asosida olib boriladi?",
    javoblar: [
      "Butun soʻz metodi",
      "Harfiy metod",
      "Tovush analitik-sintetik metodi",
      "Boʻgʻin metodi",
    ],
    togri: 2,
    izoh: "Savod oʻrgatish tovushdan harfga boradi: soʻz boʻgʻinlarga, boʻgʻin tovushlarga ajratiladi (analiz), soʻngra tovushlardan boʻgʻin va soʻz tuziladi (sintez). Harfiy metod harf nomini yodlatadi va oʻqishni «be-a — ba» tarzida buzadi; butun soʻz metodi soʻzni yaxlit yodlatadi, natijada bola notanish soʻzni mustaqil oʻqiy olmaydi.",
  },
  {
    id: "q19", blok: "metodika",
    savol: "Oʻquvchi 42 − 17 misolini yechib, javobga 35 deb yozdi. Bu qanday xato?",
    javoblar: [
      "Koʻpaytirish jadvalini bilmaydi",
      "Sonlarni bir-birining tagiga notoʻgʻri yozgan",
      "Har bir xonada kichik raqamni kattadan ayirgan: oʻnlikdan olishni bilmaydi",
      "Shunchaki eʼtiborsizlik, tasodifiy xato",
    ],
    togri: 2,
    izoh: "Toʻgʻri javob 25. Oʻquvchi birlar xonasida 2 dan 7 ni ayira olmagani uchun teskari ayirgan: 7−2=5, oʻnlarda esa 4−1=3, natijada 35 chiqqan. Bu tasodifiy emas, tizimli xato — qoʻshni xonadan oʻnlik olish usuli oʻzlashtirilmagan. Shuning uchun uni koʻproq misol yechtirish bilan emas, son tarkibi va oʻnlik modeliga qaytish bilan tuzatiladi.",
  },
  {
    id: "q20", blok: "metodika",
    savol: "2-sinfda koʻp oʻquvchining yozuvi qiyshiq, harflar satrga sigʻmayapti. Oʻqituvchi birinchi navbatda nima qiladi?",
    javoblar: [
      "Oʻtirish holati, daftarning qiyaligi va ruchkani ushlashini tekshiradi",
      "Har kuni bir betdan husnixat yozdiradi",
      "Doskada namuna koʻrsatib, tez surʼatda yozdiradi",
      "Xato yozilgan satrlarni oʻchirtirib, qaytadan yozdiradi",
    ],
    togri: 0,
    izoh: "Yozuv koʻnikmasi avvalo gigiyenik shart-sharoitga bogʻliq: gavda holati, daftarning stol ustida qiya joylashuvi va ruchkani uch barmoq bilan ushlash. Sababi tuzatilmasa, koʻp yozdirish ham, qayta yozdirish ham foyda bermaydi — bola notoʻgʻri harakatni takrorlab, uni avtomatlashtirib qoʻyadi.",
  },
];
