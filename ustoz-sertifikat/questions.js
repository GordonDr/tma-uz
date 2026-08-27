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
  "ona-tili":   "Ona tili va o'qish savodxonligi",
  "matematika": "Matematika",
  "tabiiy":     "Tabiiy fanlar",
  "tarbiya":    "Tarbiya",
  "texnologiya":"Texnologiya",
  "metodika":   "O'qitish metodikasi",
};

const QUESTIONS = [
  {
    id: "q01", blok: "ona-tili",
    savol: "«Ko'k» so'zi qaysi gapda ot so'z turkumi vazifasida kelgan?",
    javoblar: [
      "Akam ko'k ko'ylak kiydi.",
      "Ko'k choy tanaga foydali.",
      "Samolyot ko'kka ko'tarildi.",
      "Devor ko'k rangga bo'yaldi.",
    ],
    togri: 2,
    izoh: "«Qanday?» savoliga javob berganda «ko'k» sifat bo'ladi: ko'k ko'ylak, ko'k choy, ko'k rang. «Samolyot ko'kka ko'tarildi» gapida esa u «osmon» ma'nosini bildiradi, «qayerga?» savoliga javob beradi va jo'nalish kelishigi qo'shimchasini oladi — demak, ot. So'z turkumi so'zning o'zida emas, uning gapdagi ma'nosi va vazifasida aniqlanadi.",
  },
  {
    id: "q02", blok: "ona-tili",
    savol: "«Shoshildi» so'zida nechta harf va nechta tovush bor?",
    javoblar: [
      "9 harf, 7 tovush",
      "9 harf, 9 tovush",
      "7 harf, 7 tovush",
      "8 harf, 7 tovush",
    ],
    togri: 0,
    izoh: "«Sh» — ikki harf bilan yoziladigan bitta tovush. So'zda s-h-o-s-h-i-l-d-i — 9 ta harf, tovushlar esa sh, o, sh, i, l, d, i — 7 ta. «9 harf, 9 tovush» degan javob eng ko'p uchraydigan xato: unda sh, ch, ng birikmalari hisobga olinmaydi.",
  },
  {
    id: "q03", blok: "ona-tili",
    savol: "Quyidagi so'zlardan qaysi birini satrdan satrga ko'chirib bo'lmaydi?",
    javoblar: ["daftar", "maktab", "o'qituvchi", "aka"],
    togri: 3,
    izoh: "Ko'chirishda na eski satrda, na yangi satrda bitta harf yolg'iz qolmasligi kerak. «Aka» so'zi a-ka tarzida bo'g'inlanadi, ko'chirilsa «a» yolg'iz qoladi — shuning uchun bu so'z ko'chirilmaydi. Qolgan uchtasi qoidaga to'g'ri keladi: daf-tar, mak-tab, o'qi-tuvchi.",
  },
  {
    id: "q04", blok: "ona-tili",
    savol: "«Dilnoza kitobni singlisiga berdi» gapida «singlisiga» so'zi qaysi kelishikda?",
    javoblar: [
      "Tushum kelishigi",
      "Jo'nalish kelishigi",
      "Qaratqich kelishigi",
      "O'rin-payt kelishigi",
    ],
    togri: 1,
    izoh: "Jo'nalish kelishigi -ga (-ka, -qa) qo'shimchasi bilan yasaladi va «kimga? nimaga? qayerga?» savollariga javob beradi — «singlisiga» aynan shunday. Tushum kelishigi -ni qo'shimchasini oladi, bu gapda tushum kelishigidagi so'z «kitobni»; o'rin-payt kelishigi esa -da qo'shimchasi bilan keladi.",
  },
  {
    id: "q05", blok: "ona-tili",
    savol: "«Kitoblarimizdan» so'zining o'zagi (asosi) qaysi?",
    javoblar: ["kitob", "kitoblar", "kitobla", "kitoblarimiz"],
    togri: 0,
    izoh: "O'zak — so'zning ma'noli, boshqa bo'linmaydigan qismi: kitob. Undan keyingilari qo'shimchalar: -lar (ko'plik), -imiz (egalik), -dan (chiqish kelishigi). «Kitoblar» o'zak bo'la olmaydi, chunki unda allaqachon ko'plik qo'shimchasi bor.",
  },

  {
    id: "q06", blok: "matematika",
    savol: "24 − 6 × 3 + 8 : 2 ifodaning qiymati nechaga teng?",
    javoblar: ["31", "2", "14", "10"],
    togri: 3,
    izoh: "Avval ko'paytirish va bo'lish, keyin qo'shish va ayirish bajariladi: 6×3=18, 8:2=4, so'ng 24−18+4=10. «31» — amallarni chapdan o'ngga ketma-ket bajarganda chiqadi (24−6=18, ×3=54, +8=62, :2=31) va bu eng keng tarqalgan xato. «2» — qo'shishni ayirishdan oldin bajarganda: 24−(18+4).",
  },
  {
    id: "q07", blok: "matematika",
    savol: "To'g'ri to'rtburchakning tomonlari 8 sm va 3 sm. Uning perimetri nechaga teng?",
    javoblar: ["24 sm", "22 sm", "11 sm", "48 sm"],
    togri: 1,
    izoh: "Perimetr — barcha tomonlar uzunligining yig'indisi: (8+3)×2 = 22 sm. «24» — bu yuza (8×3=24 sm²): perimetr bilan yuzani almashtirish boshlang'ich sinfdagi eng tipik xato, uni son emas, o'lchov birligi ham ochib beradi (sm va sm²). «11» — faqat (a+b), ikkiga ko'paytirish unutilgan.",
  },
  {
    id: "q08", blok: "matematika",
    savol: "Anvarda 24 ta, Bobirda 6 ta daftar bor. Anvarda Bobirdan necha marta ko'p daftar bor?",
    javoblar: ["18 marta", "4 marta", "30 marta", "144 marta"],
    togri: 1,
    izoh: "«Necha marta ko'p?» savoliga bo'lish amali javob beradi: 24 : 6 = 4. «18» — «nechta ko'p?» savolining javobi, ya'ni ayirma (24−6). Bu ikki savolni chalkashtirish — matematikadagi eng ko'p uchraydigan tushunish xatosi, chunki bolalar savolni emas, sonlarni ko'radi.",
  },
  {
    id: "q09", blok: "matematika",
    savol: "507 sonining o'nlar xonasida qaysi raqam turibdi?",
    javoblar: ["5", "7", "50", "0"],
    togri: 3,
    izoh: "Uch xonali sonda o'ngdan chapga: birlar (7), o'nlar (0), yuzlar (5). 507 = 5 ta yuzlik, 0 ta o'nlik, 7 ta birlik. Nol turgan xonani «yo'q» deb hisoblab, o'nlar o'rniga yuzlardagi 5 ni aytish — xonalar bilan ishlashdagi tipik xato.",
  },
  {
    id: "q10", blok: "matematika",
    savol: "2 m 5 sm necha santimetrga teng?",
    javoblar: ["25 sm", "250 sm", "205 sm", "2005 sm"],
    togri: 2,
    izoh: "1 m = 100 sm, demak 2 m = 200 sm; 200 + 5 = 205 sm. «25» — raqamlarni shunchaki yonma-yon yozish natijasi. «250» esa 2 m 50 sm ga to'g'ri keladi: bunda o'quvchi birliklarni emas, o'nliklarni qo'shib yuboradi.",
  },

  {
    id: "q11", blok: "tabiiy",
    savol: "Yomg'irdan keyin hovlidagi ko'lmak quyoshda asta-sekin yo'q bo'ldi. Bu qanday hodisa?",
    javoblar: ["Muzlash", "Bug'lanish", "Erish", "Kondensatsiya"],
    togri: 1,
    izoh: "Isishdan suv suyuq holatdan gaz holatiga — suv bug'iga aylanadi, bu bug'lanish. Erish qattiq jismning suyuqlikka aylanishi (muz → suv), muzlash uning teskarisi, kondensatsiya esa bug'ning yana suvga aylanishi (deraza oynasidagi tomchilar).",
  },
  {
    id: "q12", blok: "tabiiy",
    savol: "O'simlikning ildizi qanday vazifani bajaradi?",
    javoblar: [
      "Yorug'likda oziq modda hosil qiladi",
      "Urug' va meva hosil qiladi",
      "Suvni bug'latib, o'simlikni sovutadi",
      "Tuproqdan suv va mineral moddalarni shimib oladi",
    ],
    togri: 3,
    izoh: "Ildiz o'simlikni tuproqda mahkam ushlab turadi va undan suv bilan erigan mineral moddalarni shimib oladi. Yorug'likda oziq modda hosil qilish — bargning vazifasi (fotosintez), urug' va meva hosil qilish — gulning, suvni bug'latish esa yana bargning ishi.",
  },
  {
    id: "q13", blok: "tabiiy",
    savol: "Quyidagi hayvonlardan qaysi biri sut emizuvchilarga kiradi?",
    javoblar: ["Ko'rshapalak", "Timsoh", "Qurbaqa", "Tuyaqush"],
    togri: 0,
    izoh: "Ko'rshapalak ucha oladi, lekin qush emas: u bolalaydi va bolasini sut bilan boqadi — sut emizuvchi. Timsoh — sudralib yuruvchi, qurbaqa — suvda va quruqlikda yashovchi, tuyaqush — uchmaydigan qush. Demak, uchish yoki uchmaslik sinfni belgilamaydi.",
  },

  {
    id: "q14", blok: "tarbiya",
    savol: "O'zbekiston Respublikasi Davlat bayrog'idagi oq rang nimani anglatadi?",
    javoblar: [
      "Tabiat va yangilanishni",
      "Osmon va suvni",
      "Tinchlik va poklikni",
      "Hayotiy kuchni",
    ],
    togri: 2,
    izoh: "Bayroqdagi oq yo'l — tinchlik va poklik ramzi. Ko'k rang osmon va suvni, yashil rang tabiat va yangilanishni bildiradi, ingichka qizil yo'llar esa tirik vujuddagi hayotiy kuch ramzi. Boshlang'ich sinfda bu mavzu davlat ramzlari bo'limida o'rganiladi.",
  },
  {
    id: "q15", blok: "tarbiya",
    savol: "O'zbekiston Respublikasi Konstitutsiyasi kuni qachon nishonlanadi?",
    javoblar: ["1-sentyabr", "21-mart", "14-yanvar", "8-dekabr"],
    togri: 3,
    izoh: "Konstitutsiya 1992-yil 8-dekabrda qabul qilingan, shu sana Konstitutsiya kuni sifatida nishonlanadi. 1-sentyabr — Mustaqillik kuni, 21-mart — Navro'z, 14-yanvar — Vatan himoyachilari kuni. To'rttasi ham bayram, lekin faqat bittasi Konstitutsiyaga tegishli.",
  },

  {
    id: "q16", blok: "texnologiya",
    savol: "Texnologiya darsida o'quvchi qaychini sinfdoshiga qanday uzatishi kerak?",
    javoblar: [
      "Yopiq holda, halqalarini oldinga qaratib",
      "Uchini oldinga qaratib",
      "Ochiq holda, o'rtasidan ushlab",
      "Stol ustiga qo'yib, o'zi olsin deb",
    ],
    togri: 0,
    izoh: "Xavfsizlik qoidasiga ko'ra qaychi yopilgan holda, halqalari (dastalari) oldinga qaratib uzatiladi — shunda o'tkir uch uzatayotgan odam tomonda qoladi va olayotgan bola darhol dastadan ushlaydi. Uchini oldinga qaratish yoki ochiq holda uzatish — darsdagi jarohatning eng keng tarqalgan sababi.",
  },
  {
    id: "q17", blok: "texnologiya",
    savol: "Qog'ozdan kapalak kabi simmetrik shaklni qirqishning eng to'g'ri usuli qaysi?",
    javoblar: [
      "Shaklni to'liq chizib, ikki tomonini alohida qirqish",
      "Qog'ozni o'rtasidan buklab, shaklning yarmini chizib qirqish",
      "Andozasiz, ko'z bilan chamalab qirqish",
      "Avval qirqib, keyin o'lchab to'g'rilash",
    ],
    togri: 1,
    izoh: "Buklangan qog'ozning bukilish chizig'i simmetriya o'qi bo'lib xizmat qiladi: yarmi qirqilgach, ochilganda ikki tomon aynan bir xil chiqadi. Ikki tomonni alohida chizib qirqishda qo'l harakati bir xil bo'lmaydi va shakl nosimmetrik chiqadi — bu vazifaning asosiy maqsadini yo'qqa chiqaradi.",
  },

  {
    id: "q18", blok: "metodika",
    savol: "1-sinfda savod o'rgatish hozirgi dasturga ko'ra qaysi metod asosida olib boriladi?",
    javoblar: [
      "Butun so'z metodi",
      "Harfiy metod",
      "Tovush analitik-sintetik metodi",
      "Bo'g'in metodi",
    ],
    togri: 2,
    izoh: "Savod o'rgatish tovushdan harfga boradi: so'z bo'g'inlarga, bo'g'in tovushlarga ajratiladi (analiz), so'ngra tovushlardan bo'g'in va so'z tuziladi (sintez). Harfiy metod harf nomini yodlatadi va o'qishni «be-a — ba» tarzida buzadi; butun so'z metodi so'zni yaxlit yodlatadi, natijada bola notanish so'zni mustaqil o'qiy olmaydi.",
  },
  {
    id: "q19", blok: "metodika",
    savol: "O'quvchi 42 − 17 misolini yechib, javobga 35 deb yozdi. Bu qanday xato?",
    javoblar: [
      "Ko'paytirish jadvalini bilmaydi",
      "Sonlarni bir-birining tagiga noto'g'ri yozgan",
      "Har bir xonada kichik raqamni kattadan ayirgan: o'nlikdan olishni bilmaydi",
      "Shunchaki e'tiborsizlik, tasodifiy xato",
    ],
    togri: 2,
    izoh: "To'g'ri javob 25. O'quvchi birlar xonasida 2 dan 7 ni ayira olmagani uchun teskari ayirgan: 7−2=5, o'nlarda esa 4−1=3, natijada 35 chiqqan. Bu tasodifiy emas, tizimli xato — qo'shni xonadan o'nlik olish usuli o'zlashtirilmagan. Shuning uchun uni ko'proq misol yechtirish bilan emas, son tarkibi va o'nlik modeliga qaytish bilan tuzatiladi.",
  },
  {
    id: "q20", blok: "metodika",
    savol: "2-sinfda ko'p o'quvchining yozuvi qiyshiq, harflar satrga sig'mayapti. O'qituvchi birinchi navbatda nima qiladi?",
    javoblar: [
      "O'tirish holati, daftarning qiyaligi va ruchkani ushlashini tekshiradi",
      "Har kuni bir betdan husnixat yozdiradi",
      "Doskada namuna ko'rsatib, tez sur'atda yozdiradi",
      "Xato yozilgan satrlarni o'chirtirib, qaytadan yozdiradi",
    ],
    togri: 0,
    izoh: "Yozuv ko'nikmasi avvalo gigiyenik shart-sharoitga bog'liq: gavda holati, daftarning stol ustida qiya joylashuvi va ruchkani uch barmoq bilan ushlash. Sababi tuzatilmasa, ko'p yozdirish ham, qayta yozdirish ham foyda bermaydi — bola noto'g'ri harakatni takrorlab, uni avtomatlashtirib qo'yadi.",
  },
];
