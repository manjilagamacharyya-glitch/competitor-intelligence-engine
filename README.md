# CompetIQ

CompetIQ is a competitor-intelligence workspace prototype. It brings competitor signals, market metrics, reports, and a pitch-writing helper into one dashboard, and includes a dataset lab that uses Google Gemini to summarize uploaded market data.

> **Prototype note:** The overview, competitor metrics, signals, and reports use sample data. Sign-in and sign-up are demo screens only; they do not create accounts or store credentials. Dataset analysis is the feature connected to an external AI service.

## Features

- Responsive dashboard with overview metrics, competitor cards, sample market signals, and report previews.
- Light and dark themes.
- Pitch Pivot demo that drafts a sales angle from a customer pain point.
- Dataset lab for CSV, JSON, and TXT files up to 8 MB.
- Gemini-generated summary, findings, competitor signals, risks, and recommended actions.
- Optional private file storage with Vercel Blob.

## Getting started

### Requirements

- Node.js 20.9 or newer
- pnpm
- A Google AI API key to use dataset analysis

### Install and run

```powershell
pnpm install
Copy-Item .env.example .env.local
```

Open `.env.local` and set `GOOGLE_GENERATIVE_AI_API_KEY` to your Google AI API key. Then start the development server:

```powershell
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

If you do not have an AI key yet, the dashboard and demo authentication screens can still be explored, but dataset analysis will return an error until the key is configured.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | For dataset analysis | API key used by the Google Generative AI SDK to analyze dataset previews with Gemini. |
| `BLOB_READ_WRITE_TOKEN` | No | Enables private uploads to Vercel Blob. If unset, the upload endpoint returns local upload metadata but does not persist the file. |

The repository ignores `.env*.local` files. Do not commit API keys or other secrets.

## Dataset analysis

The dataset lab accepts `.csv`, `.json`, and `.txt` files, with an 8 MB upload limit. The app sends at most the first 48,000 characters of the selected file to the analysis endpoint and requests a structured response containing:

- A concise summary
- Key findings
- Competitor signals
- Risks
- Recommended actions

When `BLOB_READ_WRITE_TOKEN` is configured, the original upload is stored privately in Vercel Blob. Without it, the upload route does not save a copy. In either case, the preview used for analysis is sent to Google Gemini. Avoid using confidential or sensitive data unless your use of that service is approved.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | CompetIQ dashboard and workspace |
| `/sign-in` | Demo sign-in screen |
| `/sign-up` | Demo sign-up screen |
| `POST /api/datasets/upload` | Validates and optionally stores a dataset upload |
| `POST /api/datasets/analyze` | Analyzes a dataset preview with Gemini |

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Build the production app |
| `pnpm start` | Run the production build |

## Project structure

```text
competitor-intelligence-engine/
├── app/
│   ├── api/
│   │   └── datasets/
│   │       ├── analyze/
│   │       │   └── route.ts       # Gemini dataset analysis endpoint
│   │       └── upload/
│   │           └── route.ts       # Dataset validation and optional Blob upload
│   ├── sign-in/
│   │   └── page.tsx               # Demo sign-in route
│   ├── sign-up/
│   │   └── page.tsx               # Demo sign-up route
│   ├── globals.css                # Minimal global styles
│   ├── layout.tsx                 # App layout and page metadata
│   ├── page.tsx                   # Dashboard entry point
│   └── providers.tsx              # Fluent UI providers and theme state
├── components/
│   ├── competitor-dashboard.tsx   # Main workspace and sample dashboard data
│   ├── dataset-workspace.tsx      # Dataset upload and analysis experience
│   ├── demo-auth-form.tsx         # Non-persistent demo authentication UI
│   └── starter-page.tsx           # Fluent UI starter/demo page
├── .env.example                   # Environment variable template
├── .gitignore
├── .npmrc                         # pnpm package-manager settings
├── next-env.d.ts                  # Next.js TypeScript declarations
├── next.config.mjs                # Next.js configuration
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json
```

## Tech stack

- [Next.js](https://nextjs.org/) App Router and React
- TypeScript
- [Fluent UI React](https://react.fluentui.dev/)
- [Vercel AI SDK](https://ai-sdk.dev/) with Google Gemini
- Optional [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
