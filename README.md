### Student Data Manager (Assignment)

This is a small React + TypeScript app to manage student records with filtering, fuzzy search, sorting, pagination, add/edit/delete, and dark/light theme.

### Tech Stack
- React 19, TypeScript, Vite
- Material UI 7 (MUI)

### Features
- Add, edit, and delete students with validation
- Fuzzy search by name or roll number
- Filter by department and year (year is numeric 1–4)
- Sort by name or CGPA, ascending/descending
- Pagination and responsive table
- Persist data in `localStorage` (can be disabled)

### Getting Started
1) Install deps
```bash
npm install
```
2) Run the dev server
```bash
npm run dev
```
3) Build for production
```bash
npm run build && npm run preview
```

### Project Structure
- `main.tsx`: app entry
- `App.studentmanager.tsx`: wraps `StudentManager` with theme and mock data
- `src/components/`: UI components (`StudentManager`, `StudentForm`, `StudentTable`, `FilterControls`, `SearchAndSort`, `ThemeToggle`, `ConfirmationDialog`)
- `src/types/`: enums and shared interfaces
- `src/utils/`: `localStorage`, `validation`, `fuzzySearch`
- `src/data/studentMockData.ts`: initial demo data
- `src/theme/theme.ts`: MUI theme

### Configuration
- To disable `localStorage` persistence, pass `enableLocalStorage={false}` to `StudentManager` in `App.studentmanager.tsx`.

### Notes
- Unused scaffolding and helper files were removed for clarity. The year dropdowns show numeric values only.
