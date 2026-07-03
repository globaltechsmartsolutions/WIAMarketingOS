# Arquitectura recomendada

## Decisión actual

La arquitectura recomendada para esta fase es un monolito modular con Next.js, Prisma y PostgreSQL.

```text
WIAMarketingOS
├─ app
│  ├─ rutas públicas
│  ├─ rutas internas
│  └─ APIs
├─ lib
│  ├─ dominio de campañas
│  ├─ dominio de leads
│  ├─ dominio de IA
│  ├─ tracking
│  └─ automatizaciones
├─ prisma
│  ├─ schema.prisma
│  └─ migrations
└─ docs
```

## Por qué no separar aún

Separar ahora en varios servicios añadiría fricción:

- Más despliegues.
- Más variables de entorno.
- Más autenticación entre servicios.
- Más coordinación de base de datos.
- Más coste de mantenimiento.

Todavía necesitamos validar el flujo completo. Cuando el producto madure, la separación natural será por carga o responsabilidad.

## Separaciones futuras

### Web

Panel interno, landings, generador de pantallas y APIs ligeras.

### Worker

Automatizaciones pesadas:

- Recalcular lead scoring.
- Ejecutar workflows.
- Enviar integraciones.
- Generar pantallas o assets con IA.

### Tracker

Recepción de eventos de alto volumen:

- Visitas.
- Clics.
- Formularios iniciados.
- Formularios enviados.
- Conversiones.

### Packages

Si se convierte en monorepo:

```text
packages/db
packages/ui
packages/ai
packages/tracking
packages/workflows
```

## Dominios internos

### Campaign Management

Gestiona campañas, verticales, ofertas, mensajes y estado de publicación.

### Page Studio

Gestiona pantallas, versiones, bloques, variantes y objetivos de conversión.

### Lead CRM

Gestiona leads, empresas, contactos, oportunidades, actividades y tareas.

### Tracking

Recibe eventos y los relaciona con campaña, landing, variante y lead.

### Scoring

Calcula puntuaciones por perfil y comportamiento.

### Automations

Ejecuta reglas a partir de eventos o cambios de estado.

### AI Studio

Genera estructuras, copies, diagnósticos, mensajes, emails y guiones.

## Flujo principal

```text
CampaignBrief
→ PageVersion generated
→ Landing published
→ VisitorEvent page_viewed
→ VisitorEvent cta_clicked
→ Lead captured
→ Company/Contact linked
→ Deal created
→ Score calculated
→ Task/Activity created
→ Sales follow-up
→ Conversion measured
```

## Reglas de arquitectura

- Las rutas públicas nunca deben depender de módulos clínicos.
- Los eventos se guardan aunque no exista lead todavía.
- Un lead debe poder venir de cualquier campaña, no solo dental.
- Una landing publicada debe tener versión inmutable.
- La IA genera borradores, no publica sin revisión.
- Toda automatización debe dejar rastro en `AutomationRun`.
- Toda acción comercial importante debe quedar como `Activity`.
