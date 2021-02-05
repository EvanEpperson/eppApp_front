import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.chat}>
        <Text>this is a ChatBox</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chat: {
    display: "flex",
    flexDirection: "column",
    // flex: 0.65,
    borderColor: "blue",
    borderWidth: 1,
    fontSize: 400
  },
});



export default ChatBox;

