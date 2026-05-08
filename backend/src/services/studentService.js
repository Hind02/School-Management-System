import crypto from 'crypto';
import students from '../models/studentModel.js';

const visibleStudents = () => students.filter((student) => !student.isDeleted);

export const getAllStudents = (filiere) => {
  const activeStudents = visibleStudents();

  if (!filiere) {
    return activeStudents;
  }

  return activeStudents.filter(
    (student) => student.filiere.toLowerCase() === filiere.toLowerCase()
  );
};

export const getStudentById = (id) => {
  return visibleStudents().find((student) => student.id === id);
};

export const createStudent = (studentData) => {
  const now = new Date().toISOString();
  const student = {
    id: crypto.randomUUID(),
    firstName: studentData.firstName.trim(),
    lastName: studentData.lastName.trim(),
    email: studentData.email.trim().toLowerCase(),
    filiere: studentData.filiere.trim().toUpperCase(),
    grade: Number(studentData.grade),
    isDeleted: false,
    createdAt: now,
    updatedAt: now
  };

  students.push(student);
  return student;
};

export const updateStudent = (id, updates) => {
  const student = getStudentById(id);

  if (!student) {
    return null;
  }

  if (updates.firstName !== undefined) {
    student.firstName = updates.firstName.trim();
  }

  if (updates.lastName !== undefined) {
    student.lastName = updates.lastName.trim();
  }

  if (updates.email !== undefined) {
    student.email = updates.email.trim().toLowerCase();
  }

  if (updates.filiere !== undefined) {
    student.filiere = updates.filiere.trim().toUpperCase();
  }

  if (updates.grade !== undefined) {
    student.grade = Number(updates.grade);
  }

  student.updatedAt = new Date().toISOString();
  return student;
};

export const softDeleteStudent = (id) => {
  const student = getStudentById(id);

  if (!student) {
    return null;
  }

  student.isDeleted = true;
  student.updatedAt = new Date().toISOString();
  return student;
};

export const getAverageGrade = () => {
  const activeStudents = visibleStudents();

  if (activeStudents.length === 0) {
    return 0;
  }

  const total = activeStudents.reduce((sum, student) => sum + Number(student.grade), 0);
  return Number((total / activeStudents.length).toFixed(2));
};

export const exportStudentsToCsv = () => {
  const headers = ['id', 'firstName', 'lastName', 'email', 'filiere', 'grade'];
  const rows = visibleStudents().map((student) =>
    headers.map((header) => csvEscape(student[header])).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
};

const csvEscape = (value) => {
  const text = String(value ?? '');

  if (text.includes('"') || text.includes(',') || text.includes('\n')) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
};
