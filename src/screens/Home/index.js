import { useLayoutEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, useTheme, Button } from 'react-native-paper';

function HomeScreen({ navigation }) {
  const theme = useTheme();
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
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.card,
          backgroundColor: theme.colors.primary,
          borderRadius: 10,
        }}
      >
        <Text style={{ ...styles.text, fontSize: 18, marginBottom: 15 }}>
          Balance
        </Text>
        <Text style={{ ...styles.text, fontSize: 32, marginBottom: 30 }}>
          $18.500
        </Text>
        <Text style={{ ...styles.text, fontSize: 18 }}>
          **** **** **** 8888
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          marginTop: 15,
          alignItems: 'stretch',
        }}
      >
        <View>
          <Button
            icon="transfer"
            mode="outlined"
            style={styles.button}
            onPress={() => console.log('Pressed')}
          >
            Transfer
          </Button>
        </View>
        <Button
          icon="cash"
          mode="outlined"
          style={styles.button}
          onPress={() => console.log('Pressed')}
        >
          BLIK
        </Button>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          gap: 15,
        }}
      >
        <Button
          icon="content-copy"
          mode="outlined"
          style={styles.button}
          onPress={() => console.log('Pressed')}
        >
          Copy number
        </Button>
        <Button
          icon="clock"
          mode="outlined"
          style={styles.button}
          onPress={() => console.log('Pressed')}
        >
          History
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  button: {},
  card: {
    width: '100%',
    padding: 15,
  },
  text: {
    color: '#fff',
  },
});
