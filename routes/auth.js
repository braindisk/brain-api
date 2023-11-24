import { Router } from 'express';
import User from '../models/User.js';
import genAuthToken from '../utils/genAuthToken.js';
import _ from 'lodash';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'user not found' });
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(500).json({ message: 'Incorrect password' });
  const token = genAuthToken(user);
  user = user.toObject();
  user.token = token;
  res.status(200).json(_.omit(user, ['password', 'projects']));
});

export default router;
