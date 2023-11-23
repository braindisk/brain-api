import { Router } from 'express';
import User, { joiSchema } from '../models/User';
import validate from '../middlewares/validate';
import { omit } from 'lodash';
import auth from '../middlewares/auth';

const router = Router();
const noUserFound = (res) => res.status(404).json({ message: 'no user found' });

router.get('/', auth, async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.get('/:id', auth, validate('id'), async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return noUserFound(res);
  user = user.toObject();
  res.status(200).json(omit(user, ['password']));
});

router.post('/', validate(joiSchema), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).json({ message: 'user already exists' });
  req.body.password = await Bun.password.hash(req.body.password);
  user = new User(req.body);
  await user.save();
  user = user.toObject();
  res.status(200).json(omit(user, ['password']));
});

router.put('/:id', auth, validate('id'), validate(joiSchema), async (req, res) => {
  req.body.password = await Bun.password.hash(req.body.password);
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return noUserFound(res);
  res.status(200).json({ user });
});

router.delete('/:id', auth, validate('id'), async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return noUserFound(res);
  res.status(200).send({ user });
});

export default router;
