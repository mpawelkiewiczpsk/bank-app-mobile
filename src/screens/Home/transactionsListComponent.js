import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

const TransactionsListComponent = ({ title, date, amount, icon }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 15,
          borderWidth: 1,
          borderColor: theme.colors.primary,
        }}
      >
        <Icon source={icon} color={theme.colors.primary} size={48} />
      </View>
      <View style={{ flexDirection: 'column', marginLeft: 15, gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: '900' }}>{title}</Text>
        <Text>{date}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: '900' }}>
          {amount}
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
