import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

export default function NowPlayingScreen({navigation, route}) {

  const [movieData, setMovieData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMovieFromAPI = () => {
    const apiURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=5120e58263731f95163f784d7406a7e1&language=en-US&page=1&region=CA`;
    // console.log(apiURL);

    //API request
    return fetch(apiURL)
      .then((response) =>
        response.json().then((jsonData) => {
          setMovieData(jsonData.results);
          // console.log(jsonData.results);
        })
      )
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  //when the component is loaded
  useEffect(() => {
    getMovieFromAPI();
  }, []);

  //function to render individual list items
  const renderListItem = ({ item }) => (
    <Pressable onPress={() => navigateToDetails(item)}>
      <View style={styles.listItem}>
        <Text style={styles.title}> {item.title} </Text>
 {/* <Image style={styles.imgAnime} source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} resizeMode="contain" /> */}
        <Text style={styles.aboutStyle}>Release Date: {item.release_date} </Text>
        <View style={styles.separator} />
      </View>
    </Pressable>
  )

  const navigateToDetails = (item) => {
    navigation.navigate('DetailsScreen', { movie: item });
  }


  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={movieData}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No movies found.</Text>}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch', 
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listItem: {
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  imgAnime: {
    width: '100%',
    height: 200,
    marginBottom: 5,
  },
  aboutStyle: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
});
