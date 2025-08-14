import { Student } from '../types/schema';

const STORAGE_KEY = 'student_data_manager_students';

export const saveStudents = (students: Student[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Failed to save students to localStorage:', error);
  }
};

export const loadStudents = (): Student[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load students from localStorage:', error);
    return null;
  }
};

export const clearStudents = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear students from localStorage:', error);
  }
};