import { StatusBar } from 'expo-status-bar';
import React from 'react';
import "react-native-gesture-handler";
// import { enableScreens } from "react-native-screens"; 
import { StyleSheet, Text, View ,Image , SafeAreaView, Button} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import ChatBox from './ChatBox';



export default function App() {
  const testing = () => {
    console.log("hello");
  }




  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container_body}>
        {/* <Sidebar /> */}
        <ChatBox />
      </View>
    </SafeAreaView>
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
