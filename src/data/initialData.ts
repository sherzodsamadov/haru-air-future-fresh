import productPersonal from '@/assets/product-personal.png';
import productUrbanPanel from '@/assets/product-urban-panel.png';
import productDesktop from '@/assets/product-desktop.png';
import productLiquid3 from '@/assets/product-liquid3.png';
import { 
  Product, 
  Category, 
  NewsItem, 
  Vacancy, 
  VacancyApplication, 
  ContactMessage, 
  Announcement,
  CompanySettings 
} from '@/types';

// Demo products with real images
export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'HARU Air Mini Pro',
    slug: 'haru-air-mini-pro',
    category: 'personal',
    price: 350000,
    shortDesc: "Stol ustida ishlatish uchun mo'ljallangan shaxsiy havo tozalagich",
    fullDesc: "HARU Air Mini Pro — bu zamonaviy texnologiyalar asosida yaratilgan kompakt havo tozalagich. U PM2.5, PM10 zarrachalarini va zararli gazlarni samarali filtrlaydi. USB orqali quvvatlanadi, ofis va uy uchun ideal tanlov.",
    specs: [
      { label: "O'lchami", value: "12 x 8 x 6 sm" },
      { label: "Og'irligi", value: "180 g" },
      { label: "Quvvat", value: "5V USB" },
      { label: "Filtrlash", value: "HEPA + Ion" },
      { label: "Ishlash vaqti", value: "8 soat" },
    ],
    useCases: ["Ofis stoli", "Uy kabinetida", "Kutubxonada"],
    image: productDesktop,
    gallery: [productDesktop],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    name: "HARU Air Bo'yin",
    slug: 'haru-air-boyin',
    category: 'personal',
    price: 280000,
    shortDesc: "Bo'yinga osiladigan portativ havo tozalagich",
    fullDesc: "HARU Air Bo'yin modeli — bu harakatdagi odamlar uchun ideal yechim. Engil va qulay dizayni bilan u doimo toza havo ta'minlaydi. Talabalar, sportchilar va sayohatchilar uchun mukammal.",
    specs: [
      { label: "O'lchami", value: "8 x 5 x 3 sm" },
      { label: "Og'irligi", value: "85 g" },
      { label: "Batareya", value: "Li-ion 800mAh" },
      { label: "Ishlash vaqti", value: "12 soat" },
      { label: "Zaryadlash", value: "Type-C" },
    ],
    useCases: ["Metro va avtobuslarda", "Universitetda", "Sayohatda"],
    image: productPersonal,
    gallery: [productPersonal],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'HARU Urban Moss Panel S',
    slug: 'haru-urban-moss-panel-s',
    category: 'urban',
    price: 15000000,
    shortDesc: "Shahar maydonchalari uchun moxli havo tozalagich panel",
    fullDesc: "HARU Urban Moss Panel S — bu tabiiy mox texnologiyasi asosida ishlaydigan shahar havo tozalagich tizimi. U havadan PM2.5, PM10 zarrachalarini va CO2 ni yutib, toza kislorod chiqaradi. Kam xizmat talab qiladi va ekologik jihatdan barqaror.",
    specs: [
      { label: "O'lchami", value: "2 x 2 metr" },
      { label: "Tozalash quvvati", value: "275 daraxt ekvivalenti" },
      { label: "Suv sarfi", value: "Kuniga 10L" },
      { label: "Xizmat muddati", value: "15+ yil" },
      { label: "Quvvat", value: "Solar + AC" },
    ],
    useCases: ["Shahar maydonchalari", "Bog'lar va parklar", "Maktab hovlilari"],
    image: productUrbanPanel,
    gallery: [productUrbanPanel],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'HARU Urban Moss Tower',
    slug: 'haru-urban-moss-tower',
    category: 'urban',
    price: 45000000,
    shortDesc: '"Suyuq daraxt" texnologiyasi — shahar havosini yaxshilash uchun',
    fullDesc: 'HARU Urban Moss Tower — "Suyuq daraxt" texnologiyasi asosida ishlaydigan zamonaviy tizim. Asosiy vazifasi — shahar havosini yaxshilash. Shaharlarda daraxt yetishmagan joylarda CO₂ ni kamaytirib, kislorod chiqaradi va atrof-muhit sifatini oshiradi. Maxsus o\'stirilgan mox turlari azot oksidlarini va changni samarali yutadi.',
    specs: [
      { label: "Balandligi", value: "4 metr" },
      { label: "Diametri", value: "1.5 metr" },
      { label: "Tozalash quvvati", value: "800 daraxt ekvivalenti" },
      { label: "Qamrov", value: "500m radius" },
      { label: "Monitoring", value: "IoT sensori" },
    ],
    useCases: ["Markaziy maydonlar", "Sanoat hududlari", "Transport uzellari"],
    image: productLiquid3,
    gallery: [productLiquid3],
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10',
  },
  {
    id: '5',
    name: 'HARU Air Sumka',
    slug: 'haru-air-sumka',
    category: 'personal',
    price: 220000,
    shortDesc: "Sumkaga biriktirib olib yuradigan havo tozalagich",
    fullDesc: "HARU Air Sumka modeli — kundalik hayotda doimiy himoya uchun. Sumka, ryukzak yoki kamaraga osib olib yurish mumkin. Jimgina ishlaydi va atrofdagilarga xalaqit bermaydi.",
    specs: [
      { label: "O'lchami", value: "6 x 4 x 2 sm" },
      { label: "Og'irligi", value: "45 g" },
      { label: "Batareya", value: "Li-ion 500mAh" },
      { label: "Ishlash vaqti", value: "16 soat" },
      { label: "Shovqin", value: "< 20 dB" },
    ],
    useCases: ["Kundalik yurish", "Sport mashg'ulotlari", "Mehnat joyida"],
    image: productPersonal,
    gallery: [productPersonal],
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
  },
];

export const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Shaxsiy',
    slug: 'personal',
    description: 'Shaxsiy foydalanish uchun mini havo tozalagichlar',
    productCount: 3,
  },
  {
    id: '2',
    name: 'Shahar uchun',
    slug: 'urban',
    description: 'Shahar va jamoat joylari uchun moxli havo tozalash panellari',
    productCount: 2,
  },
];

export const initialNews: NewsItem[] = [
  {
    id: '1',
    title: "HARU AIR Toshkentda yangi loyihani ishga tushirdi",
    slug: 'haru-air-toshkent-loyiha',
    excerpt: "Toshkent shahrining markaziy bog'ida 10 ta Urban Moss Panel o'rnatildi.",
    content: `HARU AIR kompaniyasi Toshkent shahrining markaziy bog'ida yangi loyihani muvaffaqiyatli amalga oshirdi. 

Loyiha doirasida 10 ta HARU Urban Moss Panel S modeli o'rnatildi. Bu panellar kuniga 2,750 ta daraxt ekvivalentida havo tozalash quvvatiga ega.

Loyiha Toshkent shahar hokimligi va O'zbekiston Ekologiya vazirligi bilan hamkorlikda amalga oshirildi. 

"Bu loyiha bizning shahrimiz uchun muhim qadam. Toza havo — bu sog'lom kelajak demakdir," — dedi Toshkent shahar hokimining o'rinbosari.`,
    image: productUrbanPanel,
    publishedAt: '2024-01-25',
    author: 'HARU AIR PR',
    tags: ['loyiha', 'toshkent', 'ekologiya'],
  },
  {
    id: '2',
    title: "Yangi HARU Air Mini Pro modeli taqdim etildi",
    slug: 'yangi-haru-air-mini-pro',
    excerpt: "Yangilangan dizayn va kuchliroq filtrlash tizimi bilan.",
    content: `HARU AIR o'zining eng mashhur shaxsiy havo tozalagichi — Mini Pro modelining yangi avlodini taqdim etdi.

Yangi xususiyatlar:
- 30% samaraliroq filtrlash
- Yangi HEPA 13 filtr
- Type-C zaryadlash
- 25% ko'proq batareya sig'imi

Yangi model hozirdan buyurtma berish uchun mavjud.`,
    image: productDesktop,
    publishedAt: '2024-02-01',
    author: 'HARU AIR Product Team',
    tags: ['mahsulot', 'yangilik', 'texnologiya'],
  },
  {
    id: '3',
    title: "HARU AIR xalqaro tanlovda g'olib bo'ldi",
    slug: 'haru-air-xalqaro-tanov-gholib',
    excerpt: "Green Tech Asia 2024 tanlovida eng yaxshi eko-startap unvonini qo'lga kiritdi.",
    content: `HARU AIR kompaniyasi Singapurda bo'lib o'tgan Green Tech Asia 2024 xalqaro tanlovida "Eng yaxshi eko-texnologiya startapi" unvonini qo'lga kiritdi.

Tanlovda 15 ta mamlakatdan 200 dan ortiq kompaniya ishtirok etdi. HARU AIR o'zining innovatsion mox texnologiyasi va barqaror biznes modeli bilan hakamlar e'tiborini qozondi.

"Bu g'alaba nafaqat bizning jamoamiz, balki butun O'zbekiston uchun faxr," — dedi HARU AIR asoschisi.`,
    image: productLiquid3,
    publishedAt: '2024-02-10',
    author: 'HARU AIR PR',
    tags: ['mukofot', 'xalqaro', 'startap'],
  },
];

export const initialVacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    slug: 'frontend-developer',
    department: 'IT',
    location: 'Toshkent',
    type: 'full-time',
    description: "React va TypeScript bilimiga ega frontend dasturchi izlayapmiz. Bizning jamoamiz bilan birga eko-texnologiya mahsulotlarini rivojlantirishda ishtirok eting.",
    requirements: [
      'React.js da 2+ yil tajriba',
      'TypeScript bilimi',
      'Git bilan ishlash',
      'Responsive dizayn',
    ],
    responsibilities: [
      'Veb ilovalarni yaratish',
      'Kod sifatini ta\'minlash',
      'Jamoa bilan hamkorlik',
    ],
    salary: '8 000 000 - 15 000 000 so\'m',
    isActive: true,
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    title: 'IoT Engineer',
    slug: 'iot-engineer',
    department: 'Engineering',
    location: 'Toshkent',
    type: 'full-time',
    description: 'Urban Moss Panel tizimlarimiz uchun IoT sensorlarini ishlab chiqish va integratsiya qilish.',
    requirements: [
      'Elektronika bo\'yicha oliy ma\'lumot',
      'Arduino/ESP32 tajribasi',
      'C/C++ dasturlash',
      'Ingliz tili',
    ],
    responsibilities: [
      'Sensorlarni loyihalash',
      'Ma\'lumotlar yig\'ish tizimini yaratish',
      'Texnik hujjatlarni tayyorlash',
    ],
    salary: '10 000 000 - 18 000 000 so\'m',
    isActive: true,
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    title: 'Marketing Manager',
    slug: 'marketing-manager',
    department: 'Marketing',
    location: 'Toshkent',
    type: 'full-time',
    description: 'HARU AIR brendini rivojlantirish va marketing strategiyasini boshqarish.',
    requirements: [
      'Marketing bo\'yicha 3+ yil tajriba',
      'Digital marketing bilimlari',
      'SMM tajribasi',
      'O\'zbek va rus tillarida ravon gapirish',
    ],
    responsibilities: [
      'Marketing strategiyasini yaratish',
      'Ijtimoiy tarmoqlarni boshqarish',
      'Reklama kampaniyalarini o\'tkazish',
    ],
    isActive: true,
    createdAt: '2024-02-10',
  },
];

export const initialApplications: VacancyApplication[] = [
  {
    id: '1',
    vacancyId: '1',
    vacancyTitle: 'Frontend Developer',
    fullName: 'Bobur Karimov',
    email: 'bobur@example.com',
    phone: '+998901234567',
    coverLetter: "React va TypeScript bo'yicha 3 yillik tajribam bor. HARU AIR jamoasiga qo'shilishni istardim.",
    submittedAt: '2024-02-15',
    status: 'new',
  },
];

export const initialMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'Aziz Rahimov',
    email: 'aziz@company.uz',
    phone: '+998901112233',
    subject: 'Korxona uchun taklif',
    message: "Bizning korxona uchun Urban Moss Panel o'rnatish imkoniyatini muhokama qilmoqchimiz. Iltimos, bog'laning.",
    submittedAt: '2024-02-14',
    isRead: false,
  },
];

export const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    title: "Bahorgi chegirma — 15%",
    content: "Barcha shaxsiy havo tozalagichlarga 15% chegirma. 1-mart — 15-mart",
    type: 'success',
    isActive: true,
    createdAt: '2024-02-20',
    expiresAt: '2024-03-15',
  },
];

export const initialSettings: CompanySettings = {
  name: 'HARU AIR',
  slogan: 'HARU AIR — toza kelajak uchun',
  email: 'info@haruair.uz',
  phone: '+998 71 123 45 67',
  address: "Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi, 123-uy",
  workingHours: 'Dushanba - Juma: 9:00 - 18:00',
  socialLinks: {
    telegram: 'https://t.me/haruair',
    instagram: 'https://instagram.com/haruair',
    facebook: 'https://facebook.com/haruair',
    linkedin: 'https://linkedin.com/company/haruair',
    youtube: 'https://youtube.com/@haruair',
  },
  aboutText: "HARU AIR — O'zbekistonda birinchi marta tabiiy mox texnologiyasidan foydalangan holda havo tozalash tizimlarini ishlab chiquvchi innovatsion kompaniya. Biz shaxsiy foydalanish uchun mini havo tozalagichlardan tortib, shahar miqyosidagi katta panellargacha keng assortiment taqdim etamiz.",
  missionText: "Bizning missiyamiz — har bir inson toza havo bilan nafas olishi uchun zamonaviy va ekologik yechimlar yaratish. Biz texnologiya va tabiatni uyg'unlashtirgan holda, barqaror kelajak uchun ishlaymiz.",
};
