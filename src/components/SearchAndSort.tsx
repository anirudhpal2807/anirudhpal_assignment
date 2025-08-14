import React from 'react';
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Paper,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SortOption, SortDirection } from '../types/enums';

interface SearchAndSortProps {
  searchTerm: string;
  sortOption: SortOption;
  sortDirection: SortDirection;
  onSearchChange: (value: string) => void;
  onSortOptionChange: (value: SortOption) => void;
  onSortDirectionChange: (value: SortDirection) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchTerm,
  sortOption,
  sortDirection,
  onSearchChange,
  onSortOptionChange,
  onSortDirectionChange
}) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Search & Sort
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-end">
        <TextField
          placeholder="Search by Roll Number or Name (fuzzy search enabled)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
          label="Search Students"
          aria-label="Search students by roll number or name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            label="Sort By"
            onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
          >
            <MenuItem value={SortOption.NAME_ASC}>Name (A-Z)</MenuItem>
            <MenuItem value={SortOption.NAME_DESC}>Name (Z-A)</MenuItem>
            <MenuItem value={SortOption.CGPA_ASC}>CGPA (Low to High)</MenuItem>
            <MenuItem value={SortOption.CGPA_DESC}>CGPA (High to Low)</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Direction</InputLabel>
          <Select
            value={sortDirection}
            label="Direction"
            onChange={(e) => onSortDirectionChange(e.target.value as SortDirection)}
          >
            <MenuItem value={SortDirection.ASC}>Ascending</MenuItem>
            <MenuItem value={SortDirection.DESC}>Descending</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
};

export default SearchAndSort;