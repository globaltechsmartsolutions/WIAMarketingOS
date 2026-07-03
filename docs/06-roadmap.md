# Roadmap por fases

## Fase 0 - Base separada

Estado: hecho.

Entregables:

- Repo `WIAMarketingOS`.
- Next.js independiente.
- Landing dental inicial.
- API de auditorías.
- Backoffice interno básico.
- Prisma con `AgencyLead` y `AgencyActivity`.

Objetivo conseguido:

```text
campaña separada del CRM del cliente
```

## Fase 1 - CRM central de marketing

Estado: hecho.

Objetivo:

Convertir el backoffice en un CRM comercial interno real.

Entregables:

- Modelos `Campaign`, `Lead`, `Company`, `Contact`, `Deal`, `Activity`, `Task`.
- Pipeline configurable por campaña.
- Vista de campañas.
- Vista de leads.
- Vista de oportunidad.
- Búsqueda y filtros.
- Notas, llamadas, tareas y próximos pasos.

Definition of Done:

- Un lead puede vincularse a campaña, empresa, contacto y oportunidad.
- Ventas puede saber qué tocar hoy.
- Dirección puede ver pipeline por campaña.

Implementado:

- Modelos Prisma `Campaign`, `Company`, `Contact`, `Lead`, `Deal`, `Activity` y `Task`.
- Migración `20260703134500_add_marketing_crm_core`.
- Seed/demo idempotente de campaña dental.
- Sincronización de `AgencyLead` hacia el CRM central.
- Navegación interna con `/interno/campanas`, `/interno/leads` y `/interno/deals`.
- Alias `/interno/ventas` redirigido a `/interno/leads`.

## Fase 2 - Campaign Builder

Objetivo:

Crear campañas desde un brief, no desde código.

Entregables:

- Pantalla `Nueva campaña`.
- Campos: vertical, oferta, ICP, dolor, promesa, CTA, fuente, presupuesto.
- Estado de campaña: borrador, activa, pausada, cerrada.
- Biblioteca de campañas.
- Duplicar campaña.
- Archivar campaña.

Definition of Done:

- Crear una campaña dental o estética sin tocar código.
- Ver leads y métricas agrupados por campaña.

## Fase 3 - Page Studio por bloques

Objetivo:

Generar y gestionar pantallas de campaña.

Entregables:

- Modelos `LandingPage`, `PageVersion`, `PageVariant`, `Form`.
- Renderizador de bloques.
- Preview interno.
- Publicación de una versión.
- Página pública dinámica por slug.
- Formularios asociados a campaña.

Definition of Done:

- Crear una landing desde un schema JSON.
- Publicarla en una URL.
- Capturar leads asociados a esa landing y campaña.

## Fase 4 - IA de generación

Objetivo:

Usar IA para acelerar campañas sin perder control.

Entregables:

- Modelo `AIGeneration`.
- Prompts internos.
- Generador de estructura de landing.
- Generador de campos de formulario.
- Generador de mensajes comerciales.
- Generador de guion de llamada.
- Revisión humana antes de publicar.

Definition of Done:

- Desde un brief, la IA propone una landing completa por bloques.
- El usuario puede aceptar, editar o descartar.
- Toda generación queda registrada.

## Fase 5 - Tracking, scoring y atribución

Objetivo:

Medir comportamiento y priorizar oportunidades.

Entregables:

- Modelo `Event`.
- Endpoint `/api/events`.
- Script ligero de tracking.
- UTM persistentes.
- `anonymousId`.
- Enlace de eventos anónimos con lead tras formulario.
- Modelo `ScoreRule`.
- Recalculo de score.

Definition of Done:

- Saber de qué fuente vino cada lead.
- Saber qué landing y variante convirtió.
- Priorizar leads por scoring.

## Fase 6 - Automatizaciones

Objetivo:

Activar tareas y seguimiento sin depender de memoria humana.

Entregables:

- Modelos `Automation` y `AutomationRun`.
- Triggers:
  - `lead.created`
  - `lead.score_changed`
  - `deal.stage_changed`
  - `task.overdue`
- Acciones:
  - crear tarea
  - cambiar prioridad
  - preparar mensaje
  - registrar actividad
  - avisar internamente

Definition of Done:

- Lead caliente crea tarea automática.
- Lead sin seguimiento genera aviso.
- Toda automatización deja rastro.

## Fase 7 - Experimentación y optimización

Objetivo:

Comparar variantes y mejorar conversión.

Entregables:

- Objetivos de conversión.
- Variantes A/B.
- Distribución de tráfico.
- Informe por variante.
- Ganador manual.
- Histórico de cambios.

Definition of Done:

- Una campaña puede tener dos variantes de landing.
- El sistema mide cuál convierte mejor.

## Fase 8 - Integraciones

Objetivo:

Conectar con herramientas externas cuando el núcleo esté validado.

Integraciones candidatas:

- Email transaccional.
- WhatsApp Business.
- Slack.
- Google Sheets.
- PostHog o Matomo.
- n8n para workflows complejos.
- listmonk para newsletters con consentimiento.

Definition of Done:

- Las integraciones no sustituyen el núcleo.
- WIAMarketingOS sigue siendo la fuente principal de campaña y lead.

## Orden recomendado

```text
Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6 → Fase 7 → Fase 8
```

No invertir Fase 4 y Fase 3. Primero necesitamos renderizador y esquema de bloques; después la IA genera contra ese esquema.
