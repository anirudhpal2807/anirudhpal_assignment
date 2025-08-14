import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  TablePagination,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Student } from '../types/schema';
import { Department } from '../types/enums';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getDepartmentColor = (dept: Department) => {
    switch (dept) {
      case Department.CSE: return 'primary';
      case Department.ECE: return 'secondary';
      case Department.ME: return 'success';
      case Department.CE: return 'warning';
      case Department.EE: return 'error';
      default: return 'default';
    }
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9) return 'success';
    if (cgpa >= 8) return 'primary';
    if (cgpa >= 7) return 'warning';
    return 'error';
  };

  // Calculate pagination
  const paginatedStudents = students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (students.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No students found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your search or filters
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="Students table">
          <TableHead>
            <TableRow>
              <TableCell>Roll Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              {!isMobile && <TableCell>Year</TableCell>}
              <TableCell>CGPA</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents.map((student, index) => (
              <TableRow 
                key={student.id} 
                hover
                tabIndex={-1}
                role="row"
                aria-rowindex={page * rowsPerPage + index + 2}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="medium" fontFamily="monospace">
                    {student.rollNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {student.name}
                  </Typography>
                  {isMobile && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      Year {student.year}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={student.department}
                    color={getDepartmentColor(student.department) as any}
                    size="small"
                  />
                </TableCell>
                {!isMobile && (
                  <TableCell>
                    <Typography variant="body2">
                      Year {student.year}
                    </Typography>
                  </TableCell>
                )}
                <TableCell>
                  <Chip 
                    label={student.cgpa.toFixed(1)}
                    color={getCGPAColor(student.cgpa) as any}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                      onClick={() => onEdit(student)}
                      color="primary"
                      size="small"
                      aria-label={`Edit student ${student.name} with roll number ${student.rollNumber}`}
                      title={`Edit ${student.name}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(student)}
                      color="error"
                      size="small"
                      aria-label={`Delete student ${student.name} with roll number ${student.rollNumber}`}
                      title={`Delete ${student.name}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        aria-label="Table pagination"
        labelRowsPerPage="Students per page:"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}–${to} of ${count !== -1 ? count : `more than ${to}`} students`
        }
      />
    </Paper>
  );
};

export default StudentTable;