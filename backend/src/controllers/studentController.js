import {
  createStudent,
  exportStudentsToCsv,
  getAllStudents,
  getAverageGrade,
  getStudentById,
  softDeleteStudent,
  updateStudent
} from '../services/studentService.js';
import { validateStudentPayload } from '../services/studentValidationService.js';

export const listStudents = (req, res) => {
  const students = getAllStudents(req.query.filiere);
  res.json(students);
};

export const findStudent = (req, res, next) => {
  const student = getStudentById(req.params.id);

  if (!student) {
    return next({ status: 404, message: 'Student not found' });
  }

  res.json(student);
};

export const addStudent = (req, res, next) => {
  const validation = validateStudentPayload(req.body, true);

  if (!validation.isValid) {
    return next({ status: 400, message: validation.message });
  }

  const student = createStudent(req.body);
  res.status(201).json(student);
};

export const editStudent = (req, res, next) => {
  const validation = validateStudentPayload(req.body, false);

  if (!validation.isValid) {
    return next({ status: 400, message: validation.message });
  }

  const student = updateStudent(req.params.id, req.body);

  if (!student) {
    return next({ status: 404, message: 'Student not found' });
  }

  res.json(student);
};

export const removeStudent = (req, res, next) => {
  const student = softDeleteStudent(req.params.id);

  if (!student) {
    return next({ status: 404, message: 'Student not found' });
  }

  res.json({ message: 'Student deleted successfully', student });
};

export const getStudentStats = (req, res) => {
  res.json({
    averageGrade: getAverageGrade()
  });
};

export const exportStudents = (req, res) => {
  const csv = exportStudentsToCsv();

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="students.csv"');
  res.status(200).send(csv);
};
