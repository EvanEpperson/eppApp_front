import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
// import Icon from "react-native-vector-icons/dist/FontAwesome";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
          <View style={styles.sidebar}>
            <Text>this is a sidebar</Text>
            <View style={styles.sidebar_header}>
              <View style={styles.sidebar_headerRight}>
                {/* <Button icon="camera">Press me</Button> */}
              </View>
            </View>
          </View>
        );
    }
}



const styles = StyleSheet.create({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    flex: 0.35,
    borderColor: "blue",
    borderWidth: 1,
  },
});


export default Sidebar;
