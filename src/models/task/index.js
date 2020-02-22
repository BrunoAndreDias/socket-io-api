import { Schema, model } from 'mongoose';

const TASK_STATUS = {
  active: 'active',
  finished: 'finished',
};

const TaskSchema = new Schema(
  {
    descritpion: { type: String, required: [true, 'Please enter a description'] },
    endDate: { type: Date },
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.active,
    },
  },
  { timestamps: true },
);

export default model('Task', TaskSchema);
