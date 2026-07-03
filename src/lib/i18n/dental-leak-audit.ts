export const supportedDentalLandingLocales = ["es", "en", "ar"] as const;

export type DentalLandingLocale = (typeof supportedDentalLandingLocales)[number];

export type DentalLandingCopy = {
  metadata: {
    title: string;
    description: string;
  };
  localeName: string;
  direction: "ltr" | "rtl";
  nav: {
    calculator: string;
    system: string;
    audit: string;
    cta: string;
  };
  brand: {
    label: string;
    sublabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string[];
  };
  problem: {
    eyebrow: string;
    title: string;
    body: string;
  };
  leaks: Array<{
    key: "schedule" | "quotes" | "patients";
    label: string;
    text: string;
  }>;
  calculator: {
    locale: string;
    eyebrow: string;
    title: string;
    body: string;
    currentValueLabel: string;
    possibleLeakLabel: string;
    possibleLeakDescription: string;
    cta: string;
    fields: {
      missedAppointments: { label: string; suffix: string };
      openQuotes: { label: string; suffix: string };
      inactivePatients: { label: string; suffix: string };
      averageTreatment: { label: string; suffix: string };
    };
    breakdown: {
      appointments: string;
      quotes: string;
      dormantPatients: string;
    };
  };
  system: {
    eyebrow: string;
    title: string;
    body: string;
    blocks: Array<{
      key: "frontDesk" | "followUp" | "dashboard" | "control";
      title: string;
      text: string;
    }>;
  };
  audit: {
    eyebrow: string;
    title: string;
    steps: string[];
  };
  formIntro: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
  };
  form: {
    successTitle: string;
    successBody: string;
    clinicName: string;
    clinicNamePlaceholder: string;
    city: string;
    cityPlaceholder: string;
    contactName: string;
    contactNamePlaceholder: string;
    role: string;
    rolePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    chairs: string;
    chairsPlaceholder: string;
    currentSoftware: string;
    currentSoftwarePlaceholder: string;
    mainLeak: string;
    mainLeakOptions: Array<[string, string]>;
    numbersTitle: string;
    monthlyFirstVisits: string;
    monthlyFirstVisitsPlaceholder: string;
    missedAppointments: string;
    missedAppointmentsPlaceholder: string;
    openQuotes: string;
    openQuotesPlaceholder: string;
    averageTreatmentValue: string;
    averageTreatmentValuePlaceholder: string;
    inactivePatients: string;
    inactivePatientsPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    privacyConsent: string;
    marketingConsent: string;
    submit: string;
  };
};

export const dentalLandingLocaleOptions: Array<{
  href: string;
  label: string;
  locale: DentalLandingLocale;
}> = [
  { href: "/es/dental-leak-audit", label: "ES", locale: "es" },
  { href: "/en/dental-leak-audit", label: "EN", locale: "en" },
  { href: "/ar/dental-leak-audit", label: "AR", locale: "ar" },
];

const mainLeakOptions: Record<DentalLandingLocale, Array<[string, string]>> = {
  es: [
    ["agenda", "Citas perdidas o sin confirmar"],
    ["presupuestos", "Planes de tratamiento sin seguimiento"],
    ["pacientes_inactivos", "Pacientes que no vuelven"],
    ["recepcion", "Recepción saturada"],
    ["resenas", "Reseñas y reputación"],
    ["no_lo_se", "Aún no lo tengo claro"],
  ],
  en: [
    ["agenda", "Missed or unconfirmed appointments"],
    ["presupuestos", "Treatment plans without follow-up"],
    ["pacientes_inactivos", "Patients who do not return"],
    ["recepcion", "Overloaded front desk"],
    ["resenas", "Reviews and reputation"],
    ["no_lo_se", "Not sure yet"],
  ],
  ar: [
    ["agenda", "مواعيد فائتة أو غير مؤكدة"],
    ["presupuestos", "خطط علاج بلا متابعة"],
    ["pacientes_inactivos", "مرضى لم يعودوا للعيادة"],
    ["recepcion", "استقبال مثقل بالرسائل"],
    ["resenas", "المراجعات والسمعة"],
    ["no_lo_se", "لست متأكداً بعد"],
  ],
};

export const dentalLandingCopy: Record<DentalLandingLocale, DentalLandingCopy> = {
  es: {
    metadata: {
      title: "Revisión gratuita de oportunidades para clínicas dentales | WIADental",
      description:
        "Detecta oportunidades de agenda, seguimiento y pacientes inactivos sin cambiar de CRM ni compartir datos sanitarios.",
    },
    localeName: "Español",
    direction: "ltr",
    nav: {
      calculator: "Calculadora",
      system: "Sistema",
      audit: "Revisión",
      cta: "Solicitar revisión",
    },
    brand: {
      label: "WIADental",
      sublabel: "Automatización comercial dental",
    },
    hero: {
      eyebrow: "Revisión gratuita para clínicas dentales",
      title: "Recupera oportunidades que ya existen en tu clínica.",
      body:
        "Analizamos agenda, tratamientos propuestos y pacientes inactivos para encontrar mejoras reales de seguimiento, sin presión comercial y sin tocar datos sanitarios.",
      primaryCta: "Solicitar revisión gratuita",
      secondaryCta: "Calcular una estimación",
      trust: [
        "Sin cambiar de CRM desde el primer día",
        "IA supervisada por el equipo",
        "Sin mensajes invasivos a pacientes",
      ],
    },
    problem: {
      eyebrow: "Más criterio, menos ruido",
      title: "No se trata de perseguir pacientes. Se trata de acompañar mejor.",
      body:
        "La mayoría de clínicas ya tiene agenda, software, WhatsApp y recepción. Lo que falta es un sistema discreto que recuerde, priorice y mida las oportunidades que se quedan a medias.",
    },
    leaks: [
      {
        key: "schedule",
        label: "Agenda",
        text: "Citas pendientes de confirmar, cambios de última hora y huecos que podrían recuperarse con más orden.",
      },
      {
        key: "quotes",
        label: "Tratamientos",
        text: "Planes enviados que necesitan una siguiente acción clara, sin insistir ni perder contexto.",
      },
      {
        key: "patients",
        label: "Pacientes",
        text: "Revisiones, higienes o tratamientos pendientes que pueden reactivarse con comunicación cuidadosa.",
      },
    ],
    calculator: {
      locale: "es-ES",
      eyebrow: "Estimación orientativa",
      title: "Pon números al seguimiento antes de comprar más herramientas.",
      body:
        "No prometemos resultados automáticos. Esta calculadora ayuda a iniciar una conversación con datos sobre oportunidades que ya existen en la clínica.",
      currentValueLabel: "Valor actual",
      possibleLeakLabel: "Oportunidad mensual aproximada",
      possibleLeakDescription:
        "Estimación conservadora basada en citas no aprovechadas, tratamientos sin seguimiento y pacientes inactivos. La revisión valida el caso antes de proponer automatizaciones.",
      cta: "Solicitar revisión gratuita",
      fields: {
        missedAppointments: { label: "Citas perdidas o sin confirmar al mes", suffix: "citas" },
        openQuotes: { label: "Planes de tratamiento enviados sin seguimiento", suffix: "planes" },
        inactivePatients: { label: "Pacientes pendientes de revisión o higiene", suffix: "pacientes" },
        averageTreatment: { label: "Valor medio aproximado del tratamiento", suffix: "EUR" },
      },
      breakdown: {
        appointments: "Agenda",
        quotes: "Tratamientos",
        dormantPatients: "Pacientes inactivos",
      },
    },
    system: {
      eyebrow: "Qué proponemos después de la revisión",
      title: "Un sistema de seguimiento con criterio, no un chatbot insistente.",
      body:
        "El piloto de 30 días se centra en los puntos donde recepción pierde tiempo y dirección pierde visibilidad: agenda, tratamientos propuestos, pacientes dormidos y reseñas.",
      blocks: [
        {
          key: "frontDesk",
          title: "Recepción asistida",
          text: "Priorizamos solicitudes, llamadas pendientes y dudas repetidas para que el equipo revise antes de responder.",
        },
        {
          key: "followUp",
          title: "Seguimiento preparado",
          text: "Creamos mensajes por caso: confirmación, tratamiento propuesto, financiación, revisión pendiente o reseña.",
        },
        {
          key: "dashboard",
          title: "Panel de recuperación",
          text: "Medimos citas recuperadas, tratamientos reactivados, pacientes contactados y oportunidades abiertas.",
        },
        {
          key: "control",
          title: "Control humano",
          text: "La IA propone y prepara. La clínica revisa, aprueba y decide antes de contactar o automatizar.",
        },
      ],
    },
    audit: {
      eyebrow: "Qué incluye la revisión",
      title: "Una primera mirada concreta para saber por dónde empezar.",
      steps: [
        "Revisamos flujo de agenda, tratamientos abiertos y pacientes inactivos.",
        "Identificamos dónde puede haber más oportunidad recuperable cada mes.",
        "Te damos un plan de automatización de 30 días sin sustituir tu CRM desde el primer día.",
      ],
    },
    formIntro: {
      eyebrow: "Solicitud de revisión",
      title: "Cuéntanos cómo trabaja tu clínica y te diremos dónde mirar primero.",
      body:
        "No necesitamos datos de pacientes. Solo contexto operativo para preparar una primera llamada útil.",
      bullets: [
        "Respuesta manual y revisada por nuestro equipo.",
        "Sin diagnóstico clínico, sin datos sanitarios y sin automatizaciones ocultas.",
        "Objetivo: validar si tiene sentido un piloto de 30 días.",
      ],
    },
    form: {
      successTitle: "Solicitud recibida.",
      successBody:
        "La revisión ha entrado en nuestro backoffice interno de campaña. El siguiente paso es estudiar la clínica y preparar la llamada.",
      clinicName: "Nombre de la clínica",
      clinicNamePlaceholder: "Clínica Dental...",
      city: "Ciudad",
      cityPlaceholder: "Madrid, Valencia, Sevilla...",
      contactName: "Persona de contacto",
      contactNamePlaceholder: "Nombre y apellidos",
      role: "Cargo",
      rolePlaceholder: "Gerencia, dirección, recepción...",
      phone: "Teléfono",
      phonePlaceholder: "+34 600 000 000",
      email: "Email",
      emailPlaceholder: "nombre@clinica.com",
      chairs: "Sillones",
      chairsPlaceholder: "3",
      currentSoftware: "Software actual",
      currentSoftwarePlaceholder: "Gesden, Dentidesk, Excel...",
      mainLeak: "Área a mejorar",
      mainLeakOptions: mainLeakOptions.es,
      numbersTitle: "Datos aproximados para orientar la revisión",
      monthlyFirstVisits: "Primeras visitas/mes",
      monthlyFirstVisitsPlaceholder: "40",
      missedAppointments: "Citas perdidas/mes",
      missedAppointmentsPlaceholder: "8",
      openQuotes: "Planes abiertos",
      openQuotesPlaceholder: "12",
      averageTreatmentValue: "Ticket medio (EUR)",
      averageTreatmentValuePlaceholder: "750",
      inactivePatients: "Pacientes inactivos",
      inactivePatientsPlaceholder: "180",
      message: "Qué te gustaría mejorar primero",
      messagePlaceholder:
        "Ejemplo: muchos tratamientos de implantes quedan sin seguimiento, WhatsApp satura recepción o queremos recuperar revisiones vencidas.",
      privacyConsent: "Acepto el tratamiento de mis datos para gestionar esta solicitud de revisión.",
      marketingConsent: "Acepto recibir comunicaciones comerciales relacionadas con automatización dental.",
      submit: "Solicitar revisión gratuita",
    },
  },
  en: {
    metadata: {
      title: "Free Dental Opportunity Review | WIADental",
      description:
        "Find appointment, follow-up and inactive patient opportunities without replacing your CRM or sharing health data.",
    },
    localeName: "English",
    direction: "ltr",
    nav: {
      calculator: "Calculator",
      system: "System",
      audit: "Review",
      cta: "Request review",
    },
    brand: {
      label: "WIADental",
      sublabel: "Dental commercial automation",
    },
    hero: {
      eyebrow: "Free review for dental clinics",
      title: "Recover opportunities your clinic already has.",
      body:
        "We review scheduling, proposed treatments and inactive patients to find practical follow-up improvements, without pressure and without touching health data.",
      primaryCta: "Request free review",
      secondaryCta: "Estimate opportunity",
      trust: [
        "No CRM replacement on day one",
        "AI supervised by your team",
        "No invasive patient messaging",
      ],
    },
    problem: {
      eyebrow: "More judgment, less noise",
      title: "This is not about chasing patients. It is about following up better.",
      body:
        "Most clinics already have a calendar, dental software, WhatsApp and a front desk. What is missing is a discreet system that remembers, prioritizes and measures opportunities left halfway.",
    },
    leaks: [
      {
        key: "schedule",
        label: "Schedule",
        text: "Appointments waiting for confirmation, last-minute changes and empty slots that could be recovered with better order.",
      },
      {
        key: "quotes",
        label: "Treatments",
        text: "Plans sent to patients that need a clear next action, without insisting or losing context.",
      },
      {
        key: "patients",
        label: "Patients",
        text: "Recall, hygiene or treatment opportunities that can be reactivated with careful communication.",
      },
    ],
    calculator: {
      locale: "en-IE",
      eyebrow: "Directional estimate",
      title: "Put numbers on follow-up before buying more tools.",
      body:
        "We do not promise automatic results. This calculator starts a data-backed conversation about opportunities that already exist inside the clinic.",
      currentValueLabel: "Current value",
      possibleLeakLabel: "Approximate monthly opportunity",
      possibleLeakDescription:
        "Conservative estimate based on unused appointments, treatment plans without follow-up and inactive patients. The review validates the real case before proposing automations.",
      cta: "Request free review",
      fields: {
        missedAppointments: { label: "Missed or unconfirmed appointments per month", suffix: "appointments" },
        openQuotes: { label: "Treatment plans sent without follow-up", suffix: "plans" },
        inactivePatients: { label: "Patients overdue for recall or hygiene", suffix: "patients" },
        averageTreatment: { label: "Approximate average treatment value", suffix: "EUR" },
      },
      breakdown: {
        appointments: "Schedule",
        quotes: "Treatments",
        dormantPatients: "Inactive patients",
      },
    },
    system: {
      eyebrow: "What we propose after the review",
      title: "A thoughtful follow-up system, not an intrusive chatbot.",
      body:
        "The 30-day pilot focuses on the points where the front desk loses time and management loses visibility: scheduling, proposed treatments, dormant patients and reviews.",
      blocks: [
        {
          key: "frontDesk",
          title: "Assisted front desk",
          text: "We prioritize requests, pending calls and repeated questions so the team can review before responding.",
        },
        {
          key: "followUp",
          title: "Prepared follow-up",
          text: "We prepare messages by case: confirmation, proposed treatment, financing, recall or review request.",
        },
        {
          key: "dashboard",
          title: "Recovery dashboard",
          text: "We measure recovered appointments, reactivated treatments, contacted patients and open opportunities.",
        },
        {
          key: "control",
          title: "Human control",
          text: "AI proposes and prepares. The clinic reviews, approves and decides before contacting or automating.",
        },
      ],
    },
    audit: {
      eyebrow: "What the review includes",
      title: "A concrete first look to know where to start.",
      steps: [
        "We review scheduling flow, open treatments and inactive patients.",
        "We identify where the most recoverable monthly opportunity may be.",
        "You receive a 30-day automation plan without replacing your CRM on day one.",
      ],
    },
    formIntro: {
      eyebrow: "Review request",
      title: "Tell us how your clinic works and we will tell you where to look first.",
      body:
        "You do not need to share patient data. We only need operational context to prepare a useful first call.",
      bullets: [
        "Manual response reviewed by our team.",
        "No clinical diagnosis, no health data and no hidden automations.",
        "Goal: validate whether a 30-day pilot makes sense.",
      ],
    },
    form: {
      successTitle: "Request received.",
      successBody:
        "The review has entered our internal campaign backoffice. Next, we study the clinic and prepare the call.",
      clinicName: "Clinic name",
      clinicNamePlaceholder: "Bright Dental...",
      city: "City",
      cityPlaceholder: "Madrid, Valencia, Seville...",
      contactName: "Contact person",
      contactNamePlaceholder: "First and last name",
      role: "Role",
      rolePlaceholder: "Owner, manager, front desk...",
      phone: "Phone",
      phonePlaceholder: "+34 600 000 000",
      email: "Email",
      emailPlaceholder: "name@clinic.com",
      chairs: "Chairs",
      chairsPlaceholder: "3",
      currentSoftware: "Current software",
      currentSoftwarePlaceholder: "Dentidesk, Gesden, Excel...",
      mainLeak: "Area to improve",
      mainLeakOptions: mainLeakOptions.en,
      numbersTitle: "Approximate numbers to guide the review",
      monthlyFirstVisits: "First visits/month",
      monthlyFirstVisitsPlaceholder: "40",
      missedAppointments: "Missed appointments/month",
      missedAppointmentsPlaceholder: "8",
      openQuotes: "Open plans",
      openQuotesPlaceholder: "12",
      averageTreatmentValue: "Average ticket (EUR)",
      averageTreatmentValuePlaceholder: "750",
      inactivePatients: "Inactive patients",
      inactivePatientsPlaceholder: "180",
      message: "What would you like to improve first?",
      messagePlaceholder:
        "Example: many implant plans have no follow-up, WhatsApp overloads the front desk, or we want to recover overdue recall visits.",
      privacyConsent: "I accept the processing of my data to manage this review request.",
      marketingConsent: "I agree to receive commercial communications related to dental automation.",
      submit: "Request free review",
    },
  },
  ar: {
    metadata: {
      title: "مراجعة مجانية لفرص عيادات الأسنان | WIADental",
      description:
        "اكتشف فرص المواعيد والمتابعة والمرضى غير النشطين دون تغيير نظامك أو مشاركة بيانات صحية.",
    },
    localeName: "العربية",
    direction: "rtl",
    nav: {
      calculator: "الحاسبة",
      system: "النظام",
      audit: "المراجعة",
      cta: "اطلب مراجعة",
    },
    brand: {
      label: "WIADental",
      sublabel: "أتمتة تجارية لعيادات الأسنان",
    },
    hero: {
      eyebrow: "مراجعة مجانية لعيادات الأسنان",
      title: "استعد فرصاً موجودة بالفعل داخل عيادتك.",
      body:
        "نراجع المواعيد وخطط العلاج والمرضى غير النشطين لاكتشاف فرص متابعة عملية، دون ضغط تجاري ودون التعامل مع بيانات صحية.",
      primaryCta: "اطلب مراجعة مجانية",
      secondaryCta: "احسب تقديراً أولياً",
      trust: [
        "لا حاجة لتغيير نظام العيادة من اليوم الأول",
        "ذكاء اصطناعي تحت إشراف فريقك",
        "لا رسائل مزعجة للمرضى",
      ],
    },
    problem: {
      eyebrow: "حكمة أكثر، ضجيج أقل",
      title: "الأمر لا يتعلق بملاحقة المرضى، بل بمتابعة أفضل.",
      body:
        "معظم العيادات لديها جدول مواعيد وبرنامج وواتساب وفريق استقبال. ما ينقصها هو نظام هادئ يتذكر الأولويات ويقيس الفرص التي توقفت في منتصف الطريق.",
    },
    leaks: [
      {
        key: "schedule",
        label: "المواعيد",
        text: "مواعيد تنتظر التأكيد، تغييرات في آخر لحظة وفراغات يمكن استعادتها بتنظيم أفضل.",
      },
      {
        key: "quotes",
        label: "خطط العلاج",
        text: "خطط أرسلت للمريض وتحتاج خطوة تالية واضحة، دون إلحاح ودون فقدان السياق.",
      },
      {
        key: "patients",
        label: "المرضى",
        text: "مراجعات أو جلسات تنظيف أو علاجات مؤجلة يمكن تفعيلها بتواصل محترم ومدروس.",
      },
    ],
    calculator: {
      locale: "ar-EG",
      eyebrow: "تقدير أولي",
      title: "ضع رقماً تقريبياً على فرص المتابعة قبل شراء أدوات جديدة.",
      body:
        "لا نعد بنتائج تلقائية. هذه الحاسبة تساعد على بدء حوار مبني على بيانات حول فرص موجودة بالفعل داخل العيادة.",
      currentValueLabel: "القيمة الحالية",
      possibleLeakLabel: "فرصة شهرية تقريبية",
      possibleLeakDescription:
        "تقدير محافظ يعتمد على مواعيد غير مستغلة وخطط علاج بلا متابعة ومرضى غير نشطين. المراجعة تتحقق من الحالة الفعلية قبل اقتراح أي أتمتة.",
      cta: "اطلب مراجعة مجانية",
      fields: {
        missedAppointments: { label: "مواعيد فائتة أو غير مؤكدة شهرياً", suffix: "موعد" },
        openQuotes: { label: "خطط علاج أرسلت بلا متابعة", suffix: "خطة" },
        inactivePatients: { label: "مرضى متأخرون عن المراجعة أو التنظيف", suffix: "مريض" },
        averageTreatment: { label: "متوسط قيمة العلاج التقريبي", suffix: "يورو" },
      },
      breakdown: {
        appointments: "المواعيد",
        quotes: "خطط العلاج",
        dormantPatients: "المرضى غير النشطين",
      },
    },
    system: {
      eyebrow: "ما نقترحه بعد المراجعة",
      title: "نظام متابعة هادئ ومدروس، وليس روبوت محادثة مزعجاً.",
      body:
        "يركز البرنامج التجريبي لمدة 30 يوماً على النقاط التي يضيع فيها وقت الاستقبال وتقل فيها رؤية الإدارة: المواعيد، خطط العلاج، المرضى غير النشطين والمراجعات.",
      blocks: [
        {
          key: "frontDesk",
          title: "استقبال مساعد",
          text: "نرتب الطلبات والمكالمات المعلقة والأسئلة المتكررة حتى يراجعها الفريق قبل الرد.",
        },
        {
          key: "followUp",
          title: "متابعة جاهزة",
          text: "نجهز رسائل حسب الحالة: تأكيد موعد، خطة علاج، تمويل، مراجعة مؤجلة أو طلب تقييم.",
        },
        {
          key: "dashboard",
          title: "لوحة استعادة الفرص",
          text: "نقيس المواعيد المستعادة، العلاجات المعاد تفعيلها، المرضى الذين تم التواصل معهم والفرص المفتوحة.",
        },
        {
          key: "control",
          title: "تحكم بشري",
          text: "الذكاء الاصطناعي يقترح ويجهز. العيادة تراجع وتوافق وتقرر قبل التواصل أو الأتمتة.",
        },
      ],
    },
    audit: {
      eyebrow: "ماذا تشمل المراجعة",
      title: "نظرة أولى واضحة لمعرفة من أين نبدأ.",
      steps: [
        "نراجع تدفق المواعيد وخطط العلاج المفتوحة والمرضى غير النشطين.",
        "نحدد أين قد توجد أكبر فرصة شهرية قابلة للاستعادة.",
        "نقدم خطة أتمتة لمدة 30 يوماً دون استبدال نظام العيادة من اليوم الأول.",
      ],
    },
    formIntro: {
      eyebrow: "طلب المراجعة",
      title: "أخبرنا كيف تعمل عيادتك وسنوضح أين نبدأ أولاً.",
      body:
        "لا نحتاج إلى بيانات المرضى. نحتاج فقط إلى سياق تشغيلي لتحضير مكالمة أولى مفيدة.",
      bullets: [
        "رد يدوي يراجعه فريقنا.",
        "لا تشخيص سريري، لا بيانات صحية ولا أتمتة مخفية.",
        "الهدف: معرفة إن كان برنامج تجريبي لمدة 30 يوماً مناسباً.",
      ],
    },
    form: {
      successTitle: "تم استلام الطلب.",
      successBody:
        "دخلت المراجعة إلى نظام الحملات الداخلي لدينا. الخطوة التالية هي دراسة العيادة وتحضير المكالمة.",
      clinicName: "اسم العيادة",
      clinicNamePlaceholder: "عيادة سمايل...",
      city: "المدينة",
      cityPlaceholder: "مدريد، فالنسيا، دبي...",
      contactName: "الشخص المسؤول",
      contactNamePlaceholder: "الاسم الكامل",
      role: "الدور",
      rolePlaceholder: "المالك، المدير، الاستقبال...",
      phone: "الهاتف",
      phonePlaceholder: "+34 600 000 000",
      email: "البريد الإلكتروني",
      emailPlaceholder: "name@clinic.com",
      chairs: "الكراسي",
      chairsPlaceholder: "3",
      currentSoftware: "النظام الحالي",
      currentSoftwarePlaceholder: "Dentidesk, Gesden, Excel...",
      mainLeak: "المجال المراد تحسينه",
      mainLeakOptions: mainLeakOptions.ar,
      numbersTitle: "أرقام تقريبية لتوجيه المراجعة",
      monthlyFirstVisits: "زيارات أولى/شهر",
      monthlyFirstVisitsPlaceholder: "40",
      missedAppointments: "مواعيد فائتة/شهر",
      missedAppointmentsPlaceholder: "8",
      openQuotes: "خطط مفتوحة",
      openQuotesPlaceholder: "12",
      averageTreatmentValue: "متوسط القيمة (EUR)",
      averageTreatmentValuePlaceholder: "750",
      inactivePatients: "مرضى غير نشطين",
      inactivePatientsPlaceholder: "180",
      message: "ما الذي ترغب في تحسينه أولاً؟",
      messagePlaceholder:
        "مثال: خطط زراعة كثيرة بلا متابعة، واتساب يضغط على الاستقبال، أو نريد استعادة مراجعات متأخرة.",
      privacyConsent: "أوافق على معالجة بياناتي لإدارة طلب هذه المراجعة.",
      marketingConsent: "أوافق على تلقي رسائل تجارية متعلقة بأتمتة عيادات الأسنان.",
      submit: "اطلب مراجعة مجانية",
    },
  },
};

export function isDentalLandingLocale(value: string): value is DentalLandingLocale {
  return supportedDentalLandingLocales.includes(value as DentalLandingLocale);
}

export function getDentalLandingCopy(locale: string) {
  return isDentalLandingLocale(locale) ? dentalLandingCopy[locale] : null;
}
