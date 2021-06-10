import mongoose from 'mongoose';

import User from './user';
import Message from './message';
import Expenditure from './expenditure';
import Setting from './setting';
import Category from './category';
import UserSpending from './userSpending';

const connectDb = () => {
  if (process.env.TEST_DATABASE_URL) {
    return mongoose.connect(
      process.env.TEST_DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  }

  if (process.env.DATABASE_URL) {
    return mongoose.connect(
      process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    );
  }
  throw new Error('missing db url');
};

const models = {
  User, Message, Expenditure, Category, Setting, UserSpending
};

export { connectDb };

export default models;
