import { useLayoutEffect } from 'react';
import { Button, Text, View } from 'react-native';

function BlikScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.toggleDrawer()} title="Menu" />
      ),
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>BlikScreen</Text>
    </View>
  );
}

export default BlikScreen;
