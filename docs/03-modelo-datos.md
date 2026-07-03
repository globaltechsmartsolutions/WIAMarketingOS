# Modelo de datos objetivo

## Estado actual

El MVP inicial ya tiene:

- `AgencyLead`
- `AgencyActivity`

Esto sirve para la primera landing dental, pero no basta para un CRM central de marketing.

## Modelo objetivo

### Campaign

Representa una campaña comercial.

Campos clave:

- `id`
- `name`
- `slug`
- `vertical`
- `offer`
- `status`
- `goal`
- `budget`
- `ownerId`
- `createdAt`
- `updatedAt`

Ejemplos:

- `clinica-dental-sin-fugas`
- `estetica-agenda-llena`
- `fisioterapia-pacientes-recurrentes`

### LandingPage

Pantalla pública vinculada a una campaña.

Campos clave:

- `id`
- `campaignId`
- `slug`
- `title`
- `status`
- `publishedVersionId`
- `createdAt`
- `updatedAt`

### PageVersion

Versión inmutable de una página.

Campos clave:

- `id`
- `landingPageId`
- `versionNumber`
- `schema`
- `prompt`
- `status`
- `createdBy`
- `createdAt`

El campo `schema` contiene los bloques renderizables.

### PageVariant

Variante para A/B testing o pruebas de copy.

Campos clave:

- `id`
- `pageVersionId`
- `name`
- `trafficWeight`
- `isControl`
- `status`

### Form

Formulario reutilizable.

Campos clave:

- `id`
- `campaignId`
- `name`
- `schema`
- `successMessage`
- `redirectUrl`

### Lead

Persona o solicitud comercial recibida.

Campos clave:

- `id`
- `campaignId`
- `source`
- `landingPageId`
- `pageVariantId`
- `status`
- `priority`
- `score`
- `email`
- `phone`
- `contactName`
- `companyName`
- `message`
- `consentStatus`
- `createdAt`
- `updatedAt`

### Company

Empresa objetivo.

Campos clave:

- `id`
- `name`
- `domain`
- `vertical`
- `city`
- `size`
- `website`
- `source`

### Contact

Persona asociada a una empresa.

Campos clave:

- `id`
- `companyId`
- `name`
- `role`
- `email`
- `phone`
- `consentStatus`

### Deal

Oportunidad comercial.

Campos clave:

- `id`
- `companyId`
- `leadId`
- `campaignId`
- `stage`
- `value`
- `expectedCloseDate`
- `ownerId`

Estados iniciales:

```text
nuevo
contactado
demo_agendada
piloto_abierto
ganado
perdido
```

### Activity

Registro de actividad comercial.

Tipos:

- `formulario`
- `llamada`
- `email`
- `whatsapp`
- `nota`
- `estado`
- `tarea`
- `ia`

### Task

Acción pendiente.

Campos:

- `id`
- `leadId`
- `dealId`
- `ownerId`
- `title`
- `dueAt`
- `status`

### Event

Evento de comportamiento.

Ejemplos:

- `page_viewed`
- `cta_clicked`
- `form_started`
- `form_submitted`
- `calculator_used`
- `thank_you_viewed`

Campos clave:

- `id`
- `anonymousId`
- `leadId`
- `campaignId`
- `landingPageId`
- `variantId`
- `eventName`
- `properties`
- `utmSource`
- `utmMedium`
- `utmCampaign`
- `createdAt`

### ScoreRule

Regla de puntuación.

Ejemplos:

- `Formulario enviado`: +40.
- `Visitó página de precios`: +20.
- `Cargo dirección`: +15.
- `Sin teléfono`: -10.

### Automation

Definición de una automatización.

Ejemplo:

```text
Si Lead.score >= 70 y Lead.status = nuevo
→ crear tarea "Llamar en menos de 1 hora"
→ prioridad alta
→ actividad "Lead caliente detectado"
```

### AutomationRun

Ejecución concreta de una automatización.

Debe guardar:

- Trigger.
- Resultado.
- Error si falla.
- Fecha.
- Entidad afectada.

### ConsentRecord

Registro de consentimiento.

Debe guardar:

- Finalidad.
- Texto aceptado.
- Fecha.
- IP.
- User agent.
- Canal.
- Política vigente.

### AIGeneration

Historial de generaciones de IA.

Debe guardar:

- Tipo: landing, copy, email, script, diagnóstico.
- Prompt.
- Modelo.
- Entrada.
- Salida estructurada.
- Coste estimado.
- Usuario.
- Estado: borrador, aceptado, descartado.

## Transición desde el modelo actual

La tabla actual `AgencyLead` puede evolucionar así:

```text
AgencyLead → Lead
AgencyActivity → Activity
campaign string → Campaign
landingPage string → LandingPage
```

No hace falta migrarlo todo de golpe. Primero podemos añadir `Campaign` y enlazar los leads nuevos. Después normalizar empresas, contactos y deals.
