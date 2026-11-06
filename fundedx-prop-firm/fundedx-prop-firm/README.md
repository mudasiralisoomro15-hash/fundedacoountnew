# FundedX — Prop Firm Website (Next.js 14 + Tailwind + Lucide)

UI-first, backend-ready. Visitors see the hero and pricing immediately (no signup wall).
Clicking **Buy Account** or **Client Portal** opens the auth modal.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where to edit

| What | File |
| --- | --- |
| Prices, sizes, rules (daily loss, drawdown, targets) | `lib/plans.ts` |
| Brand name / logo | `components/Logo.tsx`, `app/layout.tsx` |
| FAQ copy | `components/FaqSection.tsx` |
| Footer disclaimer | `components/Footer.tsx` |
| Colors / animations | `tailwind.config.ts`, `app/globals.css` |

All prices and rules are **placeholders**. Replace them with your real numbers.

## Backend stubs (to wire later)

- `lib/auth.ts` — Firebase Auth (Google, email sign-in, sign-up). Snippets are in the comments.
- `lib/payments.ts` — checkout session. Create `/api/checkout` + a payment webhook.
- `lib/metaapi.ts` — MetaApi account provisioning (server-side only).
- `.env.example` — copy to `.env.local` and fill in keys.

Never trust a price sent by the browser; recompute it on the server from `lib/plans.ts`.
