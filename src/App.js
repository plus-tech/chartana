import logo from './logo.svg';
import './App.css';

import * as React from 'react';
// import React, { useState, useMemo, createContext } from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ColorModeContext } from './metadata/Contexts';
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
        <div className="App">
          <BrowserRouter>

            <header className='App-header'>
              <AppToolBar />
            </header>

            <AppRouter />

          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
