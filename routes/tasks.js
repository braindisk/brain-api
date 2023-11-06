import { Router } from 'express';
import Task, { joiSchema } from '../models/Task';
import validate from '../middlewares/validate';

const router = Router();
const noTaskResponse = (res) => noTaskResponse(res);

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

router.get('/:id', validate('id'), async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return noTaskResponse(res);
  res.status(200).json({ task });
});

router.post('/', validate(joiSchema), async (req, res) => {
  const task = new Task(req.body);
  await task.save();
});

router.put('/:id', validate('id'), validate(joiSchema), async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return noTaskResponse(res);
  res.status(200).json({ task });
});

router.delete('/:id', validate('id'), async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);
  if (!task) return noTaskResponse(res);
  res.status(200).json({ task });
});

export default router;
