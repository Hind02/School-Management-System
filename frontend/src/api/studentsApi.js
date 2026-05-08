import axios from 'axios';

const API_KEY = 'edunode-admin-key';

const studentsApi = axios.create({
  baseURL: 'http://localhost:3000/students'
});

const adminHeaders = {
  'x-api-key': API_KEY
};

export const fetchStudents = async (filiere) => {
  const response = await studentsApi.get('/', {
    params: filiere ? { filiere } : {}
  });
  return response.data;
};

export const createStudent = async (student) => {
  const response = await studentsApi.post('/', student, {
    headers: adminHeaders
  });
  return response.data;
};

export const updateStudent = async (id, student) => {
  const response = await studentsApi.put(`/${id}`, student, {
    headers: adminHeaders
  });
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await studentsApi.delete(`/${id}`, {
    headers: adminHeaders
  });
  return response.data;
};

export const fetchStats = async () => {
  const response = await studentsApi.get('/stats');
  return response.data;
};

export const getExportUrl = () => 'http://localhost:3000/students/export';
