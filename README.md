## Getting Started

1. Clone the repo
2. install all the packages:
```
bun i
```

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Info

### loading.tsx

I have consciously not used loading.tsx since that didn't work when deploying on Cloudflare Workers.

### Middleware

When you run the project you will see a warning that middleware file convention is deprecated, I consciously switched to this (from proxy) due to issues with cloudflare.

### Deployment

The portfolio is live on: https://portfolio.maartenschaep.com/en
(On Github you will see failed Vercel deployements, this was for testing, my portfolio is not deployed on Vercel)
