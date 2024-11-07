import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function LoginScreen({ navigation }) {
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });

  const login = () => {
    if (loginData.login && loginData.password) {
      if (loginData.password === loginData.login) {
        navigation.navigate('DrawerNav');
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, gap: 20 }}>
      <TextInput
        label="Login"
        value={loginData.login}
        onChangeText={(text) => setLoginData({ ...loginData, login: text })}
      />
      <TextInput
        label="Password"
        value={loginData.password}
        onChangeText={(text) => setLoginData({ ...loginData, password: text })}
      />
      <Button mode="contained" onPress={() => login()}>
        Log in
      </Button>
    </View>
  );
}

export default LoginScreen;
