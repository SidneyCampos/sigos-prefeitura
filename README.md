# SIGOS

Sistema Integrado de Gestao de Ordens de Servico para prefeituras pequenas.

## Estrutura

- `frontend`: React + Vite + TailwindCSS
- `backend`: Node.js + Express + Prisma + SQLite

## Banco de dados

O SQLite gera o arquivo `backend/prisma/database.db`, facilitando copia e backup.

## Como executar

### Backend

```bash
cd backend
copy .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Rotas principais

- `GET /api/dashboard`
- `GET /api/setores`
- `POST /api/setores`
- `PATCH /api/setores/:id/toggle`
- `GET /api/funcionarios`
- `POST /api/funcionarios`
- `PATCH /api/funcionarios/:id/toggle`
- `GET /api/solicitantes`
- `POST /api/solicitantes`
- `GET /api/ordens`
- `GET /api/ordens/:id`
- `POST /api/ordens`
- `PUT /api/ordens/:id`
- `PATCH /api/ordens/:id/status`
