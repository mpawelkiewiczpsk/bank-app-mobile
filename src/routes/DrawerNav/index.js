import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from "../../screens/Settings";
import AboutScreen from "../../screens/About";
import TabNav from "../TabNav";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Tab" component={TabNav} options={{ headerShown: false }} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
    );
}


export default MyDrawer;
