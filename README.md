# StitchFlow Studio

A polished demonstration order-management workspace for a Nigerian bespoke tailoring studio. Built for the **“If I Owned This Business...”** TikTok series.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The sample tracking experience is linked from the landing page and the owner dashboard is at `/dashboard`.

## Demo flow

1. Open `/dashboard` to see 12 fictional active and recent orders.
2. Open **Amara Okafor — Embroidered Agbada Set** (`SF-2401`).
3. Change the stage from **Fabric cut** to **Sewing in progress** and save the update.
4. Copy the tracking link or open the customer page.
5. The tracking page shows the saved status, delivery date, latest customer-visible update and WhatsApp contact action.
6. Return to the dashboard to review due-soon and overdue orders.

## Local persistence

Orders are stored in `localStorage` through the repository abstraction in `src/lib/repository.ts`. Data belongs only to the current browser profile. It does **not** synchronize across browsers, devices or users. “Reset demo data” restores the original 12 seeded orders.

The WhatsApp button opens a deep link with a prefilled message. It never claims or assumes a message was sent. The clearly fictional demo number is configured as `DEMO_WHATSAPP_NUMBER` in `src/app/track/[token]/page.tsx` and should be replaced for a real studio.

## Prototype and security limitations

This is a client-side prototype, not a production order system:

- The owner dashboard has no authentication.
- Opaque random tracking tokens and client-side storage do not provide production security.
- Public tracking pages intentionally omit phone numbers, measurements, payment values and private studio notes.
- A real deployment requires a server-side database, authenticated owner accounts, authorization checks, secure token handling, input validation and server-side access controls.
- Sensitive tailoring records and payments should never rely on `localStorage` or public client-side code.

## Checks

```bash
npm run lint
npm run build
```
