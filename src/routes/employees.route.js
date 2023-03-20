import express from 'express';
import { employeeCreateScheme, employeeUpdateScheme } from './../schemes/employees.scheme.js';
import { handleValidate } from './../middlewares/handleValidate.js';
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from './../controllers/employees.controller.js';

const router = express.Router();

router.get('/employees', getEmployees);

router.get('/employees/:id', getEmployee);

router.post('/employees', handleValidate(employeeCreateScheme), createEmployee);

router.patch('/employees/:id', handleValidate(employeeUpdateScheme), updateEmployee);

router.delete('/employees/:id', deleteEmployee);

export default router;