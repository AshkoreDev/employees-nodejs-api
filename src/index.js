import express from 'express';
import usersRoute from './routes/users.route.js';
import employeesRoute from './routes/employees.route.js';

const app = express();

app.use(express.json());

app.use('/api', usersRoute);
app.use('/api', employeesRoute);

app.listen(3000);
console.log('Server running on port 3000');