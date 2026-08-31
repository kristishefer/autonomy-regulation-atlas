# Autonomy Regulation Atlas

An interactive, source-backed map of the regulatory systems that govern
autonomous-mobility deployment.

## Local development

Copy `.env.example` to `.env.local` and add the public Supabase project URL and
publishable key. Then install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The home page,
Deploy pathway, jurisdiction profiles and System Map live under `src/app`.

Before pushing a preview, run:

```bash
npm run lint
npm run build
```
