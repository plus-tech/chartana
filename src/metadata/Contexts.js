
import { createContext, useContext } from 'react';

//
// authentication context
export const AuthContext = createContext(null);
export function GetAuthContext(){
  return useContext(AuthContext);
}

//
// Create theme context for Chakara, not used any more
export const ThemeContext = createContext('light');
export function GetThemeContext(){
  return useContext(ThemeContext);
}

//
// Create color mode context for MUI components
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export function GetColorModeContext(){
  return useContext(ColorModeContext);
}

//
// REST API URL context   (local test dev : 'http://127.0.0.1:5000/')
export const ApiUrlContext = createContext('http://127.0.0.1:5000/');
export function GetRestApiUrl(){
  return useContext(ApiUrlContext);
}
