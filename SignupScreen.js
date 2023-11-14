import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,Pressable } from 'react-native';
import {StackActions} from '@react-navigation/native';

import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from "./config/Firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupScreen({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async() => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    createUserWithEmailAndPassword( auth, email, password)
      .then(() => {
        console.log('User account created successfully!');
        Alert.alert('Success', 'Account created successfully');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error creating user account:', error);
        Alert.alert(`Error', 'Error creating user account: ${error.message}`);
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
      <Text style ={styles.aboutTitleStyle} >Password</Text>
      <TextInput
      style ={styles.inputStyle}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      {/* <Button title="Sign up" onPress={handleSignup} /> */}

      <Pressable style={[styles.buttonStyle]} onPress={handleSignup}>
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