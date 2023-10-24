import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  status: { type: String, enum: ['not-started', 'on-going', 'done'], default: 'not-started' },
  project: { type: mongoose.Schema.Types.ObjectId(), ref: 'Project', require: true },
  priority: { type: Number, enum: [1, 2, 3] },
  sessions: [{ start: Date, end: Date }],
  elapsed_time: { type: Date },
  total_time: { type: Number },
  created_by: { type: mongoose.Schema.Types.ObjectId(), ref: 'User', require: true },
  created_on: { type: Date, default: Date.now() },
  started_on: { type: Date },
  completed_on: { type: Date },
  due: { type: Date },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;

// todo - turn on extension for escaping comma
