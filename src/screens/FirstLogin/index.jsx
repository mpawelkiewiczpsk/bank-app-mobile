import { useState } from 'react';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import onLogin from '../../api/auth';
import styles from './styles';

function FirstLogin({ navigation }) {
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState('');

  // TODO: proper authentication
  const authenticate = () => {
    return onLogin(loginData)
      .then(async (data) => {
        if (data?.length > 0) {
          await SecureStore.setItemAsync('idUser', JSON.stringify(data[0]?.id));

          navigation.reset({
            index: 0,
            routes: [{ name: 'Login', params: { correctPin: null } }],
          });
        } else {
          setError('Invalid username or password. Please try again.');
          setLoginData({ ...loginData, password: '' });
        }
      })
      .catch(() => {
        setError('Internal server error.');
      });
  };

  const handleSubmit = async () => {
    if (!loginData.login || !loginData.password) return;
    await authenticate();
  };

  const handleTextChange = (name, text) => {
    setLoginData({ ...loginData, [name]: text.trim() })
    setError(null);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Login
      </Text>
      <TextInput
        label="Username"
        mode="outlined"
        onChangeText={(text) =>
          handleTextChange('login', text)
        }
        value={loginData.login}
        error={error}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        onChangeText={(text) =>
          handleTextChange('password', text)
        }
        value={loginData.password}
        error={error}
      />
      <HelperText type="error" style={styles.helper} visible={error}>
        {error}
      </HelperText>
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
        <Text>Sign in</Text>
      </Button>
    </View>
  );
}

export default FirstLogin;
