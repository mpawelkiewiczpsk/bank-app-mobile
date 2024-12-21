import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import { View } from 'react-native';
import SettingsScreen from '../../screens/Settings';
import AboutScreen from '../../screens/About';
import TabNav from '../TabNav';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props;

  const handleLogOut = async () => {
    try {
      await SecureStore.deleteItemAsync('pin');
    } finally {
      navigation.reset({ index: 0, routes: [{ name: 'FirstLogin' }] });
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={{ borderTopWidth: 1, borderColor: '#ccc' }}>
        <DrawerItem label="Log out" onPress={handleLogOut} />
      </View>
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Tab"
        component={TabNav}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
