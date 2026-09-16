import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDatabase, isDatabaseReady } from './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    status: isDatabaseReady() ? 'ok' : 'degraded',
    service: 'octofit-tracker-backend',
    database: isDatabaseReady() ? 'connected' : 'disconnected',
  });
});

async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exit(1);
});