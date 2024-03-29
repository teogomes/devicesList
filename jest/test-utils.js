import React from 'react';
import {render as rtlRender} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
// Import your own reducer
import {devicesReducer} from '../src/Redux/Reducers/devicesReducer';
import ThemeProvider from '../src/Theme/ThemeProvider';
import {NavigationContainer} from '@react-navigation/native';

function render(ui, preloadedState, store) {
  const defaultStore = configureStore({
    reducer: devicesReducer,
    preloadedState,
  });

  function Wrapper({children}) {
    return (
      <Provider store={store ?? defaultStore}>
        <ThemeProvider>
          <NavigationContainer>{children}</NavigationContainer>
        </ThemeProvider>
      </Provider>
    );
  }
  return rtlRender(ui, {wrapper: Wrapper});
}

// re-export everything
export * from '@testing-library/react-native';
// override render method
export {render};
