# Speak Sense AI

## Environment setup

This project now reads API/secret configuration from environment files:

- `server/.env` (Node API)
- `ai-service/.env` (FastAPI service)

Template files are available:

- `server/.env.example`
- `ai-service/.env.example`

### Server required values

- `MONGO_URI`
- `JWT_SECRET`
- `PORT` (optional)

### Optional shared keys

- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_DB`

## Run with Docker Compose

```bash
docker-compose up --build
```

## Run locally

The app is split into three parts:

- `client/` for the React frontend
- `server/` for the Node API
- `ai-service/` for the FastAPI service

From the repository root, install dependencies and start both web apps:

```bash
npm install
npm start
```

If you want to run them separately:

```bash
cd server && npm install && npm start
cd client && npm install && npm start
```

## Notes

- Current backend database remains MongoDB.
- Postgres credentials are stored for future integration and are not yet used by server routes.
