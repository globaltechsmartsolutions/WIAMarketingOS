# WIAMarketingOS

Motor interno de campañas y ventas de GlobalTech Smart Solutions.

Este repositorio está separado de los CRM que se venden a clientes. Aquí viven las landings, formularios, leads y seguimiento comercial interno.

## Rutas iniciales

- `/` - entrada del sistema.
- `/auditoria-fugas-dental` - landing pública de captación para clínicas dentales.
- `/interno/ventas` - backoffice interno de leads y auditorías.
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

Credencial local de demo:

- Usuario: `alejandro@globaltech.test`
- Clave: `demo2026` o el valor de `INTERNAL_DEMO_PASSWORD`
