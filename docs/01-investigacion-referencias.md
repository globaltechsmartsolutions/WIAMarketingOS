# Investigación y referencias

Esta investigación resume qué patrones merece la pena copiar de plataformas existentes y qué conviene evitar al construir WIAMarketingOS.

## Plataformas estudiadas

### HubSpot

HubSpot conecta lead scoring con segmentos, workflows e informes. La enseñanza importante es que el score no vive aislado: sirve para activar acciones y priorizar ventas.

Referencia: [HubSpot lead scoring](https://knowledge.hubspot.com/scoring/understand-the-lead-scoring-tool)

Qué copiar:

- Scoring por propiedades y comportamiento.
- Uso del score en workflows, listas e informes.
- Conexión entre marketing y pipeline comercial.

Qué no copiar al principio:

- La amplitud completa de suite.
- Un CMS visual complejo.
- Demasiadas opciones de configuración antes de validar campañas.

### Mautic

Mautic demuestra que un sistema de automatización de marketing puede ser abierto, autoalojable y centrado en contactos, campañas, formularios, scoring y nurturing.

Referencias:

- [Mautic](https://mautic.org/)
- [Mautic lead scoring](https://mautic.org/features/lead-scoring-with-points/)

Qué copiar:

- Contactos y puntos de scoring.
- Formularios como entrada principal de datos.
- Campañas y acciones automáticas.
- Control propio de datos.

Qué no copiar al principio:

- Constructor visual de journeys demasiado complejo.
- Email marketing masivo antes de tener buen consentimiento y limpieza de datos.

### Unbounce, Webflow, Framer y Builder.io

Estas plataformas muestran que crear páginas no basta. Hay que gestionar variantes, objetivos, publicación y optimización.

Referencias:

- [Unbounce Smart Traffic](https://unbounce.com/product/smart-traffic/)
- [Webflow Optimize](https://webflow.com/webflow-way/optimize-analyze/optimize)
- [Framer AI](https://www.framer.com/ai/)
- [Builder.io Visual Editor](https://www.builder.io/visual-editor)

Qué copiar:

- Variantes de landing.
- Objetivos de conversión.
- Generación asistida por IA.
- Componentes de marca reutilizables.
- Edición controlada por bloques.

Qué no copiar al principio:

- Un editor drag-and-drop completo.
- Libertad total de diseño.
- Personalización avanzada por visitante antes de tener volumen.

### Segment, RudderStack y Snowplow

Estas referencias pertenecen al mundo CDP y tracking de eventos. La enseñanza clave: si no capturamos eventos bien desde el principio, luego no podremos atribuir ni optimizar.

Referencias:

- [Twilio Segment](https://www.twilio.com/docs/segment)
- [RudderStack](https://www.rudderstack.com/)
- [Snowplow event tracking](https://snowplow.io/data-management/event-tracking)

Qué copiar:

- Eventos normalizados.
- UTM y fuente de campaña.
- Identidad anónima antes del formulario.
- Identidad conocida después del formulario.
- Esquemas validados para eventos.

Qué no copiar al principio:

- Construir un CDP completo.
- Integraciones con cientos de destinos.
- Data warehouse complejo desde el MVP.

### Twenty, PostHog, Matomo y listmonk

Estas herramientas enseñan que hay piezas open-source útiles, pero no todas deben meterse dentro del producto.

Referencias:

- [Twenty CRM](https://twenty.com/)
- [PostHog](https://posthog.com/)
- [Matomo](https://matomo.org/)
- [listmonk](https://listmonk.app/)

Posible uso futuro:

- Inspiración CRM: Twenty.
- Analítica, eventos y experimentos: PostHog.
- Analítica de privacidad: Matomo.
- Mailing autoalojado: listmonk.

Decisión actual:

No instalar todo ahora. Primero construir el núcleo propio y después integrar lo que tenga sentido.

## Conclusión de investigación

WIAMarketingOS debe combinar cuatro mundos:

```text
CRM comercial
marketing automation
generador de pantallas
tracking/analytics
```

El error sería construir solo una de estas piezas. La ventaja está en unirlas.
