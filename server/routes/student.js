import express from 'express';

import { getStudentByDid, getStudentById, createStudent, getStudentFromUsername } from '../controllers/students.js';

const router = express.Router();

router.get('/detailsFromUsername/:id', getStudentFromUsername);
router.get('/did/:id', getStudentByDid);
router.get('/id/:id', getStudentById);
router.post('/', createStudent);


export default router;