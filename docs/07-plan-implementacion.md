# Plan de implementación

Este plan traduce el roadmap en trabajo concreto para las próximas iteraciones.

## Sprint 1 - Normalizar el CRM de marketing

Objetivo:

Pasar de `AgencyLead` a una base de datos preparada para múltiples campañas.

Tareas:

- Crear modelos Prisma:
  - `Campaign`
  - `Company`
  - `Contact`
  - `Lead`
  - `Deal`
  - `Activity`
  - `Task`
- Mantener compatibilidad temporal con `AgencyLead` o migrarlo a `Lead`.
- Crear seed/demo con una campaña dental.
- Crear navegación interna.
- Crear pantalla `/interno/campanas`.
- Crear pantalla `/interno/leads`.
- Crear pantalla `/interno/deals`.

Resultado esperado:

WIAMarketingOS deja de ser "panel de auditorías dentales" y pasa a ser CRM central de campañas.

## Sprint 2 - Campaign Builder

Objetivo:

Crear y gestionar campañas desde UI.

Tareas:

- Formulario de nueva campaña.
- Edición de campaña.
- Estados de campaña.
- Duplicar campaña.
- Métricas básicas por campaña:
  - leads totales
  - leads abiertos
  - demos
  - pilotos
  - ganados
- Asociar formularios y leads a campaña.

Resultado esperado:

Podemos crear una campaña nueva sin tocar código.

## Sprint 3 - Page Studio base

Objetivo:

Crear páginas dinámicas por bloques.

Tareas:

- Crear modelos:
  - `LandingPage`
  - `PageVersion`
  - `PageVariant`
  - `Form`
  - `FormSubmission`
- Definir schema Zod para bloques.
- Crear renderizador de bloques.
- Crear ruta pública dinámica `/c/[slug]`.
- Crear preview interno.
- Crear publicación de versión.

Resultado esperado:

Podemos renderizar una landing desde datos guardados en base de datos.

## Sprint 4 - IA de pantallas

Objetivo:

Generar borradores de landing con IA.

Tareas:

- Añadir `AIGeneration`.
- Definir prompts por vertical.
- Usar salida estructurada validada.
- Crear pantalla "Generar landing".
- Guardar borrador como `PageVersion`.
- Añadir revisión manual.

Resultado esperado:

Desde un brief, el sistema crea una landing editable por bloques.

## Sprint 5 - Tracking y scoring

Objetivo:

Medir y priorizar.

Tareas:

- Crear `Event`.
- Crear endpoint `/api/events`.
- Añadir script de tracking.
- Capturar:
  - `page_viewed`
  - `cta_clicked`
  - `form_started`
  - `form_submitted`
  - `calculator_used`
- Añadir `ScoreRule`.
- Recalcular score al entrar un evento o lead.

Resultado esperado:

Sabemos qué campaña convierte y qué lead debe llamar ventas primero.

## Sprint 6 - Automatizaciones

Objetivo:

Reducir trabajo manual repetitivo.

Tareas:

- Crear `Automation`.
- Crear `AutomationRun`.
- Crear motor simple basado en reglas.
- Acciones iniciales:
  - crear tarea
  - cambiar prioridad
  - registrar actividad
  - preparar mensaje
- Vista de historial de automatizaciones.

Resultado esperado:

Un lead caliente crea automáticamente tarea y siguiente paso.

## Sprint 7 - Experimentos

Objetivo:

Mejorar conversión con variantes.

Tareas:

- Crear objetivos de conversión.
- Repartir tráfico por variante.
- Medir conversión por variante.
- Marcar variante ganadora.
- Duplicar variante con IA.

Resultado esperado:

Las campañas empiezan a aprender de sus resultados.

## Primera implementación recomendada

Empezar por Sprint 1.

Razón:

El producto necesita una base sólida antes del generador IA. Si generamos pantallas sin campañas, leads, empresas y oportunidades bien modeladas, solo tendremos más páginas sueltas.

## Criterio para avanzar de fase

No avanzar a la siguiente fase si la anterior no cumple:

- Datos guardados correctamente.
- UI usable.
- Estado de pipeline claro.
- Sin mezclar con CRM clínico.
- Build y lint pasando.
- Documentación actualizada.
