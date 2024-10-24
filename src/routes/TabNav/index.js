import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../../screens/Home";
import TransferScreen from "../../screens/Transfer";
import BlikScreen from "../../screens/Blik";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



const Tab = createBottomTabNavigator();



const TabNav = () => {


    return (
            <Tab.Navigator  screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ?
                            <AntDesign name="home" size={24} color="tomato" />
                            :
                            <AntDesign name="home" size={24} color="black" />;
                    } else if (route.name === 'Transfer') {
                        iconName = focused ? <FontAwesome6 name="money-bill-transfer" size={24} color="tomato" />
                            :
                            <FontAwesome6 name="money-bill-transfer" size={24} color="black" />;
                    }
                    else if (route.name === 'Blik') {
                        iconName = focused ? <FontAwesome6 name="letterboxd" size={24} color="tomato" />
                            :
                            <FontAwesome6 name="letterboxd" size={24} color="black" />;
                    }

                    // You can return any component that you like here!
                    return iconName;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Transfer" component={TransferScreen} />
                <Tab.Screen name="Blik" component={BlikScreen} />
            </Tab.Navigator>
    );
}

export default TabNav;
