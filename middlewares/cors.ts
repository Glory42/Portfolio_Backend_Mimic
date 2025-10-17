import cors from 'cors';

export const corsMiddleware = cors({
  origin: [
    "your_domain",
    "your_test_env",
  ],
});
