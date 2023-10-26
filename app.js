import express from 'express';
import login from './routes/login';
import tasks from './routes/tasks';
import checkEnvVariables from './utils/checkEnvVariables';
import dbConnect from './utils/dbConnect';

checkEnvVariables();
dbConnect();

const app = express();

app.use(express.json());
app.use('/api/login', login);
app.use('/api/tasks', tasks);

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
