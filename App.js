/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {devicesReducer} from './src/Redux/Reducers/devicesReducer';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/Navigation/MainNavigation';
import {Provider} from 'react-redux';
import ThemeProvider from './src/Theme/ThemeProvider';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: devicesReducer,
  preloadedState: {
    devices: [],
  },
});

const App: () => Node = () => {
  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
