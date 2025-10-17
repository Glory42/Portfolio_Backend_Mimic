import type { Request, Response } from 'express'; 
import { Router } from 'express';
import { getLiteralToken, fetchCurrentlyReading } from '../utils/fetchLiteral.js';
import { LiteralReadingState } from '../Types/LiteralBooks.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const token = await getLiteralToken();
        const currentlyReading: LiteralReadingState[] = await fetchCurrentlyReading(token);
        res.json(currentlyReading);
    } catch (err: any) {
        console.error('Error fetching Literal data: ', err);
        res.status(500).json({ error: 'Failed to fetch Literal data' });
    }
});

export default router;
