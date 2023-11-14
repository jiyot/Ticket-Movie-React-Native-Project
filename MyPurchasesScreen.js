import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native';
import { auth,db } from './config/Firebase-config';
import { collection, getDocs, query, where} from "firebase/firestore"
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";


const MyPurchasesScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [purchasesData,setPurchasesData] = useState([])
  const [useruid, setUseruid] = useState('');
  let loggedInUserId
if( auth.currentUser !== null){
    loggedInUserId  = auth.currentUser.uid
  }else{
    loggedInUserId = ""
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUseruid(user.uid);
      } else {
        setIsLoggedIn(false);
        setUseruid('user.uid');
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

  useEffect( () => {
    getPurchasesFromDB()
  })

  const getPurchasesFromDB = async () => {
    try {
      console.log(`Trying to get all documents from collection`)

      //to fetch all documents from independent collection
      // _______for purchases collection only______
      const q = query(collection(db, "purchases"), where("userId", "==", loggedInUserId));
      // ____________END____________

      // _______for users_movies and sub collection purchases only______
      // const q = query(collection(
      //   db,
      //   "users_movies",
      //   useruid,
      //   "purchases"
      // ));
      // ____________END____________
      const querySnapshot = await getDocs(q)
      //console.log (`querySnapshot : ${JSON.stringify(querySnapshot)}`);

      const documents = querySnapshot.docs
      //console.log (`docs: ${JSON.stringify(documents)}`);
      for(let i = 0; i < documents.length; i++){
          console.log(`doc Id : ${documents[i].id}`)
          console.log(`doc data : ${JSON.stringify(documents[i].data())}`)
      }

      setPurchasesData(documents)
  }catch(error){
      console.log(`Error while getting all documents from collection : ${error}`)
      setEmployeeData(null)
  }
  }

  const renderListItem = ({ item }) => (
    <View>
      <View style={styles.listItem}>
        <View style={[{justifyContent:'center',}]}>
            <Icon name={'ticket'} size={40} color={'orangered'}></Icon>
        </View>
        <View style={[{marginHorizontal:24}]}>
          <Text style={styles.movieNameStyle}>{item.data().movieName} </Text>
          <Text >Num Tickets: {item.data().numTickets} </Text>
          <Text style={[{color:'orangered'}]}>Total Paid: {item.data().total} </Text>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  )

  return (
    <View>
      {isLoggedIn ? (
        <View>
          <Text style={[styles.title,{alignSelf:'center',paddingTop:8}]}>Your Tickets</Text>
          <FlatList
          data={purchasesData}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No previous purchases to show.</Text>}
        />
        <Pressable style={[styles.buttonStyle,{backgroundColor: 'orangered'}]} onPress={() => {getPurchasesFromDB()}}>
                <Text style={styles.buttonTextStyle}>Refresh Page</Text>
        </Pressable>
        </View>
      ) : (
        <View>
          <Text style={[styles.aboutTitleStyle]} >You are not logged in. </Text>
          <Text style={[styles.aboutTitleStyle]} >Login or Signup for MyTickets </Text>
          {/* <Button title="Login" onPress={() => navigation.navigate('Login', { screen: 'MyPurchase' })} />
          <Button title="Sign up" onPress={() => navigation.navigate('Signup' , { screen: 'MyPurchase' })} /> */}

          <Pressable style={[styles.buttonStyle]} onPress = {() => navigation.navigate('Login', { screen: 'MyPurchase' })}>
                <Text style={styles.buttonTextStyle}>Login</Text>
          </Pressable>
         
          <Pressable style={[styles.buttonStyle]} onPress = {() => navigation.navigate('Signup', { screen: 'MyPurchase' })}>
                <Text style={styles.buttonTextStyle}>Sigup</Text>
          </Pressable>

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
  listItem: {
    margin: 10,
    flexDirection:'row',
  },
  movieNameStyle : {
    fontSize:24,
  },
  buttonStyle: {
    height: 50,
    margin: 10,
    padding: 5,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color:'#fff',
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
  aboutTitleStyle : {
    alignItems: 'center',
    justifyContent: 'center',
    padding : 8,
    fontSize : 16,
    fontWeight:'bold',
    // textAlign : 'flex-start',
  },
});

export default MyPurchasesScreen;
