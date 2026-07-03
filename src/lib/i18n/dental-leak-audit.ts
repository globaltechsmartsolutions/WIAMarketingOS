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
    ["agenda", "Confirmaciones y cambios de cita"],
    ["presupuestos", "Seguimiento de tratamientos pendientes"],
    ["pacientes_inactivos", "Volver a contactar con pacientes inactivos"],
    ["recepcion", "Tareas repetitivas de recepción"],
    ["resenas", "Pedir reseñas sin hacerlo a mano"],
    ["no_lo_se", "No lo tengo claro, quiero que lo miréis"],
  ],
  en: [
    ["agenda", "Appointment confirmations and changes"],
    ["presupuestos", "Follow-up for pending treatments"],
    ["pacientes_inactivos", "Reconnect with inactive patients"],
    ["recepcion", "Repetitive front desk tasks"],
    ["resenas", "Ask for reviews without doing it manually"],
    ["no_lo_se", "I am not sure, review it with me"],
  ],
  ar: [
    ["agenda", "تأكيدات وتغييرات المواعيد"],
    ["presupuestos", "متابعة العلاجات المعلقة"],
    ["pacientes_inactivos", "التواصل مع المرضى غير النشطين"],
    ["recepcion", "تخفيف المهام المتكررة عن الاستقبال"],
    ["resenas", "طلب التقييمات دون متابعة يدوية"],
    ["no_lo_se", "لست متأكداً، أريد أن تراجعوه معي"],
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
      system: "Cómo funciona",
      audit: "Auditoría",
      cta: "Quiero una auditoría",
    },
    brand: {
      label: "WIADental",
      sublabel: "Seguimiento comercial para clínicas dentales",
    },
    hero: {
      eyebrow: "Automatizaciones de IA para clínicas dentales",
      title: "Que nada importante se quede en el aire.",
      body:
        "Automatizamos confirmaciones, WhatsApp, tratamientos pendientes, pacientes inactivos y reseñas para que el día a día avance con orden, sin cargar más a recepción y manteniendo siempre el control humano de la clínica.",
      primaryCta: "Quiero una auditoría",
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
      eyebrow: "Por dónde empezamos",
      title: "Primero quitamos las tareas que más cansan al equipo.",
      body:
        "No hace falta revolucionar la clínica. Elegimos dos o tres momentos donde hoy se pierde tiempo: confirmar citas, recuperar tratamientos, reactivar pacientes o pedir reseñas.",
      items: [
        {
          key: "schedule",
          title: "Agenda",
          text: "Recordatorios y avisos para que recepción no tenga que perseguir cada confirmación a mano.",
        },
        {
          key: "quotes",
          title: "Tratamientos",
          text: "Seguimientos educados cuando un paciente se queda pensando un presupuesto y nadie quiere parecer insistente.",
        },
        {
          key: "patients",
          title: "Pacientes inactivos",
          text: "Mensajes para volver a contactar con pacientes que llevan tiempo sin venir, sin sonar frío ni automático.",
        },
      ],
      closing:
        "La clave no es mandar más mensajes. Es mandar el adecuado, en el momento adecuado y con el tono de la clínica.",
      cta: "Quiero revisar mi clínica",
    },
    system: {
      eyebrow: "Cómo trabajamos",
      title: "Miramos tu día a día y montamos lo que tenga sentido.",
      body:
        "No llegamos con una solución cerrada. Vemos cómo gestionáis agenda, WhatsApp, llamadas y tratamientos, y a partir de ahí montamos automatizaciones sencillas que el equipo pueda usar.",
      blocks: [
        {
          key: "frontDesk",
          title: "Menos cosas en la cabeza",
          text: "En vez de depender de memoria, notas y prisas, el equipo ve qué toca hacer, con quién y por qué.",
        },
        {
          key: "followUp",
          title: "Mensajes con vuestro tono",
          text: "Preparamos textos que suenan a la clínica: cercanos, profesionales y sin presión. Si algo importa, se revisa antes de enviarlo.",
        },
        {
          key: "dashboard",
          title: "Lo importante a la vista",
          text: "Dirección puede ver qué se ha recuperado: citas, tratamientos, pacientes y reseñas, sin perderse en hojas sueltas.",
        },
        {
          key: "control",
          title: "La clínica decide",
          text: "Nosotros ordenamos el trabajo. El criterio, el trato y la relación con el paciente siguen siendo vuestros.",
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
      eyebrow: "Lo vemos contigo",
      title: "Déjanos tus datos y te decimos por dónde empezar.",
      body:
        "No necesitamos historias clínicas ni una lista interminable de números. Con una llamada corta podemos detectar qué tendría más sentido automatizar primero.",
      bullets: [
        "Sin datos de pacientes.",
        "Sin cambiar tu CRM de entrada.",
        "Una primera propuesta clara, no una demo genérica.",
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
      mainLeak: "¿Qué te gustaría quitar de encima primero?",
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
      message: "¿Algo más que debamos saber?",
      messagePlaceholder:
        "Opcional: por ejemplo, recibimos demasiados WhatsApp, se quedan tratamientos sin cerrar o recepción va saturada.",
      privacyConsent: "Acepto que contactéis conmigo para gestionar esta auditoría.",
      marketingConsent: "Acepto recibir comunicaciones comerciales relacionadas con automatización dental.",
      submit: "Quiero que lo reviséis",
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
      system: "How it works",
      audit: "Audit",
      cta: "Request an audit",
    },
    brand: {
      label: "WIADental",
      sublabel: "Follow-up systems for dental clinics",
    },
    hero: {
      eyebrow: "AI automations for dental clinics",
      title: "Make sure nothing important is left hanging.",
      body:
        "We automate confirmations, WhatsApp, pending treatments, inactive patients and reviews so the day-to-day moves with order, without adding more work to the front desk and always under the clinic's human control.",
      primaryCta: "Request an audit",
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
      eyebrow: "Where we start",
      title: "First, we take the tiring work off your team's plate.",
      body:
        "You do not need to change the whole clinic. We pick two or three moments where time is lost today: confirming appointments, following up on treatment plans, bringing patients back or asking for reviews.",
      items: [
        {
          key: "schedule",
          title: "Schedule",
          text: "Reminders and alerts so the front desk does not have to chase every confirmation by hand.",
        },
        {
          key: "quotes",
          title: "Treatments",
          text: "Polite follow-ups when a patient is still thinking about a treatment plan and nobody wants to sound pushy.",
        },
        {
          key: "patients",
          title: "Inactive patients",
          text: "Messages to reconnect with patients who have not visited in a while, without sounding cold or automatic.",
        },
      ],
      closing:
        "The point is not to send more messages. It is to send the right one, at the right moment, in the clinic's own tone.",
      cta: "Review my clinic",
    },
    system: {
      eyebrow: "How we work",
      title: "We look at your day-to-day, then build what actually helps.",
      body:
        "We do not arrive with a boxed solution. We look at appointments, WhatsApp, calls and pending treatments, then build simple automations the team can actually use.",
      blocks: [
        {
          key: "frontDesk",
          title: "Fewer things to remember",
          text: "Instead of relying on memory, notes and rush, the team sees what needs to happen, with whom and why.",
        },
        {
          key: "followUp",
          title: "Messages in your tone",
          text: "We prepare messages that sound like the clinic: warm, professional and not pushy. If it matters, the team reviews it before sending.",
        },
        {
          key: "dashboard",
          title: "What matters, clearly visible",
          text: "Management can see what came back: appointments, treatments, patients and reviews, without digging through loose sheets.",
        },
        {
          key: "control",
          title: "The clinic stays in charge",
          text: "We organize the work. The judgment, the tone and the patient relationship stay with your team.",
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
      eyebrow: "We will review it with you",
      title: "Leave your details and we will tell you where to start.",
      body:
        "We do not need patient records or a long list of numbers. With a short call we can spot what would make the most sense to automate first.",
      bullets: [
        "No patient data.",
        "No CRM change to start.",
        "A clear first proposal, not a generic demo.",
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
      mainLeak: "What would you like to take off the team's plate first?",
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
      message: "Anything else we should know?",
      messagePlaceholder:
        "Optional: too many WhatsApps, pending treatments, missed calls or a stretched front desk.",
      privacyConsent: "I agree to be contacted to manage this audit.",
      marketingConsent: "I agree to receive commercial communications related to dental automation.",
      submit: "Review it with me",
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
      system: "كيف يعمل",
      audit: "المراجعة",
      cta: "أريد مراجعة",
    },
    brand: {
      label: "WIADental",
      sublabel: "نظام متابعة ذكي لعيادات الأسنان",
    },
    hero: {
      eyebrow: "أتمتة بالذكاء الاصطناعي لعيادات الأسنان",
      title: "حتى لا يبقى أي أمر مهم معلّقاً.",
      body:
        "نؤتمت تأكيدات المواعيد، واتساب، العلاجات المعلقة، المرضى غير النشطين والتقييمات حتى يسير اليوم بانتظام، دون زيادة العبء على الاستقبال، ومع بقاء التحكم البشري دائماً لدى العيادة.",
      primaryCta: "أريد مراجعة",
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
      eyebrow: "من أين نبدأ",
      title: "نبدأ بالمهام التي تتعب الفريق كل يوم.",
      body:
        "لا نحتاج إلى تغيير كل شيء في العيادة. نختار لحظتين أو ثلاثاً يضيع فيها الوقت: تأكيد المواعيد، متابعة علاج معلق، التواصل مع مريض لم يزر منذ فترة أو طلب تقييم.",
      items: [
        {
          key: "schedule",
          title: "المواعيد",
          text: "تذكيرات وتنبيهات حتى لا يضطر الاستقبال إلى ملاحقة كل تأكيد يدوياً.",
        },
        {
          key: "quotes",
          title: "العلاجات",
          text: "متابعة لطيفة عندما يبقى المريض يفكر في خطة علاج ولا نريد أن تبدو العيادة ملحة.",
        },
        {
          key: "patients",
          title: "مرضى غير نشطين",
          text: "رسائل للعودة إلى المرضى الذين ابتعدوا فترة، دون أن تبدو باردة أو آلية.",
        },
      ],
      closing:
        "الفكرة ليست إرسال رسائل أكثر. الفكرة أن تصل الرسالة المناسبة في الوقت المناسب وبنبرة العيادة.",
      cta: "أريد مراجعة عيادتي",
    },
    system: {
      eyebrow: "طريقة العمل",
      title: "نرى كيف يعمل يومكم، ثم نركّب ما يفيد فعلاً.",
      body:
        "لا نأتي بحل جاهز. نراجع المواعيد، واتساب، المكالمات والعلاجات المعلقة، ثم نبني أتمتة بسيطة يستطيع الفريق استخدامها.",
      blocks: [
        {
          key: "frontDesk",
          title: "أشياء أقل في ذهن الفريق",
          text: "بدلاً من الاعتماد على الذاكرة والملاحظات والاستعجال، تظهر المهمة التالية بوضوح: مع من، ولماذا.",
        },
        {
          key: "followUp",
          title: "رسائل تشبهكم",
          text: "نكتب الرسائل بنبرة العيادة: هادئة، مهنية وغير مزعجة. ويمكن للفريق مراجعتها قبل الإرسال.",
        },
        {
          key: "dashboard",
          title: "الأهم أمام الإدارة",
          text: "تعرفون ما تم استعادته: مواعيد، علاجات، مرضى وتقييمات، دون الغرق في الجداول.",
        },
        {
          key: "control",
          title: "القرار يبقى عند العيادة",
          text: "نحن نرتب العمل ونخففه. فريقكم يبقى صاحب القرار في كل ما يخص العلاقة مع المريض.",
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
      eyebrow: "نراجعها معك",
      title: "اترك بياناتك ونخبرك من أين تبدأ.",
      body:
        "لا نحتاج إلى بيانات مرضى ولا إلى أرقام كثيرة. بمكالمة قصيرة نعرف ما الذي يستحق الأتمتة أولاً في عيادتك.",
      bullets: [
        "لا نطلب بيانات مرضى.",
        "دون تغيير برنامجك في البداية.",
        "اقتراح واضح، وليس عرضاً عاماً.",
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
      mainLeak: "ما أول شيء تريد تخفيفه عن الفريق؟",
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
      message: "هل هناك شيء آخر؟",
      messagePlaceholder:
        "اختياري: مثلاً واتساب كثير، علاجات لا تُغلق، أو استقبال مرهق.",
      privacyConsent: "أوافق على التواصل معي لإدارة هذه المراجعة.",
      marketingConsent: "أوافق على تلقي رسائل تجارية متعلقة بأتمتة عيادات الأسنان.",
      submit: "أريد أن تراجعوه",
    },
  },
};

export function isDentalLandingLocale(value: string): value is DentalLandingLocale {
  return supportedDentalLandingLocales.includes(value as DentalLandingLocale);
}

export function getDentalLandingCopy(locale: string) {
  return isDentalLandingLocale(locale) ? dentalLandingCopy[locale] : null;
}
