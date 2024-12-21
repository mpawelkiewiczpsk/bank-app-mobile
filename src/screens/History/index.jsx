import { useLayoutEffect, useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, useTheme, Snackbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import TransactionsListComponent from '../../components/TransactionsListComponent';
import { useUserContext } from '../../contexts/UserContext';
import { getAccounts } from '../../api/accounts';
import getHistory from '../../api/history';
import styles from './styles';

const TRANSACTIONS_IN_HISTORY = 100;

function HistoryScreen({ navigation, route }) {
  const { accountNumber } = route.params;
  const { userInfo, setUserInfo } = useUserContext();
  const isFocused = useIsFocused();
  const theme = useTheme();
  const [transactionList, setTransactionList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    async function getHomeScreenData() {
      const user = {
        ...userInfo,
        id: SecureStore.getItem('idUser').replace(/"/g, ''),
      };
      const accounts = await getAccounts(user.id);
      const transactions = await getHistory(
        accountNumber,
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
          onPress={() => navigation.navigate('DrawerNav')}
          style={{ backgroundColor: 'transparent', padding: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, accountList]);

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.bigText, color: theme.colors.primary }}>
        All Transactions
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
        <Text>Account number copied to clipboard!</Text>
      </Snackbar>
    </View>
  );
}

export default HistoryScreen;
