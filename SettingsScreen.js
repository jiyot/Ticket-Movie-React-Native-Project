
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Pressable} from 'react-native';
import { auth } from './config/Firebase-config';

export default function SettingsScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid)
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out successfully!');
       
      })
      .catch(error => {
        console.error('Error signing out user:', error);
      });
  };

  return (
    <View>
      {isLoggedIn ? (
        <View>
          <Text style={[styles.aboutTitleStyle]} >You are logged in!</Text>
          {/* <Button title="Logout" onPress={handleLogout} /> */}

          <Pressable style={[styles.buttonStyle]} onPress = {handleLogout}>
                <Text style={styles.buttonTextStyle}>Logout</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text>You are not logged in.</Text>
          {/* <Button title="Login" style={[styles.buttonStyle]} onPress={() => navigation.navigate('Login', { screen: 'Settings' })} /> */}
          
          {/* <Button title="Sign up" onPress={() => navigation.navigate('Signup', { screen: 'Settings' })} /> */}
          
          <Pressable style={[styles.buttonStyle]} onPress = {() => navigation.navigate('Login', { screen: 'Settings' })}>
                <Text style={styles.buttonTextStyle}>Login</Text>
          </Pressable>
         
          <Pressable style={[styles.buttonStyle]} onPress = {() => navigation.navigate('Signup', { screen: 'Settings' })}>
                <Text style={styles.buttonTextStyle}>Sigup</Text>
          </Pressable>
        </View>
      )}
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
      textAlign : 'flex-start',
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