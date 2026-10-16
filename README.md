# Portafolio — Lenin Alvarado

Portafolio de programador web full-stack hecho con **Next.js**, como ejercicio práctico del curso *Programación web full-stack con IA*. Reúne los proyectos del curso, cada uno enlazado a su versión publicada en **GitHub Pages**.

## Secciones

1. **Header**: nombre y profesión (Desarrollador Full Stack).
2. **Sobre mí**: presentación breve.
3. **Conocimientos técnicos**: frontend, backend y herramientas.
4. **Proyectos**: nombre, descripción, captura y enlace a GitHub Pages de cada proyecto.
5. **Contacto**: correo, LinkedIn y GitHub.

## Proyectos del curso

| Proyecto | GitHub Pages |
| --- | --- |
| CV en HTML semántico | https://leninsio.github.io/Proyecto-HTML-SEMANTICO-LENIN-ALVARADO/ |
| Copia de Starlink | https://leninsio.github.io/copia-starlink-lexpin/proyectos/starlink/ |
| Copia de YouTube | https://leninsio.github.io/COPIA-YOUTUBE/ |
| Rediseño de Cinex | https://leninsio.github.io/cinex-rediseno-proyecto-lexpin/ |
| Formulario de registro en JavaScript | https://leninsio.github.io/ejercicios-js-lexpin/formulario%20de%20registro%20tarea/formulario.html |
| Rick & Morty | https://leninsio.github.io/proyecto-rick-morty/ |

## Cómo ejecutarlo

El proyecto se gestiona **solo con pnpm** (no npm ni npx). pnpm bloquea por defecto los scripts de instalación de las dependencias.

```bash
pnpm install
pnpm dev          # servidor de desarrollo en http://localhost:3000
pnpm test         # pruebas con Vitest y Testing Library
pnpm run lint     # ESLint
pnpm run build    # build de producción
```

## Uso de inteligencia artificial

La IA se usó como apoyo durante todo el ejercicio:

- **Planificación y revisión**: definir requisitos a partir del enunciado, dividir el trabajo en tareas, revisar cada entrega (pruebas, build, lint y capturas en escritorio y celular) y corregir detalles.
- **Generación de código**: implementación de cada tarea a partir de especificaciones escritas, siguiendo TDD.
- **Diseño y textos**: búsqueda de referencias de portafolios, propuesta visual inspirada en Apple, redacción de la intro y de las descripciones de los proyectos.
- **Publicación de proyectos**: activación de GitHub Pages en los repositorios del curso y capturas de cada sitio.

Todo el código generado se revisó y se verificó con las pruebas antes de aceptarlo.

## TDD

Cada comportamiento se escribió primero como prueba que falla (rojo) y después se implementó lo mínimo para que pase (verde). Las pruebas cubren la validación de enlaces de GitHub Pages, cada sección, el carrusel de proyectos, el selector de tema, el rate-limit y el contacto.

## Principios SOLID

- **Responsabilidad única (S)**: los datos viven en `src/data`, cada sección es un componente que solo los presenta, y `src/app/page.tsx` solo compone las secciones en orden. La lógica (carrusel, tema, rate-limit, validación de URLs) está en funciones puras en `src/lib`.
- **Abierto/cerrado (O)**: agregar un proyecto o una tecnología es agregar un dato en `src/data`, sin tocar los componentes.
- **Sustitución de Liskov (L)**: cualquier implementación de `RateLimitStore` (memoria, Redis) funciona con el mismo limitador.
- **Segregación de interfaces (I)**: los componentes reciben solo las props que usan.
- **Inversión de dependencias (D)**: `createRateLimiter` depende de la interfaz `RateLimitStore` y de un reloj inyectado, no de una implementación concreta.

## Rate-limit por IP

El sitio limita las peticiones por dirección IP para evitar abusos y ráfagas de tráfico.

- **Límite:** 60 peticiones por IP en una **ventana fija de 60 segundos**. La ventana arranca con la primera petición de la IP y no se desliza.
- **Al superar el límite:** la respuesta es `429` con el cuerpo de texto `Demasiadas peticiones. Intenta de nuevo en unos segundos.`
- **Cabeceras de respuesta:**
  - `RateLimit-Limit`: peticiones permitidas en la ventana (`60`).
  - `RateLimit-Remaining`: peticiones que le quedan a la IP en la ventana actual.
  - `RateLimit-Reset`: segundos que faltan para que la ventana se reinicie.
  - `Retry-After`: solo en las respuestas `429`; segundos que faltan para poder reintentar.
- **Identificación de la IP:** se toma el primer valor de `x-forwarded-for` (recortado); si no existe, `x-real-ip`; si tampoco, se usa `"unknown"`.
- **Qué no se limita:** el `matcher` del proxy (`src/proxy.ts`) excluye `_next/static`, `_next/image`, `favicon.ico` y los archivos estáticos de `public/` (por ejemplo `/projects/*`), para no bloquear CSS, JS ni imágenes.

### Limitación conocida

La store es **en memoria** (`Map`), así que el conteo vive en el proceso de cada instancia:

- En desarrollo local, o en un despliegue de una sola instancia, el conteo es global.
- En Vercel, cada instancia tiene su propia store; con varias instancias el conteo **no es global** y el límite real puede ser más permisivo que 60 por minuto.

Para un conteo compartido basta con implementar la interfaz `RateLimitStore` (`src/lib/rate-limit/types.ts`) sobre Redis u otro almacén y pasarla a `createRateLimiter`. El limitador depende de esa interfaz, no de la implementación, así que **no hace falta tocarlo**.

## Tecnologías

Next.js, React, TypeScript, CSS propio, Vitest, Testing Library, Simple Icons y pnpm.
