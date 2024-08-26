import 'react-native-gesture-handler';
import '@theme/global.css';

import React from 'react';
import { StatusBar } from 'react-native';

import RootStack from '@routes/index';
import { ThemeProvider } from '@theme/theme-provider';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </>
  );
}
