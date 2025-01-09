import { useLayoutEffect, useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  useTheme,
  Button,
  Menu,
  Snackbar,
  IconButton,
} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';
import TransactionsListComponent from '../../components/TransactionsListComponent';
import { useUserContext } from '../../contexts/UserContext';
import { getAccounts } from '../../api/accounts';
import getHistory from '../../api/history';
import styles from './styles';

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
  const [accountNumberVisible, setAccountNumberVisible] = useState(false);
  const [MyAccountNumber, setMyAccountNumber] = useState('');

  useEffect(() => {
    if (selectedAccount) {
      if (accountNumberVisible) {
        setMyAccountNumber(selectedAccount.accountNumber);
      } else {
        setMyAccountNumber(censorAccountNumber(selectedAccount.accountNumber));
      }
    }
  }, [selectedAccount, accountNumberVisible]);

  const censorAccountNumber = (accountNumber) => {
    const hidden = accountNumber
      .slice(0, -4)
      .split('')
      .map((char) => (char === ' ' ? ' ' : '*'))
      .join('');
    const lastFour = accountNumber.slice(-4);
    return hidden + lastFour;
  };

  const onShowAccountNumber = () => {
    setAccountNumberVisible((prev) => !prev);
  };

  const copyAccountNumberToClipboard = () => {
    if (selectedAccount) {
      Clipboard.setStringAsync(selectedAccount.accountNumber);
      setSnackbarVisible(true);
    }
  };

  useEffect(() => {
    async function getHomeScreenData() {
      const user = {
        ...userInfo,
        id: SecureStore.getItem('idUser').replace(/"/g, ''),
      };
      getAccounts(user.id).then();

      getAccounts(user.id).then(accounts => {
        const defaultAccount = accounts[0];
        getHistory(
          defaultAccount.accountNumber,
          TRANSACTIONS_IN_HISTORY,
        ).then(transactions => {
          setUserInfo({
            ...user,
            accounts,
          });
          setAccountList(accounts);
          setSelectedAccount(defaultAccount);
          setTransactionList(transactions);
        });
      
      })
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
        <View style={styles.accountNumberRow}>
          <Text style={{ ...styles.text, fontSize: 18 }}>
            {MyAccountNumber}
          </Text>
          <IconButton
            icon={accountNumberVisible ? 'eye-off' : 'eye'}
            onPress={() => onShowAccountNumber()}
            iconColor="white"
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Button
          icon="transfer"
          mode="outlined"
          style={styles.button}
          onPress={() => navigation.navigate('Transfer')}
        >
          <Text>Transfer</Text>
        </Button>
        <Button
          icon="cash"
          mode="outlined"
          style={styles.button}
          onPress={() => navigation.navigate('Blik')}
        >
          <Text>BLIK</Text>
        </Button>
      </View>
      <View style={styles.buttonRow}>
        <Button
          icon="content-copy"
          mode="outlined"
          style={styles.button}
          onPress={copyAccountNumberToClipboard}
        >
          <Text>Copy number</Text>
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
          <Text>History</Text>
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
        <Text style={styles.snackbarText}>Account number copied to clipboard!</Text>
      </Snackbar>
    </View>
  );
}

export default HomeScreen;
