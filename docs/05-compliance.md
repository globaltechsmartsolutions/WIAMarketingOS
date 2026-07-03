# Cumplimiento, privacidad y riesgos

Este documento no sustituye asesoramiento legal. Sirve como guía interna para diseñar WIAMarketingOS con menos riesgo.

## Principio general

WIAMarketingOS debe capturar y tratar datos comerciales de empresas y contactos, no datos sanitarios.

Regla práctica:

```text
contexto operativo de una clínica: sí
datos clínicos o pacientes identificables: no
```

## Inbound

El flujo más seguro es inbound:

```text
usuario visita landing
lee información
acepta política
envía formulario
queda registro de consentimiento
ventas contacta para gestionar la solicitud
```

Cada formulario debe guardar:

- Campaña.
- Landing.
- Fuente.
- UTM.
- Texto de consentimiento.
- Fecha.
- IP o metadatos técnicos razonables.
- User agent.

## Outbound

Las comunicaciones comerciales electrónicas no solicitadas tienen límites fuertes.

La LSSI establece la prohibición general de enviar comunicaciones publicitarias por correo electrónico u otro medio equivalente si no han sido solicitadas o autorizadas previamente.

Referencia: [BOE Ley 34/2002, artículo 21](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)

Implicación para el producto:

- No diseñar automatizaciones de envío masivo sin consentimiento.
- Priorizar mensajes preparados para revisión humana.
- Guardar origen de cada contacto.
- Mantener estado de consentimiento.
- Permitir baja/oposición.

## Lista Robinson y oposición

Para campañas comerciales hay que tener en cuenta sistemas de exclusión publicitaria y oposición.

Referencias:

- [AEPD publicidad no deseada](https://www.aepd.es/areas-de-actuacion/publicidad-no-deseada)
- [Lista Robinson](https://www.listarobinson.es/)

Implicación para el producto:

- Añadir campos de `doNotContact`.
- Registrar motivo de bloqueo.
- Evitar tareas automáticas sobre contactos bloqueados.
- Preparar integración o procedimiento de consulta antes de outbound a escala.

## Cookies y analítica

La medición puede requerir consentimiento según el tipo de cookie o herramienta.

La AEPD contempla que algunas cookies de medición pueden estar exentas bajo condiciones concretas si son estrictamente necesarias para estadísticas de tráfico o rendimiento.

Referencia: [AEPD guía de cookies analíticas](https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf)

Implicación para el producto:

- Empezar con analítica propia mínima y respetuosa.
- Evitar publicidad comportamental sin consentimiento.
- Separar eventos técnicos de eventos de marketing.
- Documentar qué eventos se capturan y por qué.

## Retención

Definir políticas:

- Leads no cualificados: revisar o eliminar tras cierto tiempo.
- Leads perdidos: conservar solo si hay base legítima o interés comercial razonable.
- Contactos con oposición: conservar mínimo necesario para no contactar.
- Eventos anónimos: agregar o purgar tras periodo definido.

## Seguridad

Mínimos:

- Acceso interno autenticado.
- Roles.
- Auditoría de acciones importantes.
- Variables de entorno fuera del repo.
- No guardar secretos en prompts.
- No enviar datos personales innecesarios a modelos IA.

## IA y datos

La IA debe trabajar con el mínimo dato necesario.

Permitido:

- Sector.
- Tamaño aproximado.
- Dolor comercial.
- Mensaje escrito por el lead.
- Estado del pipeline.

Evitar:

- Datos sanitarios.
- Información sensible.
- Listados masivos sin finalidad clara.
- Decisiones automáticas irreversibles.

## Checklist por formulario

Antes de publicar un formulario:

- Tiene política enlazada.
- Tiene checkbox de consentimiento.
- Explica finalidad.
- No pide datos sanitarios.
- Guarda campaña/fuente/UTM.
- Tiene mecanismo de baja u oposición si habrá comunicaciones.
- Los mensajes posteriores respetan el consentimiento.
