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
    ["agenda", "Citas que se enfrían"],
    ["presupuestos", "Tratamientos que nadie retoma"],
    ["pacientes_inactivos", "Pacientes que podrían volver"],
    ["recepcion", "Recepción sin margen"],
    ["resenas", "Reseñas que no se piden"],
    ["no_lo_se", "Quiero verlo con datos"],
  ],
  en: [
    ["agenda", "Appointments going cold"],
    ["presupuestos", "Treatments nobody follows up"],
    ["pacientes_inactivos", "Patients who could come back"],
    ["recepcion", "Front desk with no margin"],
    ["resenas", "Reviews that never get asked for"],
    ["no_lo_se", "I want to see the data"],
  ],
  ar: [
    ["agenda", "مواعيد تفقد اهتمام المريض"],
    ["presupuestos", "علاجات لا تتم متابعتها"],
    ["pacientes_inactivos", "مرضى يمكن أن يعودوا"],
    ["recepcion", "استقبال بلا وقت كافٍ"],
    ["resenas", "تقييمات لا يتم طلبها"],
    ["no_lo_se", "أريد رؤية الصورة بالأرقام"],
  ],
};

export const dentalLandingCopy: Record<DentalLandingLocale, DentalLandingCopy> = {
  es: {
    metadata: {
      title: "Que ninguna oportunidad se enfríe en tu clínica | WIADental",
      description:
        "Revisamos agenda, tratamientos pendientes y pacientes inactivos para encontrar oportunidades recuperables sin spam, sin cambiar de CRM y sin datos clínicos.",
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
      sublabel: "Seguimiento comercial para clínicas dentales",
    },
    hero: {
      eyebrow: "Para clínicas que quieren vender mejor sin perseguir pacientes",
      title: "Que ninguna oportunidad se enfríe por falta de seguimiento.",
      body:
        "Tu clínica ya invierte en atraer pacientes. Nosotros revisamos qué ocurre después: citas que no se confirman, tratamientos que no se retoman y pacientes que podrían volver con el mensaje adecuado. Sin spam, sin presión y sin cambiar tu CRM.",
      primaryCta: "Quiero mi revisión gratuita",
      secondaryCta: "Ver oportunidad estimada",
      trust: [
        "Revisión humana, no venta automática",
        "Mensajes aprobados por la clínica",
        "Sin tocar datos clínicos",
      ],
    },
    problem: {
      eyebrow: "El crecimiento también está dentro",
      title: "Antes de captar más, mira lo que ya tienes en la agenda.",
      body:
        "Cada clínica tiene conversaciones abiertas: una cita pendiente, un tratamiento enviado, una revisión que se retrasó. Si nadie lo prioriza, se pierde en el día a día. WIADental lo ordena para que recepción actúe con calma y dirección vea qué se recupera.",
    },
    leaks: [
      {
        key: "schedule",
        label: "Agenda",
        text: "Citas pendientes de confirmar, cambios de última hora y huecos que pueden llenarse si el equipo sabe a quién llamar primero.",
      },
      {
        key: "quotes",
        label: "Tratamientos",
        text: "Planes aceptables que se quedan en silencio porque no hay una siguiente acción clara, amable y a tiempo.",
      },
      {
        key: "patients",
        label: "Pacientes",
        text: "Pacientes que no necesitan presión; necesitan un recordatorio útil, en el momento adecuado y con el tono adecuado.",
      },
    ],
    calculator: {
      locale: "es-ES",
      eyebrow: "Calculadora rápida",
      title: "Descubre cuánto puede valer ordenar el seguimiento.",
      body:
        "No es una promesa de ingresos. Es una forma rápida de ver si merece la pena revisar vuestro seguimiento con datos encima de la mesa.",
      currentValueLabel: "Valor actual",
      possibleLeakLabel: "Oportunidad recuperable estimada",
      possibleLeakDescription:
        "Una estimación prudente sobre citas, tratamientos y pacientes que ya están en tu ecosistema. En la revisión comprobamos si el número tiene sentido antes de proponer nada.",
      cta: "Quiero revisar mi caso",
      fields: {
        missedAppointments: { label: "Citas que no se confirman o se pierden al mes", suffix: "citas" },
        openQuotes: { label: "Tratamientos enviados que nadie retoma", suffix: "tratamientos" },
        inactivePatients: { label: "Pacientes pendientes de revisión o higiene", suffix: "pacientes" },
        averageTreatment: { label: "Valor medio aproximado por tratamiento", suffix: "EUR" },
      },
      breakdown: {
        appointments: "Agenda",
        quotes: "Tratamientos",
        dormantPatients: "Pacientes inactivos",
      },
    },
    system: {
      eyebrow: "Lo que instalamos después",
      title: "Un sistema que ayuda a recepción a vender mejor, sin sonar a robot.",
      body:
        "El piloto de 30 días se centra en lo que más impacto puede tener: agenda, tratamientos propuestos, pacientes dormidos y reseñas. Todo con revisión humana y mensajes que respetan la relación clínica-paciente.",
      blocks: [
        {
          key: "frontDesk",
          title: "Recepción con prioridades",
          text: "El equipo ve qué conversación merece atención primero, sin bucear entre WhatsApp, llamadas y notas sueltas.",
        },
        {
          key: "followUp",
          title: "Mensajes listos para revisar",
          text: "Preparamos textos por caso: confirmación, tratamiento, financiación, revisión pendiente o reseña. La clínica decide antes de enviar.",
        },
        {
          key: "dashboard",
          title: "Visibilidad para dirección",
          text: "Citas recuperadas, tratamientos reactivados, pacientes contactados y oportunidades abiertas en un panel claro.",
        },
        {
          key: "control",
          title: "Control humano",
          text: "La automatización prepara el trabajo. Tu equipo conserva el criterio, el tono y la decisión final.",
        },
      ],
    },
    audit: {
      eyebrow: "Qué miramos contigo",
      title: "Una revisión corta, concreta y útil aunque luego no hagamos nada más.",
      steps: [
        "Vemos dónde se enfrían citas, tratamientos y pacientes inactivos.",
        "Calculamos qué parte merece seguimiento y cuál no compensa perseguir.",
        "Te proponemos un piloto de 30 días con acciones concretas, sin cambiar tu CRM.",
      ],
    },
    formIntro: {
      eyebrow: "Pide tu revisión",
      title: "Déjanos el contexto justo y te diremos si hay una oportunidad real.",
      body:
        "No necesitamos nombres de pacientes ni información clínica. Solo una foto rápida de cómo gestionáis agenda, tratamientos y seguimiento.",
      bullets: [
        "Te responde una persona, no una secuencia automática.",
        "Sin diagnóstico clínico, sin datos sanitarios y sin automatizaciones ocultas.",
        "Objetivo: decirte con honestidad si un piloto tiene sentido.",
      ],
    },
    form: {
      successTitle: "Solicitud recibida.",
      successBody:
        "Ya tenemos tu solicitud. Revisaremos el contexto de la clínica y prepararemos una primera llamada con ideas concretas.",
      clinicName: "Nombre de la clínica",
      clinicNamePlaceholder: "Nombre comercial de la clínica",
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
      mainLeak: "Dónde quieres poner orden primero",
      mainLeakOptions: mainLeakOptions.es,
      numbersTitle: "Números aproximados para preparar bien la llamada",
      monthlyFirstVisits: "Primeras visitas/mes",
      monthlyFirstVisitsPlaceholder: "40",
      missedAppointments: "Citas perdidas/mes",
      missedAppointmentsPlaceholder: "8",
      openQuotes: "Tratamientos abiertos",
      openQuotesPlaceholder: "12",
      averageTreatmentValue: "Ticket medio (EUR)",
      averageTreatmentValuePlaceholder: "750",
      inactivePatients: "Pacientes inactivos",
      inactivePatientsPlaceholder: "180",
      message: "Cuéntanos qué está pasando",
      messagePlaceholder:
        "Ejemplo: se nos quedan tratamientos sin retomar, WhatsApp nos desborda o queremos recuperar revisiones sin parecer insistentes.",
      privacyConsent: "Acepto el tratamiento de mis datos para gestionar esta solicitud de revisión.",
      marketingConsent: "Acepto recibir comunicaciones comerciales relacionadas con automatización dental.",
      submit: "Quiero mi revisión gratuita",
    },
  },
  en: {
    metadata: {
      title: "Keep Dental Opportunities From Going Cold | WIADental",
      description:
        "Review scheduling, open treatments and inactive patients to find recoverable opportunities without spam, CRM replacement or health data.",
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
      sublabel: "Follow-up systems for dental clinics",
    },
    hero: {
      eyebrow: "For clinics that want better follow-up, not more noise",
      title: "Stop warm opportunities from going cold.",
      body:
        "Your clinic already works hard to attract patients. We review what happens next: appointments that never get confirmed, treatments that do not get resumed and patients who could come back with the right message. No spam, no pressure, no CRM replacement.",
      primaryCta: "Get my free review",
      secondaryCta: "Estimate the opportunity",
      trust: [
        "Human review, not automatic selling",
        "Messages approved by the clinic",
        "No clinical data touched",
      ],
    },
    problem: {
      eyebrow: "Growth is already inside the clinic",
      title: "Before buying more leads, look at what is already on your desk.",
      body:
        "Every clinic has open conversations: a pending appointment, a treatment plan sent, a recall that slipped. If nobody prioritizes them, they disappear into the daily rush. WIADental organizes them so the front desk can act calmly and management can see what was recovered.",
    },
    leaks: [
      {
        key: "schedule",
        label: "Schedule",
        text: "Appointments waiting for confirmation, last-minute changes and empty slots that can be saved when the team knows who to call first.",
      },
      {
        key: "quotes",
        label: "Treatments",
        text: "Good treatment plans that go quiet because there is no clear, timely and respectful next step.",
      },
      {
        key: "patients",
        label: "Patients",
        text: "Patients do not need pressure. They need a useful reminder at the right moment, in the right tone.",
      },
    ],
    calculator: {
      locale: "en-IE",
      eyebrow: "Quick calculator",
      title: "See what better follow-up could be worth.",
      body:
        "This is not a revenue promise. It is a quick way to decide whether your follow-up process is worth reviewing with real numbers on the table.",
      currentValueLabel: "Current value",
      possibleLeakLabel: "Estimated recoverable opportunity",
      possibleLeakDescription:
        "A cautious estimate based on appointments, treatments and patients already inside your ecosystem. During the review we check whether the number makes sense before proposing anything.",
      cta: "Review my clinic",
      fields: {
        missedAppointments: { label: "Appointments lost or unconfirmed per month", suffix: "appointments" },
        openQuotes: { label: "Treatment plans nobody follows up", suffix: "treatments" },
        inactivePatients: { label: "Patients overdue for recall or hygiene", suffix: "patients" },
        averageTreatment: { label: "Approximate value per treatment", suffix: "EUR" },
      },
      breakdown: {
        appointments: "Schedule",
        quotes: "Treatments",
        dormantPatients: "Inactive patients",
      },
    },
    system: {
      eyebrow: "What we install after the review",
      title: "A follow-up system that helps the front desk sell better, without sounding robotic.",
      body:
        "The 30-day pilot focuses on the areas with the fastest impact: scheduling, proposed treatments, dormant patients and reviews. Everything stays human-reviewed and respectful of the clinic-patient relationship.",
      blocks: [
        {
          key: "frontDesk",
          title: "Front desk priorities",
          text: "The team sees which conversation deserves attention first, without digging through WhatsApp, calls and loose notes.",
        },
        {
          key: "followUp",
          title: "Messages ready to review",
          text: "We prepare copy by case: confirmation, treatment, financing, recall or review request. The clinic decides before anything is sent.",
        },
        {
          key: "dashboard",
          title: "Management visibility",
          text: "Recovered appointments, reactivated treatments, contacted patients and open opportunities in one clear dashboard.",
        },
        {
          key: "control",
          title: "Human control",
          text: "Automation prepares the work. Your team keeps the judgment, the tone and the final decision.",
        },
      ],
    },
    audit: {
      eyebrow: "What we look at with you",
      title: "A short, practical review that is useful even if we do nothing else.",
      steps: [
        "We spot where appointments, treatments and inactive patients are going cold.",
        "We calculate what is worth following up and what is not worth chasing.",
        "We propose a 30-day pilot with concrete actions, without replacing your CRM.",
      ],
    },
    formIntro: {
      eyebrow: "Request your review",
      title: "Share the right context and we will tell you if there is a real opportunity.",
      body:
        "We do not need patient names or clinical information. Just a quick picture of how you manage scheduling, treatments and follow-up.",
      bullets: [
        "A real person replies, not an automated sequence.",
        "No clinical diagnosis, no health data and no hidden automations.",
        "Goal: tell you honestly whether a pilot makes sense.",
      ],
    },
    form: {
      successTitle: "Request received.",
      successBody:
        "We have your request. We will review the clinic context and prepare a first call with concrete ideas.",
      clinicName: "Clinic name",
      clinicNamePlaceholder: "Your clinic's commercial name",
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
      mainLeak: "Where you want to create order first",
      mainLeakOptions: mainLeakOptions.en,
      numbersTitle: "Approximate numbers to prepare the call properly",
      monthlyFirstVisits: "First visits/month",
      monthlyFirstVisitsPlaceholder: "40",
      missedAppointments: "Missed appointments/month",
      missedAppointmentsPlaceholder: "8",
      openQuotes: "Open treatments",
      openQuotesPlaceholder: "12",
      averageTreatmentValue: "Average ticket (EUR)",
      averageTreatmentValuePlaceholder: "750",
      inactivePatients: "Inactive patients",
      inactivePatientsPlaceholder: "180",
      message: "Tell us what is happening",
      messagePlaceholder:
        "Example: treatments are not being resumed, WhatsApp overwhelms the front desk, or we want to recover recalls without sounding pushy.",
      privacyConsent: "I accept the processing of my data to manage this review request.",
      marketingConsent: "I agree to receive commercial communications related to dental automation.",
      submit: "Get my free review",
    },
  },
  ar: {
    metadata: {
      title: "لا تدع فرص العيادة تفقد حرارتها | WIADental",
      description:
        "نراجع المواعيد والعلاجات المفتوحة والمرضى غير النشطين لاكتشاف فرص يمكن استعادتها دون رسائل مزعجة أو تغيير النظام أو مشاركة بيانات صحية.",
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
      sublabel: "نظام متابعة ذكي لعيادات الأسنان",
    },
    hero: {
      eyebrow: "لعيادات تريد متابعة أفضل بلا إزعاج",
      title: "لا تترك الفرص الجاهزة تفقد اهتمام المريض.",
      body:
        "عيادتك تبذل جهداً لجذب المرضى. نحن نراجع ما يحدث بعد ذلك: مواعيد لا يتم تأكيدها، علاجات لا تتم متابعتها، ومرضى يمكن أن يعودوا برسالة مناسبة. دون إلحاح، دون ضغط، ودون تغيير نظام العيادة.",
      primaryCta: "أريد مراجعتي المجانية",
      secondaryCta: "احسب الفرصة المتوقعة",
      trust: [
        "مراجعة بشرية وليست بيعاً آلياً",
        "العيادة توافق على الرسائل قبل إرسالها",
        "لا نلمس أي بيانات سريرية",
      ],
    },
    problem: {
      eyebrow: "النمو موجود داخل العيادة أيضاً",
      title: "قبل البحث عن مرضى جدد، راجع الفرص الموجودة أمامك.",
      body:
        "في كل عيادة محادثات مفتوحة: موعد ينتظر التأكيد، علاج تم إرساله، أو مراجعة تأخرت. إن لم يتم ترتيبها، تضيع وسط ضغط اليوم. WIADental ينظمها حتى يتصرف فريق الاستقبال بهدوء وترى الإدارة ما يمكن استعادته.",
    },
    leaks: [
      {
        key: "schedule",
        label: "المواعيد",
        text: "مواعيد تنتظر التأكيد، تغييرات في آخر لحظة وفراغات يمكن إنقاذها عندما يعرف الفريق بمن يبدأ.",
      },
      {
        key: "quotes",
        label: "خطط العلاج",
        text: "خطط علاج جيدة تصمت لأن الخطوة التالية ليست واضحة أو لم تصل في الوقت المناسب وبالأسلوب المناسب.",
      },
      {
        key: "patients",
        label: "المرضى",
        text: "المرضى لا يحتاجون إلى ضغط. يحتاجون إلى تذكير مفيد في الوقت المناسب وبنبرة محترمة.",
      },
    ],
    calculator: {
      locale: "ar-EG",
      eyebrow: "حاسبة سريعة",
      title: "اعرف تقريباً قيمة تنظيم المتابعة داخل عيادتك.",
      body:
        "هذا ليس وعداً بإيرادات. إنها طريقة سريعة لمعرفة إن كان نظام المتابعة في عيادتك يستحق مراجعة جادة بالأرقام.",
      currentValueLabel: "القيمة الحالية",
      possibleLeakLabel: "فرصة قابلة للاستعادة تقريباً",
      possibleLeakDescription:
        "تقدير حذر مبني على مواعيد وعلاجات ومرضى موجودين بالفعل في نظام العيادة. في المراجعة نتحقق أولاً إن كان الرقم منطقياً قبل اقتراح أي شيء.",
      cta: "راجع حالة عيادتي",
      fields: {
        missedAppointments: { label: "مواعيد تضيع أو لا يتم تأكيدها شهرياً", suffix: "موعد" },
        openQuotes: { label: "علاجات أرسلت ولا أحد يتابعها", suffix: "علاج" },
        inactivePatients: { label: "مرضى متأخرون عن المراجعة أو التنظيف", suffix: "مريض" },
        averageTreatment: { label: "متوسط قيمة العلاج تقريباً", suffix: "يورو" },
      },
      breakdown: {
        appointments: "المواعيد",
        quotes: "خطط العلاج",
        dormantPatients: "المرضى غير النشطين",
      },
    },
    system: {
      eyebrow: "ما نركبه بعد المراجعة",
      title: "نظام يساعد الاستقبال على البيع بشكل أفضل، دون أن يبدو كأنه روبوت.",
      body:
        "يركز البرنامج التجريبي لمدة 30 يوماً على أسرع نقاط التأثير: المواعيد، العلاجات المقترحة، المرضى غير النشطين والتقييمات. كل شيء تتم مراجعته بشرياً وباحترام للعلاقة بين العيادة والمريض.",
      blocks: [
        {
          key: "frontDesk",
          title: "أولويات واضحة للاستقبال",
          text: "يعرف الفريق أي محادثة تستحق الاهتمام أولاً دون البحث بين واتساب والمكالمات والملاحظات المتفرقة.",
        },
        {
          key: "followUp",
          title: "رسائل جاهزة للمراجعة",
          text: "نجهز نصوصاً حسب الحالة: تأكيد موعد، علاج، تمويل، مراجعة مؤجلة أو طلب تقييم. العيادة تقرر قبل الإرسال.",
        },
        {
          key: "dashboard",
          title: "رؤية أوضح للإدارة",
          text: "مواعيد تمت استعادتها، علاجات أعيد تفعيلها، مرضى تم التواصل معهم وفرص مفتوحة في لوحة واحدة واضحة.",
        },
        {
          key: "control",
          title: "تحكم بشري",
          text: "الأتمتة تجهز العمل. فريقك يحتفظ بالحكم، النبرة والقرار النهائي.",
        },
      ],
    },
    audit: {
      eyebrow: "ما نراجعه معك",
      title: "مراجعة قصيرة وعملية تبقى مفيدة حتى لو لم نفعل شيئاً بعدها.",
      steps: [
        "نحدد أين تفقد المواعيد والعلاجات والمرضى غير النشطين اهتمامهم.",
        "نحسب ما يستحق المتابعة وما لا يستحق الملاحقة.",
        "نقترح برنامجاً تجريبياً لمدة 30 يوماً بخطوات واضحة ودون تغيير نظام العيادة.",
      ],
    },
    formIntro: {
      eyebrow: "اطلب المراجعة",
      title: "أعطنا السياق الصحيح وسنخبرك إن كانت هناك فرصة حقيقية.",
      body:
        "لا نحتاج إلى أسماء المرضى أو معلومات سريرية. نحتاج فقط إلى صورة سريعة عن إدارة المواعيد والعلاجات والمتابعة.",
      bullets: [
        "يرد عليك شخص حقيقي، وليس تسلسلاً آلياً.",
        "لا تشخيص سريري، لا بيانات صحية ولا أتمتة مخفية.",
        "الهدف: أن نخبرك بصدق إن كان البرنامج التجريبي مناسباً.",
      ],
    },
    form: {
      successTitle: "تم استلام الطلب.",
      successBody:
        "وصلنا طلبك. سنراجع سياق العيادة ونحضّر مكالمة أولى بأفكار واضحة.",
      clinicName: "اسم العيادة",
      clinicNamePlaceholder: "الاسم التجاري للعيادة",
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
      mainLeak: "أين تريد ترتيب الأمور أولاً",
      mainLeakOptions: mainLeakOptions.ar,
      numbersTitle: "أرقام تقريبية لتحضير المكالمة جيداً",
      monthlyFirstVisits: "زيارات أولى/شهر",
      monthlyFirstVisitsPlaceholder: "40",
      missedAppointments: "مواعيد فائتة/شهر",
      missedAppointmentsPlaceholder: "8",
      openQuotes: "علاجات مفتوحة",
      openQuotesPlaceholder: "12",
      averageTreatmentValue: "متوسط القيمة (EUR)",
      averageTreatmentValuePlaceholder: "750",
      inactivePatients: "مرضى غير نشطين",
      inactivePatientsPlaceholder: "180",
      message: "أخبرنا ماذا يحدث الآن",
      messagePlaceholder:
        "مثال: علاجات لا تتم متابعتها، واتساب يضغط على الاستقبال، أو نريد استعادة المراجعات دون أن نبدو ملحين.",
      privacyConsent: "أوافق على معالجة بياناتي لإدارة طلب هذه المراجعة.",
      marketingConsent: "أوافق على تلقي رسائل تجارية متعلقة بأتمتة عيادات الأسنان.",
      submit: "أريد مراجعتي المجانية",
    },
  },
};

export function isDentalLandingLocale(value: string): value is DentalLandingLocale {
  return supportedDentalLandingLocales.includes(value as DentalLandingLocale);
}

export function getDentalLandingCopy(locale: string) {
  return isDentalLandingLocale(locale) ? dentalLandingCopy[locale] : null;
}
