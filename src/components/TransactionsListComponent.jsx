import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';
import dayjs from 'dayjs';

function limitText(text, maxLength) {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength - 3)}...`;
  }
  return text;
}

function TransactionsListComponent({ transaction }) {
  const theme = useTheme();

  const { title, timestamp, amount, direction, icon } = transaction;

  const iconMap = {
    shopping: 'cart',
    bills: 'lightbulb',
    car: 'car',
    subscription: 'credit-card',
    transfer: 'bank',
    personalTransfer: 'account-outline',
    salary: 'cash',
    service: 'tools',
    payment: 'briefcase',
    other: 'help-circle',
  };

  const directionMap = {
    in: '+$',
    out: '-$',
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 15,
          borderWidth: 1,
          borderColor: theme.colors.primary,
        }}
      >
        <Icon
          source={iconMap[icon] || iconMap.other}
          color={theme.colors.primary}
          size={48}
        />
      </View>
      <View style={{ flexDirection: 'column', marginLeft: 15, gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: '900' }}>
          {limitText(title, 20)}
        </Text>
        <Text>{dayjs(timestamp * 1000).format('DD-MM-YYYY hh:mm')}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: '900' }}>
          {directionMap[direction] + amount || directionMap.other}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f2f5',
    borderRadius: 15,
    flexDirection: 'row',
    margin: 5,
    padding: 10,
  },
});

export default TransactionsListComponent;
