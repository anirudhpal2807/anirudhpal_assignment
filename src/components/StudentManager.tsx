import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Student, StudentFormData, StudentManagerProps } from '../types/schema';
import { SortOption, SortDirection, Department, Year } from '../types/enums';
import { saveStudents, loadStudents } from '../utils/localStorage';
import { isFuzzyMatch } from '../utils/fuzzySearch';
import SearchAndSort from './SearchAndSort';
import FilterControls from './FilterControls';
import StudentTable from './StudentTable';
import StudentForm from './StudentForm';
import ConfirmationDialog from './ConfirmationDialog';
import ThemeToggle from './ThemeToggle';

const StudentManager: React.FC<StudentManagerProps> = ({
  initialStudents = [],
  enableLocalStorage = true
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.NAME_ASC);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASC);
  const [departmentFilter, setDepartmentFilter] = useState<Department | ''>('');
  const [yearFilter, setYearFilter] = useState<Year | ''>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Initialize students from localStorage or initial data
  useEffect(() => {
    if (enableLocalStorage) {
      const storedStudents = loadStudents();
      if (storedStudents && storedStudents.length > 0) {
        setStudents(storedStudents);
      } else {
        setStudents(initialStudents);
      }
    } else {
      setStudents(initialStudents);
    }
  }, [initialStudents, enableLocalStorage]);

  // Save to localStorage when students change
  useEffect(() => {
    if (enableLocalStorage && students.length > 0) {
      saveStudents(students);
    }
  }, [students, enableLocalStorage]);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [searchTerm, departmentFilter, yearFilter, sortOption, sortDirection]);

  // Generate next student ID
  const getNextId = (): number => {
    return students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  };

  // Filter, search and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students;

    // Apply department filter
    if (departmentFilter) {
      filtered = filtered.filter(student => student.department === departmentFilter);
    }

    // Apply year filter
    if (yearFilter) {
      filtered = filtered.filter(student => student.year === yearFilter);
    }

    // Apply fuzzy search
    if (searchTerm.trim()) {
      filtered = filtered.filter(student => {
        return isFuzzyMatch(searchTerm, student.rollNumber) || 
               isFuzzyMatch(searchTerm, student.name);
      });
    }

    // Apply sorting
    const sortedStudents = [...filtered].sort((a, b) => {
      let comparison = 0;
      
      switch (sortOption) {
        case SortOption.NAME_ASC:
          comparison = a.name.localeCompare(b.name);
          break;
        case SortOption.CGPA_ASC:
          comparison = a.cgpa - b.cgpa;
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === SortDirection.DESC ? -comparison : comparison;
    });

    return sortedStudents;
  }, [students, searchTerm, sortOption, sortDirection, departmentFilter, yearFilter]);

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleAddStudent = (formData: StudentFormData) => {
    const newStudent: Student = {
      id: getNextId(),
      rollNumber: formData.rollNumber,
      name: formData.name,
      department: formData.department,
      year: formData.year,
      cgpa: formData.cgpa as number,
      dateAdded: new Date().toISOString()
    };

    setStudents(prev => [...prev, newStudent]);
    setIsAddDialogOpen(false);
    showSnackbar('Student added successfully');
  };

  const handleEditStudent = (formData: StudentFormData) => {
    if (!editingStudent) return;

    const updatedStudent: Student = {
      ...editingStudent,
      rollNumber: formData.rollNumber,
      name: formData.name,
      department: formData.department,
      year: formData.year,
      cgpa: formData.cgpa as number
    };

    setStudents(prev => prev.map(s => s.id === editingStudent.id ? updatedStudent : s));
    setIsEditDialogOpen(false);
    setEditingStudent(null);
    showSnackbar('Student updated successfully');
  };

  const handleDeleteStudent = () => {
    if (!deletingStudent) return;

    setStudents(prev => prev.filter(s => s.id !== deletingStudent.id));
    setIsDeleteDialogOpen(false);
    setDeletingStudent(null);
    showSnackbar('Student deleted successfully');
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (student: Student) => {
    setDeletingStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleResetFilters = () => {
    setDepartmentFilter('');
    setYearFilter('');
    setSearchTerm('');
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Student Data Manager
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <ThemeToggle />
            <Button
              color="inherit"
              startIcon={<AddIcon />}
              onClick={() => setIsAddDialogOpen(true)}
              aria-label="Add new student"
            >
              Add Student
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <SearchAndSort
          searchTerm={searchTerm}
          sortOption={sortOption}
          sortDirection={sortDirection}
          onSearchChange={setSearchTerm}
          onSortOptionChange={setSortOption}
          onSortDirectionChange={setSortDirection}
        />

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <FilterControls
            departmentFilter={departmentFilter}
            yearFilter={yearFilter}
            onDepartmentFilterChange={setDepartmentFilter}
            onYearFilterChange={setYearFilter}
            onResetFilters={handleResetFilters}
          />
        </Paper>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {Math.min(filteredAndSortedStudents.length, rowsPerPage)} of {filteredAndSortedStudents.length} filtered students 
            ({students.length} total)
          </Typography>
        </Paper>

        <StudentTable
          students={filteredAndSortedStudents}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />

        <StudentForm
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddStudent}
          title="Add Student"
          students={students}
        />

        <StudentForm
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingStudent(null);
          }}
          onSubmit={handleEditStudent}
          editingStudent={editingStudent}
          title="Edit Student"
          students={students}
        />

        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeletingStudent(null);
          }}
          onConfirm={handleDeleteStudent}
          title="Delete Student"
          message={`Are you sure you want to delete ${deletingStudent?.name} (${deletingStudent?.rollNumber})? This action cannot be undone.`}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default StudentManager;