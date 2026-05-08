import crypto from 'crypto';

const students = [
  {
    id: crypto.randomUUID(),
    firstName: 'Sara',
    lastName: 'Benali',
    email: 'sara.benali@edunode.local',
    filiere: 'GI',
    grade: 16,
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    firstName: 'Youssef',
    lastName: 'Ait Omar',
    email: 'youssef.aitomar@edunode.local',
    filiere: 'TM',
    grade: 14,
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    firstName: 'Nadia',
    lastName: 'El Fassi',
    email: 'nadia.elfassi@edunode.local',
    filiere: 'GI',
    grade: 18,
    isDeleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default students;
