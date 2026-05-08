import express from 'express';
import {
  addStudent,
  editStudent,
  exportStudents,
  findStudent,
  getStudentStats,
  listStudents,
  removeStudent
} from '../controllers/studentController.js';
import apiKey from '../middlewares/apiKey.js';
import postRateLimiter from '../middlewares/postRateLimiter.js';

const router = express.Router();

router.get('/stats', getStudentStats);
router.get('/export', exportStudents);
router.get('/', listStudents);
router.get('/:id', findStudent);
router.post('/', postRateLimiter, apiKey, addStudent);
router.put('/:id', apiKey, editStudent);
router.delete('/:id', apiKey, removeStudent);

export default router;
