import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json('login page');
});

export default router;
