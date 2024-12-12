import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import StackNav from './src/routes/StackNav';
import UserProvider from './src/contexts/UserContext';

function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <UserProvider>
          <StackNav />
        </UserProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
