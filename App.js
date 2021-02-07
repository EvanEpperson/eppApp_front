import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { enableScreens } from "react-native-screens"; 
import { StyleSheet, Text, View ,Image , SafeAreaView, Button} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import ChatBox from './ChatBox';
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';


const Stack = createStackNavigator()

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#F6C455" },
  headerTitleStyle: { color: "black" },
  headerTintColor: "white",
};


export default function App(){
  return (
    <NavigationContainer>
      {/* stacking apps  */}
      <Stack.Navigator
        // this will make it be whatever stack you want so that you dont have to keep going back through stacks to change stuff around , this will make it the first page everytime
        initialRouteName="Login"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen
          options={{
            title: "EvMessaging",
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            title: "Register Here",
          }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,

  },

});
