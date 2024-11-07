import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import StackNav from './src/routes/StackNav';

function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StackNav />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
