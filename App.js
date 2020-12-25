import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './screens/Game'
import Home from './screens/Home'
import Finish from './screens/Finish'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import store from './store'

export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}
            options = {{
              headerShown: false
            }}
          />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Finish" component={Finish}
            options = {{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
