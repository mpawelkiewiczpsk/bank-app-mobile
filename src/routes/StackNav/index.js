import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/Login';
import DrawerNav from '../DrawerNav';

const Stack = createNativeStackNavigator();

const header = {
  headerShown: false,
};

function StackNav() {
  return (
    <Stack.Navigator initialRouteName="DrawerNav">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DrawerNav" component={DrawerNav} options={header} />
    </Stack.Navigator>
  );
}

export default StackNav;
