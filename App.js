import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container_body}>
        <Sidebar />
        <ChatBox />
      </View>
    </View>
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
  container_body: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ededed',
    marginTop: -50,
    height: vh(90),
    width: vw(90),
    marginTop: 70,
  }

});
