import React from 'react';
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Box
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Department, Year } from '../types/enums';

interface FilterControlsProps {
  departmentFilter: Department | '';
  yearFilter: Year | '';
  onDepartmentFilterChange: (value: Department | '') => void;
  onYearFilterChange: (value: Year | '') => void;
  onResetFilters: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  departmentFilter,
  yearFilter,
  onDepartmentFilterChange,
  onYearFilterChange,
  onResetFilters
}) => {
  const hasActiveFilters = departmentFilter || yearFilter;

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

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-end">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={departmentFilter}
            label="Department"
            onChange={(e) => onDepartmentFilterChange(e.target.value as Department | '')}
          >
            <MenuItem value="">All Departments</MenuItem>
            {Object.values(Department).map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept} - {getDepartmentFullName(dept)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={yearFilter}
            label="Year"
            onChange={(e) => onYearFilterChange(e.target.value as Year | '')}
          >
            <MenuItem value="">All Years</MenuItem>
            {(Object.values(Year).filter((y) => typeof y === 'number') as number[]).map((year) => (
              <MenuItem key={year} value={year as Year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {hasActiveFilters && (
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={onResetFilters}
            size="small"
          >
            Clear Filters
          </Button>
        )}
      </Stack>

      {hasActiveFilters && (
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <FilterListIcon color="action" fontSize="small" />
            {departmentFilter && (
              <Chip
                label={`Department: ${departmentFilter}`}
                onDelete={() => onDepartmentFilterChange('')}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {yearFilter && (
              <Chip
                label={`Year: ${yearFilter}`}
                onDelete={() => onYearFilterChange('')}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default FilterControls;