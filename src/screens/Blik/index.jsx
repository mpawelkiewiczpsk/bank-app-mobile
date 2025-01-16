import { useEffect, useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, TextInput, Portal, Dialog } from 'react-native-paper';
import * as Contacts from 'expo-contacts';
import { useUserContext } from '../../contexts/UserContext';
import { addNewTransaction } from '../../api/transactions';
import { getAccountByPhoneNumber } from '../../api/accounts';
import styles from './styles';

function BlikScreen({ navigation }) {
  const { userInfo } = useUserContext();
  const [blikNumber, setBlikNumber] = useState(() => generateBlikNumber());
  const [countdown, setCountdown] = useState(4);
  const [isCounting, setIsCounting] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [blikTransfer, setBlikTransfer] = useState({
    amount: '',
    title: '',
  });

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
    }
    setIsCounting(!isCounting);
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

  const phoneTransfer = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      Contacts.presentContactPickerAsync().then((data) => {
        setIsVisible(true);
        const { accounts } = userInfo;

        const senderNumberAccount = accounts.find(
          (account) => account?.phoneNumber,
        )?.accountNumber;

        getAccountByPhoneNumber(data.phoneNumbers[0]?.number).then((acc) => {
          console.log(blikTransfer);

          addNewTransaction({
            title: blikTransfer.title,
            timestamp: new Date().getTime(),
            amount: blikTransfer.amount,
            senderAccountNumber: senderNumberAccount,
            receiverAccountNumber: acc[0]?.accountNumber,
            icon: 'other',
          });
        });
      });
    }
  };

  return (
    <>
      <Portal>
        <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <Dialog.Title>BLIK transfer</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Amount"
              style={styles.input}
              value={blikTransfer.amount}
              onChangeText={(amount) =>
                setBlikTransfer({ ...blikTransfer, amount })
              }
            />
            <TextInput
              label="Title"
              style={styles.input}
              value={blikTransfer.receiver}
              onChangeText={(title) =>
                setBlikTransfer({ ...blikTransfer, title })
              }
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsVisible(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.container}>
        <View style={styles.container}>
          {!isCounting ? (
            <>
              <Text style={{ fontSize: 24 }}>Code expired</Text>
              <Button mode="outlined" onPress={resetTimer}>
                New code
              </Button>
            </>
          ) : (
            <>
              <Text style={{ fontSize: 22 }}>Your code is:</Text>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                {blikNumber}
              </Text>
              <Text style={{ fontSize: 20 }}>{countdown}s</Text>
              <Button icon="content-copy" mode="outlined" onPress={() => {}}>
                Copy blik number
              </Button>
            </>
          )}
          <Button mode="outlined" onPress={phoneTransfer}>
            Phone transfer
          </Button>
        </View>
      </View>
    </>
  );
}

export default BlikScreen;
