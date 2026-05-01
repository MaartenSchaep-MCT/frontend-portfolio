# Getting Started

## Run Locally

1. Clone the repo
2. Install all the packages:

```bash
bun install
```

3. Copy .env.example and rename to .env and fill in all variables. To get the env vars for Keystatic follow this [guide](https://keystatic.com/docs/github-mode)
4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Project Info

### loading.tsx

I have consciously not used loading.tsx since that didn't work when deploying on Cloudflare Workers.

### Middleware

When you run the project you will see a warning that middleware file convention is deprecated, I consciously switched to this (from proxy) due to issues with cloudflare.

### Deployment

The portfolio is live on: https://portfolio.maartenschaep.com/en
(On Github you will see failed Vercel deployements, this was for testing, my portfolio is not deployed on Vercel)

### Next Config explanation

Caching:

```ts
cacheComponents: true,
```

To enable view transitions:

```ts
experimental: {
  viewTransition: true,
},
```

Was enabled by default, standard:

```ts
reactCompiler: true,
```

```ts
allowedDevOrigins: ['127.0.0.1', 'localhost'],
```

Preset image formats and qualities:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  qualities: [75, 85, 100],
},
```
