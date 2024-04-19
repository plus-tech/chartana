import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ColorModeContext } from './common/contexts';
import AppToolBar from './nav/AppToolBar';
import AppRouter from './nav/AppRouter';


function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo( () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo( () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            
            {/* <header className='App-header'>
              <AppToolBar />
            </header> */}

            <AppRouter />

          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
