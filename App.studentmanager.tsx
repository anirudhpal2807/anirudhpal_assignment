import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import StudentManager from './src/components/StudentManager';
import theme from './src/theme/theme';
import { mockRootProps } from './src/data/studentMockData';

const App: React.FC = () => {
  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      <CssBaseline enableColorScheme />
      <StudentManager 
        initialStudents={mockRootProps.initialStudents}
        enableLocalStorage={true}
      />
    </CssVarsProvider>
  );
};

export default App;