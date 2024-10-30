import { Text, View, Button } from 'react-native';

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login screen 2</Text>

      <Button
        onPress={() => navigation.navigate('DrawerNav')}
        title="Go to drawer"
      />
    </View>
  );
}

export default LoginScreen;
