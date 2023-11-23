import { Router } from 'express';
import Project, { joiSchema } from '../models/Project';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';

const router = Router();
const noProjectFound = (res) => res.status(404).json({ message: 'no project found' });

router.get('/', auth, async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({ projects });
});

router.get('/:id', auth, validate('id'), async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return noProjectFound(res);
  res.status(200).json({ project });
});

router.post('/', auth, validate(joiSchema), async (req, res) => {
  const project = new Project(req.body);
  await project.save();
});

router.put('/:id', auth, validate('id'), validate(joiSchema), async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) return noProjectFound(res);
  res.status(200).json({ project });
});

router.delete('/:id', auth, validate('id'), async (req, res) => {
  const project = await Project.findByIdAndRemove(req.params.id);
  if (!project) return noProjectFound(res);
  res.status(200);
});

export default router;
