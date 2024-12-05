import { useLayoutEffect, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, useTheme, Button } from 'react-native-paper';
import TransactionsListComponent from './transactionsListComponent';
import { useIsFocused } from '@react-navigation/native';
import { useUserContext } from '../../contexts/UserContext';
import { getAccounts } from '../../api/accounts';
import * as SecureStore from 'expo-secure-store';
import { getHistory } from '../../api/history';

const TRANSACTIONS_IN_HISTORY = 3;

function HomeScreen({ navigation }) {
  const { userInfo, setUserInfo } = useUserContext();
  const isFocused = useIsFocused();
  const theme = useTheme();
  const [transactionList, setTransactionList] = useState([]);
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    async function getHomeScreenData() {
      const user = {
        ...userInfo,
        id: SecureStore.getItem('idUser').replace(/"/g, ''),
      };
      const accounts = await getAccounts(user.id);
      const transactions = await getHistory(
        accounts[0].accountNumber,
        TRANSACTIONS_IN_HISTORY,
      );

      setUserInfo(user);
      setAccountList(accounts);
      setTransactionList(transactions);
    }

    getHomeScreenData();
  }, [isFocused]);

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
        {transactionList.map((transaction) => (
          <TransactionsListComponent
            key={transaction.id}
            transaction={transaction}
          />
        ))}
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
