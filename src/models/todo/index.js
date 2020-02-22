import { Schema, model } from 'mongoose';

const TodoSchema = new Schema(
  {
    description: { type: String, required: [true, 'Please enter a description'] },
  },
  { timestamps: true },
);

export default model('Todo', TodoSchema);
