import mongoose from 'mongoose';
import Joi from 'joi';
import joiObjectid from 'joi-objectid';
Joi.objectid = joiObjectid(Joi);

const projectSchema = new mongoose.Schema({
  title: { type: String, min: 3, max: 20, required: true },
  isActive: { type: Boolean, default: true },
  createdDate: { type: Date, default: Date.now(), required: true },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, min: 3, max: 20 },
  lastName: { type: String, required: true, min: 3, max: 20 },
  email: { type: String, required: true, min: 5, max: 50 },
  password: { type: String, required: true, min: 6, max: 100 },
  projects: [projectSchema],
});

export default mongoose.model('User', userSchema);

const joiSchema = {
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(50).required(),
  password: Joi.string().min(6).max(100).required(),
  projects: Joi.array().items({ title: Joi.string().min(3).max(20).required(), isActive: Joi.boolean() }),
};

export { joiSchema };
