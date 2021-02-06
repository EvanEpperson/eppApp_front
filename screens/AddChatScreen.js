import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AddChatScreen = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add A new Pen Pal",
            headerBackTitle: "Pals"
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text>Create Chat Screen</Text>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {},
})
