import mongoose from 'mongoose';
import Joi from 'joi';
import joiObjectid from 'joi-objectid';
Joi.objectid = joiObjectid(Joi);

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true, min: 3, max: 20 },
  lastName: { type: String, require: true, min: 3, max: 20 },
  email: { type: String, require: true, min: 5, max: 50 },
  password: { type: String, require: true, min: 6, max: 100 },
});

export default mongoose.model('User', userSchema);

const joiSchema = {
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.email().min(3).max(50).required(),
  password: Joi.string().min(6).max(100).required(),
};

export { joiSchema };
