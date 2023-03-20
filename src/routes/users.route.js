import express from 'express';
import { userCreateScheme, userUpdateScheme } from './../schemes/users.scheme.js';
import { handleValidate } from './../middlewares/handleValidate.js';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './../controllers/users.controller.js';

const router = express.Router();

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.post('/users', handleValidate(userCreateScheme), createUser);

router.patch('/users/:id', handleValidate(userUpdateScheme), updateUser);

router.delete('/users/:id', deleteUser);

export default router;