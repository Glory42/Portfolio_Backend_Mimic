import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middlewares/cors.js';
import { limiter } from './middlewares/limiter.js';
import githubRouter from './routes/githubRepo.js';
import githubStatusRouter from './routes/githubStatus.js';
import literalRouter from './routes/literal.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
app.use(express.json());

app.use(corsMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Portfolio backend is running 🚀' });
});

app.use('/api/github', githubRouter);
app.use('/api/github-status', githubStatusRouter);
app.use('/api/literal', literalRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
