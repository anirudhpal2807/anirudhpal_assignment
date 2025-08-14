import { Department, Year } from '../types/enums';

// Data passed as props to the root component
export const mockRootProps = {
  initialStudents: [
    {
      id: 1,
      rollNumber: "CSE2025-001",
      name: "José Martinez",
      department: Department.CSE,
      year: Year.THIRD,
      cgpa: 8.5,
      dateAdded: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      rollNumber: "ECE2025-002",
      name: "Ravi Kumar",
      department: Department.ECE,
      year: Year.SECOND,
      cgpa: 9.2,
      dateAdded: "2024-01-16T14:20:00Z"
    },
    {
      id: 3,
      rollNumber: "ME2025-003",
      name: "Sarah Johnson",
      department: Department.ME,
      year: Year.FOURTH,
      cgpa: 7.8,
      dateAdded: "2024-01-17T09:15:00Z"
    },
    {
      id: 4,
      rollNumber: "CE2025-004",
      name: "Arun Sharma",
      department: Department.CE,
      year: Year.FIRST,
      cgpa: 8.9,
      dateAdded: "2024-01-18T16:45:00Z"
    },
    {
      id: 5,
      rollNumber: "EE2025-005",
      name: "Emily Davis",
      department: Department.EE,
      year: Year.THIRD,
      cgpa: 9.5,
      dateAdded: "2024-01-19T11:30:00Z"
    },
    {
      id: 6,
      rollNumber: "CSE2025-006",
      name: "Michael Brown",
      department: Department.CSE,
      year: Year.SECOND,
      cgpa: 8.1,
      dateAdded: "2024-01-20T13:15:00Z"
    },
    {
      id: 7,
      rollNumber: "ECE2025-007",
      name: "Ana Rodriguez",
      department: Department.ECE,
      year: Year.FOURTH,
      cgpa: 7.6,
      dateAdded: "2024-01-21T15:45:00Z"
    }
  ]
};