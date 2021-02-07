import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInputBase, TextInputComponent, TouchableOpacity, View, TextInput, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import  {Avatar} from 'react-native-elements'
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import * as firebase from "firebase";
import {db, auth} from "../firebase";


const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
          title: "Chat",
          // this will make it so there is no back button just the back arrow so it makes it look cleaner
          headerBackTitleVisible: false,
          headerTitleAlign: "left",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                rounded
                source={{
                  uri:
                    "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
                }}
              />
              {/* this is how you have to do it if you want to pull it in instead of coming from title */}
              <Text
                style={{ color: "blue", marginLeft: 10, fontWeight: "900" }}
              >
                {route.params.chatName}
              </Text>
            </View>
          ),
          headerLeft: () => (
            //   since its a touchable opacity and no longer the back button you have to pass in navigation.goBack so that it will go to the previous screen
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={navigation.goBack}
            >
              <AntDesign name="banckward" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 80,
                marginRight: 20,
            }}
            >
            
              <TouchableOpacity>
                <FontAwesome name="video-camera" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="call" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
        });
    }, [navigation, route])

    const sendMessage = () => {
        // have to import it , and it makes the keyboard disapear as you send messages , not sure if i want to keep it or not yet , may get very annoying 
         Keyboard.dismiss(); 

         db.collection('chats').doc(route.params.id).collection('messages').add({
             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
             message: input,
             displayName: auth.currentUser.displayName,
             email: auth.currentUser.email,
             photoURL: auth.currentUser.photoURL,
         })
         setInput('')
    }

    // useLayoutEffect(() => {
    //     const unsubscribe = db
    //     .collection('chats')
    //     .doc(route.params.id)
    //     .collection('messages')
    //     .orderBy('timestamp', 'desc')
    //     .onSnapShot((snapshot) => setMessages(
    //         snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             data: doc.data(),
    //         }))
    //     ))
    //     return unsubscribe;
    // }, [route])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapShot(snapshot => setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))))
        return unsubscribe

    }, [route])

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar style="light" />
        {/* have to do keyboardavoidingview to make the keyboard go with it */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={90}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <ScrollView>{/* chat goes here  */}</ScrollView>
              <View style={styles.footer}>
                <TextInput
                  value={input}
                  onChangeText={(text) => setInput(text)}
                  placeholder="Signal Message"
                  style={styles.textInput}
                  onSubmitEditing={sendMessage}
                />
                {/*  */}
                <TouchableOpacity onPress={sendMessage}>
                  <Ionicons name="send" size={24} color="#2B68E6" />
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
      flexDirection: 'row',
      alignItems: "center",
      width: '100%',
      padding: 15,
  },
  textInput: {
    //   put it to the bottom and give the text height 40
    bottom: 0,
    height: 40,
    flex: 1,
    // seperate the arrow and the text area
    marginRight: 15,
    // make the tex border transparent and the background grey 
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    // dont be so cramped 
    padding: 10,
    // make the text color blue
    color: 'blue',
    borderRadius: 30,
  },
});
