import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

const app = express();

const customLogger = (message) => (req, res, next) => {
  console.log(`hello from ${message}`);
  next();
};

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger('custom logger'));

app.use((req, res, next) => {
  req.shhh_secret = 'doggy style';
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'hello' });
});

app.post('/user', createNewUser);
app.post('/signin', signIn);
app.use('/api', protect, router);

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401);
    res.json({ message: 'unauthorized' });
  } else if (err.type === 'input') {
    res.status(400);
    res.json({ message: 'invalid input' });
  } else {
    res.status(500);
    res.json({ message: 'Something went wrong...' });
  }
});

export default app;
