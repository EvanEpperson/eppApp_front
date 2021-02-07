import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from "../firebase"
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"

const HomeScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);



    const signOutUser = () => {
       auth.signOut().then(() => {
           navigation.replace('Login')
       }) 
    }

    useEffect(() => {
      // we're calling the db that we just made and it is called chats 
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => 
          setChats(snapshot.docs.map(doc => ({
            // id is the id of the actual chate and the data is the name of the chat that goes with the id , you have to use () after doc.data
            id: doc.id,
            data: doc.data(),
          }))
          )
        )
        // if you dont do this it will make a memory leak and keep calling and make it lack performance
        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        // setting all of the homescreen settings different from the rest 
        navigation.setOptions({
          title: "Pen Pals",
            headerStyle: { backgroundColor: "white" },
          headerTitleStyle: { color: "blue" },
          //   for the icons to be black
          headerTintColor: "black",
          // () instead of {} for a direct return to see it on the page without having to call it 
          headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
              {/* makes the picture or whatever it is wrapping touchable  */}
              <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                {/* all of these names like photoURL are coming straight from firebase */}
                <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 80,
                marginRight: 20,
              }}
            >
              <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name="camerao" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("AddChat") } activeOpacity={0.5}>
                <SimpleLineIcons name="pencil" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        });
    }, [navigation])

    const enterChat = (id, chatName) => {
      navigation.navigate('Chat', {
        // if the value is the same name you dont have to do id:id or chatName:chatName you can just call them chatName
        id,
        chatName,
      })
    }

    return (
        <SafeAreaView>
          {/* setting the height to 100% will make the scroll cleaner and that you cant go in and out not seeing the chat  */}
            <ScrollView style={styles.container}>
              {chats.map(({id, data: {chatName}}) => (
                // everythign that we call such as enterChat={enterChat } is passing through kinda like props but without the need for props 
                <CustomListItem 
                key={id}
                id={id}
                chatName={chatName}
                enterChat={enterChat} />
              ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
  // this style is the scroll view to make it look better when scrollign 
  container: {
    height: "100%",
  }
})
