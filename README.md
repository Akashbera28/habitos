# habitos

`habitos` is a production-ready full-stack habit tracking app with a React + Vite frontend and an Express backend that powers the AI coach securely.

## Tech stack

- React 18
- Vite 5
- React Router 6
- Recharts
- Node.js
- Express
- Render or Railway for API hosting
- Vercel for frontend hosting

## Structure

```text
habitos/
├── client/
├── server/
├── render.yaml
└── README.md
```

## Local development

Frontend:

```bash
cd client
npm install
npm run dev
```

Backend:

```bash
cd server
npm install
npm start
```

## Environment variables

Frontend in [client/.env](/D:/HABITOS/habitos/client/.env):

```env
VITE_API_URL=http://localhost:5000
```

Backend in [server/.env](/D:/HABITOS/habitos/server/.env):

```env
ANTHROPIC_KEY=YOUR_API_KEY
CLIENT_URL=http://localhost:5173
```

## Deployment

### Backend on Render

- Create a new Web Service from this repository.
- Set Root Directory to `server` or use the included [render.yaml](/D:/HABITOS/habitos/render.yaml).
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `NODE_ENV=production`
  - `CLIENT_URL=https://your-frontend.vercel.app`
  - `ANTHROPIC_KEY=your_real_key`

### Frontend on Vercel

- Import the `client` directory as the Vercel project root.
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_API_URL=https://your-backend.onrender.com`

## Live demo

- Frontend: pending deployment
- Backend: pending deployment

## Screenshots

- Add deployed UI screenshots here after publishing the live app.

## Notes

- Logs are saved locally with a custom `useLocalStorage` hook.
- Saving a log upserts by date, so only one log exists per day.
- Validation rejects negative `study_hours` and `phone_hrs` on both client and server.
- The AI coach endpoint returns structured fallback data if the upstream AI key is missing or the provider fails.