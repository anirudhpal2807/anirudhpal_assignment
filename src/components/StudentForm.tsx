import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { Department, Year } from '../types/enums';
import { Student, StudentFormData } from '../types/schema';
import { validateRequired, validateCGPA, validateRollNumber } from '../utils/validation';

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => void;
  editingStudent?: Student | null;
  title: string;
  students: Student[];
}

const initialFormData: StudentFormData = {
  rollNumber: '',
  name: '',
  department: Department.CSE,
  year: Year.FIRST,
  cgpa: ''
};

const StudentForm: React.FC<StudentFormProps> = ({
  open,
  onClose,
  onSubmit,
  editingStudent,
  title,
  students
}) => {
  const [formData, setFormData] = useState<StudentFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<StudentFormData & { rollNumber: string }>>({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        rollNumber: editingStudent.rollNumber,
        name: editingStudent.name,
        department: editingStudent.department,
        year: editingStudent.year,
        cgpa: editingStudent.cgpa
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [editingStudent, open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentFormData & { rollNumber: string }> = {};

    if (!validateRollNumber(formData.rollNumber, students, editingStudent?.id)) {
      if (!validateRequired(formData.rollNumber)) {
        newErrors.rollNumber = 'Roll Number is required';
      } else {
        newErrors.rollNumber = 'Roll Number must be unique';
      }
    }

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required';
    }

    if (!formData.cgpa || !validateCGPA(formData.cgpa)) {
      newErrors.cgpa = 'CGPA must be between 0 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleInputChange = (field: keyof StudentFormData, value: string | number | Department | Year) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Roll Number"
            value={formData.rollNumber}
            onChange={(e) => handleInputChange('rollNumber', e.target.value)}
            error={!!errors.rollNumber}
            helperText={errors.rollNumber || 'Must be unique (e.g., CSE2025-001)'}
            required
            fullWidth
            autoFocus
          />
          
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            required
            fullWidth
          />
          
          <FormControl fullWidth required>
            <InputLabel>Department</InputLabel>
            <Select
              value={formData.department}
              label="Department"
              onChange={(e) => handleInputChange('department', e.target.value as Department)}
            >
              {Object.values(Department).map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept} - {getDepartmentFullName(dept)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth required>
            <InputLabel>Year</InputLabel>
            <Select
              value={formData.year}
              label="Year"
              onChange={(e) => handleInputChange('year', e.target.value as Year)}
            >
              {(Object.values(Year).filter((y) => typeof y === 'number') as number[]).map((year) => (
                <MenuItem key={year} value={year as Year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="CGPA"
            type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            value={formData.cgpa}
            onChange={(e) => handleInputChange('cgpa', parseFloat(e.target.value) || '')}
            error={!!errors.cgpa}
            helperText={errors.cgpa || 'Enter CGPA between 0.0 and 10.0'}
            required
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear} startIcon={<ClearIcon />}>
          Clear
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" startIcon={<SaveIcon />}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const getDepartmentFullName = (dept: Department): string => {
  switch (dept) {
    case Department.CSE: return 'Computer Science & Engineering';
    case Department.ECE: return 'Electronics & Communication';
    case Department.ME: return 'Mechanical Engineering';
    case Department.CE: return 'Civil Engineering';
    case Department.EE: return 'Electrical Engineering';
    default: return '';
  }
};

export default StudentForm;