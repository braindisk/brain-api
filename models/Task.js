import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  status: { type: String, enum: ['not-started', 'on-going', 'done'], default: 'not-started' },
  project: { type: String, require: true },
  priority: { type: Number, enum: [1, 2, 3] },
  sessions: [{ start: Date, end: Date }],
  elapsed_time: { type: Date },
  total_time: { type: Number },
  created_by: { type: String },
  created_on: { type: Date, default: Date.now() },
  started_on: { type: Date },
  completed_on: { type: Date },
  due: { type: Date },
});

// todo - turn on extension for escaping comma
// type change - created_by, project
