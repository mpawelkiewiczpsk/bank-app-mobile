import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import StackNav from './src/routes/StackNav';
import {UserProvider} from "./src/context/UserContext";

function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <PaperProvider>
                    <StackNav/>
                </PaperProvider>
            </NavigationContainer>
        </UserProvider>
    );
}

export default App;
