import mongoose from 'mongoose';
import Joi from 'joi';
import joiObjectid from 'joi-objectid';
Joi.objectid = joiObjectid(Joi);

const taskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String },
  status: { type: String, enum: ['not-started', 'on-going', 'done'], default: 'not-started' },
  project: { type: mongoose.Schema.Types.ObjectId(), ref: 'Project', require: true },
  priority: { type: Number, enum: [1, 2, 3] },
  sessions: [{ start: Date, end: Date }],
  elapsedTime: { type: Date },
  totalTime: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId(), ref: 'User', require: true },
  createdOn: { type: Date, default: Date.now() },
  startedOn: { type: Date },
  completedOn: { type: Date },
  due: { type: Date },
});

export default mongoose.model('Task', taskSchema);

const joiSchema = {
  title: Joi.string().required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('not-started', 'on-going', 'done').optional(),
  project: Joi.objectid().required(),
  priority: Joi.number().valid(1, 2, 3).optional(),
  sessions: Joi.array().items(Joi.object({ start: Joi.date(), end: Joi.date() })),
  elapsedTime: Joi.date(),
  totalTime: Joi.date(),
  createdBy: Joi.objectid().required(),
  startedOn: Joi.date(),
  completedOn: Joi.date(),
  due: Joi.date(),
};

export { joiSchema };
