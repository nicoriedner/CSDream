import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import BalanceChange from "./screens/BalanceChange";
import InventoryManagement from "./screens/InventoryManagement";
import ChooseUser from "./screens/ChooseUser";

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'chooseUser'}>
        <Stack.Screen name={'balanceChange'} component={BalanceChange}/>
        <Stack.Screen name={'inventoryManagement'} component={InventoryManagement}/>
        <Stack.Screen name={'chooseUser'} component={ChooseUser}/>
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
