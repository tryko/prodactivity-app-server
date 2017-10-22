import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TaskSchema = new Schema({

  taskName: String,
  isFinished: Boolean,
  initTaskTime: Number,
  taskSessions: [],
}, { collection: 'tasks', versionKey: false });

const TaskModel = mongoose.model('Task', TaskSchema);
export default TaskModel;
