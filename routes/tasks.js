import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ wow: 'isthe' });
});

export default router;
