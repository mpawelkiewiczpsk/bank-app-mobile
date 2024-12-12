import { useLayoutEffect, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, useTheme, Button, Menu, Snackbar } from 'react-native-paper';
import TransactionsListComponent from '../../components/TransactionsListComponent';
import { useIsFocused } from '@react-navigation/native';
import { useUserContext } from '../../contexts/UserContext';
import { getAccounts } from '../../api/accounts';
import * as SecureStore from 'expo-secure-store';
import { getHistory } from '../../api/history';
import * as Clipboard from 'expo-clipboard';

const TRANSACTIONS_IN_HISTORY = 3;

function HomeScreen({ navigation }) {
  const { userInfo, setUserInfo } = useUserContext();
  const isFocused = useIsFocused();
  const theme = useTheme();
  const [transactionList, setTransactionList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const copyAccountNumberToClipboard = () => {
    if (selectedAccount) {
      Clipboard.setStringAsync(selectedAccount.accountNumber);
      setSnackbarVisible(true);
    } else {
      console.log('No account selected to copy.');
    }
  };

  useEffect(() => {
    async function getHomeScreenData() {
      const user = {
        ...userInfo,
        id: SecureStore.getItem('idUser').replace(/"/g, ''),
      };
      const accounts = await getAccounts(user.id);
      const defaultAccount = accounts[0];
      const transactions = await getHistory(
        defaultAccount.accountNumber,
        TRANSACTIONS_IN_HISTORY,
      );

      setUserInfo({
        ...user,
        accounts,
      });
      setAccountList(accounts);
      setSelectedAccount(defaultAccount);
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
      headerRight: () => (
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={{ padding: 10 }}
            >
              <Ionicons name="swap-horizontal" size={24} color="black" />
            </TouchableOpacity>
          }
        >
          {accountList.map((account) => (
            <Menu.Item
              key={account.accountNumber}
              onPress={async () => {
                setSelectedAccount(account);
                setMenuVisible(false);
                const transactions = await getHistory(
                  account.accountNumber,
                  TRANSACTIONS_IN_HISTORY,
                );
                setTransactionList(transactions);
              }}
              title={`**** **** **** ${account.accountNumber.slice(-4)}`}
            />
          ))}
        </Menu>
      ),
    });
  }, [navigation, menuVisible, accountList]);

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
          ${selectedAccount?.balance || '0.00'}
        </Text>
        <Text style={{ ...styles.text, fontSize: 18 }}>
          **** **** **** {selectedAccount?.accountNumber.slice(-4) || '****'}
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
          onPress={copyAccountNumberToClipboard}
        >
          Copy number
        </Button>
        <Button
          icon="clock"
          mode="outlined"
          style={styles.button}
          onPress={() =>
            navigation.navigate('History', {
              accountNumber: selectedAccount.accountNumber,
            })
          }
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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Account number copied to clipboard!
      </Snackbar>
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
    marginBottom: 15,
  },
});
