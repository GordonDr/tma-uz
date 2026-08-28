// План — то, за что берут деньги. Поэтому он лежит ОТДЕЛЬНЫМ файлом, а не
// внутри index.html: его теперь строят две страницы — приложение (index.html)
// и образец до денег (obrazec.html). Если бы образец считал план своим кодом,
// в продукте было бы два ответа на вопрос «что человек получит за 99 000»,
// и разошлись бы они молча, при первой же правке одной из страниц.
// Здесь лежит только счёт: ни одного обращения к DOM, ни одного знания
// о тарифе. Кто спрашивает дату и где рисуется таблица — дело страницы.
//
// Имена блоков (BLOKLAR) сюда НЕ переехали: они живут в questions.js вместе
// с самими вопросами, и ключи приходят в rejaQur() параметром. Иначе список
// блоков стоял бы в двух файлах — та же ошибка, от которой этот файл и заведён.

var MAVZULAR = {
  "ona-tili": ["Tovush va harf: sh, ch, ng", "Soʻz turkumlari", "Boʻgʻin va satrdan satrga koʻchirish",
               "Kelishiklar", "Soʻz tarkibi: oʻzak va qoʻshimcha", "Oʻqish savodxonligi: matn boʻyicha savol"],
  "matematika": ["Ogʻzaki hisob va amallar tartibi", "Perimetr va yuza", "Ulush va qism",
                 "Masala: «nechta koʻp» va «necha marta koʻp»", "Uzunlik, massa, vaqt birliklari",
                 "Katakli qogʻozda geometriya"],
  "tabiiy": ["Tirik va notirik tabiat", "Suvning holatlari", "Oʻsimlik qismlari va vazifasi",
             "Ob-havo va fasllar", "Inson organizmi va salomatlik", "Tabiatni muhofaza qilish"],
  "tarbiya": ["Oila va mahalla", "Mehnat va kasblar", "Yoʻl harakati qoidalari",
              "Muomala odobi", "Vatan va bayramlar", "Sogʻlom turmush tarzi"],
  "texnologiya": ["Materiallar va ularning xossalari", "Oʻlchash va belgilash", "Qogʻoz bilan ishlash",
                  "Xavfsizlik qoidalari", "Ish oʻrnini tashkil qilish", "Loyiha ishi bosqichlari"],
  "metodika": ["Dars maqsadini qoʻyish", "Baholash: joriy, oraliq, yakuniy", "Differensial yondashuv",
               "Juftlik va guruhda ishlash", "Savol berish texnikasi", "Uy vazifasi va qayta aloqa"],
};
var HAFTA = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
var HAFTA_Q = ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"];
// Короткие имена блоков — только для клетки календаря на печатном листе.
// Полные имена остаются на экране и в легенде тем: сокращение нужно там,
// где ширина клетки 24 мм, и нигде больше.
var QISQA = {
  "ona-tili": "Ona tili", "matematika": "Matem.", "tabiiy": "Tabiiy",
  "tarbiya": "Tarbiya", "texnologiya": "Texnol.", "metodika": "Metodika",
};
// В дне плана стоит ВРЕМЯ, а не количество вопросов. Раньше стояло «12 savol»,
// и на плане в 30 дней это складывалось в «savol jami» под три сотни — при банке
// в 20 вопросов и невыполненном U-31. То есть план обещал контент, которого нет.
// Время план распределяет по-настоящему: это ровно то, чем он и является.
var DAQIQA = 25;            // рабочий день плана: 25 минут занятия
var DAQIQA_DAM = 15;        // день отдыха: только тетрадь ошибок
var DAQIQA_SINOV = 30;      // сдача на время: 20 вопросов и разбор после
var REJA_MAX = 90;          // дальше 90 дней план становится враньём про мотивацию
var BEPUL_KUN = 3;          // бесплатная часть плана: три дня, настоящих и печатаемых

function kun0(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function ddmm(d) {
  var dd = d.getDate(), mm = d.getMonth() + 1;
  return (dd < 10 ? "0" : "") + dd + "." + (mm < 10 ? "0" : "") + mm;
}

/* Разложить n дней по блокам пропорционально слабости.
   Свойство, ради которого написано именно так: если блок A слабее блока B,
   он НЕ МОЖЕТ получить меньше дней, чем B. Доказательство держится на двух
   вещах — сначала всем поровну по одному дню, потом остаток раздаётся по
   величине дробной части, а при равных дробных частях вперёд идёт более
   слабый. У целой части монотонность очевидна; если целые части равны,
   то и дробные упорядочены так же, как слабость. Обычный Math.round этого
   свойства не даёт и сумма у него не сходится с n.
   n < числа блоков — план в два-три дня: тогда базового дня нет и часть
   блоков останется без дня, это честнее, чем растянуть план. */
function taqsim(n, keys, w) {
  var res = {};
  var baza = n >= keys.length ? 1 : 0;
  keys.forEach(function (k) { res[k] = baza; });
  var qoldiq = n - baza * keys.length;
  if (qoldiq <= 0) return res;
  var jami = 0;
  keys.forEach(function (k) { jami += w[k]; });
  var kasr = {}, berildi = 0;
  keys.forEach(function (k) {
    var x = jami > 0 ? qoldiq * w[k] / jami : qoldiq / keys.length;
    var c = Math.floor(x);
    res[k] += c; berildi += c; kasr[k] = x - c;
  });
  var nav = keys.slice().sort(function (a, b) {
    if (kasr[b] !== kasr[a]) return kasr[b] - kasr[a];
    return w[b] - w[a];
  });
  for (var i = 0; i < qoldiq - berildi; i++) res[nav[i]]++;
  return res;
}

/* Слабость блока: 1 − доля верных. Без прогона все блоки равны — план всё
   равно строится, потому что «сначала пройди тест» это отказ в услуге.
   На вход идёт разбивка последнего прогона по блокам ({blok: {ok, n}}), а не
   глобальная переменная: тот же счёт нужен образцу товара, у которого прогона
   нет и не может быть — там результат выдуман, а формула та же самая. */
function ogirlikHisobla(blok, keys) {
  var w = {};
  keys.forEach(function (k) {
    var d = blok ? blok[k] : null;
    w[k] = d && d.n ? Math.max(0.15, 1 - d.ok / d.n) : 0.5;
  });
  return w;
}

/* Собственно план. Чистая функция: день «сегодня», день экзамена (или null),
   ключи блоков, их веса и — когда даты нет — горизонт в днях на входе;
   массив дней на выходе.
   Возвращает тот же объект, что раньше возвращал rejaTuz():
   { kun, imtihon, kesildi, xato, muddat, muddatOtgan }. */
function rejaQur(bugunRaw, imtihonRaw, keys, w, ufqKun) {
  var bugun = kun0(bugunRaw);
  var imtihon = imtihonRaw ? kun0(imtihonRaw) : null;
  if (imtihon && imtihon <= bugun) {
    return { kun: [], imtihon: null, kesildi: false, xato: "otgan" };
  }
  /* ГОРИЗОНТ БЕЗ ДАТЫ ПРИХОДИТ ПАРАМЕТРОМ, а не зашит числом 30. Расписание
     экзамена для начальных классов не опубликовано; «тридцать дней» были
     сроком, который мы придумали и о котором молчали. Теперь его выбирает
     человек — 30, 60 или 90 дней. Значение по умолчанию оставлено ровно для
     одного вызова: образец товара (obrazec.html) зовёт функцию с датой,
     и горизонт там не участвует вовсе. Потолок общий с REJA_MAX: дальше
     девяноста дней план становится враньём про мотивацию, и обойти это
     правило через параметр нельзя. */
  var ufq = ufqKun && ufqKun > 0 ? Math.min(Math.round(ufqKun), REJA_MAX) : 30;
  var oxir = imtihon || new Date(bugun.getTime() + ufq * 86400000);
  // Дни считаются от сегодняшнего включительно до дня ПЕРЕД экзаменом:
  // в день экзамена не готовятся, а если экзамен завтра — один день всё же есть,
  // и он не должен превращаться в «дата прошла».
  var kunlar = Math.round((oxir - bugun) / 86400000);
  var kesildi = false;
  if (kunlar > REJA_MAX) { kunlar = REJA_MAX; kesildi = true; }
  if (kunlar < 1) return { kun: [], imtihon: null, kesildi: false, xato: "otgan" };

  var boshlanish = new Date(oxir.getTime() - kunlar * 86400000);

  // ШАГ 1. Сначала размечается ТИП каждого дня и только потом дни делятся
  // между блоками. Почему именно так: раньше доля считалась от всех
  // календарных дней (30), а разбирали очередь только рабочие (около 20).
  // Очередь строится чередованием, поэтому её хвост принадлежит целиком
  // блокам с наибольшей долей — то есть самым слабым, — и этот хвост
  // не доезжал никогда. На выходе блок с нулём верных ответов получал
  // МЕНЬШЕ дней, чем самый сильный: ровно наоборот обещанию оффера.
  var tur = [], ishKun = 0;
  for (var i = 0; i < kunlar; i++) {
    var dd = new Date(boshlanish.getTime() + i * 86400000);
    var qq = kunlar - i;              // сколько дней осталось, считая этот
    var t;
    if (qq === 3 || qq === 1) t = "rest";
    else if (qq === 2) t = "mock";
    else if (dd.getDay() === 0) t = "rest";
    else if (i > 0 && i % 7 === 6) t = "mock";
    else { t = "ish"; ishKun++; }
    tur.push(t);
  }

  // ШАГ 2. Рабочие дни делятся пропорционально слабости.
  var bosh = taqsim(ishKun, keys, w);
  // Раскладываем не подряд, а чередованием: два дня подряд по одному блоку
  // за неделю до экзамена — это скука, а не подготовка.
  var aral = [], qoldi = ishKun, qolgan = {};
  keys.forEach(function (k) { qolgan[k] = bosh[k]; });
  while (qoldi > 0) {
    keys.forEach(function (k) {
      if (qolgan[k] > 0) { aral.push(k); qolgan[k]--; qoldi--; }
    });
  }
  if (!aral.length) aral = keys.slice();   // рабочих дней нет — индекс не должен уехать в undefined

  var out = [], hisob = {}, p = 0;
  for (var i2 = 0; i2 < kunlar; i2++) {
    var d = new Date(boshlanish.getTime() + i2 * 86400000);
    var row = { sana: d, hafta: HAFTA[d.getDay()], daq: DAQIQA };
    if (tur[i2] === "rest") {
      row.tur = "rest"; row.daq = DAQIQA_DAM;
      var qolgan2 = kunlar - i2;
      // Раньше здесь стояло «Ariza, toʻlov va hujjatlarni tekshirish» — совет,
      // который к этому дню опаздывает на одиннадцать суток: по СХЕМЕ (приложение 1
      // к Низому) платёж делается не позднее чем за 12 дней до экзамена, а
      // регистрация к тому же сроку уже закрыта. План, который ведёт человека
      // к дате экзамена и предлагает «проверить оплату» накануне, доводит его
      // до дня, когда подать уже нельзя.
      row.ish = qolgan2 === 1
        ? "Yengil takrorlash. Ruxsatnoma va shaxsni tasdiqlovchi hujjatni tayyorlab qoʻying"
        : (qolgan2 === 3 ? "Barcha bloklar boʻyicha xatolar daftari" : "Dam kuni: faqat xatolar daftari");
      row.qisqa = qolgan2 === 1 ? "Hujjatlar" : "Daftar";
    } else if (tur[i2] === "mock") {
      row.tur = "mock"; row.daq = DAQIQA_SINOV;
      row.ish = "Sinov: imtihon shaklida, vaqt bilan";
      row.qisqa = "Sinov";
    } else {
      var b = aral[p % aral.length]; p++;
      hisob[b] = (hisob[b] || 0);
      var mv = MAVZULAR[b] || [];
      var nomer = hisob[b] % (mv.length || 1);
      row.tur = "ish";
      row.blok = b;
      row.mavzu = nomer + 1;           // номер темы в цикле блока — для календаря на печатном листе
      // BLOKLAR объявлен через const в questions.js — то есть в лексической
      // области, а не свойством window. Обращаться можно только по имени,
      // и только после того, как questions.js загружен; обе страницы грузят
      // его первым. typeof на случай, если третья страница забудет.
      row.ish = (typeof BLOKLAR !== "undefined" && BLOKLAR[b] ? BLOKLAR[b] : b) + " — " + (mv[nomer] || "takrorlash");
      row.qisqa = (QISQA[b] || b) + " " + (nomer + 1);
      hisob[b]++;
    }
    out.push(row);
  }

  // РУБЕЖ 12 ДНЕЙ. День с индексом i отстоит от экзамена ровно на (kunlar − i)
  // суток, поэтому день, когда до экзамена остаётся 12, — последний, в который
  // по СХЕМЕ ещё можно заплатить и зарегистрироваться («imtihondan kamida
  // 12 kun oldin» / «imtihon sanasidan 12 kun oldin»). Отмечаем его в плане,
  // но НЕ полагаемся на отметку: у бесплатного плана видны первые три дня,
  // и срок, спрятанный за платной стеной, — это срок, о котором мы промолчали.
  // Поэтому дата уезжает ещё и в сводку, которая видна всегда.
  var muddat = null, muddatOtgan = false;
  if (imtihon) {
    if (kunlar >= 12) {
      muddat = new Date(oxir.getTime() - 12 * 86400000);
      out[kunlar - 12].muddat = true;
      out[kunlar - 12].ish += ". OXIRGI KUN: toʻlov va roʻyxatdan oʻtish (imtihondan 12 kun oldin)";
    } else {
      // До экзамена меньше двенадцати дней — значит либо всё уже оплачено,
      // либо на этот экзамен податься уже нельзя. Промолчать здесь означает
      // продать подготовку к экзамену, на который человек не попадёт.
      muddatOtgan = true;
    }
  }
  return { kun: out, imtihon: imtihon, kesildi: kesildi, xato: null,
           muddat: muddat, muddatOtgan: muddatOtgan };
}
