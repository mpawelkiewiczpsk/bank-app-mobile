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

function TransferScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [bill, setBill] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [transfer, setTransfer] = useState({});

  const accounts = [
    { id: '1', name: 'Rachunek 1' },
    { id: '2', name: 'Rachunek 2' },
    { id: '3', name: 'Rachunek 3' },
  ];

  const handleSelectAccount = (account) => {
    setSelectedAccount(account.name);
    setModalVisible(false);
  };

  const handleConfirmTransfer = () => {
    if (!selectedAccount || !receiver || !bill || !amount || !title) {
      Alert.alert(
        'Błąd',
        'Uzupełnij wszystkie pola przed zatwierdzeniem przelewu.',
      );
      return;
    }
    setConfirmModalVisible(true);
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
          <Text>{selectedAccount || 'Wybierz rachunek'}</Text>
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
              data={accounts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleSelectAccount(item)}
                >
                  <Text>{item.name}</Text>
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
            <Text style={styles.modalText}>Rachunek: {selectedAccount}</Text>
            <Text style={styles.modalText}>Odbiorca: {receiver}</Text>
            <Text style={styles.modalText}>Numer konta: {bill}</Text>
            <Text style={styles.modalText}>Kwota: {amount} PLN</Text>
            <Text style={styles.modalText}>Tytułem: {title}</Text>
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
                onPress={() => {
                  setTransfer({
                    account: selectedAccount,
                    receiver,
                    bill,
                    amount,
                    title,
                  });
                  setConfirmModalVisible(false);
                  Alert.alert('Sukces', 'Przelew zrobiony');
                  setSelectedAccount('');
                  setReceiver('');
                  setBill('');
                  setAmount('');
                  setTitle('');
                }}
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
          value={receiver}
          onChangeText={(receiver) => setReceiver(receiver)}
        />
        <TextInput
          label="Numer konta"
          style={styles.input}
          value={bill}
          onChangeText={(bill) => setBill(bill)}
          maxLength={26}
          keyboardType="numeric"
        />
        <TextInput
          label="Kwota"
          style={styles.input}
          value={amount}
          onChangeText={(amount) => setAmount(amount)}
          keyboardType="numeric"
        />
        <TextInput
          label="Tytułem"
          style={styles.input}
          value={title}
          onChangeText={(title) => setTitle(title)}
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
