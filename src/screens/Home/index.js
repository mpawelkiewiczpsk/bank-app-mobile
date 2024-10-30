import { useLayoutEffect } from "react";
import {Text, View, Button} from "react-native";

const HomeScreen = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => navigation.toggleDrawer()} title="Menu" />
            ),
        });
    }, [navigation]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HomeScreen</Text>
        </View>
    );
}

export default HomeScreen;
