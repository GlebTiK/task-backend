# Worksheet Back-end

This is the back-end API for the test task of a Worksheet.

Built with **Node.js**, **Express**, **Sequelize**, and **MySQL**.

## Deployment

The API is available at https://test-task-api.771707.xyz/api

## Local development

```bash
npm install
cp .env.example .env
cp .env.example .env.test
cp .env.example .env.dev
# Change the environment variables in the .env files.
npm run db:migrate
npm run db:seed
npm run dev
```

The API will be available at `http://localhost:4000/api` by default.
