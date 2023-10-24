import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, require: true },
  created_on: { type: Date, default: Date.now() },
  created_by: { type: mongoose.Schema.Types.ObjectId(), ref: 'User' },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
