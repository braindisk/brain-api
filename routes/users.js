import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'no user found' });
  res.status(200).json({ user });
});

router.post('/:id', async (req, res) => {
  const user = new User(req.body);
  await user.save();
});

router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ message: 'no user found' });
  res.status(200).json({ user });
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).json({ message: 'no user found' });
  res.status(200).send({ user });
});

export default router;
