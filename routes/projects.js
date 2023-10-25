import express from 'express';
import Project from '../models/Project';

const router = express.Router();

const noProjectFound = (res) => res.status(404).json({ message: 'no project found' });

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({ projects });
});

router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return noProjectFound(res);
  res.status(200).json({ project });
});

router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
});

router.put('/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) return noProjectFound(res);
  res.status(200).json({ project });
});

router.delete('/:id', async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);
  if (!project) return noProjectFound(res);
  res.status(200);
});

export default router;
