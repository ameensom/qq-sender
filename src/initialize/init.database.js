import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });
const { DB_USER_ATLAS,
  DB_PASS_ATLAS,
  DB_NAME_ATLAS,
  DB_CLUSTER } = process.env;


const connectionString = `mongodb+srv://${DB_USER_ATLAS}:${DB_PASS_ATLAS}@${DB_CLUSTER}/${DB_NAME_ATLAS}`;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });