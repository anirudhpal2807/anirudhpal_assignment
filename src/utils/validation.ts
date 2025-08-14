import { Student } from '../types/schema';

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateCGPA = (cgpa: number | string): boolean => {
  const cgpaNum = typeof cgpa === 'string' ? parseFloat(cgpa) : cgpa;
  return !isNaN(cgpaNum) && cgpaNum >= 0 && cgpaNum <= 10;
};

export const validateRollNumber = (rollNumber: string, students: Student[], editingStudentId?: number): boolean => {
  if (!validateRequired(rollNumber)) {
    return false;
  }
  
  // Check uniqueness (exclude current student when editing)
  const existingStudent = students.find(s => s.rollNumber === rollNumber);
  if (existingStudent && existingStudent.id !== editingStudentId) {
    return false;
  }
  
  return true;
};