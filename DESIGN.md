# DESIGN.md — Smile Island Dental Clinic Website

## 0. Purpose

Build a production-ready website for **Smile Island Dental Clinic** from the provided Figma/PDF references.

The goal is **high visual fidelity** to the design. This is not a redesign. The implemented website should feel visually the same as the Figma references across:

- Desktop English
- Desktop Arabic RTL
- Mobile English homepage
- Mobile service page
- Service detail template

This document is the main development brief for **Claude Code in VS Code**.

---

## 1. Final Project Decisions

### Main development tool

Use **Claude Code inside VS Code** as the main development tool.

Do not use multiple AI coding tools to edit the project at the same time.

### Design source of truth

Use sources in this order:

1. **Figma file via Figma MCP** if connected
2. Exported Figma assets in `/public/images`
3. PDF/screenshots in `/design-reference`
4. This `DESIGN.md` for content, behavior, routes, CMS rules, and implementation constraints

The Figma design is visually authoritative. This file explains how to convert it into maintainable code.

### Deployment decision

Final deployment target: **Netlify Free**.

The code should remain a standard Next.js App Router project so it can also be moved to Vercel later if needed.

### CMS decision

Use **Sanity CMS**, but only after the static website is visually close.

### Language decision

The website is bilingual:

- English: LTR
- Arabic: RTL

The root route `/` should detect browser language and redirect to `/ar` or `/en`.

Fallback behavior:

- If the browser language starts with `ar`, redirect to `/ar`
- Otherwise redirect to `/en`

---

## 2. Reference Files

Place all references under:

```txt
/design-reference/
  Homepage.pdf
  Homepage - Arabic.pdf
  Homepage - mobile.pdf
  Service page.pdf
  Service page - Arabic.pdf
  Services - mobile.pdf
```

The uploaded mobile homepage reference confirms this mobile homepage order:

1. Hero
2. Stats
3. About Us
4. Popular Treatments
5. Before & After
6. All Services
7. Testimonials
8. FAQ
9. Contact Details
10. Final CTA/Footer

The uploaded `Services - mobile.pdf` is the mobile reference for the service detail page, not the homepage.

---

## 3. Required Folder Setup

Use this folder structure:

```txt
smile-island/
  DESIGN.md
  package.json
  next.config.ts
  tsconfig.json
  tailwind.config.ts
  postcss.config.mjs

  design-reference/
    Homepage.pdf
    Homepage - Arabic.pdf
    Homepage - mobile.pdf
    Service page.pdf
    Service page - Arabic.pdf
    Services - mobile.pdf

  public/
    fonts/
      playfair-display/
        PlayfairDisplay-Regular.woff2
        PlayfairDisplay-Italic.woff2
        PlayfairDisplay-Bold.woff2
        PlayfairDisplay-BoldItalic.woff2

    images/
      logo/
        logo-en.svg
        logo-ar.svg
        logo-white.svg

      hero/
        hero-team.png
        hero-shape.svg

      about/
        about-dental-treatment.jpg

      services/
        teeth-cleaning.jpg
        laser-whitening.jpg
        dental-fillings.jpg
        root-canal.jpg
        dental-implants.jpg
        fixed-prosthetics.jpg
        removable-dentures.jpg
        gum-contouring.jpg
        pediatric-dentistry.jpg
        online-consultation.jpg
        oral-surgery.jpg

      before-after/
        home-01.jpg
        home-02.jpg
        home-03.jpg
        home-04.jpg
        home-05.jpg
        home-06.jpg
        home-07.jpg
        home-08.jpg
        home-09.jpg
        home-10.jpg
        home-11.jpg
        home-12.jpg
        services/
          veneers-01-before.jpg
          veneers-01-after.jpg
          implants-01-before.jpg
          implants-01-after.jpg

      testimonials/
        malak-adel.jpg
        islam-hassan.jpg
        tamer-ali.jpg
        basel-mashal.jpg
        ahmed-tarek.jpg

      contact/
        clinic-photo.jpg
        map-image.jpg

      icons/
        whatsapp.svg
        phone.svg
        location.svg
        clock.svg
        facebook.svg
        instagram.svg
        tiktok.svg
        google.svg
        youtube.svg

  src/
    app/
      layout.tsx
      page.tsx
      globals.css

      [locale]/
        layout.tsx
        page.tsx
        services/
          [slug]/
            page.tsx

      studio/
        [[...tool]]/
          page.tsx

    components/
      layout/
        Header.tsx
        Footer.tsx
        FinalCTA.tsx

      sections/
        HeroSection.tsx
        AboutSection.tsx
        PopularTreatmentsSection.tsx
        BeforeAfterSection.tsx
        ServicesSection.tsx
        TestimonialsSection.tsx
        FAQSection.tsx
        ContactSection.tsx
        ServiceHeroSection.tsx
        StepsSection.tsx

      ui/
        Button.tsx
        Container.tsx
        SectionHeading.tsx
        Card.tsx
        ServicePill.tsx
        ContactCard.tsx
        BeforeAfterCard.tsx
        BeforeAfterSlider.tsx
        VideoTestimonialCard.tsx
        ReviewCard.tsx
        FAQAccordion.tsx
        Reveal.tsx

    lib/
      data.ts
      locale.ts
      whatsapp.ts
      utils.ts

    sanity/
      lib/
        client.ts
        image.ts
        queries.ts
      schemaTypes/
        index.ts
        siteSettings.ts
        homePage.ts
        service.ts
        beforeAfterCase.ts
        testimonial.ts
        faq.ts
```

If the project is created without `src/`, it is acceptable, but keep the same logical structure.

---

## 4. Non-Negotiable Requirements

1. Match the Figma/PDF design closely.
2. Do not copy the messy Figma layer structure into code.
3. Build a clean component system that reproduces the visual result.
4. Build static pages with local data first.
5. Add Sanity only after the static design is visually close.
6. English pages are LTR.
7. Arabic pages are RTL.
8. Shared components must support both directions.
9. Use simple bilingual fields: `titleEn`, `titleAr`, `descriptionEn`, `descriptionAr`.
10. Do not add paid dependencies without approval.
11. Use subtle premium animation, not heavy animations.
12. Run `npm run build` after every major phase and fix errors before continuing.
13. Keep the implementation simple enough to finish within the deadline.
14. Remove email from the entire website. Do not display email anywhere.
15. Contact and booking buttons should open WhatsApp.
16. The site should be CMS-editable only where needed, not fully layout-editable.

---

## 5. Recommended Tech Stack

```txt
Next.js App Router
TypeScript
Tailwind CSS
Sanity CMS
next-sanity
Netlify final deployment
GitHub
```

Avoid unnecessary experimental features.

Recommended dependencies later if needed:

```txt
framer-motion
lucide-react
@sanity/client
next-sanity
@sanity/image-url
```

Do not add dependencies until they are needed.

---

## 6. Routes

Required:

```txt
/
 /en
 /ar
 /en/services/[slug]
 /ar/services/[slug]
 /studio
```

Behavior:

```txt
/ detects browser language and redirects to /ar or /en
/en uses LTR
/ar uses RTL
/en/services/[slug] uses English content
/ar/services/[slug] uses Arabic content
```

If browser-language redirect becomes complicated, use middleware. Keep it simple.

---

## 7. Typography

### Final font decision

Use **Playfair Display**, not Live Display.

### Font usage

```txt
Headings: Playfair Display
Italic/accent heading words: Playfair Display Italic
Body text: Plus Jakarta Sans
Navigation: Plus Jakarta Sans
Buttons: Plus Jakarta Sans
Cards and small labels: Plus Jakarta Sans
```

### Local font setup

Playfair Display is provided as local font files and must be loaded with `next/font/local`.

Expected folder:

```txt
public/fonts/playfair-display/
```

Preferred files:

```txt
PlayfairDisplay-Regular.woff2
PlayfairDisplay-Italic.woff2
PlayfairDisplay-Bold.woff2
PlayfairDisplay-BoldItalic.woff2
```

Minimum required files:

```txt
PlayfairDisplay-Regular.woff2
PlayfairDisplay-Italic.woff2
```

Use `next/font/local` for Playfair Display.

Use `next/font/google` for Plus Jakarta Sans unless local font files are provided.

Do not substitute Playfair Display unless the local files are missing.

### Heading style

Many headings mix normal and italic parts, for example:

```txt
Exceptional Smile Fairly Priced
Popular Treatments
Before & After
All Services
What Our Clients Say
Questions? We’ve got you covered
Contact Us
Your perfect smile starts with a simple conversation.
```

Build a reusable `SectionHeading` component that supports:

```tsx
<SectionHeading
  title="Before"
  accent="& After"
/>
```

or supports custom JSX for mixed normal/italic heading words.

---

## 8. Core Visual Direction

The website should feel:

```txt
Premium
Warm
Soft medical luxury
Elegant
Clean
Trustworthy
Dental/beauty clinic aesthetic
```

Visual characteristics:

```txt
Warm off-white background
Dark brown brand sections
Cream cards
Rounded images
Pill-shaped buttons
Elegant Playfair Display headings
Italic accent words in headings
Soft abstract smile/dental background shapes
Centered section headings
Subtle spacing and soft shadows
```

### Approximate design tokens

Use exact Figma values if available through MCP. If not available, start with these and refine visually.

```css
--color-background: #F7F2ED;
--color-surface: #FBF7F3;
--color-card: #F4EEE8;
--color-card-light: #FAF6F1;
--color-brown: #5B3F28;
--color-brown-dark: #3D2A1B;
--color-tan: #A87956;
--color-text: #2C2119;
--color-text-muted: #7C6F66;
--color-border: rgba(91, 63, 40, 0.12);
--color-white: #FFFFFF;
```

Layout:

```txt
Desktop max-width: 1120px–1200px
Desktop section padding: 72px–110px
Mobile section padding: 48px–72px
Mobile horizontal padding: 20px
Large image radius: 18px–28px
Cards radius: 14px–20px
Buttons/pills radius: 999px
```

---

## 9. Motion / Animation Direction

The website should not feel static. It should feel premium and calm.

Use subtle motion:

```txt
Sections fade up when entering viewport
Cards/items can stagger slightly
Buttons can have soft hover movement
Popular treatment cards move slowly from right to left
Respect reduced-motion preferences
Avoid heavy animation
Avoid animation that hurts performance
```

Recommended implementation:

```txt
Use CSS transitions for hover states
Use a small Reveal component for fade-up sections
Use framer-motion only if needed and kept simple
Use CSS keyframes for slow marquee treatment cards
```

### Popular Treatments movement

Popular treatment cards should move automatically and slowly from right to left.

Behavior:

```txt
Desktop: horizontal row/marquee feel
Mobile: horizontal scroll or slow movement if it remains usable
Hover: small visual hover effect; optional pause/slowdown
Click: buttons work normally
```

---

## 10. Global Structure

All pages share:

```txt
Header
Main content
Final CTA
Footer
```

### Header

Desktop:

```txt
Logo
Navigation links
Contact Us button
```

English nav:

```txt
Home
Services
Testimonials
Contact Us
```

Arabic nav:

```txt
الرئيسية
الخدمات
آراء العملاء
تواصل معنا
```

Mobile:

```txt
Logo
Hamburger/menu icon
Collapsible menu
```

### Footer

Footer includes:

```txt
Logo
Navigation links
Social icons
Copyright
```

Copyright:

```txt
© 2026 Smile Island. All rights reserved.
```

Arabic footer mirrors RTL.

---

## 11. Final Real Content

### About Us

English:

```txt
At Smile Island Clinic, we are a team of specialized dentists covering all fields of dentistry, working together to provide comprehensive and high-quality care.

We use the latest advanced dental technologies and equipment to ensure accurate diagnosis, effective treatment, and the best results for our patients.

Our goal is to provide professional, comfortable care tailored to meet the needs of every smile, with high quality and affordable prices.
```

Arabic:

```txt
في عيادة سمايل ايلاند نحن فريق من أطباء الأسنان المتخصصين في جميع مجالات طب الأسنان، نعمل معاً لتقديم رعاية شاملة وعالية الجودة.

نستخدم أحدث تقنيات وأجهزة طب الأسنان المتطورة لضمان دقة التشخيص، وفعالية العلاج، وتحقيق أفضل النتائج لمرضانا.

هدفنا هو تقديم رعاية احترافية ومريحة ومصممة خصيصاً لتناسب احتياجات كل ابتسامة بأعلى جودة وسعر مناسب.
```

### Contact details

Do not show email anywhere.

```txt
WhatsApp: 01556955994
Phone: 01553055302
Address English: 82 El-Tayar Ahmed Saoud Street, Bolkly, Alexandria, Egypt.
Address Arabic: ٨٢ ش الطيار احمد سعود، بولكلي، الإسكندرية.
```

Working hours English:

```txt
Friday: Closed

Saturday / Wednesday / Thursday:
5 PM – 10 PM

Sunday / Monday / Tuesday:
1 PM – 4 PM
5 PM – 10 PM
```

Working hours Arabic:

```txt
الجمعة: إجازة

السبت / الأربعاء / الخميس:
٥ م - ١٠ م

الأحد / الإثنين / الثلاثاء:
١ ظ - ٤ ع
٥ م - ١٠ م
```

### Social links

```txt
Facebook: https://www.facebook.com/share/1AxoRvQEzX/
Instagram: https://www.instagram.com/smileislandclinic
TikTok: https://www.tiktok.com/@smile.island.clin?_r=1&_t=ZS-96WwttR5f8B
Google: https://share.google/ojM0H7Dg1lkn4k4Jj
YouTube: https://www.youtube.com/@smileislanddentalclinic
```

### WhatsApp behavior

All “Contact Us” and “Book Service” buttons open WhatsApp.

Default number:

```txt
01556955994
```

Default message:

```txt
Hello, I want to book an appointment at Smile Island Dental Clinic.
```

Service-specific message if simple:

```txt
Hello, I want to book an appointment for [SERVICE NAME] at Smile Island Dental Clinic.
```

Arabic service-specific message if simple:

```txt
مرحباً، أريد حجز موعد لخدمة [SERVICE NAME] في عيادة سمايل ايلاند.
```

Use a helper in `lib/whatsapp.ts`.

---

## 12. Homepage

### Section order

Desktop and mobile homepage sections:

1. Header
2. Hero
3. About Us
4. Popular Treatments
5. Before & After
6. All Services
7. Testimonials
8. FAQ
9. Contact
10. Final CTA/Footer

Mobile order from `Homepage - mobile.pdf`:

1. Hero
2. Stats
3. About Us
4. Popular Treatments
5. Before & After
6. All Services
7. Testimonials
8. FAQ
9. Contact Details
10. Footer CTA

---

### 12.1 Hero

English copy:

```txt
Exceptional Smile Fairly Priced
Restore your smile with experienced dentists providing quality care at fair pricing.
Contact Us
Explore services
Healthy Smile
Trusted by thousands
100% Satisfaction
5.00
120+ Reviews
```

Arabic equivalent:

```txt
ابتسامة استثنائية بأسعار معقولة
استعد ابتسامتك مع أطباء أسنان ذوي خبرة يقدمون رعاية عالية الجودة بأسعار عادلة.
تواصل معنا
اكتشف الخدمات
ابتسامة صحية
موثوق بها من قبل الآلاف
100% رضا
5.00
120+ تقييم
```

Design notes:

```txt
Large centered heading
Short subtitle
Two CTA buttons
Team/doctors image
Stats overlay near bottom of hero image/card
Soft decorative background shapes
Mobile stacks content and image
```

CMS dynamic later:

```txt
heroTitleEn/Ar
heroSubtitleEn/Ar
reviewCount
heroImage
```

---

### 12.2 About Us

Use real About Us content from section 11.

Design:

```txt
Centered heading
Paragraph text
Large rounded dental image
Subtle abstract shape
```

CMS later:

```txt
aboutTitleEn/Ar
aboutTextEn/Ar
aboutImage
```

---

### 12.3 Popular Treatments

Final popular treatments:

```txt
Veneers
Dental Implants
Gum Contouring
```

Cards include:

```txt
Number
Title
Short description
Image
See service details button
Book service button
```

Movement:

```txt
Cards move slowly from right to left
Motion should feel calm and premium
Mobile must remain usable
```

Buttons:

```txt
See service details -> service detail page
Book service -> WhatsApp service-specific message
```

CMS later:

```txt
popularTreatments[] references selected services
```

---

### 12.4 Homepage Before & After

Homepage before/after:

```txt
Show 10–12 real before/after images/cases
Not a complex interactive comparison slider
Can be a responsive row/carousel/scroll gallery
Use real approved patient images only
```

CMS later:

```txt
beforeAfterCases[] max around 12
```

---

### 12.5 All Services Section

This is the dark brown section.

Service list behavior:

```txt
Clicking a service changes the preview content.
Hovering only gives a small visual hover effect.
The selected service should be visually active.
Buttons inside preview:
  Book Service -> WhatsApp service-specific message
  See service details -> service page
```

Do not change preview on hover.

Services shown:

1. Teeth Cleaning & Polishing
2. Laser Teeth Whitening
3. Dental Fillings
4. Root Canal Treatment
5. Dental Implants
6. Fixed Prosthetics
7. Removable Dentures
8. Gum Contouring
9. Pediatric Dentistry
10. Online Consultation
11. Oral Surgery / Tooth Extraction

If layout space is limited, allow wrapping pills or two columns.

---

### 12.6 Testimonials

Use two testimonial types:

1. Video testimonials
2. Google review cards

#### Video testimonials

Use exactly five YouTube Shorts links:

```txt
https://www.youtube.com/shorts/HGeLuwr5pqw
https://www.youtube.com/shorts/BRhmBL2GJpI
https://www.youtube.com/shorts/seNOy6tXtE4
https://www.youtube.com/shorts/SsPpyrb-TWs
https://www.youtube.com/shorts/XySmRoalrJ4
```

Do not load YouTube iframes immediately on page load.

Implementation:

```txt
Show thumbnail card with play icon
On click, open YouTube in new tab or lazy-load modal/embed
Prefer opening in new tab for speed and deadline safety
```

Names:

```txt
Malak Adel
Islam Hassan
Tamer Ali
Basel Mashal
Ahmed Tarek
```

#### Google review cards

Use 7 best Google reviews from the provided content.

Recommended 7:

1. Mayar Hassan
2. Ahmed Elsmahy
3. Dalia Aboshady
4. Ahmed Tarek
5. Rahma Alhosary
6. Nourhan Ragab
7. Mohamed Adu Mazen

All are 5-star reviews.

Google reviews are static for launch.

---

### 12.7 FAQ

Use these English FAQs:

```txt
Q: Are all instruments fully sterilized?
A: Yes, we follow the highest sterilization and infection control standards. All instruments are fully sterilized between each patient using advanced sterilization systems, and every patient has their own dedicated instruments to ensure maximum safety and hygiene.

Q: How long do teeth whitening results last?
A: Teeth whitening results typically last from 6 months to 1 year, depending on oral care habits and reducing stain-causing factors such as coffee, smoking, and colored beverages.

Q: Can extraction and dental implant placement be done in the same session?
A: Yes, in some cases immediate implant placement can be performed during the same session after proper evaluation and X-rays. The entire procedure usually takes less than one hour.

Q: What payment methods are available?
A: We offer multiple payment options for your convenience, including cash, InstaPay, We Pay, Vodafone Cash, and Fawry.

Q: Are dental X-rays available at the clinic?
A: Yes, dental X-rays are available at the clinic to save time, help diagnose problems accurately, and provide the most suitable treatment plan efficiently.

Q: Will I feel pain during extraction, implant placement, or gum contouring procedures?
A: All procedures are performed under local anesthesia to ensure a comfortable experience with minimal discomfort, while patients are carefully monitored during and after the procedure.
```

Use the Arabic FAQs from the content file for `/ar`.

FAQ may be static for launch; Sanity optional later.

---

### 12.8 Contact Section

Contact should show:

```txt
WhatsApp
Phone
Address
Working Hours
Map/clinic image
```

Do not show email.

Working hours are dynamic in Sanity later.

---

## 13. Service Detail Page Template

Service detail pages are reusable for all 11 services.

Routes:

```txt
/en/services/[slug]
/ar/services/[slug]
```

Structure:

1. Header
2. Service hero
3. Large rounded service image
4. Our Steps
5. Before & After
6. Contact
7. Final CTA/Footer

### Service hero

Fields:

```txt
Service Name
Description
Contact Us button
Check other services button
Large rounded service image
```

Buttons:

```txt
Contact Us -> WhatsApp with service-specific message
Check other services -> /[locale]#services or /[locale]/services if created later
```

### Steps

Each service should have unique steps when provided.

Online Consultation should still show a steps section. Do not hide it. If no official steps are provided, create simple approved-feeling steps from its consultation flow.

### Service Before & After

Service pages should show a maximum of 3 before/after cases.

Unlike the homepage, the service page before/after section should be interactive.

Recommended:

```txt
Before/after comparison slider per case
Max 3 cases
Mobile stacked or swipeable
```

If building a true comparison slider takes too long, implement a simple before/after side-by-side card first, then improve.

---

## 14. Final Service List and Content

There are 11 services.

### 1. Teeth Cleaning & Polishing

Slug:

```txt
teeth-cleaning-polishing
```

Arabic title:

```txt
تنظيف وتلميع الأسنان
```

English overview:

```txt
A simple procedure to remove tartar (dental calculus) using an ultrasonic scaler and stains caused by smoking and coffee while improving gum health and freshening breath.
```

Arabic overview:

```txt
إجراء بسيط لإزالة الجير والتصبغات الناتجة عن السجائر والقهوة وتحسين صحة اللثة ورائحة الفم.
```

Steps English:

```txt
Quick examination of teeth and gums
Removing tartar using an ultrasonic scaler
Polishing the teeth to remove stains
```

Steps Arabic:

```txt
فحص سريع للأسنان واللثة
إزالة الجير باستخدام جهاز الالتراسونيك
تلميع الأسنان لإزالة التصبغات
```

---

### 2. Laser Teeth Whitening

Slug:

```txt
laser-teeth-whitening
```

Arabic title:

```txt
تبييض الأسنان بالليزر
```

English overview:

```txt
A cosmetic procedure that brightens the teeth shade by 2 to 4 shades, depending on the number of sessions.
```

Arabic overview:

```txt
إجراء تجميلي لتفتيح لون الأسنان من درجتين إلى 4 درجات حسب عدد الجلسات.
```

Steps English:

```txt
Examining the teeth and ensuring they are healthy
Cleaning the teeth first
Applying the whitening gel and activating it with a laser device for 20 minutes
Evaluating the final result
```

Steps Arabic:

```txt
فحص الأسنان والتأكد من سلامتها
تنظيف الأسنان أولاً
وضع مادة التبييض وتنشيطها بجهاز الليزر لمدة 20 دقيقة
تقييم النتيجة النهائية
```

---

### 3. Dental Fillings

Slug:

```txt
dental-fillings
```

Arabic title:

```txt
حشو الأسنان
```

English overview:

```txt
Removing tooth decay and restoring the natural shape and function of the tooth.
```

Arabic overview:

```txt
إزالة التسوس واستعادة شكل ووظيفة السن بشكل طبيعي.
```

Steps English:

```txt
Detecting the decay through examination and X-rays, then removing it to prepare the tooth for the filling
Placing, shaping, and polishing the filling for a natural look
```

Steps Arabic:

```txt
تحديد مكان التسوس بعد الكشف والأشعة وإزالته لتجهيز السن لاستقبال الحشو
وضع الحشو وتشكيله وتلميعه ليبدو طبيعياً
```

---

### 4. Root Canal Treatment

Slug:

```txt
root-canal-treatment
```

Arabic title:

```txt
علاج العصب
```

English overview:

```txt
Treating the tooth in cases of infection or severe pain to save the tooth instead of extracting it.
```

Arabic overview:

```txt
علاج عصب السن عند وجود التهاب أو ألم شديد للحفاظ على السن بدل خلعه.
```

Steps English:

```txt
Diagnosing the condition with X-rays and identifying the exact cause of pain
Cleaning and sealing the root canals carefully
Restoring the tooth with a final filling or crown
```

Steps Arabic:

```txt
تشخيص الحالة بالأشعة وتحديد سبب الألم بدقة
تنظيف قنوات الجذر وحشو القنوات بإحكام
ترميم السن بحشو نهائي أو تركيبة
```

---

### 5. Dental Implants

Slug:

```txt
dental-implants
```

Arabic title:

```txt
زراعة الأسنان
```

English overview:

```txt
Replacing missing tooth roots with fixed dental implants to restore natural appearance and function, performed by a dental implant specialist.
```

Arabic overview:

```txt
تعويض جذور الأسنان المفقودة بزرعة ثابتة لاستعادة الشكل الطبيعي والوظيفة مع أخصائي زراعة الأسنان.
```

Steps English:

```txt
Comprehensive examination, X-rays, and evaluation of the most suitable treatment plan
Placing the implant into the jawbone and waiting 3–6 months for proper bone healing and long-term stability
Placing the abutment and the final crown
```

Steps Arabic:

```txt
فحص شامل وأشعة وتقييم خطة العلاج المناسبة حسب الحالة
وضع الزرعة في عظم الفك وانتظار من 3 إلى 6 شهور لالتئام العظم حولها لضمان ثباتها
تركيب الدعامة والتركيبة النهائية
```

---

### 6. Fixed Prosthetics

Slug:

```txt
fixed-prosthetics
```

Arabic title:

```txt
التركيبات الثابتة
```

English overview:

```txt
A fixed solution to restore damaged, root canal–treated, or missing teeth and bring back a natural smile using different materials including Resin, Porcelain, Zirconia, and E-max.
```

Arabic overview:

```txt
حل ثابت لتعويض الأسنان والضروس بعد علاج العصب أو المفقودة واستعادة الابتسامة الطبيعية بأنواع مختلفة مثل الريزن، البورسلين، الزيركون، والإيماكس.
```

Steps English:

```txt
Examining the teeth and determining the treatment plan
Preparing the teeth and taking digital impressions using a digital scanner
Designing the restoration to fit the patient’s case, with delivery within 24 hours
Cementing the final restoration
```

Steps Arabic:

```txt
فحص الأسنان وتحديد الخطة العلاجية
تحضير الأسنان وأخذ المقاسات بجهاز الديجيتال سكانر
تصميم التركيبة بالمقاس المناسب للحالة والاستلام خلال 24 ساعة
تثبيت التركيبة النهائية
```

---

### 7. Removable Dentures

Slug:

```txt
removable-dentures
```

Arabic title:

```txt
التركيبات المتحركة
```

English overview:

```txt
A removable solution to replace missing teeth, improving chewing ability and appearance.
```

Arabic overview:

```txt
تعويض للأسنان المفقودة يمكن إزالته بسهولة لتحسين المضغ والمظهر.
```

Steps English:

```txt
Examining the mouth and gums
Taking precise impressions
Trying the denture to ensure comfort and proper fit
Delivering the final denture
Explaining how to use and clean it
```

Steps Arabic:

```txt
فحص الفم واللثة
أخذ القياسات الدقيقة
تجربة التركيبة للتأكد من الراحة
تركيب الطقم النهائي
شرح طريقة الاستخدام والتنظيف
```

---

### 8. Gum Contouring

Slug:

```txt
gum-contouring
```

Arabic title:

```txt
قص اللثة
```

English overview:

```txt
A cosmetic and therapeutic procedure to improve the appearance of the gums and teeth, performed by a gum surgery and cosmetic specialist.
```

Arabic overview:

```txt
إجراء تجميلي وعلاجي لتحسين شكل اللثة والأسنان مع أخصائي جراحة وتجميل اللثة.
```

Steps English:

```txt
Assessing gum shape and health through examination and required X-rays
Local anesthesia followed by removing excess gum tissue and bone if needed, depending on the diagnosis
Follow-up care and post-treatment instructions for proper healing
```

Steps Arabic:

```txt
تقييم شكل وصحة اللثة بعد الفحص والأشعة المطلوبة
تخدير موضعي وإزالة الجزء الزائد من اللثة أو اللثة والعظم حسب التشخيص
متابعة التعافي وتعليمات العناية
```

---

### 9. Pediatric Dentistry

Slug:

```txt
pediatric-dentistry
```

Arabic title:

```txt
أسنان الأطفال
```

English overview:

```txt
Specialized dental care for children to maintain oral health and provide a comfortable, safe experience for the child.
```

Arabic overview:

```txt
رعاية متخصصة لأسنان الأطفال للحفاظ على صحة الفم وبناء تجربة مريحة وآمنة للطفل.
```

Steps English:

```txt
Examining teeth and gums, diagnosing the condition, and determining the appropriate treatment
Treating cavities or placing fillings when needed
Applying preventive fluoride treatment
Providing guidance on daily oral care and proper nutrition
```

Steps Arabic:

```txt
فحص الأسنان واللثة وتشخيص الحالة وتحديد الإجراء المناسب
علاج التسوس أو الحشوات عند الحاجة
تطبيق الفلورايد الوقائي
تقديم نصائح للعناية اليومية والتغذية المناسبة
```

---

### 10. Online Consultation

Slug:

```txt
online-consultation
```

Arabic title:

```txt
الاستشارة أونلاين
```

English overview:

```txt
A convenient and safe consultation with a specialist dentist to discuss dental concerns, get an initial assessment, and determine the best treatment plan without an immediate clinic visit.
```

Arabic overview:

```txt
استشارة مريحة وآمنة مع الطبيب الأخصائي لمناقشة مشكلات الأسنان، تقييم الحالة مبدئياً، وتحديد أفضل خطوات العلاج دون الحاجة لزيارة فورية.
```

Suggested steps English:

```txt
Send your concern and available photos or X-rays if available
The specialist reviews your case and symptoms
Receive an initial assessment and recommended next steps
Book an in-clinic visit if treatment is needed
```

Suggested steps Arabic:

```txt
إرسال المشكلة والصور أو الأشعة المتاحة إن وجدت
يقوم الطبيب المختص بمراجعة الحالة والأعراض
الحصول على تقييم مبدئي والخطوات المقترحة
حجز زيارة في العيادة إذا كانت هناك حاجة للعلاج
```

Do not hide the steps section for this service.

---

### 11. Oral Surgery / Tooth Extraction

Slug:

```txt
oral-surgery-tooth-extraction
```

Arabic title:

```txt
جراحة الفم والأسنان / خلع الأسنان
```

English overview:

```txt
Simple or surgical extraction of teeth or molars depending on the condition of the tooth.
```

Arabic overview:

```txt
خلع الضروس والأسنان بشكل عادي أو جراحي حسب الحالة.
```

Steps English:

```txt
Clinical examination and X-rays to evaluate the case
Performing the extraction under local anesthesia and removing the tooth or molar in the same session
```

Steps Arabic:

```txt
الفحص الإكلينيكي والأشعة لتقييم الحالة
إجراء الخلع تحت التخدير الموضعي وخلع السن أو الضرس في نفس الجلسة
```

---

## 15. CMS Rules

Do not implement Sanity until static pages are visually close.

### Dynamic content from notes

The following should be manageable in Sanity later:

```txt
Hero title
Hero subtitle
Number of reviews
Popular treatments
Homepage before/after photos, around 10–12
Working hours only inside contact details
Service page steps
Service page before/after photos, max 3
Questions/FAQ optional
```

### Static content from notes

The following can be static for launch:

```txt
Google reviews
Video testimonials
Most layout/spacing/colors
Contact structure
Navigation structure
Footer layout
```

### Remove email

The notes explicitly say to remove email from the whole site.

Do not include email in:

```txt
Contact section
Footer
Schema
UI cards
Sanity fields unless kept private and not rendered
```

---

## 16. Sanity Content Model

Implement later.

### siteSettings

```txt
siteNameEn
siteNameAr
logo
logoWhite
phone
whatsapp
addressEn
addressAr
mapEmbedUrl
mapImage
workingHoursEn
workingHoursAr
socialLinks[]
seoTitleEn
seoTitleAr
seoDescriptionEn
seoDescriptionAr
```

No public email field.

### homePage

```txt
heroTitleEn
heroTitleAr
heroSubtitleEn
heroSubtitleAr
heroImage
reviewCount
primaryCtaLabelEn
primaryCtaLabelAr
secondaryCtaLabelEn
secondaryCtaLabelAr
aboutTitleEn
aboutTitleAr
aboutTextEn
aboutTextAr
aboutImage
popularTreatments[] reference to service
beforeAfterCases[]
faqs[] optional
finalCtaTitleEn
finalCtaTitleAr
finalCtaTextEn
finalCtaTextAr
```

### service

```txt
titleEn
titleAr
slug
shortDescriptionEn
shortDescriptionAr
fullDescriptionEn
fullDescriptionAr
heroImage
thumbnailImage
steps[]
beforeAfterCases[] max 3
order
isFeatured
seoTitleEn
seoTitleAr
seoDescriptionEn
seoDescriptionAr
```

### beforeAfterCase

```txt
titleEn
titleAr
beforeImage
afterImage
combinedImage optional
service reference optional
descriptionEn
descriptionAr
```

### testimonial

```txt
nameEn
nameAr
sourceEn
sourceAr
rating
quoteEn
quoteAr
image
videoUrl optional
videoThumbnail optional
order
```

### faq

```txt
questionEn
questionAr
answerEn
answerAr
order
```

---

## 17. Local Data First

Before Sanity, create local data in:

```txt
src/lib/data.ts
```

Use local data for:

```txt
services
popularTreatments
beforeAfterCases
videoTestimonials
googleReviews
faqs
siteSettings
```

Later replace with Sanity queries gradually.

---

## 18. Implementation Phases

### Phase 0 — Figma MCP and project setup

```txt
Connect Figma MCP if available
Open project in VS Code
Place DESIGN.md in root
Place PDFs in /design-reference
Place fonts in /public/fonts
Place exported assets in /public/images
```

### Phase 1 — Static setup

```txt
Create Next.js App Router project
TypeScript
Tailwind CSS
Font loading
Global CSS variables
Locale routing
Browser-language redirect from /
Shared layout components
Run npm run build
```

### Phase 2 — Static English homepage

```txt
Header
Hero
About
Popular Treatments
Homepage Before & After
All Services click-to-preview
Testimonials
FAQ
Contact
Final CTA/Footer
Run npm run build
```

### Phase 3 — Static Arabic homepage

```txt
Reuse components
Add Arabic content
Set RTL
Mirror layout
Fix spacing/alignment
Run npm run build
```

### Phase 4 — Service template

```txt
/en/services/[slug]
/ar/services/[slug]
Service hero
Large image
Steps
Interactive before/after sliders
Contact
Footer
Run npm run build
```

### Phase 5 — Responsive QA

Check:

```txt
Desktop 1440px
Laptop 1280px
Tablet 768px
Mobile 390px
English
Arabic
Service page mobile
No horizontal overflow
Image cropping
Button tap sizes
```

### Phase 6 — Sanity CMS

```txt
Install Sanity
Create schemas
Add /studio
Replace local data gradually
Add fallbacks if CMS fields are empty
Test CMS editing
Run npm run build
```

### Phase 7 — Netlify deployment

```txt
Push to GitHub
Connect Netlify
Add environment variables
Deploy preview
Test all routes
Test Sanity content
Connect domain
```

---

## 19. Claude Code Working Rules

When using Claude Code:

1. Do not code before presenting a plan.
2. Work phase by phase.
3. Do not rewrite unrelated files.
4. Do not implement Sanity before static pages are visually close.
5. Do not deploy before `npm run build` passes.
6. Run the app and visually compare to Figma/PDF after each major section.
7. Keep components small and readable.
8. Ask before adding heavy dependencies.
9. Commit after stable milestones.
10. If the design differs from the Figma, fix CSS/layout before adding features.

Suggested commits:

```txt
git commit -m "Set up Next.js project and design tokens"
git commit -m "Build static English homepage"
git commit -m "Add Arabic RTL homepage"
git commit -m "Build service detail template"
git commit -m "Add responsive refinements"
git commit -m "Integrate Sanity CMS"
git commit -m "Prepare Netlify deployment"
```

---

## 20. Visual Acceptance Criteria

The project is acceptable only if:

```txt
/en visually matches Homepage.pdf on desktop
/ar visually matches Homepage - Arabic.pdf on desktop
/en visually matches Homepage - mobile.pdf on mobile
/en/services/[slug] visually matches Service page.pdf on desktop
/ar/services/[slug] visually matches Service page - Arabic.pdf on desktop
mobile service page matches Services - mobile.pdf behavior
No major horizontal overflow on mobile
Header/footer are consistent
Images are correctly cropped
Arabic RTL feels intentional
Animations feel subtle and premium
Popular treatments move slowly right-to-left
All Services preview changes on click
Service before/after supports max 3 interactive cases
Email is removed everywhere
Contact buttons open WhatsApp
npm run build passes
```

---

## 21. Remaining Inputs Needed From Project Owner

These do not block starting Phase 1, but they are needed before final delivery:

```txt
Figma file URL
Exact exported asset files
Exact Playfair Display font filenames
Arabic mobile homepage reference, if available
Final real before/after images approved for public use
Final service hero images
Google Maps embed URL or map image
Domain/DNS access
Sanity project ID and dataset after CMS setup
Netlify account/team access
```

---

## 22. First Prompt to Claude Code

Use this first. Do not let Claude code immediately.

```txt
Read DESIGN.md fully.

Also inspect:
- the connected Figma file through Figma MCP, if available
- the design-reference folder
- the exported assets in /public/images
- the local fonts in /public/fonts

Do not code yet.

First respond with:
1. Your implementation plan.
2. How you will match the Figma design accurately.
3. The component structure.
4. The exact files you will create/change in Phase 1 only.
5. Any missing assets that block visual accuracy.

Important:
- The goal is to match the Figma design as closely as possible.
- Do not redesign the website.
- Do not copy the messy Figma layer structure literally.
- Use the Figma and PDFs as the visual source of truth.
- Use local Playfair Display for headings.
- Use Plus Jakarta Sans for body text.
- Build static pages first.
- Do not integrate Sanity yet.
- Do not deploy yet.
- Do not add paid dependencies.
- Final deployment target is Netlify Free.
```

---

## 23. Phase 1 Approval Prompt

Use this only after approving Claude’s plan.

```txt
Proceed with Phase 1 only.

Create the clean Next.js App Router project with TypeScript and Tailwind CSS.

Build only:
- project setup
- font loading
- global design tokens
- browser-language redirect from /
- locale routing for /en and /ar
- shared layout shell
- local data placeholders
- basic Header/Footer/Container/Button/SectionHeading components

Do not build all homepage sections yet.
Do not build service detail pages yet.
Do not integrate Sanity.
Do not deploy.
Do not add paid dependencies.

After finishing:
1. Run npm run build.
2. Fix all errors.
3. Summarize exactly what files were created or changed.
```
