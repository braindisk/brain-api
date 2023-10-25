import express from 'express';
import Task from '../models/Task';

const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'no task found' });
  res.status(200).json({ task });
});

router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).json({ message: 'no task was found' });
  res.status(200).json({ task });
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);
  if (!task) return res.status(404).json({ message: 'no task was found' });
  res.status(200).json({ task });
});

export default router;
