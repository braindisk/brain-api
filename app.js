import express from 'express';
import auth from './routes/auth';
import tasks from './routes/tasks';
import users from './routes/users';
import cors from 'cors';
import checkEnvVariables from './utils/checkEnvVariables';
import dbConnect from './utils/dbConnect';

checkEnvVariables();
dbConnect();

const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true, optionsSuccessStatus: 200 }));
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/tasks', tasks);
app.use('/api/users', users);

const port = 3000;
app.listen(port, () => console.log(`running on http://localhost:${port}`));

// const server = Bun.serve({
//   port: 3000,
//   fetch(req) {
//     return new Response(app(req));
//   },
// });
// console.log(`http://localhost:${server.port}`);
