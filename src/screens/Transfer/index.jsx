import { useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, TextInput } from 'react-native-paper';
import { useUserContext } from '../../contexts/UserContext';
import { checkIfAccountExist, updateBalance } from '../../api/accounts';
import { addNewTransaction } from '../../api/transactions';
import styles from './styles';

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

  const handleSelectAccount = (account) => {
    setSelectedAccountDetails(account);
    setNewTransfer({ ...newTransfer, selectedAccount: account.accountNumber });
    setModalVisible(false);
  };

  const handleConfirmTransfer = () => {
    if (!newTransfer.amount || !newTransfer.title || !newTransfer.bill) {
      Alert.alert(
        'Error',
        'Fill in all the fields before confirming the transfer.',
      );
      return;
    }
    setConfirmModalVisible(true);
  };

  const onConfirm = () => {
    checkIfAccountExist(newTransfer.bill).then((accountInfo) => {
      
      if (accountInfo) {
        addNewTransaction({
          title: newTransfer.title,
          timestamp: new Date().getTime(),
          amount: newTransfer.amount,
          senderAccountNumber: newTransfer.selectedAccount,
          receiverAccountNumber: newTransfer.bill,
          icon: 'personalTransfer',
        }).then(() => {
          setConfirmModalVisible(false);
          Alert.alert('Success', 'Transfer completed');
          updateBalance(
            selectedAccountDetails.id,
            selectedAccountDetails.balance - parseFloat(newTransfer.amount),
          );
          updateBalance(
            accountInfo.id,
            accountInfo.balance + parseFloat(newTransfer.amount),
          );
        });
      } else {
        setConfirmModalVisible(false);
        Alert.alert('Error', 'The provided account number does not exist');
      }
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.drawerIcon}
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
    return formattedBill.slice(0, 32);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>
        Make a transfer
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setModalVisible(true)}
        >
          <Text>{newTransfer.selectedAccount || 'Choose an account'}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an account</Text>
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
              <Text>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <Text style={styles.modalTitle}>Confirm the transfer</Text>
            <Text style={styles.modalText}>
              Account: {newTransfer.selectedAccount}
            </Text>
            <Text style={styles.modalText}>
              Recipient: {newTransfer.receiver}
            </Text>
            <Text style={styles.modalText}>
              Account number: {newTransfer.bill}
            </Text>
            <Text style={styles.modalText}>Amount: {newTransfer.amount} $</Text>
            <Text style={styles.modalText}>Title: {newTransfer.title}</Text>
            <View style={styles.modalButtons}>
              <Button
                style={{ marginBottom: 10 }}
                mode="outlined"
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                style={{ marginBottom: 10 }}
                mode="contained"
                onPress={onConfirm}
              >
                <Text>Confirm</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.row}>
        <TextInput
          label="Recipient"
          style={styles.input}
          value={newTransfer.receiver}
          onChangeText={(receiver) =>
            setNewTransfer({ ...newTransfer, receiver })
          }
        />
        <TextInput
          label="Account number"
          style={styles.input}
          value={newTransfer.bill}
          onChangeText={(bill) =>
            setNewTransfer({ ...newTransfer, bill: formatBill(bill) })
          }
          maxLength={32}
          keyboardType="numeric"
        />
        <TextInput
          label="Amount"
          style={styles.input}
          value={newTransfer.amount}
          onChangeText={(amount) => setNewTransfer({ ...newTransfer, amount })}
          keyboardType="numeric"
        />
        <TextInput
          label="Title"
          style={styles.input}
          value={newTransfer.title}
          onChangeText={(title) => setNewTransfer({ ...newTransfer, title })}
          maxLength={30}
        />
      </View>
      <Button mode="outlined" onPress={handleConfirmTransfer}>
        <Text>Confirm the transfer</Text>
      </Button>
    </View>
  );
}
export default TransferScreen;
