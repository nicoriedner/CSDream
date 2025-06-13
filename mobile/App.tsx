import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import BalanceChange from "./screens/BalanceChange";
import InventoryManagement from "./screens/InventoryManagement";
import ChooseUser from "./screens/ChooseUser";
import MainMenu from "./screens/MainMenu";
import AvailableCases from "./screens/AvailableCases";

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChooseUser">
        <Stack.Screen name="ChooseUser" component={ChooseUser} />
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="BalanceChange" component={BalanceChange} />
        <Stack.Screen name="InventoryManagement" component={InventoryManagement} />
        <Stack.Screen name="AvailableCases" component={AvailableCases} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
