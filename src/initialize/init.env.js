import dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });

process.env.PORT = process.env.PORT || 2000;