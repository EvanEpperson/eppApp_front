import React, { useLayoutEffect } from 'react'
import { StyleSheet, ScrollView, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from "../firebase"
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"

const HomeScreen = ({navigation}) => {

    const signOutUser = () => {
       auth.signOut().then(() => {
           navigation.replace('Login')
       }) 
    }

    useLayoutEffect(() => {
        // setting all of the homescreen settings different from the rest 
        navigation.setOptions({
          title: "Pen Pals",
          //   headerStyle: { backgroundColor: "#745565" },
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



    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
