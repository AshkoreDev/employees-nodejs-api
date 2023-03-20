import express from 'express';
import usersRoute from './routes/users.route.js';
import employeesRoute from './routes/employees.route.js';

const app = express();

app.use(express.json());

app.use('/api', usersRoute);
app.use('/api', employeesRoute);

app.use((req, res) => res.status(404).json({ message: 'ENDPOINT NOT FOUND.' }));

export default app;