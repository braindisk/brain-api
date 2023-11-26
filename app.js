import express from 'express';
import auth from './routes/auth.js';
import tasks from './routes/tasks.js';
import users from './routes/users.js';
import cors from 'cors';
import checkEnvVariables from './utils/checkEnvVariables.js';
import dbConnect from './utils/dbConnect.js';

checkEnvVariables();
dbConnect();

const app = express();

app.use(cors({ origin: 'https://brainlink.netlify.app', credentials: true, optionsSuccessStatus: 200 }));
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/tasks', tasks);
app.use('/api/users', users);

const port = 3000;
app.listen(port, () => console.log(`running on http://localhost:${port}`));
