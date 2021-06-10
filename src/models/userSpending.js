import mongoose from 'mongoose';

const userSpendingSchema = new mongoose.Schema(
  {
    date: Date,
    title: {
      type: String,
      required: true,
    },
    spending: Number,
    detail: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const UserSpending = mongoose.model('UserSpending', userSpendingSchema);

export default UserSpending;
