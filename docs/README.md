# Documentación de WIAMarketingOS

WIAMarketingOS es el motor interno de campañas, captación y ventas de GlobalTech Smart Solutions.

La idea central es clara:

```text
CRMProDental = producto que vendemos a clínicas
WIAMarketingOS = sistema interno para captar, cualificar y vender productos
```

Este repositorio no debe convertirse en un CRM clínico ni almacenar datos sanitarios. Aquí viven campañas, landings, formularios, leads, empresas, contactos, oportunidades, automatizaciones, eventos y generación asistida por IA.

## Índice

- [Visión de producto](./00-vision-producto.md)
- [Investigación y referencias](./01-investigacion-referencias.md)
- [Arquitectura recomendada](./02-arquitectura.md)
- [Modelo de datos objetivo](./03-modelo-datos.md)
- [Generador de pantallas con IA](./04-generador-pantallas-ia.md)
- [Cumplimiento, privacidad y riesgos](./05-compliance.md)
- [Roadmap por fases](./06-roadmap.md)
- [Plan de implementación](./07-plan-implementacion.md)

## Decisión principal

Durante la fase inicial, WIAMarketingOS debe ser un solo proyecto, organizado como monolito modular. No conviene separar en varios repos todavía.

Más adelante, si crecen el volumen de eventos, las automatizaciones o la generación IA, podremos extraer piezas a un monorepo:

```text
apps/web          panel interno, landings y generador
apps/worker       automatizaciones pesadas
apps/tracker      recepción de eventos
packages/db       Prisma y modelos compartidos
packages/ui       sistema visual
packages/ai       generación estructurada
```

Ahora mismo la prioridad es avanzar rápido, mantener una sola base de datos y separar bien los dominios dentro del mismo repo.
