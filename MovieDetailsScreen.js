import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet,Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from './config/Firebase-config';
import Icon from "react-native-vector-icons/FontAwesome";


const MovieDetailsScreen = ({navigation, route}) => {
    const { movie } = route.params;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  
      return unsubscribe;
    }, []);

    const handleBuyTickets = () => {
      if (isLoggedIn) {
          // Proceed with ticket purchase process
          // alert('Ticket purchase process initiated!');
          navigation.navigate('BuyTicketsScreen' ,{movieItem : movie});
      } else {
          navigation.navigate('Login', { screen: 'Home' });
      }
  }

    return (
      <View >
        
        <Image  style={styles.imageStyle} source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} resizeMode="cover" />
        <View style={styles.innerContainer1}>
          <View style={styles.innerContainer2}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.releaseDateStyle}>{movie.release_date}</Text>
          </View>
          <View style={styles.innerContainer3}>
            <Text style={styles.title}>{movie.vote_average * 10}% <Icon name={'star'} size={24} color={'gold'}></Icon> </Text>
            
          </View>

        </View>
        
        <Text style={styles.aboutTitleStyle}>Plot summary</Text>
        <Text style={styles.aboutStyle}>{movie.overview}</Text>
        {/* <StatusBar style="auto" /> */}
        

      {isLoggedIn ? (
        <View>

          <Pressable disabled={!isLoggedIn} style={[styles.buttonStyle,{backgroundColor: isLoggedIn ? 'orangered' : 'lightgrey', marginTop : 40}]} onPress={handleBuyTickets}>
                <Text style={styles.buttonTextStyle}>Buy Tickets</Text>
          </Pressable>
          
          {/* <Button
            title="BUY TICKETS"
            disabled={!isLoggedIn}
            onPress={handleBuyTickets}
          /> */}
        </View>
      ) : (
        <View style={styles.innerContainer4}>
          <Text style={styles.innerContainer4Text}>You must be logged in to buy tickets.</Text>
          <Pressable disabled={!isLoggedIn} style={[styles.buttonStyle,{backgroundColor: isLoggedIn ? 'orangered' : 'lightgrey'}]} onPress={handleBuyTickets}>
                <Text style={styles.buttonTextStyle}>Buy Tickets</Text>
          </Pressable>
          <Pressable style={[styles.buttonStyle,{backgroundColor: 'orangered'}]} onPress={() => navigation.navigate('Login', { screen: 'Home' })}>
                <Text style={styles.buttonTextStyle}>Login</Text>
          </Pressable>
          {/* <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title="BUY TICKETS"
            disabled={!isLoggedIn}
            onPress={handleBuyTickets}
          /> */}
        </View>
      )}


      </View>
    );
}

const styles = StyleSheet.create({
  imageStyle : {
      width : "100%",
      height : 300,
      padding : 10,
      borderRadius : 1,
  },
  title : {
      fontSize : 24,
      textAlign : 'left',
      fontWeight : 'bold',
      paddingBottom : 8,
  },
  innerContainer1 : {
    padding : 8,
    flexDirection : 'row'
  },
  innerContainer2 : {
    alignItems : 'flex-start',
    width:"70%",
  },
  innerContainer3 : {
    alignItems : 'flex-end',
    width:"30%",
  },
  releaseDateStyle : {
    fontWeight : '300',

  },
  aboutTitleStyle : {
    padding : 8,
    fontSize : 16,
    fontWeight:'bold',
    textAlign : 'left',
  },
  aboutStyle : {
      paddingHorizontal : 8,
      textAlign : 'left',
  },
  innerContainer4 : {
    paddingTop : 40,
  },
  innerContainer4Text : {
    textAlign : 'center',
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
})


export default MovieDetailsScreen;