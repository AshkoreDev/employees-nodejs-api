import cors from 'cors';
import app from './app.js';
import { PORT } from './config.js';

const whiteList = ['http://localhost:3000', 'https://localhost:3000'];

const corsOptions = {

  origin: (origin, callback) => {

    (whiteList.indexOf(origin) !== -1 || !origin)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors(corsOptions));

app.listen(PORT);
console.log(`Server running on port ${PORT}`);