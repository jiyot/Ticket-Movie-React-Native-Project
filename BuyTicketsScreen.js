import { useEffect, useState } from "react";
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Ionicons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
import { auth,db,firebaseApp } from "./config/Firebase-config";
import { collection, doc, getDoc, addDoc } from "firebase/firestore"
import {StackActions} from '@react-navigation/native'
import { StyleSheet, Text, TextInput, View , Button, Pressable,Alert } from 'react-native';


const BuyTicketsScreen  = ({navigation, route}) => {

   const {movieItem} = route.params;
   //const {loggedInUserDocId} = route.params

    const [username, setUsername] = useState('');
    const [useruid, setUseruid] = useState('');
    const [email, setEmailId] = useState('');
    const [ticketCount, setTicketCount] = useState(0);
    const movieName = "The Matrix";
    const ticketPrice = 12;
    const taxRate = 0.13;
    const subtotal = ticketCount * ticketPrice;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    useEffect( () => {
      console.log(`${JSON.stringify(auth.currentUser.uid)}`)
      //console.log(`loggedInUserDocId:${loggedInUserDocId}`)

      auth.onAuthStateChanged(user => {
        if (user) {
          setUseruid(user.uid);
        } else {
          setUseruid('null');
        }
      });

      getEmailFromDB()
    },[])

    const getEmailFromDB = async () => {
      console.log(`Trying to get email id of currently logged in user from DB`)
      try {
        setEmailId(auth.currentUser.email)
      }catch(error){
        console.log(`Error trying to get email id of currently logged-in user : ${error}`)
      }

    }

    const onConfirmPurchase = () => {

        if (ticketCount > 0) {
            if(username===''||email===''){
              if(username===''){
                alert('Please enter your name to proceed.');
              }else if(email === ''){
                alert('Please enter your email address to proceed.');
              }
              return
            }
            addPurchase()

          }
          else {
            alert('Ticket count is Zero. Cannot make purchase.');
          }
      }

      const addPurchase = async () => {
        try {
          const purchaseToInsert = {
            movieId:movieItem.id,
            movieName:movieItem.title,
            nameOnPurchase:username,
            numTickets:ticketCount,
            total:total,
            userId:auth.currentUser.uid
          }
          console.log(`${JSON.stringify(purchaseToInsert)}`)

          

          // to add into independent collection
           // _______for purchases collection only______
          const insertedDocument = await addDoc(collection(db,"purchases"),purchaseToInsert)
          console.log(`Successfully added purchase with id : ${insertedDocument.id}`)
          // ____________END____________


          // _______for users_movies and sub collection purchases only______
          // const subcollectionRef = collection(
          //   db,
          //   "users_movies",
          //   useruid,
          //   "purchases"
          // );
      
          // const insertedDocument = await addDoc(subcollectionRef, purchaseToInsert);
          // console.log(
          //   `Successfully added purchase with id : ${insertedDocument.id}`
          // );
          // ____________END____________

          // //to add document to subcollection
          // const subcollectionRef = collection(db,"users_movies",loggedInUserDocId,"purchases")
          // const insertedDocument = await addDoc(subcollectionRef, purchaseToInsert)
          // console.log(`Successfully added purchase with id : ${insertedDocument.id}`)

          console.log("Purchased")
          Alert.alert("Success","Successfully purchased tickets. Enjoy your movie!");
          navigation.navigate("Home")
        }catch(error){
          console.log(`Error trying to add to purchase : ${error}`)
        }
      }


    return(

        <View>
            <Text style={styles.titleStyle}>Buy Tickets</Text>
            <Text style={[{fontWeight : '700',paddingTop:0,fontSize:16, textAlign:'center',}]}>{movieItem.title}</Text>
            <Text style={[{paddingHorizontal:8}]}>Your Email Address</Text>
            <TextInput 
                 style={styles.inputStyle}
                placeholder="enter email id"
                textContentType="emailAddress"
                autoCapitalize="none"
                returnKeyType="next"
                value={email}
                onChangeText={setEmailId}
            />
             <Text style={[{paddingHorizontal:8}]}>Your Name</Text>
            <TextInput 
            style={styles.inputStyle}
                placeholder="enter name"
                textContentType="name"
                autoCapitalize="none"
                returnKeyType="next"
                value={username}
                onChangeText={setUsername}
            />
             <Text style={[{paddingHorizontal:8,paddingBottom:8}]}>Number of Tickets</Text>


        <View >
          <View style={[{flexDirection:'row'}]}>
            <Pressable style={[{backgroundColor:'red',width:35,height:45,marginHorizontal:8,justifyContent:'center'}]} onPress={() => {
                    if (ticketCount > 0) {
                    setTicketCount(ticketCount - 1);
                  }
                }}>
                <Text style={[styles.buttonTextStyle,{alignSelf:'center',fontSize:16}]}>-</Text>
            </Pressable>

            <Text style={[{alignSelf:'center',fontSize:16}]}>{ticketCount}</Text>
            
            <Pressable style={[{backgroundColor:'red',width:35,height:45,marginHorizontal:8,justifyContent:'center'}]} onPress={() => {
                    setTicketCount(ticketCount + 1);
                }}>
                <Text style={[styles.buttonTextStyle,{alignSelf:'center',fontSize:16}]}>+</Text>
          </Pressable>
          </View>

      {ticketCount > 0 && (
        <View style={[{marginTop:50,paddingHorizontal:8}]}>
          <Text style={[{paddingBottom:8}]}>Order Summary:</Text>
          <View style={[{borderWidth:0.5}]}>
          <Text style={[{paddingHorizontal:8,paddingVertical:4}]}>{movieItem.title}</Text>
          <Text style={[{paddingHorizontal:8,paddingVertical:4}]}>Number of Tickets: {ticketCount}</Text>
          <Text style={[{paddingHorizontal:8,paddingVertical:4}]}>Subtotal: ${subtotal.toFixed(2)}</Text>
          <Text style={[{paddingHorizontal:8,paddingVertical:4}]}>Tax: ${tax.toFixed(2)}</Text>
          <View style={[{backgroundColor:'gold',paddingVertical:8,width:"100%"}]}>
            <Text style={[{paddingHorizontal:8}]}>Total: ${total.toFixed(2)}</Text>
          </View>
          </View>
        </View>
      )}
      </View>

      <Pressable style={[styles.buttonStyle,{backgroundColor: 'orangered',marginTop:150}]} onPress={onConfirmPurchase}>
                <Text style={styles.buttonTextStyle}>Confirm Purchase</Text>
      </Pressable>
      {/* <Button color = "orangered" title='Confirm Purchase' onPress={onConfirmPurchase}/> */}
    
        </View>

    );

}

const styles = StyleSheet.create({
    titleStyle : {
      fontSize : 24,
      fontWeight : 'bold',
      textAlign:'center',
      padding : 8,
    },
    inputStyle: {
        height: 50,
        margin: 8,
        borderColor: 'orangered',
        borderWidth: 1,
        padding: 5,
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
});


export default BuyTicketsScreen;