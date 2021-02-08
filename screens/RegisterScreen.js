import React, { useLayoutEffect, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {auth} from "../firebase"
import TestingImages from "./TestingImages";


const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState(null);


  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

    // just before it scrolls to the other screen do this 
    useLayoutEffect(() => {
        // this makes it so the top left back button is what you want to name it instead of being what it was already named before which in this case it would be login
        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: 
                    imageUrl || 
                    "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
            })
        })
        .catch((error) => alert(error.message))
    }



    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="auto" />
        {/* using react native elements to pass through text instead of react-native you can use the h3 style and actually make it bigger just with moving it to react-native-elements */}
        <Text h3 style={{ marginBottom: 50 }}>
          Create A Epp Account
        </Text>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Full Name"
            autofocus
            type="text"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Email"
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
          <Input
            placeholder="Profile picture Url(optional)"
            type="text"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            // this is so that when we click enter it will auto go to register so that you dont have to click it also but thats only if you do it on this placeholder
            onSubmitEditing={register}
          />
        </View>
        {/* again with the on press and then raised will give it a slightly better look  */}
        <Button
          style={styles.button}
          raised
          onPress={register}
          title="Register Now"
        />

        <Button
          title="pick an image from camera roll"
          onPress={pickImage}
          style={styles.button}
        />
        {/* <Image style={styles.image} source={{ uri: setImage}} /> */}

        <TestingImages />
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    );
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center",
        justifyContent: "center",
        padding: 10, 
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
        color: 'red',
    },
    inputContainer: {
        width: 300,
    }
})
