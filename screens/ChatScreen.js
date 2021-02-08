import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInputBase, TextInputComponent, TouchableOpacity, View, TextInput, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import  {Avatar} from 'react-native-elements'
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import * as firebase from "firebase";
import {db, auth} from "../firebase";
import InvertibleScrollView from "react-native-invertible-scroll-view";


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
                  uri: messages[0]?.data.photoURL || 
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
    }, [navigation, route, messages])

    const sendMessage = () => {
        // have to import it , and it makes the keyboard disapear as you send messages , not sure if i want to keep it or not yet , may get very annoying 
        //  Keyboard.dismiss(); 

         db.collection('chats').doc(route.params.id).collection('messages').add({
             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
             message: input,
             displayName: auth.currentUser.displayName,
             email: auth.currentUser.email,
             photoURL: auth.currentUser.photoURL,
         })
         setInput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
        return unsubscribe;
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
              <ScrollView contentContainerStyle={{ paddingTop: 15 }} >
                {/* chat goes here  */}
                {messages.map(({ id, data }) =>
                  data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.reciever}>
                      <Avatar
                        position="absolute"
                        //   helps with web styling apparently
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                        bottom={-15}
                        right={-5}
                        size={30}
                        rounded
                        source={{
                          uri: data.photoURL,
                        }}
                      />
                      <Text style={styles.recieverText}>{data.message}</Text>
                    </View>
                  ) : (
                    <View key={id} style={styles.sender}> 
                    <Avatar
                        position="absolute"
                        // helps with webstyling apparently
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          left: -5,
                        }}
                        bottom={-15}
                        left={-5}
                        size={30}
                        rounded
                        source={{
                          uri: data.photoURL,
                        }}
                      />
                      <Text style={styles.senderText}>{data.message}</Text>
                      <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                  )
                )}
              </ScrollView>
              <View style={styles.footer}>
                <TextInput
                  value={input}
                  onChangeText={(text) => setInput(text)}
                  placeholder="Signal Message"
                  style={styles.textInput}
                //   no clue why but this makes the keyboard stay up when you type stuff out 
                  blurOnSubmit={false}
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
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "red",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    // dont be so cramped
    padding: 10,
    // make the text color blue
    color: "blue",
    borderRadius: 30,
  },
});
