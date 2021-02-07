import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

const TestingImages = () => {
    return (
        <View>
            <Button  title="testing" style={styles.button} /> 
            <Text>testing this page out </Text>
        </View>
    )
}

export default TestingImages

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
    color: "red",
  },
});
