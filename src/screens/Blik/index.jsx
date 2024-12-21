import { useEffect, useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text } from 'react-native-paper';

function BlikScreen({ navigation }) {
  const [blikNumber, setBlikNumber] = useState(() => generateBlikNumber());
  const [countdown, setCountdown] = useState(4);
  const [isCounting, setIsCounting] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ backgroundColor: 'transparent', padding: 10 }}
        >
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsCounting(!isCounting);
    }
  }, [countdown]);

  function generateBlikNumber() {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(
      '',
    );
  }

  const resetTimer = () => {
    setIsCounting(!isCounting);
    setBlikNumber(generateBlikNumber());
    setCountdown(4);
  };

  return (
    <View style={styles.container}>
      {!isCounting ? (
        <View style={styles.container}>
          <Text style={{ fontSize: 24 }}>Code expired</Text>
          <Button mode="outlined" onPress={resetTimer}>
            New code
          </Button>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={{ fontSize: 22 }}>Your code is:</Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{blikNumber}</Text>
          <Text style={{ fontSize: 20 }}>{countdown}s</Text>
          <Button icon="content-copy" mode="outlined" onPress={() => {}}>
            Copy blik number
          </Button>
        </View>
      )}
    </View>
  );
}

export default BlikScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    gap: 15,
  },
});
