import { Router } from 'express';
import Project, { joiSchema } from '../models/Project';
import validate from '../middlewares/validate';

const router = Router();
const noProjectFound = (res) => res.status(404).json({ message: 'no project found' });

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({ projects });
});

router.get('/:id', validate('id'), async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return noProjectFound(res);
  res.status(200).json({ project });
});

router.post('/', validate(joiSchema), async (req, res) => {
  const project = new Project(req.body);
  await project.save();
});

router.put('/:id', validate('id'), validate(joiSchema), async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) return noProjectFound(res);
  res.status(200).json({ project });
});

router.delete('/:id', validate('id'), async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);
  if (!project) return noProjectFound(res);
  res.status(200);
});

export default router;
