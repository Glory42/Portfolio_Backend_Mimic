import type { Request, Response } from 'express';
import { Router } from 'express';
import fetchGithubStatus from '../utils/fetchGithubStatus.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const contributions = await fetchGithubStatus();
        res.json(contributions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch GitHub contributions' });
    }
});

export default router;
