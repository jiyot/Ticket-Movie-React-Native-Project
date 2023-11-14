import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet , Pressable ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from "./config/Firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({  route }) {
  const [email, setEmail] = useState('testfinal@gmail.com');
  const [password, setPassword] = useState('123456');
  const navigation = useNavigation();

  const { screen } = route.params;


  const onSignUpClicked = () => {
    //go to sign up screen
    navigation.navigate('Signup');
  }

  const handleLogin = () => {
    
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
   
    signInWithEmailAndPassword( auth, email, password)
      .then(() => {
        console.log('User logged in successfully!');
        // navigation.goBack();

        if (screen === 'Home'){
        navigation.navigate('Home'); // Navigate to HomeScreen
        }
        else if (screen === 'MyPurchase'){
          // navigation.goBack();
          navigation.navigate('MyPurchase'); 
        }
        else{
          navigation.goBack();
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
    
  };

  return (
    <View>
      <Text style ={styles.aboutTitleStyle}>Email</Text>
      <TextInput
      style ={styles.inputStyle}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Enter your email"
      />
      <Text style={styles.aboutTitleStyle}>Password</Text>
      <TextInput
      style ={styles.inputStyle}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      {/* <Button title="Login" style={styles.buttonTextStyle} onPress={handleLogin} />
      <Button title="Sigup"  style={styles.buttonTextStyle} onPress={onSignUpClicked} /> */}

          <Pressable style={[styles.buttonStyle]} onPress={handleLogin}>
                <Text style={styles.buttonTextStyle}>Login</Text>
          </Pressable>
          <Pressable style={[styles.buttonStyle]} onPress={onSignUpClicked}>
                <Text style={styles.buttonTextStyle}>Sigup</Text>
          </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    margin: 8,
    borderColor: 'orangered',
    borderWidth: 1,
    padding: 5,
},

  aboutTitleStyle : {
    padding : 8,
    fontSize : 16,
    fontWeight:'bold',
    // textAlign : 'flex-start',
  },
  aboutStyle : {
      paddingHorizontal : 8,
      // textAlign : 'flex-start',
  },

  buttonStyle: {
    height: 50,
    margin: 10,
    padding: 5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'orangered',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color:'#fff',
  },
})