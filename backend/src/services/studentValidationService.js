const requiredFields = ['firstName', 'lastName', 'email', 'filiere', 'grade'];

export const validateStudentPayload = (payload, requireAllFields) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { isValid: false, message: 'Request body must be a JSON object' };
  }

  if (requireAllFields) {
    const missingField = requiredFields.find((field) => payload[field] === undefined);

    if (missingField) {
      return { isValid: false, message: `${missingField} is required` };
    }
  }

  for (const field of requiredFields) {
    if (payload[field] === undefined) {
      continue;
    }

    if (field === 'grade') {
      const grade = Number(payload.grade);

      if (Number.isNaN(grade) || grade < 0 || grade > 20) {
        return { isValid: false, message: 'grade must be a number between 0 and 20' };
      }

      continue;
    }

    if (typeof payload[field] !== 'string' || payload[field].trim() === '') {
      return { isValid: false, message: `${field} must be a non-empty string` };
    }
  }

  if (payload.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { isValid: false, message: 'email must be a valid email address' };
  }

  return { isValid: true };
};
