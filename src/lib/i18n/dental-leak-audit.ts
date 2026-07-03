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
    automations: string;
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
  automations: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{
      key: "schedule" | "quotes" | "patients";
      title: string;
      text: string;
    }>;
    closing: string;
    cta: string;
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
    ["agenda", "Automatizar confirmación de citas"],
    ["presupuestos", "Automatizar seguimiento de tratamientos"],
    ["pacientes_inactivos", "Reactivar pacientes automáticamente"],
    ["recepcion", "Quitar tareas repetitivas a recepción"],
    ["resenas", "Automatizar petición de reseñas"],
    ["no_lo_se", "Quiero que me digáis qué automatizar"],
  ],
  en: [
    ["agenda", "Automate appointment confirmation"],
    ["presupuestos", "Automate treatment follow-up"],
    ["pacientes_inactivos", "Reactivate patients automatically"],
    ["recepcion", "Remove repetitive front desk tasks"],
    ["resenas", "Automate review requests"],
    ["no_lo_se", "Tell me what to automate"],
  ],
  ar: [
    ["agenda", "أتمتة تأكيد المواعيد"],
    ["presupuestos", "أتمتة متابعة خطط العلاج"],
    ["pacientes_inactivos", "إعادة تفعيل المرضى تلقائياً"],
    ["recepcion", "إزالة المهام المتكررة عن الاستقبال"],
    ["resenas", "أتمتة طلب التقييمات"],
    ["no_lo_se", "أخبروني بما يجب أتمتته"],
  ],
};

export const dentalLandingCopy: Record<DentalLandingLocale, DentalLandingCopy> = {
  es: {
    metadata: {
      title: "Automatizaciones de IA para clínicas dentales | WIADental",
      description:
        "Automatizamos el seguimiento comercial de clínicas dentales: citas, tratamientos, pacientes inactivos, reseñas y tareas de recepción sin cambiar tu CRM ni usar datos clínicos.",
    },
    localeName: "Español",
    direction: "ltr",
    nav: {
      automations: "Automatizaciones",
      system: "Sistema",
      audit: "Revisión",
      cta: "Automatizar mi clínica",
    },
    brand: {
      label: "WIADental",
      sublabel: "Seguimiento comercial para clínicas dentales",
    },
    hero: {
      eyebrow: "Automatizaciones de IA para clínicas dentales",
      title: "Automatizamos el seguimiento que tu clínica no puede perseguir a mano.",
      body:
        "Citas que necesitan confirmación, tratamientos que esperan respuesta, pacientes inactivos, reseñas y tareas repetitivas de recepción. Creamos flujos de IA conectados a tu CRM para priorizar, preparar mensajes y activar el seguimiento sin tocar datos clínicos ni sonar invasivos.",
      primaryCta: "Quiero automatizar mi seguimiento",
      secondaryCta: "Ver qué se automatiza",
      trust: [
        "Automatizaciones sobre tu CRM actual",
        "WhatsApp, email y tareas para recepción",
        "Control humano antes de enviar",
      ],
    },
    problem: {
      eyebrow: "No necesitas más tareas manuales",
      title: "Si cada cita, presupuesto y recordatorio depende de que alguien se acuerde, el seguimiento se rompe.",
      body:
        "La IA no sustituye a tu equipo. Le quita el trabajo repetitivo: detectar qué hay que mover, preparar el mensaje y dejar claro qué conversación toca atender.",
    },
    leaks: [
      {
        key: "schedule",
        label: "Agenda",
        text: "Confirmaciones, cambios de cita, huecos libres y recordatorios no deberían depender de la memoria del equipo.",
      },
      {
        key: "quotes",
        label: "Tratamientos",
        text: "Un tratamiento enviado sin una automatización de seguimiento termina compitiendo con el ruido del día a día.",
      },
      {
        key: "patients",
        label: "Pacientes",
        text: "Revisiones, higienes y reseñas pueden activarse con mensajes útiles, en el momento adecuado y con aprobación humana.",
      },
    ],
    automations: {
      eyebrow: "Qué automatizamos primero",
      title: "Automatizamos lo que más se repite y más oportunidades deja escapar.",
      body:
        "No empezamos con “IA para todo”. Empezamos con flujos concretos que recepción entiende y dirección puede medir.",
      items: [
        {
          key: "schedule",
          title: "Agenda",
          text: "Confirmaciones, cambios de cita, huecos libres, recordatorios y avisos internos para que recepción sepa a quién contactar.",
        },
        {
          key: "quotes",
          title: "Tratamientos",
          text: "Seguimiento de planes enviados, financiación, dudas frecuentes y mensajes de reactivación cuando el paciente no responde.",
        },
        {
          key: "patients",
          title: "Pacientes dormidos",
          text: "Revisiones, higiene, campañas de retorno y solicitudes de reseñas con mensajes aprobados por la clínica.",
        },
      ],
      closing:
        "La promesa no es “automatizar cualquier cosa”. La promesa es elegir bien qué automatizar, conectarlo con tu forma de trabajar y medir si recupera oportunidades.",
      cta: "Quiero ver mis automatizaciones",
    },
    system: {
      eyebrow: "Cómo lo montamos",
      title: "Un motor de automatizaciones de IA para que recepción venda mejor sin sonar a robot.",
      body:
        "El piloto de 30 días conecta flujos concretos: agenda, tratamientos propuestos, pacientes dormidos, reseñas y tareas internas. La IA prepara, prioriza y avisa; tu equipo mantiene el criterio y decide qué se envía.",
      blocks: [
        {
          key: "frontDesk",
          title: "Recepción con tareas automáticas",
          text: "El equipo ve qué conversación toca atender, por qué importa y qué acción conviene hacer, sin bucear entre WhatsApp, llamadas y notas sueltas.",
        },
        {
          key: "followUp",
          title: "Mensajes preparados por IA",
          text: "Creamos textos por caso: confirmación, tratamiento, financiación, revisión pendiente o reseña. La clínica revisa antes de enviar.",
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
      eyebrow: "Primero auditamos, luego automatizamos",
      title: "Una revisión corta para elegir automatizaciones que tengan sentido.",
      steps: [
        "Mapeamos dónde se repiten tareas: agenda, tratamientos, pacientes inactivos, reseñas y recepción.",
        "Definimos qué debe automatizar la IA, qué revisa el equipo y qué no conviene tocar.",
        "Te proponemos un piloto de 30 días con flujos concretos, métricas y sin cambiar tu CRM.",
      ],
    },
    formIntro: {
      eyebrow: "Diseñemos tu automatización",
      title: "Cuéntanos qué quieres dejar de perseguir manualmente.",
      body:
        "No necesitamos nombres de pacientes ni información clínica. Solo una foto rápida de cómo gestionáis agenda, tratamientos, reseñas y tareas repetitivas.",
      bullets: [
        "Te responde una persona para mapear procesos, no un bot genérico.",
        "Sin datos clínicos, sin envíos ocultos y con control humano.",
        "Objetivo: salir con 2-3 automatizaciones claras para probar.",
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
      mainLeak: "Qué quieres automatizar primero",
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
        "Ejemplo: queremos automatizar confirmaciones, reactivar tratamientos pendientes, ordenar WhatsApp o recuperar revisiones sin parecer insistentes.",
      privacyConsent: "Acepto el tratamiento de mis datos para gestionar esta solicitud de revisión.",
      marketingConsent: "Acepto recibir comunicaciones comerciales relacionadas con automatización dental.",
      submit: "Quiero automatizar mi seguimiento",
    },
  },
  en: {
    metadata: {
      title: "AI Automations for Dental Clinics | WIADental",
      description:
        "Automate commercial follow-up for dental clinics: appointments, treatments, inactive patients, reviews and front desk tasks without replacing your CRM or using clinical data.",
    },
    localeName: "English",
    direction: "ltr",
    nav: {
      automations: "Automations",
      system: "System",
      audit: "Review",
      cta: "Automate my clinic",
    },
    brand: {
      label: "WIADental",
      sublabel: "Follow-up systems for dental clinics",
    },
    hero: {
      eyebrow: "AI automations for dental clinics",
      title: "We automate the follow-up your clinic cannot chase by hand.",
      body:
        "Appointments that need confirmation, treatments waiting for an answer, inactive patients, reviews and repetitive front desk tasks. We build AI flows connected to your CRM to prioritize, draft messages and activate follow-up without clinical data or invasive campaigns.",
      primaryCta: "Automate my follow-up",
      secondaryCta: "See what we automate",
      trust: [
        "Automations on top of your current CRM",
        "WhatsApp, email and front desk tasks",
        "Human control before sending",
      ],
    },
    problem: {
      eyebrow: "You do not need more manual tasks",
      title: "If every appointment, quote and reminder depends on someone remembering, follow-up breaks.",
      body:
        "AI does not replace your team. It removes repetitive work: spotting what needs action, drafting the message and showing which conversation needs attention.",
    },
    leaks: [
      {
        key: "schedule",
        label: "Schedule",
        text: "Confirmations, reschedules, empty slots and reminders should not depend on the team's memory.",
      },
      {
        key: "quotes",
        label: "Treatments",
        text: "A treatment plan sent without automated follow-up ends up competing with the noise of the day.",
      },
      {
        key: "patients",
        label: "Patients",
        text: "Recalls, hygiene and review requests can be activated with useful messages, at the right time and with human approval.",
      },
    ],
    automations: {
      eyebrow: "What we automate first",
      title: "We automate the repetitive work that creates the biggest leaks.",
      body:
        "We do not start with “AI for everything”. We start with concrete flows the front desk understands and management can measure.",
      items: [
        {
          key: "schedule",
          title: "Schedule",
          text: "Confirmations, reschedules, empty slots, reminders and internal alerts so the front desk knows who to contact.",
        },
        {
          key: "quotes",
          title: "Treatments",
          text: "Follow-up for sent plans, financing, frequent questions and reactivation messages when the patient does not answer.",
        },
        {
          key: "patients",
          title: "Dormant patients",
          text: "Recall, hygiene, return campaigns and review requests with messages approved by the clinic.",
        },
      ],
      closing:
        "The promise is not “automate anything”. It is choosing what should be automated, connecting it to the way your clinic works and measuring whether it recovers opportunities.",
      cta: "Show me my automations",
    },
    system: {
      eyebrow: "How we build it",
      title: "An AI automation engine that helps the front desk sell better without sounding robotic.",
      body:
        "The 30-day pilot connects concrete flows: scheduling, proposed treatments, dormant patients, reviews and internal tasks. AI prepares, prioritizes and alerts; your team keeps the judgment and decides what gets sent.",
      blocks: [
        {
          key: "frontDesk",
          title: "Automated front desk tasks",
          text: "The team sees which conversation needs attention, why it matters and what action to take, without digging through WhatsApp, calls and loose notes.",
        },
        {
          key: "followUp",
          title: "AI-prepared messages",
          text: "We create copy by case: confirmation, treatment, financing, recall or review request. The clinic reviews before anything is sent.",
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
      eyebrow: "First we audit, then we automate",
      title: "A short review to choose automations that actually make sense.",
      steps: [
        "We map where tasks repeat: scheduling, treatments, inactive patients, reviews and front desk work.",
        "We define what AI should automate, what the team reviews and what should stay untouched.",
        "We propose a 30-day pilot with concrete flows, metrics and no CRM replacement.",
      ],
    },
    formIntro: {
      eyebrow: "Design your automation",
      title: "Tell us what you want to stop chasing manually.",
      body:
        "We do not need patient names or clinical information. Just a quick picture of how you manage scheduling, treatments, reviews and repetitive tasks.",
      bullets: [
        "A real person maps the process with you, not a generic bot.",
        "No clinical data, no hidden sending and human control.",
        "Goal: leave with 2-3 clear automations to test.",
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
      mainLeak: "What you want to automate first",
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
        "Example: we want to automate confirmations, reactivate pending treatments, organize WhatsApp or recover recalls without sounding pushy.",
      privacyConsent: "I accept the processing of my data to manage this review request.",
      marketingConsent: "I agree to receive commercial communications related to dental automation.",
      submit: "Automate my follow-up",
    },
  },
  ar: {
    metadata: {
      title: "أتمتة بالذكاء الاصطناعي لعيادات الأسنان | WIADental",
      description:
        "نؤتمت المتابعة التجارية لعيادات الأسنان: المواعيد، خطط العلاج، المرضى غير النشطين، التقييمات ومهام الاستقبال دون تغيير نظامك أو استخدام بيانات سريرية.",
    },
    localeName: "العربية",
    direction: "rtl",
    nav: {
      automations: "الأتمتة",
      system: "النظام",
      audit: "المراجعة",
      cta: "أتمتة عيادتي",
    },
    brand: {
      label: "WIADental",
      sublabel: "نظام متابعة ذكي لعيادات الأسنان",
    },
    hero: {
      eyebrow: "أتمتة بالذكاء الاصطناعي لعيادات الأسنان",
      title: "نؤتمت المتابعة التي لا يستطيع فريقك ملاحقتها يدوياً.",
      body:
        "مواعيد تحتاج إلى تأكيد، علاجات تنتظر رداً، مرضى غير نشطين، تقييمات ومهام استقبال متكررة. نبني تدفقات ذكاء اصطناعي متصلة بنظامك لترتيب الأولويات، تجهيز الرسائل وتفعيل المتابعة دون بيانات سريرية أو رسائل مزعجة.",
      primaryCta: "أريد أتمتة المتابعة",
      secondaryCta: "اعرف ما نؤتمته",
      trust: [
        "أتمتة فوق نظامك الحالي",
        "واتساب وبريد إلكتروني ومهام للاستقبال",
        "تحكم بشري قبل الإرسال",
      ],
    },
    problem: {
      eyebrow: "لا تحتاج إلى مهام يدوية أكثر",
      title: "إذا كان كل موعد وخطة علاج وتذكير يعتمد على أن يتذكره شخص ما، ستنكسر المتابعة.",
      body:
        "الذكاء الاصطناعي لا يستبدل فريقك. إنه يزيل العمل المتكرر: تحديد ما يجب تحريكه، تجهيز الرسالة، وتوضيح المحادثة التي تحتاج اهتماماً.",
    },
    leaks: [
      {
        key: "schedule",
        label: "المواعيد",
        text: "تأكيد المواعيد، تغييرها، الفراغات والتذكيرات لا يجب أن تعتمد على ذاكرة الفريق.",
      },
      {
        key: "quotes",
        label: "خطط العلاج",
        text: "خطة علاج يتم إرسالها دون متابعة آلية ستضيع وسط ضغط اليوم.",
      },
      {
        key: "patients",
        label: "المرضى",
        text: "المراجعات والتنظيف وطلبات التقييم يمكن تفعيلها برسائل مفيدة، في الوقت المناسب وبموافقة بشرية.",
      },
    ],
    automations: {
      eyebrow: "ما نؤتمته أولاً",
      title: "نؤتمت العمل المتكرر الذي يترك أكبر فرص ضائعة.",
      body:
        "لا نبدأ بفكرة “ذكاء اصطناعي لكل شيء”. نبدأ بتدفقات واضحة يفهمها الاستقبال ويمكن للإدارة قياسها.",
      items: [
        {
          key: "schedule",
          title: "المواعيد",
          text: "تأكيدات، تغييرات مواعيد، فراغات، تذكيرات وتنبيهات داخلية حتى يعرف الاستقبال من يجب التواصل معه.",
        },
        {
          key: "quotes",
          title: "العلاجات",
          text: "متابعة خطط العلاج المرسلة، التمويل، الأسئلة المتكررة ورسائل إعادة التفعيل عندما لا يرد المريض.",
        },
        {
          key: "patients",
          title: "مرضى غير نشطين",
          text: "مراجعات، تنظيف، حملات عودة وطلبات تقييم برسائل توافق عليها العيادة.",
        },
      ],
      closing:
        "الوعد ليس أن نؤتمت أي شيء بشكل عشوائي. الوعد أن نختار ما يستحق الأتمتة، نربطه بطريقة عملك، ونقيس إن كان يستعيد فرصاً.",
      cta: "أريد رؤية الأتمتة المناسبة",
    },
    system: {
      eyebrow: "كيف نبنيه",
      title: "محرك أتمتة بالذكاء الاصطناعي يساعد الاستقبال على البيع بشكل أفضل دون أن يبدو كأنه روبوت.",
      body:
        "يربط البرنامج التجريبي لمدة 30 يوماً تدفقات واضحة: المواعيد، العلاجات المقترحة، المرضى غير النشطين، التقييمات والمهام الداخلية. الذكاء الاصطناعي يجهز ويرتب وينبه؛ وفريقك يحتفظ بالحكم النهائي.",
      blocks: [
        {
          key: "frontDesk",
          title: "مهام آلية للاستقبال",
          text: "يعرف الفريق أي محادثة تحتاج اهتماماً، ولماذا هي مهمة وما الإجراء المناسب، دون البحث بين واتساب والمكالمات والملاحظات المتفرقة.",
        },
        {
          key: "followUp",
          title: "رسائل يجهزها الذكاء الاصطناعي",
          text: "نجهز نصوصاً حسب الحالة: تأكيد موعد، علاج، تمويل، مراجعة مؤجلة أو طلب تقييم. العيادة تراجع قبل الإرسال.",
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
      eyebrow: "أولاً نراجع، ثم نؤتمت",
      title: "مراجعة قصيرة لاختيار أتمتة لها معنى فعلي.",
      steps: [
        "نحدد أين تتكرر المهام: المواعيد، العلاجات، المرضى غير النشطين، التقييمات والاستقبال.",
        "نحدد ما يجب أن يؤتمته الذكاء الاصطناعي، وما يراجعه الفريق، وما لا يجب لمسه.",
        "نقترح برنامجاً تجريبياً لمدة 30 يوماً بتدفقات واضحة ومؤشرات قياس ودون تغيير نظام العيادة.",
      ],
    },
    formIntro: {
      eyebrow: "لنصمم الأتمتة المناسبة",
      title: "أخبرنا ما الذي تريد التوقف عن ملاحقته يدوياً.",
      body:
        "لا نحتاج إلى أسماء المرضى أو معلومات سريرية. نحتاج فقط إلى صورة سريعة عن إدارة المواعيد والعلاجات والتقييمات والمهام المتكررة.",
      bullets: [
        "يرد عليك شخص حقيقي لرسم العملية معك، وليس بوتاً عاماً.",
        "لا بيانات سريرية، لا إرسال مخفي، ومع تحكم بشري.",
        "الهدف: الخروج باثنتين أو ثلاث أتمتات واضحة للتجربة.",
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
      mainLeak: "ما الذي تريد أتمتته أولاً",
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
        "مثال: نريد أتمتة تأكيد المواعيد، إعادة تفعيل علاجات معلقة، تنظيم واتساب أو استعادة المراجعات دون أن نبدو ملحين.",
      privacyConsent: "أوافق على معالجة بياناتي لإدارة طلب هذه المراجعة.",
      marketingConsent: "أوافق على تلقي رسائل تجارية متعلقة بأتمتة عيادات الأسنان.",
      submit: "أريد أتمتة المتابعة",
    },
  },
};

export function isDentalLandingLocale(value: string): value is DentalLandingLocale {
  return supportedDentalLandingLocales.includes(value as DentalLandingLocale);
}

export function getDentalLandingCopy(locale: string) {
  return isDentalLandingLocale(locale) ? dentalLandingCopy[locale] : null;
}
