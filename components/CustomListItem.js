import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar } from "react-native-elements"
import { auth, db } from "../firebase"


const CustomListItem = ({id, chatName, enterChat}) => {
  const [chatMessages, setChatMessages] = useState([])


  useEffect(() => {
    const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => 
      setChatMessages(snapshot.docs.map(doc => doc.data()))
    )
    return unsubscribe
  })

    return (
        // this is the same as a li for the most part so far that i can understand 
      <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider >
          {/* another picture that dipslays as already a circle and thats waht rounded does  */}
        <Avatar
          rounded
          source={{
            uri: chatMessages?.[0]?.photoURL ||
              "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
          }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '800'}}>
              {/* passing through the chat name from the homescreen changes the hardcoded value to now the value that we made up  */}
                {chatName}
            </ListItem.Title >
            {/* this will make it so that it has the three dots after the first line of text so that you know you have more to read but it wont go outside of the acutal box , also you put number of lines so that you can either have just 1 or as many as you would like  */}
            <ListItem.Subtitle 
            numberOfLines={1} 
            ellipsizeMode="tail" >
                {chatMessages?.[0]?.displayName}   {chatMessages?.[0]?.message}
            </ListItem.Subtitle>

        </ListItem.Content>
      </ListItem>
    );
}

export default CustomListItem

const styles = StyleSheet.create({})
