
import { createContext, useContext } from 'react';

//
// authentication context
export const AuthContext = createContext(null);
export function useAuthContext(){
  return useContext(AuthContext);
}

//
// Create theme context for Chakara, not used any more
export const ThemeContext = createContext('light');
export function useThemeContext(){
  return useContext(ThemeContext);
}

//
// Create color mode context for MUI components
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export function useColorModeContext(){
  return useContext(ColorModeContext);
}

