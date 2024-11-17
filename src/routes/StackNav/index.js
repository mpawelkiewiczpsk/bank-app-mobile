import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/Login';
import DrawerNav from '../DrawerNav';
import FirstLogin from '../../screens/FirstLogin';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

const header = {
  headerShown: false,
};

// TODO: move to custom hooks directory
function usePIN() {
  const [pin, setPin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPIN() {
      try {
        const pin = await SecureStore.getItemAsync('pin');
        setPin(pin);
      } finally {
        setLoading(false);
      }
    }

    getPIN();
  }, []);

  return [loading, pin];
}

function StackNav() {
  const [loading, pin] = usePIN();

  if (loading) {
    return null;
  } else {
    return (
      <Stack.Navigator initialRouteName={pin ? 'Login' : 'FirstLogin'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ correctPin: pin }}
        />
        <Stack.Screen name="FirstLogin" component={FirstLogin} />
        <Stack.Screen name="DrawerNav" component={DrawerNav} options={header} />
      </Stack.Navigator>
    );
  }
}

export default StackNav;
