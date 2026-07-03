# WIAMarketingOS

Motor interno de campañas, captación, generación de pantallas y ventas de GlobalTech Smart Solutions.

Este repositorio está separado de los CRM que se venden a clientes. Aquí viven las campañas, landings, formularios, leads, empresas, contactos, oportunidades, eventos, automatizaciones y generación asistida por IA.

```text
CRMProDental = producto que vendemos a clínicas
WIAMarketingOS = sistema interno para captar, cualificar y vender productos
```

## Documentación

La estrategia y el roadmap están en [`docs/`](./docs/README.md):

- [Visión de producto](./docs/00-vision-producto.md)
- [Investigación y referencias](./docs/01-investigacion-referencias.md)
- [Arquitectura recomendada](./docs/02-arquitectura.md)
- [Modelo de datos objetivo](./docs/03-modelo-datos.md)
- [Generador de pantallas con IA](./docs/04-generador-pantallas-ia.md)
- [Cumplimiento, privacidad y riesgos](./docs/05-compliance.md)
- [Roadmap por fases](./docs/06-roadmap.md)
- [Plan de implementación](./docs/07-plan-implementacion.md)

## Rutas actuales

- `/` - entrada del sistema.
- `/auditoria-fugas-dental` - landing pública de captación para clínicas dentales.
- `/interno/ventas` - backoffice interno inicial de leads y auditorías.
- `/api/agency/audits` - endpoint que recibe solicitudes de auditoría.

## Desarrollo

```bash
npm install
npm run db:generate
npm run dev
```

Configura `DATABASE_URL` antes de ejecutar migraciones o usar el backoffice con datos reales.

## Base de datos

```bash
npm run db:migrate
npm run db:deploy
npm run db:studio
```

## Credencial local de demo

- Usuario: `alejandro@globaltech.test`
- Clave: `demo2026` o el valor de `INTERNAL_DEMO_PASSWORD`

## Próximo hito

El siguiente hito recomendado es la Fase 1 del roadmap: convertir el backoffice inicial en un CRM central de marketing con campañas, empresas, contactos, leads, oportunidades, actividades y tareas.
