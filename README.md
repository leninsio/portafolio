This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

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
- **Qué no se limita:** el `matcher` del proxy excluye `_next/static`, `_next/image`, `favicon.ico` y los archivos estáticos de `public/` (por ejemplo `/projects/*`), para no bloquear CSS, JS ni imágenes.

### Limitación conocida

La store es **en memoria** (`Map`), así que el conteo vive en el proceso de cada instancia:

- En desarrollo local, o en un despliegue de una sola instancia, el conteo es global.
- En Vercel, cada instancia (y cada lambda) tiene su propia store; con varias instancias el conteo **no es global** y el límite real puede ser más permisivo que 60 por minuto.

Para un conteo compartido basta con implementar la interfaz `RateLimitStore` (`src/lib/rate-limit/types.ts`) sobre Redis u otro almacén y pasarla a `createRateLimiter`. El limiter depende de esa interfaz, no de la implementación, así que **no hace falta tocarlo**.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
