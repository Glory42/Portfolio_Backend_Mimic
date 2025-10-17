import type { Request, Response } from 'express'; 
import { Router } from 'express';
import fetchGithubRepo from '../utils/fetchGithubRepo.js'; 

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const repos = await fetchGithubRepo();
    res.json(repos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Github repos' });
  }
});

export default router;