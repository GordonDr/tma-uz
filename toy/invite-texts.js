/* ============================================================================
   To'y-Daftar · тексты приглашений и сообщений организатора
   ----------------------------------------------------------------------------
   [черновик, на вычитку носителю]
   Узбекские тексты (uz_latin, uz_cyrillic) — МАШИННЫЙ ЧЕРНОВИК по правилу
   _docs/07-CONTENT.md. Перед посевом отдать носителю на вычитку (2–3 часа).
   Русские тексты вычитки не требуют.

   Латиница и кириллица написаны отдельно, а не транслитом друг из друга:
   смысл один, формулировки подобраны под каждый алфавит. При правке носителем
   менять обе версии — иначе они разъедутся.

   ЧТО ЗДЕСЬ: 6 поводов × 3 языка.
     label    — короткая подпись для шапки кабинета
     greeting — текст приглашения (2–4 предложения), гость видит его под именами
     share    — что организатор отправляет вместе со ссылкой (first / remind /
                moved / thanks), разговорнее приглашения
     theme    — рекомендуемая тема оформления, themeWhy — почему именно она

   ПЛЕЙСХОЛДЕРЫ {{names}} {{date}} {{time}} {{venue}}
   В greeting их сознательно нет: страница приглашения выводит имена, дату, время
   и зал отдельными блоками, и повтор внутри текста читается как ошибка вёрстки.
   В share они есть и нужны — сообщение уходит в чат, где кроме ссылки контекста нет.

   ПРАВОВОЕ (05-LEGAL): ни в одном тексте нет просьб о подарках, деньгах и сборах.
   Рассылает организатор со своего аккаунта, поэтому все share-шаблоны написаны
   от первого лица семьи, а не от имени сервиса.
============================================================================ */

const LANGS = ["uz_latin", "uz_cyrillic", "ru"];
const LANG_LABELS = {
  uz_latin:    "o'zbekcha (lotin)",
  uz_cyrillic: "ўзбекча (кирилл)",
  ru:          "по-русски"
};

const OCCASIONS = [

  /* --------------------------------------------------------------- 1 */
  { id:"nikoh_toy", theme:"zar",
    themeWhy:"Золото-классика — самый парадный набор: читается как настоящая свадебная таклифнома и не спорит с торжественным текстом.",
    label:{ uz_latin:"Nikoh to'y", uz_cyrillic:"Никоҳ тўй", ru:"Свадьба" },
    greeting:{
      uz_latin:"Hurmatli mehmon! Farzandlarimiz hayotidagi eng quvonchli kun — nikoh to'yi marosimiga Sizni va oilangizni taklif etamiz. Shodiyonamizda Sizdek aziz insonlarning bo'lishi biz uchun katta sharaf. Tashrifingizdan mamnun bo'lamiz.",
      uz_cyrillic:"Ҳурматли меҳмон! Фарзандларимизнинг никоҳ тўйи маросимига Сизни ва оилангизни таклиф этамиз. Шодиёнамизда Сиздек азиз инсонларнинг иштироки биз учун катта шараф. Ташрифингиздан мамнун бўламиз.",
      ru:"Уважаемый гость! Приглашаем вас и вашу семью на свадебное торжество наших детей. Для нас большая честь видеть в этот день рядом самых близких и уважаемых людей. Будем искренне рады вашему приходу."
    },
    share:{
      first:{
        uz_latin:"Assalomu alaykum! {{date}} kuni farzandlarimizning to'yi bo'ladi — Sizni va oilangizni chin dildan taklif qilamiz. Havolani ochib, nechta mehmon kelishingizni belgilab qo'ysangiz, zalga aniq sonni oldindan aytamiz.",
        uz_cyrillic:"Ассалому алайкум! {{date}} куни фарзандларимизнинг тўйи бўлади — Сизни ва оилангизни чин дилдан таклиф қиламиз. Ҳаволани очиб, нечта меҳмон келишингизни белгилаб қўйсангиз, залга аниқ сонни олдиндан айтамиз.",
        ru:"Ассалому алайкум! {{date}} у нас свадьба — {{names}}. Приглашаем вас и вашу семью: откройте ссылку и отметьте, сколько человек придёт, залу нужно точное число."
      },
      remind:{
        uz_latin:"Assalomu alaykum! To'yimizga sanoqli kun qoldi, javobingizni hali olmadik. Iltimos, havolani ochib nechta kishi kelishingizni belgilang — ro'yxatni shu hafta zalga topshiramiz.",
        uz_cyrillic:"Ассалому алайкум! Тўйимизга саноқли кун қолди, жавобингизни ҳали ололмадик. Илтимос, ҳаволани очиб нечта киши келишингизни белгиланг — рўйхатни шу ҳафта залга топширамиз.",
        ru:"Ассалому алайкум! До тоя осталось немного, а от вас ответа пока нет. Отметьте, пожалуйста, по ссылке, сколько человек придёт — список для зала сдаём на этой неделе."
      },
      moved:{
        uz_latin:"Assalomu alaykum! To'y sanasi o'zgardi: yangi sana — {{date}}, joy o'zgarmadi, {{venue}}. Eski havola ishlayapti — javobingizni yangi sanaga qarab yangilab qo'ying, iltimos.",
        uz_cyrillic:"Ассалому алайкум! Тўй санаси ўзгарди: янги сана — {{date}}, жой ўзгармади, {{venue}}. Эски ҳавола ишлаяпти — жавобингизни янги санага қараб янгилаб қўйинг, илтимос.",
        ru:"Ассалому алайкум! Дата тоя изменилась: новая — {{date}}, зал прежний, {{venue}}. Ссылка та же — откройте её и подтвердите ответ на новую дату."
      },
      thanks:{
        uz_latin:"Hurmatli mehmon, to'yimizga tashrif buyurganingiz uchun katta rahmat! Iliq tilaklaringiz oilamiz uchun juda qadrli bo'ldi. Sizning xonadoningizda ham shunday shodiyonali kunlar ko'p bo'lsin.",
        uz_cyrillic:"Ҳурматли меҳмон, тўйимизга ташриф буюрганингиз учун катта раҳмат! Илиқ тилакларингиз оиламиз учун жуда қадрли бўлди. Сизнинг хонадонингизда ҳам шундай шодиёнали кунлар кўп бўлсин.",
        ru:"Спасибо, что были на нашем тое! Ваши тёплые слова и внимание для нашей семьи очень дороги. Пусть и в вашем доме почаще будут такие радостные дни."
      }
    }
  },

  /* --------------------------------------------------------------- 2 */
  { id:"fotiha", theme:"oq",
    themeWhy:"Фотиха камернее свадьбы и идёт до неё: светлый минимал держит сдержанный тон и не выглядит богаче будущего свадебного приглашения.",
    label:{ uz_latin:"Fotiha to'y", uz_cyrillic:"Фотиҳа тўй", ru:"Фотиха-туй" },
    greeting:{
      uz_latin:"Hurmatli mehmon! Qizimizni oq yo'l tilab uzatish — fotiha to'yi marosimiga Sizni va oilangizni taklif etamiz. Shu qutlug' kunda kattalarimizning oq fotihasi va ezgu tilaklari biz uchun eng qimmatli sovg'a. Fayzli dasturxonimizdan joy olsangiz, baxtiyor bo'lamiz.",
      uz_cyrillic:"Ҳурматли меҳмон! Қизимизнинг фотиҳа тўйи — қиз узатиш маросимига Сизни ва оилангизни таклиф этамиз. Ушбу қутлуғ кунда кексаларимизнинг оқ фотиҳаси ва эзгу тилаклари биз учун энг қимматли совға. Файзли дастурхонимиздан жой олсангиз, бахтиёр бўламиз.",
      ru:"Уважаемый гость! Приглашаем вас и вашу семью на фотиха-туй — обряд благословения и проводов нашей дочери. Добрые пожелания и благословение старших в этот день для нас дороже любого подарка. Будем рады видеть вас за нашим дастарханом."
    },
    share:{
      first:{
        uz_latin:"Assalomu alaykum! {{date}} kuni qizimizning fotiha to'yi — Sizni va oilangizni taklif etamiz. Havolani ochib, nechta mehmon kelishingizni belgilab qo'ying: dasturxonni shunga qarab tayyorlaymiz.",
        uz_cyrillic:"Ассалому алайкум! {{date}} куни қизимизнинг фотиҳа тўйи бўлади — Сизни ва оилангизни таклиф этамиз. Ҳаволани очиб, нечта меҳмон келишингизни белгилаб қўйинг: дастурхонни шунга қараб тайёрлаймиз.",
        ru:"Ассалому алайкум! {{date}} у нас фотиха-туй, {{venue}}. Приглашаем вас и вашу семью: откройте ссылку и отметьте, сколько человек придёт — от этого зависит дастархан."
      },
      remind:{
        uz_latin:"Assalomu alaykum! Fotiha to'yiga oz qoldi, javobingizni kutyapmiz. Havolada bir marta bosib qo'ysangiz kifoya — nechta kishi kelishingizni bilsak, joyni oldindan tayyorlaymiz.",
        uz_cyrillic:"Ассалому алайкум! Фотиҳа тўйига оз қолди, жавобингизни кутяпмиз. Ҳаволада бир марта босиб қўйсангиз кифоя — нечта киши келишингизни билсак, жойни олдиндан тайёрлаймиз.",
        ru:"Ассалому алайкум! До фотиха-туя осталось немного, а ответа от вас пока нет. Один тап по ссылке — и мы будем знать, сколько мест готовить."
      },
      moved:{
        uz_latin:"Assalomu alaykum! Fotiha to'yi sanasi ko'chdi: yangi sana — {{date}}, boshlanish vaqti {{time}}. Eski havola ishlayapti — javobingizni yangilab qo'ying, iltimos.",
        uz_cyrillic:"Ассалому алайкум! Фотиҳа тўйи санаси кўчди: янги сана — {{date}}, бошланиш вақти {{time}}. Эски ҳавола ишлаяпти — жавобингизни янгилаб қўйинг, илтимос.",
        ru:"Ассалому алайкум! Фотиха-туй перенесли: новая дата — {{date}}, начало в {{time}}. Ссылка прежняя, откройте её и подтвердите ответ ещё раз."
      },
      thanks:{
        uz_latin:"Qizimizning fotiha to'yida biz bilan birga bo'lganingiz uchun rahmat! Oq fotihangiz va ezgu tilaklaringiz yodimizda qoladi. Sizning oilangizda ham shunday quvonchli kunlar ko'p bo'lsin.",
        uz_cyrillic:"Қизимизнинг фотиҳа тўйида биз билан бирга бўлганингиз учун раҳмат! Оқ фотиҳангиз ва эзгу тилакларингиз ёдимизда қолади. Сизнинг оилангизда ҳам шундай қувончли кунлар кўп бўлсин.",
        ru:"Спасибо, что были рядом на фотиха-туе нашей дочери! Ваше благословение и добрые слова мы запомним. Пусть и в вашей семье будет побольше таких дней."
      }
    }
  },

  /* --------------------------------------------------------------- 3 */
  { id:"beshik_toy", theme:"atlas",
    themeWhy:"Бешик и курпачу традиционно шьют из атласа — узор иката сразу задаёт домашний, семейный тон без свадебного пафоса.",
    label:{ uz_latin:"Beshik to'y", uz_cyrillic:"Бешик тўй", ru:"Бешик-той" },
    greeting:{
      uz_latin:"Assalomu alaykum, hurmatli mehmon! Xonadonimizga quvonch kirib keldi — farzandimizning beshik to'yiga Sizni va oilangizni chin dildan taklif etamiz. Chaqalog'imizga aytilgan ezgu tilaklaringiz biz uchun juda qadrli. Samimiy davramizda ko'rishaylik.",
      uz_cyrillic:"Ассалому алайкум, ҳурматли меҳмон! Хонадонимизга қувонч кириб келди — фарзандимизнинг бешик тўйига Сизни ва оилангизни чин дилдан таклиф этамиз. Гўдагимизга айтган эзгу тилакларингиз биз учун жуда қадрли. Самимий даврамизда кўришайлик.",
      ru:"Ассалому алайкум, уважаемый гость! В нашем доме родился ребёнок, и мы от всего сердца приглашаем вас и вашу семью на бешик-той. Ваши добрые слова малышу для нас дороже всего. Будем рады видеть вас в нашем тёплом кругу."
    },
    share:{
      first:{
        uz_latin:"Suyunchi! Xonadonimizda chaqaloq dunyoga keldi. {{date}} kuni beshik to'yi qilyapmiz — havolani ochib, oilangizdan nechta mehmon kelishini belgilab qo'ying.",
        uz_cyrillic:"Суюнчи! Хонадонимизда чақалоқ дунёга келди. {{date}} куни бешик тўйи қиляпмиз — ҳаволани очиб, оилангиздан нечта меҳмон келишини белгилаб қўйинг.",
        ru:"Суюнчи! У нас родился малыш. {{date}} делаем бешик-той — откройте ссылку и отметьте, сколько человек придёт от вашей семьи."
      },
      remind:{
        uz_latin:"Assalomu alaykum! Beshik to'yimizga kam qoldi, Sizdan javob yo'q. Kelasizmi yoki yo'qmi — havolada belgilab qo'ysangiz, mehmonlar sonini aniq bilamiz.",
        uz_cyrillic:"Ассалому алайкум! Бешик тўйимизга кам қолди, Сиздан жавоб йўқ. Келасизми ёки йўқми — ҳаволада белгилаб қўйсангиз, меҳмонлар сонини аниқ билиб оламиз.",
        ru:"Ассалому алайкум! До бешик-тоя осталось совсем немного, а от вас ответа нет. Отметьте по ссылке — придёте или нет и сколько вас будет."
      },
      moved:{
        uz_latin:"Assalomu alaykum! Beshik to'yini boshqa kunga surdik: yangi sana — {{date}}, vaqti {{time}}. Havola o'sha-o'sha — javobingizni yangilab qo'ying.",
        uz_cyrillic:"Ассалому алайкум! Бешик тўйини бошқа кунга сурдик: янги сана — {{date}}, вақти {{time}}. Ҳавола ўша-ўша — жавобингизни янгилаб қўйинг.",
        ru:"Ассалому алайкум! Бешик-той перенесли: новая дата — {{date}}, время {{time}}. Ссылка та же — отметьте ответ заново, пожалуйста."
      },
      thanks:{
        uz_latin:"Beshik to'yimizga kelib, chaqalog'imizga ezgu tilaklar aytganingiz uchun rahmat! Uyimiz Siz bilan yanada fayzli bo'ldi. Farzandlaringiz doim sog'-salomat bo'lsin.",
        uz_cyrillic:"Бешик тўйимизга келиб, гўдагимизга эзгу тилаклар айтганингиз учун раҳмат! Уйимиз Сиз билан янада файзли бўлди. Фарзандларингиз доим соғ-саломат бўлсин.",
        ru:"Спасибо, что пришли на бешик-той и сказали малышу добрые слова! С вами наш дом стал теплее. Здоровья вам и вашим детям."
      }
    }
  },

  /* --------------------------------------------------------------- 4 */
  { id:"sunnat_toy", theme:"atlas",
    themeWhy:"Суннат-той — большой родовой праздник днём: национальный узор передаёт его теплее, чем свадебное золото, и гость сразу видит, что это не свадьба.",
    label:{ uz_latin:"Sunnat to'y", uz_cyrillic:"Суннат тўй", ru:"Суннат-той" },
    greeting:{
      uz_latin:"Hurmatli mehmon! O'g'limizning sunnat to'yi munosabati bilan Sizni va oilangizni davramizga taklif etamiz. Bu kun oilamiz uchun katta quvonch — uni yaqin insonlar bilan birga nishonlamoqchimiz. Kelib, farzandimizga oq yo'l tilab ketsangiz, minnatdor bo'lamiz.",
      uz_cyrillic:"Ҳурматли меҳмон! Ўғлимизнинг суннат тўйи муносабати билан Сизни ва оилангизни даврамизга таклиф этамиз. Бу кун оиламиз учун катта қувонч — уни яқин инсонлар билан бирга нишонлагимиз келади. Келиб, фарзандимизга оқ йўл тилаб кетсангиз, миннатдор бўламиз.",
      ru:"Уважаемый гость! По случаю суннат-тоя нашего сына приглашаем вас и вашу семью разделить с нами этот день. Для нашей семьи это большая радость, и провести её хочется рядом с близкими. Будем благодарны за ваши добрые пожелания нашему сыну."
    },
    share:{
      first:{
        uz_latin:"Assalomu alaykum! {{date}} kuni o'g'limizning sunnat to'yi — Sizni va oilangizni kutamiz. Havolani ochib, nechta kishi kelishingizni belgilab qo'ying: zalga sonni oldindan aytishimiz kerak.",
        uz_cyrillic:"Ассалому алайкум! {{date}} куни ўғлимизнинг суннат тўйи — Сизни ва оилангизни кутамиз. Ҳаволани очиб, нечта киши келишингизни белгилаб қўйинг: залга сонни олдиндан айтишимиз керак.",
        ru:"Ассалому алайкум! {{date}} у нас суннат-той, {{venue}}. Ждём вас и вашу семью: откройте ссылку и отметьте, сколько человек придёт — зал просит число заранее."
      },
      remind:{
        uz_latin:"Assalomu alaykum! Sunnat to'yimizga sanoqli kun qoldi, javobingiz hali yo'q. Iltimos, havolada nechta mehmon kelishingizni belgilang — joy va oshni shunga qarab hisoblaymiz.",
        uz_cyrillic:"Ассалому алайкум! Суннат тўйимизга саноқли кун қолди, жавобингиз ҳали йўқ. Илтимос, ҳаволада нечта меҳмон келишингизни белгиланг — жой ва ошни шунга қараб ҳисоблаймиз.",
        ru:"Ассалому алайкум! До суннат-тоя считанные дни, а ответа от вас пока нет. Отметьте по ссылке, сколько вас придёт — по этому числу считаем места и плов."
      },
      moved:{
        uz_latin:"Assalomu alaykum! Sunnat to'yi sanasi o'zgardi — yangi sana {{date}}, joy o'zgarmadi: {{venue}}. Havola ishlayapti, javobingizni qaytadan belgilab qo'ying.",
        uz_cyrillic:"Ассалому алайкум! Суннат тўйи санаси ўзгарди — янги сана {{date}}, жой ўзгармади: {{venue}}. Ҳавола ишлаяпти, жавобингизни қайтадан белгилаб қўйинг.",
        ru:"Ассалому алайкум! Дату суннат-тоя сдвинули — теперь {{date}}, место прежнее: {{venue}}. Ссылка работает, подтвердите ответ ещё раз."
      },
      thanks:{
        uz_latin:"Sunnat to'yimizga tashrif buyurganingiz uchun katta rahmat! O'g'limizga aytgan ezgu tilaklaringiz biz uchun juda qadrli. Sizning xonadoningizda ham shodiyonalar ko'p bo'lsin.",
        uz_cyrillic:"Суннат тўйимизга ташриф буюрганингиз учун катта раҳмат! Ўғлимизга айтган эзгу тилакларингиз биз учун жуда қадрли. Сизнинг хонадонингизда ҳам шодиёналар кўп бўлсин.",
        ru:"Большое спасибо, что были на суннат-тое нашего сына! Ваши пожелания для нас очень дороги. Пусть и в вашем доме будет много радостных дней."
      }
    }
  },

  /* --------------------------------------------------------------- 5 */
  { id:"yubiley", theme:"kecha",
    themeWhy:"Юбилей почти всегда вечерний: тёмная тема с золотым акцентом выглядит по-взрослому уважительно и не превращает приглашение в детский праздник.",
    label:{ uz_latin:"Yubiley", uz_cyrillic:"Юбилей", ru:"Юбилей" },
    greeting:{
      uz_latin:"Hurmatli mehmon! Oilamiz uchun aziz insonning tavallud ayyomi — yubiley tantanasiga Sizni va oilangizni taklif etamiz. Yillar davomida yonimizda bo'lgan insonlar bilan bu kunni birga nishonlash biz uchun alohida qadrli. Iliq so'zlaringiz va tashrifingizni intiqlik bilan kutamiz.",
      uz_cyrillic:"Ҳурматли меҳмон! Оиламиз учун азиз инсоннинг таваллуд айёми — юбилей тантанасига Сизни ва оилангизни таклиф этамиз. Йиллар давомида ёнимизда бўлган инсонлар билан бу кунни бирга нишонлаш биз учун алоҳида қадрли. Илиқ сўзларингиз ва ташрифингизни интиқлик билан кутамиз.",
      ru:"Уважаемый гость! Приглашаем вас и вашу семью на юбилейное торжество дорогого нам человека. Достойно прожитые годы — повод собрать за одним столом тех, кто был рядом всё это время. Ваше присутствие и тёплое слово будут для нас особенно ценны."
    },
    share:{
      first:{
        uz_latin:"Assalomu alaykum! {{date}} kuni {{names}} yubileyini nishonlaymiz, Sizni va oilangizni taklif etamiz. Havolani ochib nechta kishi kelishingizni belgilab qo'ysangiz, joyni oldindan tayyorlab qo'yamiz.",
        uz_cyrillic:"Ассалому алайкум! {{date}} куни {{names}} юбилейини нишонлаймиз, Сизни ва оилангизни таклиф этамиз. Ҳаволани очиб нечта киши келишингизни белгилаб қўйсангиз, жойни олдиндан тайёрлаб қўямиз.",
        ru:"Ассалому алайкум! {{date}} отмечаем юбилей — {{names}}, {{venue}}. Приглашаем вас и вашу семью: откройте ссылку и отметьте, сколько человек придёт."
      },
      remind:{
        uz_latin:"Assalomu alaykum! Tantanaga oz qoldi, javobingizni hali olmadik. Iltimos, havolada kelasizmi-yo'qmi belgilab qo'ying — stol va joylarni shunga qarab tayyorlaymiz.",
        uz_cyrillic:"Ассалому алайкум! Тантанага оз қолди, жавобингизни ҳали ололмадик. Илтимос, ҳаволада келасизми-йўқми белгилаб қўйинг — стол ва жойларни шунга қараб тайёрлаймиз.",
        ru:"Ассалому алайкум! До торжества осталось немного, а от вас ответа нет. Отметьте, пожалуйста, по ссылке — придёте или нет: по этому числу готовим стол."
      },
      moved:{
        uz_latin:"Assalomu alaykum! Yubiley kechasi boshqa kunga ko'chdi: {{date}}, soat {{time}}. Havola o'zgarmadi — javobingizni yangi sanaga moslab belgilab qo'ying.",
        uz_cyrillic:"Ассалому алайкум! Юбилей кечаси бошқа кунга кўчди: {{date}}, соат {{time}}. Ҳавола ўзгармади — жавобингизни янги санага мослаб белгилаб қўйинг.",
        ru:"Ассалому алайкум! Юбилейный вечер перенесли: {{date}}, начало в {{time}}. Ссылка прежняя — подтвердите, пожалуйста, ответ на новую дату."
      },
      thanks:{
        uz_latin:"Yubiley kechamizga kelib, iliq so'zlaringizni ayamaganingiz uchun rahmat! Shunday insonlar davrasida bo'lish oilamiz uchun katta baxt. O'zingizga uzoq umr va sog'lik tilaymiz.",
        uz_cyrillic:"Юбилей кечамизга келиб, илиқ сўзларингизни аямаганингиз учун раҳмат! Шундай инсонлар даврасида бўлиш оиламиз учун катта бахт. Ўзингизга узоқ умр ва соғлик тилаймиз.",
        ru:"Спасибо, что пришли на юбилей и не пожалели тёплых слов! Быть в кругу таких людей — большая радость для нашей семьи. Здоровья вам и долгих лет."
      }
    }
  },

  /* --------------------------------------------------------------- 6 */
  { id:"nahor_osh", theme:"oq",
    themeWhy:"Нахор ош — утреннее и деловитое: белый минимал читается мгновенно, а гостю на рассвете важнее время и адрес, чем украшения.",
    label:{ uz_latin:"Nahor oshi", uz_cyrillic:"Наҳор оши", ru:"Нахор ош" },
    greeting:{
      uz_latin:"Hurmatli mehmon! Sizni ertalabki nahor oshimizga taklif etamiz. Osh belgilangan vaqtda tortiladi — iltimos, kechikmasdan tashrif buyuring.",
      uz_cyrillic:"Ҳурматли меҳмон! Сизни эрталабки наҳор ошимизга таклиф этамиз. Ош белгиланган вақтда тортилади — илтимос, кечикмасдан ташриф буюринг.",
      ru:"Уважаемый гость! Приглашаем вас на утренний нахор ош. Плов подают точно в назначенное время — просим прийти заранее и не опаздывать."
    },
    share:{
      first:{
        uz_latin:"Assalomu alaykum! {{date}} kuni ertalab nahor oshi beramiz, {{venue}}. Osh soat {{time}} da tortiladi — havolada kelishingizni belgilab qo'ying.",
        uz_cyrillic:"Ассалому алайкум! {{date}} куни эрталаб наҳор оши берамиз, {{venue}}. Ош соат {{time}} да тортилади — ҳаволада келишингизни белгилаб қўйинг.",
        ru:"Ассалому алайкум! {{date}} утром даём нахор ош, {{venue}}. Плов подают в {{time}} — отметьтесь по ссылке, придёте ли."
      },
      remind:{
        uz_latin:"Assalomu alaykum! Nahor oshiga oz qoldi, javobingiz yo'q. Havolada belgilab qo'ying, iltimos — osh {{time}} da tortiladi, kechikmang.",
        uz_cyrillic:"Ассалому алайкум! Наҳор ошига оз қолди, жавобингиз йўқ. Ҳаволада белгилаб қўйинг, илтимос — ош {{time}} да тортилади, кечикманг.",
        ru:"Ассалому алайкум! До нахор оша осталось немного, а ответа от вас нет. Отметьтесь, пожалуйста, по ссылке — плов подают в {{time}}, приходите вовремя."
      },
      moved:{
        uz_latin:"Assalomu alaykum! Nahor oshi boshqa kunga ko'chdi: {{date}}, soat {{time}}, joy o'zgarmadi — {{venue}}. Havolada javobingizni yangilab qo'ying.",
        uz_cyrillic:"Ассалому алайкум! Наҳор оши бошқа кунга кўчди: {{date}}, соат {{time}}, жой ўзгармади — {{venue}}. Ҳаволада жавобингизни янгилаб қўйинг.",
        ru:"Ассалому алайкум! Нахор ош перенесли: {{date}}, в {{time}}, место прежнее — {{venue}}. Отметьте ответ по ссылке ещё раз."
      },
      thanks:{
        uz_latin:"Ertalabki oshimizga kelganingiz uchun rahmat! Erta turib tashrif buyurdingiz — buni unutmaymiz. Xonadoningizda doim to'kin dasturxon bo'lsin.",
        uz_cyrillic:"Эрталабки ошимизга келганингиз учун раҳмат! Эрта туриб ташриф буюрдингиз — буни унутмаймиз. Хонадонингизда доим тўкин дастурхон бўлсин.",
        ru:"Спасибо, что пришли на утренний ош! Знаем, каково вставать так рано — тем ценнее ваш приход. Пусть в вашем доме всегда будет щедрый дастархан."
      }
    }
  }
];

/* --------------------------------------------------------------------------
   Помощники
-------------------------------------------------------------------------- */

// Подстановка плейсхолдеров. ev — объект тоя из кабинета; dateStr/timeStr передаём
// уже отформатированными. Пустое поле подставляется пустой строкой, поэтому
// лишние пробелы и висящие знаки препинания схлопываем.
function toyFill(text, ev){
  const e = ev || {};
  const map = {
    names: e.couple || "",
    date:  e.dateStr || e.event_date || "",
    time:  e.timeStr || e.event_time || "",
    venue: e.venue_name || ""
  };
  return String(text || "")
    .replace(/\{\{(names|date|time|venue)\}\}/g, (m, k) => map[k])
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([,.—–:!?])/g, "$1")
    .trim();
}

function toyOccasion(id){
  return OCCASIONS.find(o => o.id === id) || OCCASIONS[0];
}

// Готовый список для <select> в кабинете: 18 вариантов — 6 поводов × 3 языка.
// Подписи на языке кабинета, поэтому labelLang передаём снаружи.
function toyPresets(labelLang){
  const L = labelLang === "uz" ? "uz_latin" : "ru";
  const out = [];
  OCCASIONS.forEach(o => LANGS.forEach(lang => out.push({
    id:    o.id + "_" + lang,
    label: o.label[L] + " · " + LANG_LABELS[lang],
    text:  o.greeting[lang],
    theme: o.theme,
    occasion: o.id,
    lang
  })));
  return out;
}

if (typeof window !== "undefined") {
  window.TOY_OCCASIONS = OCCASIONS;
  window.TOY_LANGS = LANGS;
  window.TOY_LANG_LABELS = LANG_LABELS;
  window.toyFill = toyFill;
  window.toyOccasion = toyOccasion;
  window.toyPresets = toyPresets;
}
