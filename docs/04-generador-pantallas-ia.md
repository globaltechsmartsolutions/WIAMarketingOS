# Generador de pantallas con IA

## Decisión de producto

No construiremos un editor libre tipo Webflow en la primera versión.

Construiremos un generador por bloques:

```text
brief
→ estructura JSON validada
→ bloques renderizables
→ preview
→ revisión humana
→ publicación
```

Esto permite velocidad sin perder control visual ni coherencia de marca.

## Referencias

- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI Function Calling](https://developers.openai.com/api/docs/guides/function-calling)
- [Vercel AI SDK structured data](https://vercel.com/docs/ai-sdk)
- [Builder.io Visual Editor](https://www.builder.io/visual-editor)
- [Framer AI](https://www.framer.com/ai/)

## Tipos de pantalla

Primera versión:

- Landing de auditoría.
- Landing de demo.
- Página de gracias.
- Calculadora.
- Lead magnet.
- Página de caso de uso.

Más adelante:

- Microsite por vertical.
- Página comparativa.
- Página de pricing.
- Página de diagnóstico interactivo.

## Esquema de bloques

Un `PageVersion.schema` debería tener una estructura parecida:

```json
{
  "brand": "WIADental",
  "vertical": "dental",
  "goal": "captar_auditoria",
  "blocks": [
    {
      "type": "hero",
      "headline": "Clínica Dental Sin Fugas",
      "subheadline": "Detectamos citas, presupuestos y pacientes que se están escapando.",
      "cta": "Solicitar auditoría gratuita",
      "media": {
        "type": "image",
        "source": "dental-clinic"
      }
    },
    {
      "type": "pain_points",
      "items": []
    },
    {
      "type": "calculator",
      "calculatorId": "dental-leak"
    },
    {
      "type": "form",
      "formId": "audit-request"
    }
  ]
}
```

## Bloques iniciales

- `hero`
- `problem`
- `pain_points`
- `metrics`
- `calculator`
- `process_steps`
- `offer`
- `faq`
- `testimonial`
- `form`
- `final_cta`
- `trust_bar`

## Flujo de generación

1. Usuario crea `CampaignBrief`.
2. IA propone:
   - Oferta.
   - Ángulo.
   - Headline.
   - Bloques.
   - Campos de formulario.
   - Eventos recomendados.
3. Sistema valida JSON contra schema.
4. Se guarda como `PageVersion` en estado `draft`.
5. Usuario revisa preview.
6. Usuario publica.
7. El sistema marca versión publicada y empieza a medir.

## Guardrails

- La IA no puede publicar directamente.
- La IA no puede inventar testimonios reales.
- La IA no puede prometer resultados garantizados.
- La IA no debe solicitar datos sanitarios.
- La IA debe generar claims moderados y revisables.
- Cada salida queda guardada en `AIGeneration`.

## Por qué structured outputs

Necesitamos que la IA devuelva bloques válidos, no HTML arbitrario.

Ventajas:

- Menos errores.
- Más seguridad.
- Diseño consistente.
- Preview fiable.
- Posibilidad de versionar y comparar variantes.

## Futuro editor visual

Cuando el generador por bloques funcione, podemos añadir edición visual limitada:

- Cambiar texto.
- Reordenar bloques.
- Activar/desactivar secciones.
- Cambiar imagen.
- Crear variante.
- Ajustar CTA.

No necesitamos arrastrar cualquier elemento libremente. Necesitamos editar campañas rápido y medir resultados.
