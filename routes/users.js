import express from 'express';
import User, {joiSchema} from '../models/User';
import validate from '../middlewares/validate';

const router = express.Router();
const noUserFound = (res) => res.status(404).json({ message: 'no user found' });

router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

router.get('/:id', validate('id'), async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return noUserFound(res);
  res.status(200).json({ user });
});

router.post('/:id', validate(joiSchema), async (req, res) => {
  const user = new User(req.body);
  await user.save();
});

router.put('/:id', validate('id'), validate(joiSchema), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return noUserFound(res);
  res.status(200).json({ user });
});

router.delete('/:id', validate('id'), async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return noUserFound(res);
  res.status(200).send({ user });
});

export default router;
