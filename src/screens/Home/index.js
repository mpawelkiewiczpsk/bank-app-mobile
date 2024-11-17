import { useLayoutEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, useTheme, Button, Icon } from 'react-native-paper';
import TransactionsListComponent from './transactionsListComponent';

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
      <View style={styles.buttonRow}>
        <Button
          icon="transfer"
          mode="outlined"
          style={styles.button}
          onPress={() => navigation.navigate('Transfer')}
        >
          Transfer
        </Button>
        <Button
          icon="cash"
          mode="outlined"
          style={styles.button}
          onPress={() => navigation.navigate('Blik')}
        >
          BLIK
        </Button>
      </View>
      <View style={styles.buttonRow}>
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
      <Text style={{ ...styles.bigText, color: theme.colors.primary }}>
        Recent Transactions
      </Text>
      <ScrollView
        contentContainerStyle={{ borderRadius: 15 }}
        style={{ width: '100%' }}
      >
        <TransactionsListComponent
          title="Jan Kowalski"
          date="9 November 2024"
          amount="-$236.45"
          icon="account-outline"
        />
        <TransactionsListComponent
          title="Salary - November"
          date="5 November 2024"
          amount="+$3,500.00"
          icon="cash"
        />
        <TransactionsListComponent
          title="Spotify Subscription"
          date="25 October 2024"
          amount="-$9.99"
          icon="credit-card"
        />
        <TransactionsListComponent
          title="Uber Ride"
          date="16 October 2024"
          amount="-$25.50"
          icon="car"
        />
        <TransactionsListComponent
          title="Mechanic Service"
          date="15 October 2024"
          amount="-$150.00"
          icon="tools"
        />
        <TransactionsListComponent
          title="Amazon Purchase"
          date="10 October 2024"
          amount="-$75.99"
          icon="cart"
        />
        <TransactionsListComponent
          title="Freelance Work"
          date="8 October 2024"
          amount="+$500.00"
          icon="briefcase"
        />
      </ScrollView>
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
  button: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
    width: '100%',
  },
  card: {
    width: '100%',
    padding: 15,
  },
  text: {
    color: '#fff',
  },
  bigText: {
    textAlign: 'left',
    fontSize: 24,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
});
