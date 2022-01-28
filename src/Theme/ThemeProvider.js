import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {DARK_COLORS, LIGHT_COLORS, SIZES} from '../Constants/Theme';

export const ThemeContext = React.createContext();

const ThemeProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const [isAuto, setIsAuto] = useState(false);

  useEffect(() => {
    if (isAuto) {
      setIsDark(colorScheme === 'dark');
    }
  }, [colorScheme]);

  const toggleTheme = value => {
    setIsDark(value);
  };

  const toggleAuto = value => {
    setIsAuto(value);
    setIsDark(colorScheme === 'dark');
  };

  const theme = {
    isAuto,
    toggleTheme,
    isDark,
    toggleAuto,
    sizes: SIZES,
    colors: isDark ? DARK_COLORS : LIGHT_COLORS,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
