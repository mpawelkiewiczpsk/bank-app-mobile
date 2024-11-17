import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  Text,
  TextInput,
  Button,
  IconButton,
  Snackbar,
} from 'react-native-paper';

const LoginScreen = ({ navigation, route }) => {
  const [pin, setPin] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const correctPin = route.params.correctPin;

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
        Nieprawidłowy PIN
      </Snackbar>
      <Text style={styles.header}>
        {correctPin ? 'Wprowadź PIN' : 'Ustaw nowy PIN'}
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
            1
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('2')}
          >
            2
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('3')}
          >
            3
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('4')}
          >
            4
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('5')}
          >
            5
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('6')}
          >
            6
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('7')}
          >
            7
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('8')}
          >
            8
          </Button>
          <Button
            mode="contained"
            style={styles.numberButton}
            onPress={() => handleNumberPress('9')}
          >
            9
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
            0
          </Button>
          {pin.length === 4 ? (
            <Button
              mode="contained"
              style={styles.okButton}
              onPress={handleLogin}
            >
              OK
            </Button>
          ) : (
            <View style={[styles.okButton, styles.placeholderButton]} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  pinInput: {
    width: '50%',
    textAlign: 'center',
    marginBottom: 24,
  },
  numberPad: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  numberButton: {
    width: 80,
    marginHorizontal: 4,
  },
  deleteButton: {
    width: 80,
    marginHorizontal: 4,
    backgroundColor: 'red',
    margin: 0,
  },
  okButton: {
    width: 80,
    marginHorizontal: 4,
    backgroundColor: 'green',
  },
  placeholderButton: {
    backgroundColor: 'transparent',
  },
});

export default LoginScreen;
