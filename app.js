import express from 'express';
import auth from './routes/auth';
import tasks from './routes/tasks';
import users from './routes/users';
import projects from './routes/projects';
import checkEnvVariables from './utils/checkEnvVariables';
import dbConnect from './utils/dbConnect';

checkEnvVariables();
dbConnect();

const app = express();

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/tasks', tasks);
app.use('/api/users', users);
app.use('/api/projects', projects);

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
