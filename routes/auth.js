import { Router } from 'express';
import User from '../models/User';
import genAuthToken from '../utils/genAuthToken';

const router = Router();

router.get('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'user not found' });
  const match = await Bun.password.verify(req.body.password, user.password);
  if (!match) return res.status(500).json({ message: 'Incorrect password' });
  const token = genAuthToken(user);
  res.status(200).header('braindisk-auth-token', token).json(user);
});

export default router;
