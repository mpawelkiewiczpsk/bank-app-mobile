import { useLayoutEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, TextInput } from 'react-native-paper';
import { useUserContext } from '../../contexts/UserContext';
import { checkIfAccountExist, updateBalance } from '../../api/accounts';
import { addNewTransaction } from '../../api/transactions';

function TransferScreen({ navigation }) {
  const { userInfo } = useUserContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccountDetails, setSelectedAccountDetails] = useState({});
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [newTransfer, setNewTransfer] = useState({
    selectedAccount: '',
    receiver: '',
    bill: '',
    amount: '',
    title: '',
  });
  const [transfer, setTransfer] = useState({});

  const handleSelectAccount = (account) => {
    setSelectedAccountDetails(account);
    setNewTransfer({ ...newTransfer, selectedAccount: account.accountNumber });
    setModalVisible(false);
  };

  const handleConfirmTransfer = () => {
    if (!newTransfer.amount || !newTransfer.title) {
      Alert.alert(
        'Błąd',
        'Uzupełnij wszystkie pola przed zatwierdzeniem przelewu.',
      );
      return;
    }
    setConfirmModalVisible(true);
  };

  const onConfirm = () => {
    checkIfAccountExist(newTransfer.bill).then((exist) => {
      if (exist) {
        addNewTransaction({
          title: newTransfer.title,
          timestamp: new Date().getTime(),
          amount: newTransfer.amount,
          senderAccountNumber: newTransfer.selectedAccount,
          receiverAccountNumber: newTransfer.bill,
          icon: 'personalTransfer',
        }).then(() => {
          setConfirmModalVisible(false);
          Alert.alert('Sukces', 'Przelew zrobiony');
          updateBalance(
            selectedAccountDetails.id,
            selectedAccountDetails.balance - newTransfer.amount,
          );
        });
      } else {
        setConfirmModalVisible(false);
        Alert.alert('Błąd', 'Podany numer konta nie istnieje');
      }
    });
  };

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

  const formatBill = (bill) => {
    const cleanedBill = bill.replace(/\D/g, '');
    let formattedBill = cleanedBill.replace(/^(\d{2})(\d+)/, '$1 $2');
    formattedBill = formattedBill.replace(/(\d{4})(?=\d)/g, '$1 ');
    console.log(formattedBill.slice(0, 32))
    return formattedBill.slice(0, 32);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>
        Wykonaj przelew
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setModalVisible(true)}
        >
          <Text>{newTransfer.selectedAccount || 'Wybierz rachunek'}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Wybierz rachunek</Text>
            <FlatList
              data={userInfo?.accounts || []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleSelectAccount(item)}
                >
                  <Text>
                    {item.accountNumber} ({item.balance} $)
                  </Text>
                </TouchableOpacity>
              )}
            />
            <Button mode="outlined" onPress={() => setModalVisible(false)}>
              Zamknij
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        visible={confirmModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <Text style={styles.modalTitle}>Potwierdź przelew</Text>
            <Text style={styles.modalText}>
              Rachunek: {newTransfer.selectedAccount}
            </Text>
            <Text style={styles.modalText}>
              Odbiorca: {newTransfer.receiver}
            </Text>
            <Text style={styles.modalText}>
              Numer konta: {newTransfer.bill}
            </Text>
            <Text style={styles.modalText}>Kwota: {newTransfer.amount} $</Text>
            <Text style={styles.modalText}>Tytułem: {newTransfer.title}</Text>
            <View style={styles.modalButtons}>
              <Button
                style={{ marginBottom: 10 }}
                mode="outlined"
                onPress={() => setConfirmModalVisible(false)}
              >
                Anuluj
              </Button>
              <Button
                style={{ marginBottom: 10 }}
                mode="contained"
                onPress={onConfirm}
              >
                Potwierdź
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.row}>
        <TextInput
          label="Odbiorca"
          style={styles.input}
          value={newTransfer.receiver}
          onChangeText={(receiver) =>
            setNewTransfer({ ...newTransfer, receiver })
          }
        />
        <TextInput
          label="Numer konta"
          style={styles.input}
          value={newTransfer.bill}
          onChangeText={(bill) => setNewTransfer({ ...newTransfer, bill: formatBill(bill) })}
          maxLength={32}
          keyboardType="numeric"
        />
        <TextInput
          label="Kwota"
          style={styles.input}
          value={newTransfer.amount}
          onChangeText={(amount) => setNewTransfer({ ...newTransfer, amount })}
          keyboardType="numeric"
        />
        <TextInput
          label="Tytułem"
          style={styles.input}
          value={newTransfer.title}
          onChangeText={(title) => setNewTransfer({ ...newTransfer, title })}
          maxLength={30}
        />
      </View>
      <Button mode="outlined" onPress={handleConfirmTransfer}>
        Potwierdź przelew
      </Button>
    </View>
  );
}
export default TransferScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  row: {
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    fontSize: 14,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '70%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    alignItems: 'center',
  },
  confirmModal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
});
