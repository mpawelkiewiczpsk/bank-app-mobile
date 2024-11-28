import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

const TransactionsListComponent = ({
  title,
  date,
  amount,
  direction,
  type,
}) => {
  const theme = useTheme();
  const convertedDate = new Date(date);
  const formattedDate = `${convertedDate.getFullYear()}-${(convertedDate.getMonth() + 1).toString().padStart(2, '0')}-${convertedDate.getDate().toString().padStart(2, '0')}`;

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
          source={iconMap[type] || iconMap.other}
          color={theme.colors.primary}
          size={48}
        />
      </View>
      <View style={{ flexDirection: 'column', marginLeft: 15, gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: '900' }}>{title}</Text>
        <Text>{formattedDate}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: '900' }}>
          {directionMap[direction] + amount || directionMap.other}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f2f5',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10,
    margin: 5,
  },
});

export default TransactionsListComponent;
