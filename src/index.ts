import * as dotenv from 'dotenv';
import app from './server';
import config from './config';

dotenv.config();

app.listen(3001, () => {
  console.log(`Server is listening on port ${config.port}`);
});
