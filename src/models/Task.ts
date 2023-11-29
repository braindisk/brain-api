import mongoose from 'mongoose';
import Joi from 'joi';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: { type: String, enum: ['not-started', 'on-going', 'done'], default: 'not-started' },
  project: { type: String },
  priority: { type: Number, enum: [1, 2, 3] },
  sessions: [{ start: Date, end: Date }],
  elapsedTime: { type: Date },
  totalTime: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdOn: { type: Date, default: Date.now() },
  startedOn: { type: Date },
  completedOn: { type: Date },
  dueDate: { type: Date },
});

export default mongoose.model('Task', taskSchema);

const joiSchema = {
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('not-started', 'on-going', 'done').optional(),
  project: Joi.string(),
  priority: Joi.number().valid(1, 2, 3).optional(),
  sessions: Joi.array().items(Joi.object({ start: Joi.date(), end: Joi.date() })),
  elapsedTime: Joi.date(),
  totalTime: Joi.date(),
  startedOn: Joi.date(),
  completedOn: Joi.date(),
  dueDate: Joi.date(),
};

export { joiSchema };
