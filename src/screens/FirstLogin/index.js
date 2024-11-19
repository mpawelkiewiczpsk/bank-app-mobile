import { useState } from 'react';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

function FirstLogin({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // TODO: proper authentication
  const authenticated = (login, password) => {
    return login === 'admin' && password === 'admin';
  };

  const handleSubmit = () => {
    if (!login || !password) return;

    if (authenticated(login, password)) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login', params: { correctPin: null } }],
      });
    } else {
      setError(true);
      setPassword('');
    }
  };

  const handleTextChange = (setter, text) => {
    setter(text.trim());
    setError(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Login
      </Text>
      <TextInput
        label="Username"
        mode="outlined"
        onChangeText={(text) => handleTextChange(setLogin, text)}
        value={login}
        error={error}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        onChangeText={(text) => handleTextChange(setPassword, text)}
        value={password}
        error={error}
      />
      <HelperText type="error" style={styles.helper} visible={error}>
        Invalid username or password. Please try again.
      </HelperText>
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
        Sign in
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    padding: 30,
  },
  helper: {
    paddingLeft: 4,
  },
  button: {
    borderRadius: 6,
    padding: 5,
  },
});

export default FirstLogin;
