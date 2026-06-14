// Static local data — will be replaced by Sanity CMS queries in Phase 6.
// No email anywhere. Contact: WhatsApp, phone, address, hours, social only.

export interface Service {
  slug: string
  titleEn: string
  titleAr: string
  shortDescriptionEn: string
  shortDescriptionAr: string
  stepsEn: string[]
  stepsAr: string[]
  thumbnailImage: string // path in /public/images/services/
  heroImage: string
  isFeatured: boolean
  order: number
}

export interface BeforeAfterCase {
  id: string
  /** Combined before/after image used on the homepage gallery. */
  image: string
  /** Separate halves — used later by interactive service-page sliders. */
  beforeImage?: string
  afterImage?: string
  titleEn?: string
  titleAr?: string
  serviceSlug?: string
}

export interface VideoTestimonial {
  id: string
  nameEn: string
  nameAr: string
  /** Short trust-focused tag badge shown on the card (2–3 words). */
  tagEn: string
  tagAr: string
  youtubeUrl: string
  thumbnailImage: string
}

export interface GoogleReview {
  id: string
  nameEn: string
  nameAr: string
  rating: 5
  /** Short bold headline shown above the quote (Figma "Great Experience!"). */
  headlineEn: string
  headlineAr: string
  quoteEn: string
  quoteAr: string
}

export interface FAQ {
  id: string
  questionEn: string
  questionAr: string
  answerEn: string
  answerAr: string
}

export interface WorkingHours {
  daysEn: string
  daysAr: string
  hoursEn: string
  hoursAr: string
}

export interface SiteSettings {
  whatsapp: string
  phone: string
  addressEn: string
  addressAr: string
  workingHours: WorkingHours[]
  social: { platform: string; url: string }[]
}

// ─── About Us ────────────────────────────────────────────────────────────────

export interface About {
  titleEn: string
  titleAr: string
  accentEn: string
  accentAr: string
  paragraphsEn: string[]
  paragraphsAr: string[]
  image: string
}

export const about: About = {
  titleEn: 'Us',
  titleAr: 'من',
  accentEn: 'About',
  accentAr: 'نحن',
  paragraphsEn: [
    'At Smile Island Clinic, our specialized dental team provides comprehensive, high-quality care using advanced technology for accurate diagnosis, effective treatment, and comfortable results tailored to every smile — all with affordable prices.',
  ],
  paragraphsAr: [
  "في سمايل إيلاند، نقدم رعاية أسنان شاملة ومريحة على يد فريق من الأطباء المتخصصين، باستخدام أحدث التقنيات لضمان تشخيص دقيق وعلاج فعّال يناسب احتياجات كل مريض، بهدف الوصول لابتسامة صحية وجميلة بأعلى جودة وسعر مناسب.",
  ],
  image: '/images/about/about-us-image.png',
}

// ─── Services ──────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    slug: 'veneers',
    titleEn: 'Veneers',
    titleAr: 'القشور التجميلية',
    shortDescriptionEn:
      'Thin custom-made porcelain or composite shells bonded to the front surface of teeth to reshape color, alignment, and form — the ideal solution for a complete smile makeover.',
    shortDescriptionAr:
      'قشور رقيقة مصنوعة خصيصاً من البورسلين أو الكومبوزيت تُلصق على السطح الأمامي للأسنان لتغيير اللون والشكل والانتظام بمظهر طبيعي — الحل الأمثل للتجميل الشامل للابتسامة.',
    stepsEn: [
      'Examining the teeth and selecting the appropriate veneer type and shade',
      'Preparing the tooth surface by removing a thin layer of enamel and taking digital impressions',
      'Designing and fabricating custom veneers in the lab within 24 hours',
      'Bonding the final veneers and making any needed adjustments',
    ],
    stepsAr: [
      'فحص الأسنان وتحديد النوع المناسب واللون المطلوب للقشور',
      'تحضير سطح السن بإزالة طبقة رقيقة من المينا وأخذ القياسات الرقمية',
      'تصميم وتصنيع القشور المخصصة في المختبر خلال 24 ساعة',
      'تثبيت القشور النهائية وإجراء أي تعديلات مطلوبة',
    ],
    thumbnailImage: '/images/services/veneers.png',
    heroImage: '/images/services/veneers.png',
    isFeatured: true,
    order: 0,
  },
  {
    slug: 'teeth-cleaning-polishing',
    titleEn: 'Teeth Cleaning & Polishing',
    titleAr: 'تنظيف وتلميع الأسنان',
    shortDescriptionEn:
      'A simple procedure to remove tartar (dental calculus) using an ultrasonic scaler and stains caused by smoking and coffee while improving gum health and freshening breath.',
    shortDescriptionAr:
      'إجراء بسيط لإزالة الجير والتصبغات الناتجة عن السجائر والقهوة وتحسين صحة اللثة ورائحة الفم.',
    stepsEn: [
      'Quick examination of teeth and gums',
      'Removing tartar using an ultrasonic scaler',
      'Polishing the teeth to remove stains',
    ],
    stepsAr: [
      'فحص سريع للأسنان واللثة',
      'إزالة الجير باستخدام جهاز الالتراسونيك',
      'تلميع الأسنان لإزالة التصبغات',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=70',
    isFeatured: false,
    order: 1,
  },
  {
    slug: 'laser-whitening',
    titleEn: 'Laser Whitening',
    titleAr: 'تبييض الأسنان بالليزر',
    shortDescriptionEn:
      'A cosmetic procedure that brightens the teeth shade by 2 to 4 shades, depending on the number of sessions.',
    shortDescriptionAr:
      'إجراء تجميلي لتفتيح لون الأسنان من درجتين إلى 4 درجات حسب عدد الجلسات.',
    stepsEn: [
      'Examining the teeth and ensuring they are healthy',
      'Cleaning the teeth first',
      'Applying the whitening gel and activating it with a laser device for 20 minutes',
      'Evaluating the final result',
    ],
    stepsAr: [
      'فحص الأسنان والتأكد من سلامتها',
      'تنظيف الأسنان أولاً',
      'وضع مادة التبييض وتنشيطها بجهاز الليزر لمدة 20 دقيقة',
      'تقييم النتيجة النهائية',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=70',
    isFeatured: false,
    order: 2,
  },
  {
    slug: 'dental-fillings',
    titleEn: 'Dental Fillings',
    titleAr: 'حشو الأسنان',
    shortDescriptionEn:
      'Removing tooth decay and restoring the natural shape and function of the tooth.',
    shortDescriptionAr: 'إزالة التسوس واستعادة شكل ووظيفة السن بشكل طبيعي.',
    stepsEn: [
      'Detecting the decay through examination and X-rays, then removing it to prepare the tooth for the filling',
      'Placing, shaping, and polishing the filling for a natural look',
    ],
    stepsAr: [
      'تحديد مكان التسوس بعد الكشف والأشعة وإزالته لتجهيز السن لاستقبال الحشو',
      'وضع الحشو وتشكيله وتلميعه ليبدو طبيعياً',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=70',
    isFeatured: false,
    order: 3,
  },
  {
    slug: 'root-canal-treatment',
    titleEn: 'Root Canal Treatment',
    titleAr: 'علاج العصب',
    shortDescriptionEn:
      'Treating the tooth in cases of infection or severe pain to save the tooth instead of extracting it.',
    shortDescriptionAr:
      'علاج عصب السن عند وجود التهاب أو ألم شديد للحفاظ على السن بدل خلعه.',
    stepsEn: [
      'Diagnosing the condition with X-rays and identifying the exact cause of pain',
      'Cleaning and sealing the root canals carefully',
      'Restoring the tooth with a final filling or crown',
    ],
    stepsAr: [
      'تشخيص الحالة بالأشعة وتحديد سبب الألم بدقة',
      'تنظيف قنوات الجذر وحشو القنوات بإحكام',
      'ترميم السن بحشو نهائي أو تركيبة',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=70',
    isFeatured: false,
    order: 4,
  },
  {
    slug: 'dental-implants',
    titleEn: 'Dental Implants',
    titleAr: 'زراعة الأسنان',
    shortDescriptionEn:
      'Replacing missing tooth roots with fixed dental implants to restore natural appearance and function, performed by a dental implant specialist.',
    shortDescriptionAr:
      'تعويض جذور الأسنان المفقودة بزرعة ثابتة لاستعادة الشكل الطبيعي والوظيفة مع أخصائي زراعة الأسنان.',
    stepsEn: [
      'Comprehensive examination, X-rays, and evaluation of the most suitable treatment plan',
      'Placing the implant into the jawbone and waiting 3–6 months for proper bone healing and long-term stability',
      'Placing the abutment and the final crown',
    ],
    stepsAr: [
      'فحص شامل وأشعة وتقييم خطة العلاج المناسبة حسب الحالة',
      'وضع الزرعة في عظم الفك وانتظار من 3 إلى 6 شهور لالتئام العظم حولها لضمان ثباتها',
      'تركيب الدعامة والتركيبة النهائية',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&w=1200&q=70',
    isFeatured: true,
    order: 5,
  },
  {
    slug: 'fixed-prosthetics',
    titleEn: 'Fixed Prosthetics',
    titleAr: 'التركيبات الثابتة',
    shortDescriptionEn:
      'A fixed solution to restore damaged, root canal–treated, or missing teeth and bring back a natural smile using different materials including Resin, Porcelain, Zirconia, and E-max.',
    shortDescriptionAr:
      'حل ثابت لتعويض الأسنان والضروس بعد علاج العصب أو المفقودة واستعادة الابتسامة الطبيعية بأنواع مختلفة مثل الريزن، البورسلين، الزيركون، والإيماكس.',
    stepsEn: [
      'Examining the teeth and determining the treatment plan',
      'Preparing the teeth and taking digital impressions using a digital scanner',
      "Designing the restoration to fit the patient's case, with delivery within 24 hours",
      'Cementing the final restoration',
    ],
    stepsAr: [
      'فحص الأسنان وتحديد الخطة العلاجية',
      'تحضير الأسنان وأخذ المقاسات بجهاز الديجيتال سكانر',
      'تصميم التركيبة بالمقاس المناسب للحالة والاستلام خلال 24 ساعة',
      'تثبيت التركيبة النهائية',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=70',
    isFeatured: false,
    order: 6,
  },
  {
    slug: 'removable-dentures',
    titleEn: 'Removable Dentures',
    titleAr: 'التركيبات المتحركة',
    shortDescriptionEn:
      'A removable solution to replace missing teeth, improving chewing ability and appearance.',
    shortDescriptionAr:
      'تعويض للأسنان المفقودة يمكن إزالته بسهولة لتحسين المضغ والمظهر.',
    stepsEn: [
      'Examining the mouth and gums',
      'Taking precise impressions',
      'Trying the denture to ensure comfort and proper fit',
      'Delivering the final denture',
    ],
    stepsAr: [
      'فحص الفم واللثة',
      'أخذ القياسات الدقيقة',
      'تجربة التركيبة للتأكد من الراحة',
      'تركيب الطقم النهائي',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=70',
    isFeatured: false,
    order: 7,
  },
  {
    slug: 'gum-contouring',
    titleEn: 'Gum Contouring',
    titleAr: 'قص اللثة',
    shortDescriptionEn:
      'A cosmetic and therapeutic procedure to improve the appearance of the gums and teeth, performed by a gum surgery and cosmetic specialist.',
    shortDescriptionAr:
      'إجراء تجميلي وعلاجي لتحسين شكل اللثة والأسنان مع أخصائي جراحة وتجميل اللثة.',
    stepsEn: [
      'Assessing gum shape and health through examination and required X-rays',
      'Local anesthesia followed by removing excess gum tissue and bone if needed, depending on the diagnosis',
      'Follow-up care and post-treatment instructions for proper healing',
    ],
    stepsAr: [
      'تقييم شكل وصحة اللثة بعد الفحص والأشعة المطلوبة',
      'تخدير موضعي وإزالة الجزء الزائد من اللثة أو اللثة والعظم حسب التشخيص',
      'متابعة التعافي وتعليمات العناية',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=70',
    isFeatured: true,
    order: 8,
  },
  {
    slug: 'pediatric-dentistry',
    titleEn: 'Pediatric Dentistry',
    titleAr: 'أسنان الأطفال',
    shortDescriptionEn:
      'Specialized dental care for children to maintain oral health and provide a comfortable, safe experience for the child.',
    shortDescriptionAr:
      'رعاية متخصصة لأسنان الأطفال للحفاظ على صحة الفم وبناء تجربة مريحة وآمنة للطفل.',
    stepsEn: [
      'Examining teeth and gums, diagnosing the condition, and determining the appropriate treatment',
      'Treating cavities or placing fillings when needed',
      'Applying preventive fluoride treatment',
      'Providing guidance on daily oral care and proper nutrition',
    ],
    stepsAr: [
      'فحص الأسنان واللثة وتشخيص الحالة وتحديد الإجراء المناسب',
      'علاج التسوس أو الحشوات عند الحاجة',
      'تطبيق الفلورايد الوقائي',
      'تقديم نصائح للعناية اليومية والتغذية المناسبة',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=70',
    isFeatured: false,
    order: 9,
  },
  {
    slug: 'online-consultation',
    titleEn: 'Online Consultation',
    titleAr: 'الاستشارة أونلاين',
    shortDescriptionEn:
      'A convenient and safe consultation with a specialist dentist to discuss dental concerns, get an initial assessment, and determine the best treatment plan without an immediate clinic visit.',
    shortDescriptionAr:
      'استشارة مريحة وآمنة مع الطبيب الأخصائي لمناقشة مشكلات الأسنان، تقييم الحالة مبدئياً، وتحديد أفضل خطوات العلاج دون الحاجة لزيارة فورية.',
    stepsEn: [
      'Send your concern and available photos or X-rays if available',
      'The specialist reviews your case and symptoms',
      'Receive an initial assessment and recommended next steps',
      'Book an in-clinic visit if treatment is needed',
    ],
    stepsAr: [
      'إرسال المشكلة والصور أو الأشعة المتاحة إن وجدت',
      'يقوم الطبيب المختص بمراجعة الحالة والأعراض',
      'الحصول على تقييم مبدئي والخطوات المقترحة',
      'حجز زيارة في العيادة إذا كانت هناك حاجة للعلاج',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=70',
    isFeatured: false,
    order: 10,
  },
  {
    slug: 'oral-surgery-tooth-extraction',
    titleEn: 'Tooth Extraction',
    titleAr: 'خلع الأسنان',
    shortDescriptionEn:
      'Simple or surgical extraction of teeth or molars depending on the condition of the tooth.',
    shortDescriptionAr: 'خلع الضروس والأسنان بشكل عادي أو جراحي حسب الحالة.',
    stepsEn: [
      'Clinical examination and X-rays to evaluate the case',
      'Performing the extraction under local anesthesia and removing the tooth or molar in the same session',
    ],
    stepsAr: [
      'الفحص الإكلينيكي والأشعة لتقييم الحالة',
      'إجراء الخلع تحت التخدير الموضعي وخلع السن أو الضرس في نفس الجلسة',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1200&q=70',
    heroImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1200&q=70',
    isFeatured: false,
    order: 11,
  },
]

// ─── Popular Treatments (featured carousel on homepage) ──────────────────────
// Curated list — note "Veneers" is a featured treatment without a dedicated
// service detail page yet (its page is built in a later phase).

export interface PopularTreatment {
  slug: string
  titleEn: string
  titleAr: string
  descEn: string
  descAr: string
  image: string
}

export const popularTreatments: PopularTreatment[] = [
  {
    slug: 'veneers',
    titleEn: 'Veneers',
    titleAr: 'القشور التجميلية',
    descEn:
      'Thin custom-made shells that reshape the color, form, and alignment of your smile.',
    descAr:
      'قشور رقيقة مصممة خصيصاً لتغيير لون وشكل وانتظام ابتسامتك بمظهر طبيعي.',
    image: '/images/services/veneers.png',
  },
  {
    slug: 'dental-implants',
    titleEn: 'Dental Implants',
    titleAr: 'زراعة الأسنان',
    descEn:
      'Permanent replacements for missing teeth that restore natural look and function.',
    descAr:
      'تعويض دائم للأسنان المفقودة لاستعادة الشكل الطبيعي ووظيفة المضغ.',
    image: '/images/services/dental-implants.png',
  },
  {
    slug: 'gum-contouring',
    titleEn: 'Gum Contouring',
    titleAr: 'قص اللثة',
    descEn:
      'Reshaping the gum line for a balanced, confident, and healthier-looking smile.',
    descAr:
      'إعادة تشكيل خط اللثة لابتسامة متناسقة وصحية وأكثر ثقة.',
    image: '/images/services/gum-contouring.png',
  },
]

// ─── Before & After ─────────────────────────────────────────────────────────

// Homepage gallery uses combined before/after images. Only home-01..03 are
// real (extracted from the design); the rest cycle them as placeholders and
// are trivial to replace once final approved cases are provided.
export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: 'whitening-case-01',
    image: '/images/before-after/whitening-case-01.png',
    titleEn: 'Laser Whitening',
    titleAr: 'التبييض بالليزر',
    serviceSlug: 'laser-whitening',
  },
  {
    id: 'whitening-case-02',
    image: '/images/before-after/whitening-case-01.png',
    titleEn: 'Laser Teeth Whitening',
    titleAr: 'تبييض الأسنان بالليزر',
    serviceSlug: 'laser-teeth-whitening',
  },
  {
    id: 'whitening-case-03',
    image: '/images/before-after/whitening-case-01.png',
    titleEn: 'Laser Teeth Whitening',
    titleAr: 'تبييض الأسنان بالليزر',
    serviceSlug: 'laser-teeth-whitening',
  },
  {
    id: 'whitening-case-04',
    image: '/images/before-after/whitening-case-01.png',
    titleEn: 'Laser Teeth Whitening',
    titleAr: 'تبييض الأسنان بالليزر',
    serviceSlug: 'laser-teeth-whitening',
  },
  {
    id: 'whitening-case-05',
    image: '/images/before-after/whitening-case-01.png',
    titleEn: 'Laser Teeth Whitening',
    titleAr: 'تبييض الأسنان بالليزر',
    serviceSlug: 'laser-teeth-whitening',
  },
]

// ─── Video Testimonials ──────────────────────────────────────────────────────

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'v1',
    nameEn: 'Malak Adel',
    nameAr: 'ملك عادل',
    tagEn: 'Trust & Care',
    tagAr: 'ثقة وعناية',
    youtubeUrl: 'https://www.youtube.com/shorts/HGeLuwr5pqw',
    thumbnailImage: '/images/testimonials/malak-adel.jpg',
  },
  {
    id: 'v2',
    nameEn: 'Islam Hassan',
    nameAr: 'إسلام حسن',
    tagEn: 'Great Service',
    tagAr: 'خدمة رائعة',
    youtubeUrl: 'https://www.youtube.com/shorts/BRhmBL2GJpI',
    thumbnailImage: '/images/testimonials/islam-hassan.jpg',
  },
  {
    id: 'v3',
    nameEn: 'Tamer Ali',
    nameAr: 'تامر علي',
    tagEn: 'Real Results',
    tagAr: 'نتائج حقيقية',
    youtubeUrl: 'https://www.youtube.com/shorts/seNOy6tXtE4',
    thumbnailImage: '/images/testimonials/tamer-ali.jpg',
  },
  {
    id: 'v4',
    nameEn: 'Basel Mashal',
    nameAr: 'باسل مشعل',
    tagEn: 'Gentle Visit',
    tagAr: 'زيارة لطيفة',
    youtubeUrl: 'https://www.youtube.com/shorts/SsPpyrb-TWs',
    thumbnailImage: '/images/testimonials/basel-mashal.jpg',
  },
  {
    id: 'v5',
    nameEn: 'Ahmed Tarek',
    nameAr: 'أحمد طارق',
    tagEn: 'Confident Smile',
    tagAr: 'ابتسامة واثقة',
    youtubeUrl: 'https://www.youtube.com/shorts/XySmRoalrJ4',
    thumbnailImage: '/images/testimonials/ahmed-tarek.jpg',
  },
    {
    id: 'v6',
    nameEn: 'Saleh Mounes',
    nameAr: 'صالح مؤنس',
    tagEn: 'Trust & Care',
    tagAr: 'متابعة مستمرة',
    youtubeUrl: 'https://m.youtube.com/shorts/0T7T3vRY38w',
    thumbnailImage: '/images/testimonials/saleh-mounes.jpg',
  },
]

// ─── Google Reviews ──────────────────────────────────────────────────────────

export const googleReviews: GoogleReview[] = [
  {
    id: 'r1',
    nameEn: 'Mayar Hassan',
    nameAr: 'ميار حسن',
    rating: 5,
    headlineEn: 'A Smooth Experience From Booking',
    headlineAr: 'تجربة مريحة من أول الحجز',
    quoteEn:
      'Very talented doctors and an excellent clinic. From booking with Ms. Aya to reception with Nevein, everyone was very helpful until the appointment was confirmed. During the session, Dr. Rahma was friendly, professional, and very knowledgeable. It was my first time having an oral cleaning, and it definitely will not be the last. Thank you for helping me smile with confidence ♥',
    quoteAr:
      'دكاترة شاطرين جدا والعيادة ممتازة. من أول الحجز مع مس آية والاستقبال مع نيفين، كانوا متعاونين جدا لحد ما حجزت المعاد. وأثناء الجلسة مع دكتورة رحمة كانت لطيفة جدا وفاهمة شغلها. بالنسبة لي دي كانت أول مرة أعمل تنظيف للفم، ومش هتكون آخر مرة. شكرا جدا للدكاترة، أنتم الأفضل، وشكرا إنكم خلتوني أبتسم بثقة ♥',
  },
  {
    id: 'r2',
    nameEn: 'Ahmed Elsmahy',
    nameAr: 'أحمد السماحي',
    rating: 5,
    headlineEn: 'I Felt Comfortable From the Start',
    headlineAr: 'اطمنت من أول الجلسة',
    quoteEn:
      'Dr. Amira Hafez is very kind and, mashallah, her work is excellent. What mattered most to me is that she reassured me from the beginning, and the session was completely painless, thankfully. Thank you so much ❤🌹🌹',
    quoteAr:
      'الدكتوره اميره حافظ زوق جدا وما شاء الله شغاله حلو قوي وكفايه إنها طمنتي في الاول والجلسه كانت من غير الم خالص الحمد لله شكرا جدا ❤🌹🌹',
  },
  {
    id: 'r3',
    nameEn: 'Dalia Aboshady',
    nameAr: 'داليا أبو شادي',
    rating: 5,
    headlineEn: 'Clean Place and Excellent Service',
    headlineAr: 'مكان نضيف وخدمة ممتازة',
    quoteEn:
      'Honestly, the place is beautiful and the service is excellent. It was my first time visiting them, and I was really happy with the experience. I will not change the clinic, and I will keep coming back. The most important things in a dental clinic are sterilization and cleanliness, and honestly the place is very clean.',
    quoteAr:
      'بصراحه المكان جميل وخدمه ممتازه وكنت اول مره اتعامل معاهم بس بصراحه انا اتبسط جدآ وانشاءالله مش هاغير المكان وهتعامل معاهم علطول لان اهم حاجه في عياده الأسنان التعقيم والنضافه والصراحه المكان نضيف جدا',
  },
  {
    id: 'r4',
    nameEn: 'ahmed tarek',
    nameAr: 'أحمد طارق',
    rating: 5,
    headlineEn: 'Great Care for Adults and Kids',
    headlineAr: 'شغل ممتاز مع الكبار والأطفال',
    quoteEn:
      'A very clean and excellent place. Dr. Amira is more than excellent, and Dr. Mohamed is very skilled and knows how to deal with children very well. Wishing you continued success, and I hope you always stay at this level and even better, inshallah.',
    quoteAr:
      'مكان نظيف جدا جدا وممتاز ودكتورة أميرة تسلم ايديها اكتر من ممتازة ودكتور محمد شاطر جدا وبيعرف يتعامل مع الاطفال كويس جدااا يا رب بالتوفيق دائما وتفضلوا في المستوي ده علي طول وأحسن إن شاء الله',
  },
  {
    id: 'r5',
    nameEn: 'Nourhan Ragab',
    nameAr: 'نورهان رجب',
    rating: 5,
    headlineEn: 'Clean, Respectful, and Welcoming',
    headlineAr: 'نضافة واستقبال ذوق',
    quoteEn:
      'Amazing. A very respectful place, and the cleanliness is honestly outstanding. The reception team is very polite. Dr. Rana, mashallah, was wonderful, and the assistant helped me a lot today. Truly a very respectable place. May God bless you 🩷🩷🩷',
    quoteAr:
      'تحفه مكان محترم جدا جدا جدا ونضافه ثم نضافه ثم نضافه الاستقبال زوق اوي دكتور رنا مشاء الله عليها والمساعده كمان تعبت معايا النهارده حقيقي مكان محترم جدا ربنا يوفقكم 🩷🩷🩷',
  },
  {
    id: 'r6',
    nameEn: 'Mohamed abu mazen',
    nameAr: 'محمد ابو مازن',
    rating: 5,
    headlineEn: 'Real Care for the Patient',
    headlineAr: 'اهتمام بجد بالمريض',
    quoteEn:
      'Honestly, the center is excellent. This is not a compliment, it is the truth. The doctor is highly professional, honest, and respectful. Their care for the patient and their willingness to help is truly impressive. Thank you so much to the center.',
    quoteAr:
      'بصراحه المركز ممتاز جدا مش مجامله دي حقيقه ودكتوره علي اعلي مستوي من المصداقيه والرقي واهتمامهم بمساعدة المريض وتقديم الرعايه حاجه تشرف بجد وشكرا بجد للمركز',
  },
  {
    id: 'r7',
    nameEn: 'Aliaa Sherif',
    nameAr: ' علياء شريف',
    rating: 5,
    headlineEn: 'Great Result and Lovely Treatment',
    headlineAr: 'نتيجة حلوة ومعاملة جميلة',
    quoteEn:
      'A very clean clinic, mashallah. The reception and treatment were lovely, and most importantly, the result was amazing. Thank you so much.',
    quoteAr:
      'عياده نضيفه جدا جدا ماشاء الله واستقبال ومعامله جميله وأهم حاجه نتيجه تحفه شكرا جدا بجد',
  },
  {
    id: 'r8',
    nameEn: 'Galal Naser',
    nameAr: 'جلال ناصر',
    rating: 5,
    headlineEn: 'Sterilized, Clean, and Respectful',
    headlineAr: 'تعقيم ونضافة وناس محترمة',
    quoteEn:
      'Honestly, they are very respectful people with a real sense of responsibility. Their attitude is beyond respectful. The place is truly clean, the instruments are sterilized, and the doctors and the whole team are very respectable.',
    quoteAr:
      'بصراحة ناس محترمين جدا وعندهم ضمير واسلبوهم فوق الاحترام ومكان مضيف فعلا وأدوات معقمة ونظافة المكان والدكاترة والطاقم اللي شغال كلو ناس محترمين جدا جدا',
  },
  {
    id: 'r9',
    nameEn: 'Mostafa Khalil',
    nameAr: 'مصطفى خليل',
    rating: 5,
    headlineEn: 'Clear Explanation and Fair Prices',
    headlineAr: 'شرح واضح وسعر معقول',
    quoteEn:
      'The doctor is very skilled and discusses everything with you clearly. The prices are very reasonable compared to other clinics in the area.',
    quoteAr:
      'الدكتور شاطره جدا وتناقش معاك كل حاجه والأسعار معقوله جدا مقارنه ببقيت العيادات في المنطقه',
  },
  {
    id: 'r10',
    nameEn: 'Rahma Alhosary',
    nameAr: 'رحمة الحصري',
    rating: 5,
    headlineEn: 'Respectful Care and a Skilled Doctor',
    headlineAr: 'معاملة محترمة ودكتورة شاطرة',
    quoteEn:
      'A very good place with respectful treatment. Everyone is very polite, and Dr. Habiba is very skilled.',
    quoteAr:
      'مكان كويس جدا معامله كويسه ومحترمين جدا و دكتوره حبيبة شطره جدا',
  },
]

// ─── FAQs ────────────────────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    questionEn: 'Are all instruments fully sterilized?',
    questionAr: 'هل جميع الأدوات معقمة بالكامل؟',
    answerEn:
      'Yes, we follow the highest sterilization and infection control standards. All instruments are fully sterilized between each patient using advanced sterilization systems, and every patient has their own dedicated instruments to ensure maximum safety and hygiene.',
    answerAr:
      'نعم، نتبع أعلى معايير التعقيم ومكافحة العدوى. جميع الأدوات معقمة بالكامل بين كل مريض باستخدام أنظمة التعقيم المتطورة، ولكل مريض أدواته الخاصة لضمان أقصى درجات السلامة والنظافة.',
  },
  {
    id: 'faq-2',
    questionEn: 'How long do teeth whitening results last?',
    questionAr: 'كم تدوم نتائج تبييض الأسنان؟',
    answerEn:
      'Teeth whitening results typically last from 6 months to 1 year, depending on oral care habits and reducing stain-causing factors such as coffee, smoking, and colored beverages.',
    answerAr:
      'تستمر نتائج تبييض الأسنان عادةً من 6 أشهر إلى سنة، وذلك حسب عادات العناية بالفم وتقليل عوامل التلوين كالقهوة والتدخين والمشروبات الملونة.',
  },
  {
    id: 'faq-3',
    questionEn:
      'Can extraction and dental implant placement be done in the same session?',
    questionAr: 'هل يمكن إجراء الخلع وزراعة الأسنان في نفس الجلسة؟',
    answerEn:
      'Yes, in some cases immediate implant placement can be performed during the same session after proper evaluation and X-rays. The entire procedure usually takes less than one hour.',
    answerAr:
      'نعم، في بعض الحالات يمكن إجراء الزراعة الفورية في نفس جلسة الخلع بعد التقييم المناسب والأشعة. يستغرق الإجراء بالكامل عادةً أقل من ساعة.',
  },
  {
    id: 'faq-4',
    questionEn: 'What payment methods are available?',
    questionAr: 'ما هي طرق الدفع المتاحة؟',
    answerEn:
      'We offer multiple payment options for your convenience, including cash, InstaPay, We Pay, Vodafone Cash, and Fawry.',
    answerAr:
      'نقدم خيارات دفع متعددة لراحتكم، تشمل النقد وإنستاباي وويباي وفودافون كاش وفوري.',
  },
  {
    id: 'faq-5',
    questionEn: 'Are dental X-rays available at the clinic?',
    questionAr: 'هل تتوفر أشعة الأسنان في العيادة؟',
    answerEn:
      'Yes, dental X-rays are available at the clinic to save time, help diagnose problems accurately, and provide the most suitable treatment plan efficiently.',
    answerAr:
      'نعم، تتوفر أشعة الأسنان في العيادة لتوفير الوقت والمساعدة في التشخيص الدقيق وتقديم خطة العلاج الأنسب بكفاءة.',
  },
  {
    id: 'faq-6',
    questionEn:
      'Will I feel pain during extraction, implant placement, or gum contouring procedures?',
    questionAr: 'هل سأشعر بألم أثناء الخلع أو الزراعة أو قص اللثة؟',
    answerEn:
      'All procedures are performed under local anesthesia to ensure a comfortable experience with minimal discomfort, while patients are carefully monitored during and after the procedure.',
    answerAr:
      'تُجرى جميع الإجراءات تحت التخدير الموضعي لضمان تجربة مريحة مع أدنى قدر من الانزعاج، مع مراقبة المرضى بعناية خلال الإجراء وبعده.',
  },
]

// ─── Site Settings ───────────────────────────────────────────────────────────

export const siteSettings: SiteSettings = {
  whatsapp: '01556955994',
  phone: '01553055302',
  addressEn: '82 El-Tayar Ahmed Saoud Street, Bolkly, Alexandria, Egypt.',
  addressAr: '٨٢ ش الطيار احمد سعود، بولكلي، الإسكندرية.',
  workingHours: [
    {
      daysEn: 'Friday',
      daysAr: 'الجمعة',
      hoursEn: 'Closed',
      hoursAr: 'إجازة',
    },
    {
      daysEn: 'Saturday / Wednesday / Thursday',
      daysAr: 'السبت / الأربعاء / الخميس',
      hoursEn: '5 PM – 10 PM',
      hoursAr: '٥ م - ١٠ م',
    },
    {
      daysEn: 'Sunday / Monday / Tuesday',
      daysAr: 'الأحد / الإثنين / الثلاثاء',
      hoursEn: '1 PM – 4 PM · 5 PM – 10 PM',
      hoursAr: '١ ظ - ٤ ع · ٥ م - ١٠ م',
    },
  ],
  social: [
    { platform: 'Facebook', url: 'https://www.facebook.com/share/1AxoRvQEzX/' },
    { platform: 'Instagram', url: 'https://www.instagram.com/smileislandclinic' },
    {
      platform: 'TikTok',
      url: 'https://www.tiktok.com/@smile.island.clin?_r=1&_t=ZS-96WwttR5f8B',
    },
    { platform: 'Google', url: 'https://share.google/ojM0H7Dg1lkn4k4Jj' },
    {
      platform: 'YouTube',
      url: 'https://www.youtube.com/@smileislanddentalclinic',
    },
  ],
}
