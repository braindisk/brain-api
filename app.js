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

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response(app(req));
  },
});

console.log(`http://localhost:${server.port}`);
