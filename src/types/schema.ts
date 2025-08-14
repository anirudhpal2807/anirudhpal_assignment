import { Department, Year, SortOption, SortDirection } from './enums';

// Props types (data passed to components)
export interface Student {
  id: number;
  rollNumber: string;
  name: string;
  department: Department;
  year: Year;
  cgpa: number;
  dateAdded: string;
}

export interface StudentFormData {
  rollNumber: string;
  name: string;
  department: Department;
  year: Year;
  cgpa: number | '';
}

// Note: legacy types removed (PropTypes, StudentManagerState) as they are unused

// Props interface for the root StudentManager component
export interface StudentManagerProps {
  initialStudents?: Student[];
  enableLocalStorage?: boolean;
}