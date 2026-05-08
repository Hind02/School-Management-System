import { useEffect, useState } from 'react';
import {
  createStudent,
  deleteStudent,
  fetchStats,
  fetchStudents,
  getExportUrl,
  updateStudent
} from './api/studentsApi.js';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  filiere: '',
  grade: ''
};

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('');
  const [averageGrade, setAverageGrade] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isEditing = Boolean(editingId);

  const loadStudents = async () => {
    setLoading(true);
    setError('');

    try {
      const [studentsData, statsData] = await Promise.all([
        fetchStudents(filter),
        fetchStats()
      ]);

      setStudents(studentsData);
      setAverageGrade(statsData.averageGrade);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [filter]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const payload = {
        ...formData,
        grade: Number(formData.grade)
      };

      if (isEditing) {
        await updateStudent(editingId, payload);
        setMessage('Student updated successfully.');
      } else {
        await createStudent(payload);
        setMessage('Student added successfully.');
      }

      resetForm();
      await loadStudents();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to save student');
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      filiere: student.filiere,
      grade: String(student.grade)
    });
    setMessage('');
    setError('');
  };

  const handleDelete = async (id) => {
    setMessage('');
    setError('');

    try {
      await deleteStudent(id);
      setMessage('Student deleted successfully.');
      await loadStudents();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to delete student');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  return (
    <main className="app-shell">
      <section className="toolbar">
        <div>
          <p className="eyebrow">EduNode</p>
          <h1>School Management System</h1>
        </div>
        <a className="export-link" href={getExportUrl()}>
          Export CSV
        </a>
      </section>

      <section className="metrics">
        <div>
          <span className="metric-label">Students shown</span>
          <strong>{students.length}</strong>
        </div>
        <div>
          <span className="metric-label">Average grade</span>
          <strong>{averageGrade}</strong>
        </div>
      </section>

      <section className="content-grid">
        <form className="student-form" onSubmit={handleSubmit}>
          <h2>{isEditing ? 'Edit student' : 'Add student'}</h2>

          <label>
            First name
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Last name
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-row">
            <label>
              Filiere
              <input
                name="filiere"
                value={formData.filiere}
                onChange={handleChange}
                placeholder="GI"
                required
              />
            </label>

            <label>
              Grade
              <input
                name="grade"
                type="number"
                min="0"
                max="20"
                step="0.01"
                value={formData.grade}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && (
              <button className="secondary" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
        </form>

        <section className="students-panel">
          <div className="panel-header">
            <h2>Students</h2>
            <label>
              Filter by filiere
              <input
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="GI"
              />
            </label>
          </div>

          {loading ? (
            <p className="muted">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="muted">No students found.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Filiere</th>
                    <th>Grade</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        {student.firstName} {student.lastName}
                      </td>
                      <td>{student.email}</td>
                      <td>{student.filiere}</td>
                      <td>{student.grade}</td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="small secondary"
                            type="button"
                            onClick={() => handleEdit(student)}
                          >
                            Edit
                          </button>
                          <button
                            className="small danger"
                            type="button"
                            onClick={() => handleDelete(student.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
