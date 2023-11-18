import mongoose from 'mongoose';
import Joi from 'joi';
import joiObjectid from 'joi-objectid';
Joi.objectid = joiObjectid(Joi);

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdOn: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Project', projectSchema);

const joiSchema = {
  name: Joi.string().required(),
  createdBy: Joi.objectid(),
};

export { joiSchema };
