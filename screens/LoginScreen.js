import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from 'expo-status-bar'
import {StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import {Button, Input, Image} from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome";
import {auth} from "../firebase"
import { NavigationSharp } from "@material-ui/icons";


const LoginScreen = ({navigation}) => {
  // in order to use state you have to import it from react on line 1
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( (authUser) => {
      if(authUser){
          navigation.replace("Home")
      }
    })

    return unsubscribe;
  }, [] )

  const signin = () => {

  }


  return (
    // this is so when you open the keyboard it moves everything up and the default value is going to be true so you dont have to put enabled 
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style="auto" />
      {/* image sources take two parameters the source uri and the style so you have to do the image size everytime you import an image so far  */}
      <Image
        source={{
          uri:
            "https://techcrunch.com/wp-content/uploads/2018/12/getty-messaging.jpg",
        }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 20,
        }}
      />
      <View style={styles.inputContainer}>
        {/* just use text instead of event how we usually use event on regular react it will pull it from text  */}
        <Input
          placeholder="Email"
          autofocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {/* auto flex and by defualt it is in a column not a row, you wrap buttons with container style instead of just style because its a react native thing. not sure why   */}
      {/* everything is onPress not on click now */}
      <Button containerStyle={styles.button} onPress={signin} title="Login" />
      {/* outline gives it a clear background and just outlines it in the stock color that it was already*/}
      {/* onPress with navigation.navigate will allow it to go back and forth and then since they are all in the same stack you can swipe back and forth instead of pressing the buttons  */}
      <Button onPress={() => navigation.navigate('Register') } containerStyle={styles.button}  type="outline" title="Register" />
      {/* this is a common fix for things still being over lapped by the keyboard avoid so you put an empty view with the height and it will push everything up  */}
      <View  style={{ height: 100}}/>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{ 
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10, 

  },
  inputContainer: {
    width: 300,

  },
  button: {
    width: 200,
    marginTop: 10,
  }

})
