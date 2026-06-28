import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import { LOCALES, toLocale, type Locale } from '@/lib/locale'
import { SITE_NAME, ogLocale } from '@/lib/seo'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      'How Smile Island Dental Clinic handles website usage data, analytics tools, and cookies, and your choice to accept or reject non-essential cookies.',
  },
  ar: {
    title: `سياسة الخصوصية | ${SITE_NAME}`,
    description:
      'كيف تتعامل عيادة سمايل ايلاند لطب الأسنان مع بيانات استخدام الموقع وأدوات التحليل وملفات تعريف الارتباط، وحقك في قبول أو رفض الملفات غير الضرورية.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc = toLocale(locale)
  const path = `/${loc}/privacy-policy`
  const { title, description } = meta[loc]

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: '/en/privacy-policy',
        ar: '/ar/privacy-policy',
        'x-default': '/en/privacy-policy',
      },
    },
    openGraph: {
      siteName: SITE_NAME,
      title,
      description,
      type: 'article',
      locale: ogLocale(loc),
      url: path,
    },
  }
}

interface Section {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

const content: Record<
  Locale,
  { title: string; updated: string; intro: string; sections: Section[] }
> = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: June 2026',
    intro:
      'This Privacy Policy explains how Smile Island Dental Clinic handles information when you visit this website. We aim to keep data collection minimal and transparent.',
    sections: [
      {
        heading: 'Information we collect',
        paragraphs: [
          'When you browse this website, limited technical and usage information may be collected to help us understand how the site is used and to improve it. This typically includes:',
        ],
        bullets: [
          'Website usage data and the pages you visit',
          'Device and browser information',
          'Your approximate region (derived from your IP address, not a precise location)',
        ],
      },
      {
        heading: 'Contacting us',
        paragraphs: [
          'When you choose to contact us through WhatsApp or by phone, you do so using your own messaging or calling app. Any details you share in that conversation are handled directly between you and the clinic. Please do not send sensitive medical information through the website.',
        ],
      },
      {
        heading: 'Analytics and marketing tools',
        paragraphs: [
          'We may use the following third-party tools to measure and improve the website. Where these tools rely on non-essential cookies, they are only activated after you accept cookies:',
        ],
        bullets: [
          'Google Search Console — to monitor how the site appears in search results',
          'Microsoft Clarity — to understand how visitors interact with pages',
          'Meta Pixel — to measure page views for basic marketing performance',
        ],
      },
      {
        heading: 'Cookies and your choice',
        paragraphs: [
          'Essential functions of the website work without optional cookies. Non-essential cookies (such as analytics and marketing) are only used after you accept them in the cookie banner. You can accept or reject non-essential cookies at any time, and rejecting them will not block your access to the website.',
        ],
      },
      {
        heading: 'Sensitive information',
        paragraphs: [
          'This website is for general information and contact only. Please do not submit sensitive medical or personal health information through the website. Medical matters should be discussed directly with the clinic during a consultation.',
        ],
      },
      {
        heading: 'Updates to this policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. Any changes will be reflected on this page with a revised date.',
        ],
      },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    updated: 'آخر تحديث: يونيو 2026',
    intro:
      'توضح سياسة الخصوصية هذه كيفية تعامل عيادة سمايل ايلاند لطب الأسنان مع المعلومات عند زيارتك لهذا الموقع. نحرص على أن يكون جمع البيانات محدوداً وواضحاً.',
    sections: [
      {
        heading: 'المعلومات التي نجمعها',
        paragraphs: [
          'عند تصفحك للموقع، قد يتم جمع معلومات تقنية واستخدامية محدودة لمساعدتنا في فهم طريقة استخدام الموقع وتحسينه. وتشمل عادةً:',
        ],
        bullets: [
          'بيانات استخدام الموقع والصفحات التي تزورها',
          'معلومات عن الجهاز والمتصفح',
          'منطقتك التقريبية (المستنتجة من عنوان الـ IP، وليست موقعاً دقيقاً)',
        ],
      },
      {
        heading: 'التواصل معنا',
        paragraphs: [
          'عند اختيارك التواصل معنا عبر واتساب أو الهاتف، فإنك تستخدم تطبيق المراسلة أو الاتصال الخاص بك. وأي تفاصيل تشاركها في تلك المحادثة تتم مباشرةً بينك وبين العيادة. نرجو عدم إرسال أي معلومات طبية حساسة عبر الموقع.',
        ],
      },
      {
        heading: 'أدوات التحليل والتسويق',
        paragraphs: [
          'قد نستخدم الأدوات التالية من جهات خارجية لقياس أداء الموقع وتحسينه. وعندما تعتمد هذه الأدوات على ملفات تعريف ارتباط غير ضرورية، فإنها لا تُفعَّل إلا بعد موافقتك على ملفات تعريف الارتباط:',
        ],
        bullets: [
          'Google Search Console — لمتابعة ظهور الموقع في نتائج البحث',
          'Microsoft Clarity — لفهم كيفية تفاعل الزوار مع الصفحات',
          'Meta Pixel — لقياس مشاهدات الصفحات لأغراض تسويقية أساسية',
        ],
      },
      {
        heading: 'ملفات تعريف الارتباط وخيارك',
        paragraphs: [
          'تعمل الوظائف الأساسية للموقع دون الحاجة إلى ملفات تعريف الارتباط الاختيارية. أما الملفات غير الضرورية (مثل التحليل والتسويق) فلا تُستخدم إلا بعد قبولك لها من شريط ملفات تعريف الارتباط. يمكنك قبول أو رفض الملفات غير الضرورية في أي وقت، ولن يؤثر الرفض على وصولك إلى الموقع.',
        ],
      },
      {
        heading: 'المعلومات الحساسة',
        paragraphs: [
          'هذا الموقع مخصص للمعلومات العامة والتواصل فقط. نرجو عدم إرسال أي معلومات طبية أو صحية حساسة عبر الموقع. تتم مناقشة الأمور الطبية مباشرةً مع العيادة أثناء الكشف.',
        ],
      },
      {
        heading: 'تحديثات هذه السياسة',
        paragraphs: [
          'قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. وستظهر أي تغييرات على هذه الصفحة مع تحديث التاريخ.',
        ],
      },
    ],
  },
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = toLocale(locale)
  const isAr = loc === 'ar'
  const c = content[loc]

  return (
    <>
      <Header locale={loc} />
      <main className="flex-1 bg-[#FAF6F2]" dir={isAr ? 'rtl' : 'ltr'}>
        <Container className="py-[56px] md:py-[80px]">
          <div className="mx-auto max-w-[760px]">
            <h1 className="font-[family-name:var(--font-heading)] text-[34px] leading-[1.15] text-[#352514] md:text-[48px]">
              {c.title}
            </h1>
            <p className="mt-[10px] text-[13px] text-[#9c673f] md:text-[14px]">
              {c.updated}
            </p>

            <p className="mt-[24px] text-[15px] leading-[1.7] text-[#5b4a3a] md:text-[17px]">
              {c.intro}
            </p>

            <div className="mt-[32px] flex flex-col gap-[28px] md:mt-[40px] md:gap-[36px]">
              {c.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-[family-name:var(--font-heading)] text-[22px] leading-[1.25] text-[#352514] md:text-[26px]">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((p, i) => (
                    <p
                      key={i}
                      className="mt-[12px] text-[15px] leading-[1.7] text-[#5b4a3a] md:text-[16px]"
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-[14px] flex list-disc flex-col gap-[8px] ps-[22px] text-[15px] leading-[1.7] text-[#5b4a3a] md:text-[16px]">
                      {section.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer locale={loc} />
    </>
  )
}
