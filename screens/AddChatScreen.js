import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from "../firebase";

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch(error =>alert(error))
    }
    console.log('====================================');
    console.log(input);
    console.log('====================================');


    return (
        <View style={styles.container}>
            <Input placeholder="Enter A Chat Name" 
            value={input}
            onChangeText={text => setInput(text)} 
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="edit" type="antdesign" size={24} color="black" />
            } 
            />
            <Button onPress={createChat} title="Create New Chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%',
    },
})
