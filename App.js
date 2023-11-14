import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from 'react-native-vector-icons';

// import { createStackNavigator } from '@react-navigation/stack';

// import {NavigationContainer} from '@react-navigation/native';

//sudo npm install @react-navigation/native-stack --> for stack navigation
//sudo npm install @react-navigation/bottom-tabs --> for tab navigation; https://reactnavigation.org/docs/tab-based-navigation/
//sudo npm install --save react-native-vector-icons --> for vector icons
//Firebase:
//step 1: add app on the firebase website
//step 2: sudo npm install firebase --> for firebase sdk
//step 3: create a folder called "config" and create a new file "firebase-config.js" and add the initialization code from Firebase website there (make necessary modifications)

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from "./config/Firebase-config";

import NowPlayingScreen from './NowPlayingScreen';
import MyPurchasesScreen from './MyPurchasesScreen';
import LoginScreen from './LoginScreen';
import MovieDetailsScreen from './MovieDetailsScreen';
import SettingsScreen from './SettingsScreen';
import SignupScreen from './SignupScreen';
import BuyTicketsScreen from './BuyTicketsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={NowPlayingScreen} />
      <Stack.Screen name="DetailsScreen" component={MovieDetailsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="BuyTicketsScreen" component={BuyTicketsScreen} />
      {/* Add Nowplaying screens to the Home stack */}
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      {/* Add any login screens to the Settings stack */}
    </Stack.Navigator>
  );
}

function MyPurchaseStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="MyPurchase" component={MyPurchasesScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      {/* Add any MyPurchasel screens to the Settings stack */}
    </Stack.Navigator>
  );
}
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>

    {isLoggedIn ? (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'MyHome') {
              iconName = 'home';
            } else if (route.name === 'Tickects') {
              iconName = 'shopping-cart';
            } else if (route.name === 'Setting') {
              iconName = 'cog';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}>
          <Tab.Screen name="MyHome" component={HomeStack}/>
          <Tab.Screen name="Tickects" component={MyPurchaseStack} />
          <Tab.Screen name="Setting" component={SettingsStack} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'MyHome') {
              iconName = 'home';
            } else if (route.name === 'Tickects') {
              iconName = 'shopping-cart';
            } 

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="MyHome" component={HomeStack}/>
        <Tab.Screen name="Tickects" component={MyPurchaseStack} />
        </Tab.Navigator>
      )}

    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
