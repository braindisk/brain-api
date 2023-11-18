import { Router } from 'express';
import User from '../models/User';
import genAuthToken from '../utils/genAuthToken';
import { omit } from 'lodash';

const router = Router();

router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'user not found' });
  const match = await Bun.password.verify(req.body.password, user.password);
  if (!match) return res.status(500).json({ message: 'Incorrect password' });
  const token = genAuthToken(user);
  user = user.toObject();
  res
    .status(200)
    .header('brainlink-auth-token', token)
    .json(omit(user, ['password']));
});

export default router;
