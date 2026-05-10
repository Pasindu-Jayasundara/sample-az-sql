import express from 'express'
import { addUser, deleteUser, getAllUsers, updateUser } from '../controller/index.js';

const router = express.Router();

router.get('/get-all', getAllUsers);
router.post('/add', addUser);
router.put('/update/:id',updateUser);
router.delete('/delete/:id', deleteUser);

export default router;