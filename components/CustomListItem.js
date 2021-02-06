import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar } from "react-native-elements"

const CustomListItem = ({id, chatName, enterChat}) => {
    return (
        // this is the same as a li for the most part so far that i can understand 
      <ListItem>
          {/* another picture that dipslays as already a circle and thats waht rounded does  */}
        <Avatar
          rounded
          source={{
            uri:
              "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
          }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '800'}}>
                Main Chat
            </ListItem.Title >
            {/* this will make it so that it has the three dots after the first line of text so that you know you have more to read but it wont go outside of the acutal box , also you put number of lines so that you can either have just 1 or as many as you would like  */}
            <ListItem.Subtitle 
            numberOfLines={1} 
            ellipsizeMode="tail" >
                this is a test subtitle and what i want to do is test out how long this can actually go 
            </ListItem.Subtitle>

        </ListItem.Content>
      </ListItem>
    );
}

export default CustomListItem

const styles = StyleSheet.create({})
