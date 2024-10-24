import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../../screens/Login";
import DrawerNav from "../DrawerNav";
import TabNav from "../TabNav";

const Stack = createNativeStackNavigator();

const header = {
    headerShown: false
}

const StackNav = () => {
    return <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DrawerNav" component={DrawerNav} options={header} />
        <Stack.Screen name="TabNav" component={TabNav} options={header} />
    </Stack.Navigator>
}

export default StackNav;
