import React, { useState } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  Text,
  TextInput,
  Button,
  IconButton,
  Snackbar,
} from 'react-native-paper';
import styles from './styles';

function LoginScreen({ navigation, route }) {
  const [pin, setPin] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { correctPin } = route.params;

  const handleNumberPress = (number) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + number);
    }
  };

  const handleDelete = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const handleLogin = async () => {
    if (correctPin) {
      if (pin.length === 4 && pin === correctPin) {
        navigation.reset({ index: 0, routes: [{ name: 'DrawerNav' }] });
      } else {
        setShowSnackbar(true);
      }
    } else {
      try {
        await SecureStore.setItemAsync('pin', pin);
      } finally {
        navigation.reset({ index: 0, routes: [{ name: 'DrawerNav' }] });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Snackbar visible={showSnackbar} onDismiss={() => setShowSnackbar(false)}>
        <Text>Invalid PIN.</Text>
      </Snackbar>
      <Text style={styles.header}>
        {correctPin ? 'Enter PIN' : 'Create new PIN'}
      </Text>

      <TextInput
        label="PIN"
        value={pin}
        mode="outlined"
        secureTextEntry
        editable={false}
        style={styles.pinInput}
      />

      <View style={styles.numberPad}>
        <View style={styles.row}>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('1')}
          >
            <Text style={styles.text}>1</Text>
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('2')}
          >
            <Text style={styles.text}>2</Text>
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('3')}
          >
            <Text style={styles.text}>3</Text>
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('4')}
          >
            <Text style={styles.text}>4</Text>
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('5')}
          >
            <Text style={styles.text}>5</Text>
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('6')}
          >
            <Text style={styles.text}>6</Text>
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('7')}
          >
            <Text style={styles.text}>7</Text>
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('8')}
          >
            <Text style={styles.text}>8</Text>
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('9')}
          >
            <Text style={styles.text}>9</Text>
          </Button>
        </View>
        <View style={styles.row}>
          <IconButton
            icon="arrow-left"
            iconColor="white"
            style={styles.deleteButton}
            onPress={handleDelete}
          />
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('0')}
          >
            <Text style={styles.text}>0</Text>
          </Button>
          {pin.length === 4 ? (
            <Button
              mode="contained"
              style={styles.okButton}
              onPress={handleLogin}
            >
              <Text style={styles.text}>OK</Text>
            </Button>
          ) : (
            <View style={[styles.okButton, styles.placeholderButton]} />
          )}
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
